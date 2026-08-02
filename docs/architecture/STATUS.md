# Architecture status

## Canonical state

```text
ZP_00=PASS
ZP_01A=APPROVED_FOR_MAIN
ZP_01A_PUB_R1=PASS
ZP_01B_R1=PASS
PREVIEW_VISUAL_ACCEPTANCE=PASS
FOUNDATION_MERGE_GATE=APPROVED
ZP_02A=IMPLEMENTATION_IN_PROGRESS
ZP_02A_PUBLIC_SHELL=BILINGUAL_PREVIEW_PENDING
ZP_02A_PUBLIC_COPY=PROVISIONAL_PUBLIC_COPY
ZP_02A_VISUAL_ACCEPTANCE=PENDING
ZP_02A_PROTECTED_MANUAL_PREVIEW=PENDING
REPOSITORY_VISIBILITY=PUBLIC
VERCEL_PROJECT=zentra-platform
VERCEL_GIT_INTEGRATION=false
VERCEL_AUTOMATIC_DEPLOYMENTS=false
VERCEL_TECHNICAL_BOOTSTRAP=READY
VERCEL_PROTECTED_PREVIEW=READY
CUSTOM_DOMAIN_CONNECTED=false
EXTERNAL_PROVIDERS_CREATED=false
COMMERCIAL_PRODUCTION=false
PRODUCTION_DOMAIN_CUTOVER=false
NEXT_GATE=ZP_02A_LOCAL_VALIDATION_CI_AND_PROTECTED_MANUAL_PREVIEW
```

## Interpretation

The repository contains an approved greenfield foundation with clean public history. Public visibility is for portfolio and technical transparency and does not make the repository open source.

ZP-01B-R1 validated one controlled technical Production bootstrap and one protected manual Preview in the isolated Vercel project. Both contain the same neutral, non-indexable foundation. The technical target does not represent commercial production, a launch, or a domain cutover.

The approved merge gate covers only the reviewed foundation. Customer, administration, commerce, authentication, persistence, provider, domain, and commercial-production work remain unimplemented and require their own authorization.

The approved foundation includes:

- a minimal public-source history merged only through protected Pull Request controls;
- a minimal non-indexable Next.js scaffold;
- strict TypeScript;
- a reproducible toolchain;
- unit and end-to-end smoke tests;
- Pull Request validation;
- architectural boundaries and decisions.

ZP-02A is now implementing the first bilingual public visual shell on its
isolated feature branch. The implemented surface supports English and Spanish,
uses English as the default locale, and remains non-indexable. Its public copy
is provisional. The ZP-02A manual Preview and visual acceptance are still
pending; the `READY` Preview above refers only to the previously validated
foundation baseline.

## Functional state

| Area                     | State                                |
| ------------------------ | ------------------------------------ |
| Non-indexable web shell  | Bilingual implementation in progress |
| Supported locales        | English and Spanish; English default |
| Commercial behavior      | Not implemented                      |
| Authentication           | Not implemented                      |
| Customer portal          | Planned; not implemented             |
| Administration           | Planned; not implemented             |
| Subscriptions            | Not implemented                      |
| Persistence              | Not implemented                      |
| External providers       | Not connected                        |
| Approved web derivatives | Six integrated for ZP-02A            |
| Canonical brand masters  | Not tracked                          |

## Operational boundaries

| System or control          | State                                                 |
| -------------------------- | ----------------------------------------------------- |
| Production landing         | Separate and unchanged                                |
| Platform deployment        | Technical bootstrap and protected Preview READY       |
| Platform domain            | Generated Vercel domain only; no custom               |
| External providers         | Not selected or created                               |
| Secrets                    | None required or tracked                              |
| Commercial production      | Not authorized or touched                             |
| Production domain cutover  | Not authorized or performed                           |
| Foundation merge to `main` | Approved through protected squash-only PR             |
| Foundation merge gate      | Approved after required validation                    |
| ZP-02A branch              | Isolated implementation; Preview and approval pending |
| Private bootstrap archive  | Retained privately; never canonical/public            |

The approved foundation baseline preserves the isolation described by ADR-005.
ZP-02A began after the required baseline verification and is governed by
[ADR-006](../adr/ADR-006-bilingual-public-shell.md) and
[Public shell v1](PUBLIC-SHELL-V1.md). Its implementation-in-progress state
does not authorize merge, commercial production, indexing, a custom domain, a
provider, transfer, or cutover.
