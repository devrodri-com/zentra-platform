import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import en from "@/i18n/dictionaries/en";
import es from "@/i18n/dictionaries/es";

import LocaleHome from "./page";
import { createNotFoundMetadata, createPublicMetadata } from "./metadata";

describe.each([
  {
    locale: "en",
    heading: "Premium scent design for commercial and residential spaces.",
    navLabel: "Primary navigation",
    navItem: "Experience",
    currentLocale: "EN",
  },
  {
    locale: "es",
    heading: "Diseño olfativo premium para espacios comerciales y residenciales.",
    navLabel: "Navegación principal",
    navItem: "Experiencia",
    currentLocale: "ES",
  },
] as const)("$locale public home", ({ currentLocale, heading, locale, navItem, navLabel }) => {
  it("renders one localized h1 and localized navigation", async () => {
    render(await LocaleHome({ params: Promise.resolve({ locale }) }));

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: navLabel })).toHaveTextContent(navItem);
  });

  it("marks the active locale and has no contact form", async () => {
    render(await LocaleHome({ params: Promise.resolve({ locale }) }));

    const activeLocaleLinks = screen.getAllByRole("link", { name: currentLocale });
    expect(activeLocaleLinks.length).toBeGreaterThan(0);
    expect(activeLocaleLinks.every((link) => link.getAttribute("aria-current") === "page")).toBe(
      true,
    );
    expect(document.querySelector("form")).not.toBeInTheDocument();
  });
});

describe("public metadata", () => {
  it.each([
    ["en", en],
    ["es", es],
  ] as const)("keeps %s non-indexable without a canonical URL", (_locale, dictionary) => {
    const metadata = createPublicMetadata(dictionary);

    expect(metadata.robots).toMatchObject({ index: false, follow: false, nocache: true });
    expect(metadata).not.toHaveProperty("alternates.canonical");
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("keeps unsupported routes non-indexable", () => {
    const metadata = createNotFoundMetadata();

    expect(metadata.robots).toMatchObject({ index: false, follow: false, nocache: true });
    expect(metadata).not.toHaveProperty("alternates.canonical");
  });
});
