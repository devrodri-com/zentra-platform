# Architecture status

## Canonical state

```text
ZP_00=CLOSED_PASS_WITH_CONTROLLED_FINDINGS
ZP_01A=PASS_PENDING_MERGE
ZP_01A_PUB_R1=PASS
ZP_01B=STOPPED_PRODUCTION_TARGET_SAFE
ZP_01B_R1=CONTROLLED_BOOTSTRAP_PENDING
REPOSITORY_VISIBILITY=PUBLIC
OPEN_SOURCE=false
LICENSE=NONE
PR_1_DRAFT=true
RELEASE_1_CUSTOMER_PORTAL=true
RELEASE_1_ADMIN_PANEL=true
IMPLEMENTATION_COMMERCIAL_RULES=false
VERCEL_PROJECT=zentra-platform
VERCEL_GIT_INTEGRATION=false
CUSTOM_DOMAIN_CONNECTED=false
EXTERNAL_PROVIDERS_CREATED=false
COMMERCIAL_PRODUCTION=false
PRODUCTION_DOMAIN_CUTOVER=false
```

## Interpretation

The repository contains a greenfield foundation with clean public history. Public visibility is for portfolio and technical transparency and does not make the repository open source.

`ZP_01B=STOPPED_PRODUCTION_TARGET_SAFE` records the previous controlled stop: Vercel classified the first deployment as a technical Production deployment, and it was removed without affecting the production landing or any domain.

`ZP_01B_R1=CONTROLLED_BOOTSTRAP_PENDING` authorizes exactly one controlled technical Production bootstrap followed by one distinct manual Preview. The technical target does not represent commercial production, a launch, or a domain cutover.

`RELEASE_1_CUSTOMER_PORTAL=true` and `RELEASE_1_ADMIN_PANEL=true` record planned scope only. They do not mean those areas are implemented.

The current foundation includes:

- an isolated foundation branch and Draft Pull Request;
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

| System or control         | State                                      |
| ------------------------- | ------------------------------------------ |
| Production landing        | Separate and unchanged                     |
| Platform deployment       | Controlled bootstrap and Preview pending   |
| Platform domain           | Generated Vercel domain only; no custom    |
| External providers        | Not selected or created                    |
| Secrets                   | None required or tracked                   |
| Commercial production     | Not authorized or touched                  |
| Production domain cutover | Not authorized or performed                |
| Merge to `main`           | Not authorized in this phase               |
| Foundation Pull Request   | Draft required                             |
| Private bootstrap archive | Retained privately; never canonical/public |

ZP-01B-R1 authorizes only the controlled technical bootstrap and isolated Preview gate described by ADR-005. It does not authorize commercial production, a custom domain, a provider, transfer, cutover, or merge. Future work requires separate authorization and passing controls.
