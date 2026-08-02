import type { Metadata } from "next";

import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { AccessDictionary } from "@/i18n/types";

type AccessMetadataKey = keyof Pick<
  AccessDictionary,
  "accessDenied" | "activation" | "admin" | "login" | "portal"
>;

export function createAccessMetadata(title: string): Metadata {
  return {
    title,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  };
}

export async function createLocalizedAccessMetadata(
  params: Promise<{ locale: string }>,
  key: AccessMetadataKey,
): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    return createAccessMetadata("ZENTRA | Access unavailable");
  }

  const dictionary = await getDictionary(locale);

  return createAccessMetadata(dictionary.access[key].metadataTitle);
}
