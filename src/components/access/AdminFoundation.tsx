import type { Locale } from "@/i18n/config";
import type { AccessDictionary } from "@/i18n/types";

import { AccessShell } from "./AccessShell";
import { FoundationCardGrid } from "./FoundationCardGrid";
import { RoleVocabulary } from "./RoleVocabulary";

type AdminFoundationProps = {
  copy: AccessDictionary;
  locale: Locale;
};

export function AdminFoundation({ copy, locale }: AdminFoundationProps) {
  const roles = Object.values(copy.roles.staff);

  return (
    <AccessShell
      copy={copy}
      description={copy.admin.body}
      locale={locale}
      route="admin"
      title={copy.admin.title}
    >
      <FoundationCardGrid emptyState={copy.admin.emptyState} sections={copy.admin.sections} />
      <RoleVocabulary label={copy.common.roleVocabulary} roles={roles} />
    </AccessShell>
  );
}
