import { notFound } from "next/navigation";

import { AccessDeniedFoundation } from "@/components/access/AccessDeniedFoundation";
import { createLocalizedAccessMetadata } from "@/components/access/access-metadata";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type AccessDeniedPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateMetadata({ params }: AccessDeniedPageProps) {
  return createLocalizedAccessMetadata(params, "accessDenied");
}

export default async function AccessDeniedPage({ params }: AccessDeniedPageProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return <AccessDeniedFoundation copy={dictionary.access} locale={locale} />;
}
