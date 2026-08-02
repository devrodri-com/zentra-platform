import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaryLoaders = {
  en: () => import("./dictionaries/en").then(({ default: dictionary }) => dictionary),
  es: () => import("./dictionaries/es").then(({ default: dictionary }) => dictionary),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaryLoaders[locale]();
}
