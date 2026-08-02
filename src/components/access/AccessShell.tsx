import type { ReactNode } from "react";

import { BrandMark } from "@/components/public/BrandMark";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import type { AccessDictionary } from "@/i18n/types";

import { AccessFoundationBanner } from "./AccessFoundationBanner";

type AccessRoute = "access-denied" | "activate" | "admin" | "login" | "portal";

type AccessShellProps = {
  children: ReactNode;
  copy: AccessDictionary;
  locale: Locale;
  route: AccessRoute;
  title: string;
  description: string;
};

export function AccessShell({
  children,
  copy,
  description,
  locale,
  route,
  title,
}: AccessShellProps) {
  return (
    <div className={`access-shell access-shell--${route}`}>
      <AccessFoundationBanner text={copy.banner} />
      <header className="access-shell__header shell-container">
        <a className="access-shell__brand" href={`/${locale}`} aria-label={copy.common.home}>
          <BrandMark
            alt="ZENTRA"
            className="access-shell__logo"
            kind="logo"
            priority
            variant="gold"
          />
        </a>
        <nav className="access-shell__locales" aria-label={copy.common.languageLabel}>
          {SUPPORTED_LOCALES.map((supportedLocale) => (
            <a
              aria-current={supportedLocale === locale ? "page" : undefined}
              href={`/${supportedLocale}/${route}`}
              key={supportedLocale}
              lang={supportedLocale}
            >
              {supportedLocale.toUpperCase()}
            </a>
          ))}
        </nav>
      </header>
      <main className="access-shell__main shell-container" id="main-content">
        <div className="access-shell__intro">
          <p className="eyebrow">{copy.common.eyebrow}</p>
          <h1>{title}</h1>
          <p className="access-shell__lede">{description}</p>
        </div>
        <div className="access-shell__body">{children}</div>
      </main>
    </div>
  );
}
