import type { Locale } from "@/i18n/config";
import type { AccessDictionary } from "@/i18n/types";

import { AccessShell } from "./AccessShell";

type AccessDeniedFoundationProps = {
  copy: AccessDictionary;
  locale: Locale;
};

export function AccessDeniedFoundation({ copy, locale }: AccessDeniedFoundationProps) {
  return (
    <AccessShell
      copy={copy}
      description={copy.accessDenied.body}
      locale={locale}
      route="access-denied"
      title={copy.accessDenied.title}
    >
      <div className="access-panel">
        <div className="access-status">
          <strong className="access-status__code">{copy.accessDenied.state}</strong>
        </div>
        <nav className="access-links" aria-label={copy.accessDenied.title}>
          <a href={`/${locale}`}>{copy.accessDenied.homeLink}</a>
          <a href={`/${locale}/login`}>{copy.accessDenied.loginLink}</a>
        </nav>
      </div>
    </AccessShell>
  );
}
