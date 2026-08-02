import type { Locale } from "@/i18n/config";
import type { AccessDictionary } from "@/i18n/types";

import { AccessShell } from "./AccessShell";

type LoginFoundationProps = {
  copy: AccessDictionary;
  locale: Locale;
};

export function LoginFoundation({ copy, locale }: LoginFoundationProps) {
  return (
    <AccessShell
      copy={copy}
      description={copy.login.body}
      locale={locale}
      route="login"
      title={copy.login.title}
    >
      <div className="access-panel">
        <div className="access-field">
          <label htmlFor="access-foundation-email">{copy.login.emailLabel}</label>
          <input
            aria-describedby="access-foundation-email-hint"
            id="access-foundation-email"
            readOnly
            type="email"
          />
          <p id="access-foundation-email-hint">{copy.login.emailHint}</p>
        </div>
        <button aria-disabled="true" className="access-disabled-action" type="button">
          {copy.login.action}
        </button>
        <nav className="access-links" aria-label={copy.login.title}>
          <a href={`/${locale}/activate`}>{copy.login.activationLink}</a>
          <a href={`/${locale}`}>{copy.login.homeLink}</a>
        </nav>
      </div>
    </AccessShell>
  );
}
