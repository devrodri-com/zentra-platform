import type { Locale } from "@/i18n/config";
import type { AccessDictionary } from "@/i18n/types";

import { AccessShell } from "./AccessShell";
import { FoundationCardGrid } from "./FoundationCardGrid";
import { RoleVocabulary } from "./RoleVocabulary";

type PortalFoundationProps = {
  copy: AccessDictionary;
  locale: Locale;
};

export function PortalFoundation({ copy, locale }: PortalFoundationProps) {
  const roles = Object.values(copy.roles.customer);

  return (
    <AccessShell
      copy={copy}
      description={copy.portal.body}
      locale={locale}
      route="portal"
      title={copy.portal.title}
    >
      <FoundationCardGrid emptyState={copy.portal.emptyState} sections={copy.portal.sections} />
      <RoleVocabulary label={copy.common.roleVocabulary} roles={roles} />
    </AccessShell>
  );
}
