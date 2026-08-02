# Architecture status

## Canonical state

```text
ZP_00=PASS
ZP_01A=APPROVED_FOR_MAIN
ZP_01A_PUB_R1=PASS
ZP_01B_R1=PASS
PREVIEW_VISUAL_ACCEPTANCE=PASS
FOUNDATION_MERGE_GATE=APPROVED
ZP_02A=PASS
ZP_02A_PUBLIC_SHELL=BILINGUAL_PROTECTED_PREVIEW_APPROVED
ZP_02A_PUBLIC_COPY=PROVISIONAL_PUBLIC_COPY
ZP_02A_VISUAL_ACCEPTANCE=PASS
ZP_02A_PROTECTED_MANUAL_PREVIEW=READY
ZP_02A_PREVIEW_DEPLOYMENT_COMMIT=bc642a2c72bbacd95b69de37b2545d691091c9b3
ZP_02A_PREVIEW_TARGET=preview_or_null
ZP_02A_PREVIEW_PROTECTION=VERCEL_AUTHENTICATION
ZP_02A_PREVIEW_HTTP=PASS
ZP_02A_RUNTIME_DIFF_SINCE_PREVIEW=false
ZP_02A_R1=PASS
HERO_TITLE_SCALE=APPROVED
VISUAL_DIRECTION=APPROVED
RESPONSIVE_HERO=APPROVED
FINAL_VISUAL_ACCEPTANCE=PASS
PUBLIC_SHELL_MERGE_GATE=APPROVED
ZP_02A_R1_PROTECTED_MANUAL_PREVIEW=READY
ZP_02A_R1_PREVIEW_DEPLOYMENT_COMMIT=9755b25bb808185121755de51c95acc89bc2529e
ZP_02A_R1_PREVIEW_TARGET=preview_or_null
ZP_02A_R1_PREVIEW_PROTECTION=VERCEL_AUTHENTICATION
ZP_02A_R1_PREVIEW_HTTP=PASS
ZP_02A_R1_RUNTIME_DIFF_SINCE_PREVIEW=false
ZP_03A=PREVIEW_READY_AWAITING_ARCHITECTURE_REVIEW
ZP_03A_PROTECTED_MANUAL_PREVIEW=READY
ZP_03A_PREVIEW_DEPLOYMENT_COMMIT=4162b7a8bd9072f4b90db70ec6b4abf832e84f0c
ZP_03A_PREVIEW_TARGET=preview_or_null
ZP_03A_PREVIEW_PROTECTION=VERCEL_AUTHENTICATION
ZP_03A_PREVIEW_HTTP=PASS
ZP_03A_PREVIEW_NOINDEX=PASS
ZP_03A_RUNTIME_DIFF_SINCE_PREVIEW=false
IDENTITY_AUTHORIZATION_FOUNDATION=PROVIDER_AGNOSTIC
IDENTITY_PROVIDER_DIRECTION=FIREBASE_IDENTITY_PLATFORM
IDENTITY_PROVIDER_CONNECTED=false
AUTHORIZATION_SOURCE_DIRECTION=APPLICATION_POSTGRESQL
DATABASE_CONNECTED=false
REAL_AUTHENTICATION=false
REAL_DATA=false
DENY_BY_DEFAULT=true
SERVER_SIDE_AUTHORIZATION_REQUIRED=true
STAFF_MFA_REQUIRED=true
FAKE_ADAPTERS_RUNTIME=false
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
NEXT_PHASE=NOT_STARTED
NEXT_GATE=ZP_03A_ARCHITECTURE_REVIEW
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

ZP-02A has one protected manual Preview for implementation commit
`bc642a2c72bbacd95b69de37b2545d691091c9b3`. The implemented surface supports
English and Spanish, uses English as the default locale, and remains
non-indexable. Authorized HTTP verification passed for localized content,
routing, assets, social images, robots controls, and the invalid-locale 404;
unauthenticated requests redirect to Vercel Authentication. Its public copy is
provisional.

ZP-02A-R1 adds exactly one protected manual Preview for refinement commit
`9755b25bb808185121755de51c95acc89bc2529e`. The refinement reduces and
rebalances only the hero title scale across the approved responsive matrix;
the bilingual wording, shell composition, brand assets, functional behavior,
and operational boundaries remain unchanged. Rodrigo approved the refined
Preview: the visual direction, common English/Spanish hero-title scale,
responsive hero, and final ZP-02A shell all pass their review gates.

The earlier `PREVIEW_VISUAL_ACCEPTANCE=PASS` value records the approved
foundation baseline. The explicit `ZP_02A_VISUAL_ACCEPTANCE=PASS` value records
the subsequently approved public-shell Preview; both approvals remain scoped
to their respective reviewed artifacts.

ZP-03A adds provider-agnostic contracts for users, customer accounts,
many-to-many memberships, identity links, staff roles, invitations, guest order
claims, audit events, and deny-by-default server-side authorization. It also
adds bilingual non-functional architecture-preview shells for login,
activation, portal, administration, and access denial. No identity provider,
database, real authentication, session, email delivery, or live data is
connected.

ZP-03A has exactly one protected manual Preview for implementation commit
`4162b7a8bd9072f4b90db70ec6b4abf832e84f0c`. Its ten bilingual access-preview
routes, root redirect, public localized routes, robots policy, and known
invalid-locale 404 passed authenticated HTTP verification. Unauthenticated
requests redirect to Vercel Authentication. The post-Preview documentation
commit changes no runtime file.

## Functional state

| Area                     | State                                 |
| ------------------------ | ------------------------------------- |
| Non-indexable web shell  | Protected Preview visually approved   |
| Supported locales        | English and Spanish; English default  |
| Commercial behavior      | Not implemented                       |
| Authentication           | Not implemented                       |
| Customer portal          | Planned; not implemented              |
| Administration           | Planned; not implemented              |
| Identity contracts       | Implemented; provider not connected   |
| Authorization policy     | Implemented; deny-by-default contract |
| Subscriptions            | Not implemented                       |
| Persistence              | Not implemented                       |
| External providers       | Not connected                         |
| Approved web derivatives | Six integrated for ZP-02A             |
| Canonical brand masters  | Not tracked                           |

## Operational boundaries

| System or control          | State                                           |
| -------------------------- | ----------------------------------------------- |
| Production landing         | Separate and unchanged                          |
| Platform deployment        | Foundation, ZP-02A, and ZP-03A Previews READY   |
| Platform domain            | Generated Vercel domain only; no custom         |
| External providers         | Not selected or created                         |
| Secrets                    | None required or tracked                        |
| Commercial production      | Not authorized or touched                       |
| Production domain cutover  | Not authorized or performed                     |
| Foundation merge to `main` | Approved through protected squash-only PR       |
| Foundation merge gate      | Approved after required validation              |
| ZP-02A branch              | R1 Preview and public-shell merge gate approved |
| ZP-03A branch              | Preview ready; architecture review pending      |
| Private bootstrap archive  | Retained privately; never canonical/public      |

The approved foundation baseline preserves the isolation described by ADR-005.
ZP-02A began after the required baseline verification and is governed by
[ADR-006](../adr/ADR-006-bilingual-public-shell.md) and
[Public shell v1](PUBLIC-SHELL-V1.md). The explicit ZP-02A merge authorization
is limited to the reviewed shell; it does not authorize commercial production,
indexing, a custom domain, a provider, transfer, cutover, or another phase.
