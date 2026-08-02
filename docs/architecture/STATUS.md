# Architecture status

## Canonical state

```text
ZP_00=PASS
ZP_01A=APPROVED_FOR_MAIN
ZP_01A_PUB_R1=PASS
ZP_01B_R1=PASS
PREVIEW_VISUAL_ACCEPTANCE=PASS
FOUNDATION_MERGE_GATE=APPROVED
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
NEXT_PHASE=ZP_02_AFTER_MAIN_VERIFICATION
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

## Functional state

| Area                    | State                    |
| ----------------------- | ------------------------ |
| Non-indexable web shell | Foundation only          |
| Commercial behavior     | Not implemented          |
| Authentication          | Not implemented          |
| Customer portal         | Planned; not implemented |
| Administration          | Planned; not implemented |
| Subscriptions           | Not implemented          |
| Persistence             | Not implemented          |
| External providers      | Not connected            |
| Production brand assets | Not tracked              |

## Operational boundaries

| System or control         | State                                           |
| ------------------------- | ----------------------------------------------- |
| Production landing        | Separate and unchanged                          |
| Platform deployment       | Technical bootstrap and protected Preview READY |
| Platform domain           | Generated Vercel domain only; no custom         |
| External providers        | Not selected or created                         |
| Secrets                   | None required or tracked                        |
| Commercial production     | Not authorized or touched                       |
| Production domain cutover | Not authorized or performed                     |
| Merge to `main`           | Approved through protected squash-only PR       |
| Foundation merge gate     | Approved after required validation              |
| Private bootstrap archive | Retained privately; never canonical/public      |

The approved foundation baseline preserves the isolation described by ADR-005. It does not authorize commercial production, a custom domain, a provider, transfer, or cutover. ZP-02 may begin only after `main` and all post-merge controls are verified separately.
