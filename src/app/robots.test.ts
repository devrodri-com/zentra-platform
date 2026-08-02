import { describe, expect, it } from "vitest";

import robots from "./robots";

describe("robots boundary", () => {
  it("disallows every crawler without declaring a sitemap", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    });
    expect(robots()).not.toHaveProperty("sitemap");
  });
});
