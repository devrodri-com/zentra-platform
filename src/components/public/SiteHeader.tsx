import Link from "next/link";

import type { Dictionary, Locale } from "@/i18n/types";

import { BrandMark } from "./BrandMark";
import { LocaleSwitcher } from "./LocaleSwitcher";

type SiteHeaderProps = {
  dictionary: Dictionary;
  locale: Locale;
};

const navTargets = [
  ["experience", "experience"],
  ["solutions", "solutions"],
  ["industries", "industries"],
  ["contact", "contact"],
] as const;

export function SiteHeader({ dictionary, locale }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="shell-container site-header__inner">
        <Link className="site-header__brand" href={`/${locale}`} aria-label="ZENTRA">
          <BrandMark
            alt={dictionary.brandAlt}
            className="site-header__logo"
            kind="logo"
            priority
            variant="white"
          />
        </Link>

        <nav className="desktop-nav" aria-label={dictionary.nav.ariaLabel}>
          {navTargets.map(([key, target]) => (
            <Link href={`#${target}`} key={key}>
              {dictionary.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <LocaleSwitcher ariaLabel={dictionary.footer.languageLabel} locale={locale} />
          <Link className="header-cta" href="#contact">
            {dictionary.nav.consultation}
          </Link>
        </div>

        <details className="mobile-menu">
          <summary>
            <span>{dictionary.menuLabel}</span>
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </summary>
          <div className="mobile-menu__panel">
            <nav aria-label={dictionary.nav.mobileAriaLabel}>
              {navTargets.map(([key, target]) => (
                <Link href={`#${target}`} key={key}>
                  {dictionary.nav[key]}
                </Link>
              ))}
              <Link className="mobile-menu__cta" href="#contact">
                {dictionary.nav.consultation}
              </Link>
            </nav>
            <LocaleSwitcher ariaLabel={dictionary.footer.languageLabel} locale={locale} />
          </div>
        </details>
      </div>
    </header>
  );
}
