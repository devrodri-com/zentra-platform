import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

async function collectSourceFiles(directory: string): Promise<readonly string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectSourceFiles(entryPath);
      }

      return /\.(?:mts|ts|tsx)$/.test(entry.name) ? [entryPath] : [];
    }),
  );

  return nestedFiles.flat();
}

describe("test fake import boundary", () => {
  it("keeps every test fake out of runtime source files", async () => {
    const sourceRoot = path.join(process.cwd(), "src");
    const files = await collectSourceFiles(sourceRoot);
    const runtimeFiles = files.filter(
      (file) => !file.includes(`${path.sep}test${path.sep}`) && !file.includes(".test."),
    );
    const findings = (
      await Promise.all(
        runtimeFiles.map(async (file) => {
          const source = await readFile(file, "utf8");

          return source.includes("test/fakes") ? path.relative(process.cwd(), file) : null;
        }),
      )
    ).filter((file): file is string => file !== null);

    expect(findings).toEqual([]);
  });
});
