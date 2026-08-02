import { notFound } from "next/navigation";

import { PortalFoundation } from "@/components/access/PortalFoundation";
import { createLocalizedAccessMetadata } from "@/components/access/access-metadata";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type PortalPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateMetadata({ params }: PortalPageProps) {
  return createLocalizedAccessMetadata(params, "portal");
}

export default async function PortalPage({ params }: PortalPageProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return <PortalFoundation copy={dictionary.access} locale={locale} />;
}
