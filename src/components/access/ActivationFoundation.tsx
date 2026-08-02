import type { Locale } from "@/i18n/config";
import type { AccessDictionary } from "@/i18n/types";

import { AccessShell } from "./AccessShell";

type ActivationFoundationProps = {
  copy: AccessDictionary;
  locale: Locale;
};

export function ActivationFoundation({ copy, locale }: ActivationFoundationProps) {
  return (
    <AccessShell
      copy={copy}
      description={copy.activation.body}
      locale={locale}
      route="activate"
      title={copy.activation.title}
    >
      <div className="access-panel">
        <div className="access-status">
          <strong className="access-status__code">{copy.activation.state}</strong>
          <p>{copy.activation.stateDetail}</p>
        </div>
        <nav className="access-links" aria-label={copy.activation.title}>
          <a href={`/${locale}/login`}>{copy.activation.loginLink}</a>
          <a href={`/${locale}`}>{copy.activation.homeLink}</a>
        </nav>
      </div>
    </AccessShell>
  );
}
