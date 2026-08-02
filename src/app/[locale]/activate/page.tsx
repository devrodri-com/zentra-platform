import { notFound } from "next/navigation";

import { ActivationFoundation } from "@/components/access/ActivationFoundation";
import { createLocalizedAccessMetadata } from "@/components/access/access-metadata";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type ActivationPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateMetadata({ params }: ActivationPageProps) {
  return createLocalizedAccessMetadata(params, "activation");
}

export default async function ActivationPage({ params }: ActivationPageProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return <ActivationFoundation copy={dictionary.access} locale={locale} />;
}
