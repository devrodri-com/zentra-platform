import "@testing-library/jest-dom/vitest";

import type { ImgHTMLAttributes } from "react";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

type MockImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  priority?: boolean;
  src: string | { src: string };
};

vi.mock("next/image", async () => {
  const { createElement } = await import("react");

  return {
    default: function MockNextImage({ priority, src, ...props }: MockImageProps) {
      void priority;

      return createElement("img", {
        ...props,
        src: typeof src === "string" ? src : src.src,
      });
    },
  };
});

afterEach(() => {
  cleanup();
});
