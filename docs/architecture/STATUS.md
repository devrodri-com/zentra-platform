# Architecture status

## Canonical state

```text
ZP_00=CLOSED_PASS_WITH_CONTROLLED_FINDINGS
ZP_01A=PASS_PENDING_MERGE
ZP_01A_PUB_R1=PASS
ZP_01B=PREVIEW_GATE_PENDING
REPOSITORY_VISIBILITY=PUBLIC
OPEN_SOURCE=false
LICENSE=NONE
PR_1_DRAFT=true
RELEASE_1_CUSTOMER_PORTAL=true
RELEASE_1_ADMIN_PANEL=true
IMPLEMENTATION_COMMERCIAL_RULES=false
VERCEL_PROJECT_PLANNED=zentra-platform
VERCEL_GIT_INTEGRATION=false
VERCEL_PRODUCTION_DEPLOYMENT=false
CUSTOM_DOMAIN_CONNECTED=false
EXTERNAL_PROVIDERS_CREATED=false
PRODUCTION_TOUCHED=false
```

## Interpretation

The repository contains a greenfield foundation with clean public history. Public visibility is for portfolio and technical transparency and does not make the repository open source.

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
| Platform deployment       | Isolated manual Preview gate pending       |
| Platform domain           | Not connected                              |
| External providers        | Not selected or created                    |
| Secrets                   | None required or tracked                   |
| Production                | Not touched                                |
| Merge to `main`           | Not authorized in this phase               |
| Foundation Pull Request   | Draft required                             |
| Private bootstrap archive | Retained privately; never canonical/public |

ZP-01B authorizes only the isolated manual Preview gate described by ADR-005. Future feature, production, domain, provider, transfer, or merge work requires separate authorization and passing controls.
