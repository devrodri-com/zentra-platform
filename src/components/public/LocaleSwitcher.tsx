import Link from "next/link";

import { SUPPORTED_LOCALES } from "@/i18n/config";
import type { Locale } from "@/i18n/types";

type LocaleSwitcherProps = {
  ariaLabel: string;
  locale: Locale;
  modifier?: "header" | "footer";
};

export function LocaleSwitcher({ ariaLabel, locale, modifier = "header" }: LocaleSwitcherProps) {
  return (
    <nav className={`locale-switcher locale-switcher--${modifier}`} aria-label={ariaLabel}>
      {SUPPORTED_LOCALES.map((candidate) => (
        <Link
          aria-current={candidate === locale ? "page" : undefined}
          href={`/${candidate}`}
          key={candidate}
          lang={candidate}
        >
          {candidate.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
