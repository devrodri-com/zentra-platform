import { describe, expect, it } from "vitest";
import { foundationMetadata } from "./metadata";
import robots from "./robots";

describe("foundation metadata boundaries", () => {
  it("prevents indexing without declaring a canonical domain", () => {
    expect(foundationMetadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
    expect(foundationMetadata).not.toHaveProperty("alternates.canonical");
  });

  it("disallows crawlers from the foundation", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    });
  });
});
