export const SUPPORTED_LOCALES = ["en", "es"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const locales = SUPPORTED_LOCALES;

export const defaultLocale = DEFAULT_LOCALE;

export const localeLabels = {
  en: "EN",
  es: "ES",
} as const satisfies Record<Locale, string>;

export function hasLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.some((supportedLocale) => supportedLocale === locale);
}
