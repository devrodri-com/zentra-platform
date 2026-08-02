import { notFound } from "next/navigation";

import { ConsultationSection } from "@/components/public/ConsultationSection";
import { ExperienceSection } from "@/components/public/ExperienceSection";
import { HeroSection } from "@/components/public/HeroSection";
import { IndustriesSection } from "@/components/public/IndustriesSection";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SolutionsSection } from "@/components/public/SolutionsSection";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type LocaleHomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHome({ params }: LocaleHomeProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <>
      <div className="hero-shell">
        <SiteHeader dictionary={dictionary} locale={locale} />
        <main id="main-content">
          <HeroSection dictionary={dictionary} />
          <ExperienceSection dictionary={dictionary} />
          <SolutionsSection dictionary={dictionary} />
          <IndustriesSection dictionary={dictionary} />
          <ConsultationSection dictionary={dictionary} />
        </main>
        <SiteFooter dictionary={dictionary} locale={locale} />
      </div>
    </>
  );
}
