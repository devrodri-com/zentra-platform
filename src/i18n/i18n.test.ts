import { describe, expect, it } from "vitest";

import { defaultLocale, hasLocale, localeLabels, locales } from "./config";
import en from "./dictionaries/en";
import es from "./dictionaries/es";
import { getDictionary } from "./get-dictionary";

type KeyShape = true | readonly KeyShape[] | KeyShapeRecord;

type KeyShapeRecord = {
  [key: string]: KeyShape;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getKeyShape(value: unknown): KeyShape {
  if (Array.isArray(value)) {
    return value.map(getKeyShape);
  }

  if (isRecord(value)) {
    const shape: Record<string, KeyShape> = {};

    for (const key of Object.keys(value).sort()) {
      shape[key] = getKeyShape(value[key]);
    }

    return shape;
  }

  return true;
}

describe("locale configuration", () => {
  it("defines English and Spanish with English as the default", () => {
    expect(locales).toEqual(["en", "es"]);
    expect(defaultLocale).toBe("en");
    expect(localeLabels).toEqual({ en: "EN", es: "ES" });
  });

  it.each(["en", "es"])("accepts the supported locale %s", (locale) => {
    expect(hasLocale(locale)).toBe(true);
  });

  it("rejects an unsupported French locale", () => {
    expect(hasLocale("fr")).toBe(false);
  });
});

describe("localized dictionaries", () => {
  it("keeps recursive key and tuple parity between English and Spanish", () => {
    expect(getKeyShape(es)).toEqual(getKeyShape(en));
  });

  it.each(locales)("loads the %s dictionary", async (locale) => {
    const dictionary = await getDictionary(locale);

    expect(dictionary).toBe(locale === "en" ? en : es);
  });

  it("preserves the approved tagline and published value propositions", () => {
    expect(en.hero.tagline).toBe("THE SCENT EXPERIENCE");
    expect(es.hero.tagline).toBe("THE SCENT EXPERIENCE");
    expect(en.hero.valueProposition).toBe(
      "Premium scent design for commercial and residential spaces.",
    );
    expect(es.hero.valueProposition).toBe(
      "Diseño olfativo premium para espacios comerciales y residenciales.",
    );
  });
});
