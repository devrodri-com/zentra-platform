import { notFound } from "next/navigation";

import { LoginFoundation } from "@/components/access/LoginFoundation";
import { createLocalizedAccessMetadata } from "@/components/access/access-metadata";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateMetadata({ params }: LoginPageProps) {
  return createLocalizedAccessMetadata(params, "login");
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return <LoginFoundation copy={dictionary.access} locale={locale} />;
}
