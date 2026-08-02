import Link from "next/link";

import type { Dictionary, Locale } from "@/i18n/types";

import { BrandMark } from "./BrandMark";
import { LocaleSwitcher } from "./LocaleSwitcher";

type SiteFooterProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function SiteFooter({ dictionary, locale }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell-container site-footer__main">
        <div className="site-footer__brand">
          <BrandMark
            alt={dictionary.brandAlt}
            className="site-footer__logo"
            kind="logo"
            variant="gold"
          />
          <p>{dictionary.footer.tagline}</p>
        </div>
        <div className="site-footer__contact">
          <p>{dictionary.footer.contactLabel}</p>
          <a href="mailto:info@zentrascent.com">info@zentrascent.com</a>
        </div>
        <LocaleSwitcher
          ariaLabel={dictionary.footer.languageLabel}
          locale={locale}
          modifier="footer"
        />
      </div>
      <div className="shell-container site-footer__legal">
        <p>© {new Date().getFullYear()} ZENTRA</p>
        <Link href={`/${locale}#main-content`}>{dictionary.footer.backToTop}</Link>
      </div>
    </footer>
  );
}
