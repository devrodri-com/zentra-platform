import { notFound } from "next/navigation";

import { AdminFoundation } from "@/components/access/AdminFoundation";
import { createLocalizedAccessMetadata } from "@/components/access/access-metadata";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type AdminPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateMetadata({ params }: AdminPageProps) {
  return createLocalizedAccessMetadata(params, "admin");
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return <AdminFoundation copy={dictionary.access} locale={locale} />;
}
