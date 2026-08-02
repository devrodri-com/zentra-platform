import type { Metadata, Viewport } from "next";
import { Cinzel, Lato } from "next/font/google";

import { DEFAULT_LOCALE, hasLocale, SUPPORTED_LOCALES } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import "@/styles/globals.css";

import { createNotFoundMetadata, createPublicMetadata } from "./metadata";

const displayFont = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-display",
});

const bodyFont = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-body",
});

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const viewport: Viewport = {
  themeColor: "#1d1d1b",
  colorScheme: "dark light",
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    return createNotFoundMetadata();
  }

  const dictionary = await getDictionary(locale);

  return createPublicMetadata(dictionary);
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: requestedLocale } = await params;
  const locale = hasLocale(requestedLocale) ? requestedLocale : DEFAULT_LOCALE;

  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          {dictionary.skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
