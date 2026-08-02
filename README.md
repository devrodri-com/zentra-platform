# ZENTRA Platform

ZENTRA Platform is the in-development foundation for ZENTRA's public site and future commerce, subscriptions, customer portal, and administration experiences.

The current branch contains the approved bilingual public visual shell and a
provider-agnostic identity and authorization foundation. Login, activation,
portal, and administration routes are non-functional architecture previews.
Catalog, real authentication, checkout, subscriptions, persistence, live
customer workflows, live administration workflows, and external-provider
integrations are not implemented.

## Project status

- `FOUNDATION_BASELINE=APPROVED_FOR_MAIN`
- `ZP_01A_PUB_R1=PASS`
- `ZP_01B_R1=PASS`
- `ZP_02A=PASS`
- `ZP_02A_PUBLIC_COPY=PROVISIONAL_PUBLIC_COPY`
- `ZP_02A_PROTECTED_MANUAL_PREVIEW=READY`
- `ZP_02A_VISUAL_APPROVAL=PASS`
- `ZP_03A=PROVIDER_AGNOSTIC_FOUNDATION_UNDER_REVIEW`
- `IDENTITY_PROVIDER_CONNECTED=false`
- `DATABASE_CONNECTED=false`
- `REAL_AUTHENTICATION=false`
- `REAL_DATA=false`
- `REPOSITORY_VISIBILITY=PUBLIC`
- `ISOLATED_VERCEL_PROJECT=true`
- `VERCEL_GIT_INTEGRATION=false`
- `FOUNDATION_PROTECTED_MANUAL_PREVIEW=READY`
- `CUSTOM_DOMAIN_CONNECTED=false`
- `COMMERCIAL_PRODUCTION=false`

The isolated Vercel project retains its validated protected manual Previews.
It has no Git integration, commercial domain, project-configured environment
variables, or external providers. Commercial production is not connected, and
the existing production landing remains a separate system.

ZP-02A visual approval does not imply final editorial approval,
commercial-production readiness, or a delivery date. ZP-03A does not claim
working authentication, customer access, staff operations, or live data.

## Public shell v1

The approved public shell provides:

- English and Spanish routes at `/en` and `/es`, with English as the default;
- a root redirect from `/` to `/en` through `src/proxy.ts`;
- typed, repository-owned dictionaries without an internationalization library;
- a hero, experience, solutions, industries, consultation, and footer flow;
- navigation anchors for `#experience`, `#solutions`, `#industries`, and `#contact`;
- Cinzel and Lato loaded through `next/font`;
- the official black, gold, ivory, champagne, and stone visual tokens;
- six approved web-ready brand derivatives integrated and registered, with the marks used by
  the shell rendered without modifying their proportions;
- localized metadata and social images while remaining fully non-indexable.

All newly authored public wording is `PROVISIONAL_PUBLIC_COPY`. The shell publishes no canonical URL, sitemap, or JSON-LD. It implements no commerce, authentication, persistence, data capture, forms, provider integration, custom domain, or commercial-production behavior.

See [ADR-006](docs/adr/ADR-006-bilingual-public-shell.md) and
[Public shell v1](docs/architecture/PUBLIC-SHELL-V1.md).

## Identity and authorization foundation

ZP-03A defines users and customer accounts as separate concepts, many-to-many
account memberships, provider-neutral identity links, staff and customer roles,
typed capabilities, MFA assurance for staff, digest-only invitation and order
claim state machines, safe audit events, and deny-by-default server-side policy.

The identity provider authenticates but does not authorize. Application-owned
roles and account scope are intended to live in PostgreSQL in a later phase;
neither Firebase nor a database is connected here. Test fakes never enter the
runtime graph.

The bilingual login, activation, portal, admin, and access-denied routes accept
no credentials, submit no form, read no session, call no API, and display no
customer data. See
[ADR-007](docs/adr/ADR-007-identity-and-authorization-foundation.md),
[Identity and authorization v1](docs/architecture/IDENTITY-AUTHORIZATION-V1.md),
and the [role/capability matrix](docs/architecture/ROLE-CAPABILITY-MATRIX.md).

## Technology

| Tool              | Version |
| ----------------- | ------- |
| Node.js           | 24.18.1 |
| npm               | 11.16.0 |
| Next.js           | 16.2.12 |
| React / React DOM | 19.2.4  |
| TypeScript        | 5.9.3   |
| Tailwind CSS      | 4.3.3   |
| Vitest            | 4.1.10  |
| Playwright Test   | 1.62.1  |

Exact dependency versions are recorded in `package-lock.json`. Node.js and npm are pinned in the repository configuration.

## Local development

```sh
npm ci
npm run dev
```

The public shell requires no project-configured environment variables, runtime secrets, or
external services. Platform-supplied deployment metadata may be read when available.

## Architecture

The repository uses a modular Next.js App Router structure:

- `src/app` — routing, metadata, layouts, and application boundaries;
- `src/components/public` — reusable public-shell presentation components;
- `src/components/access` — non-functional access architecture-preview components;
- `src/i18n` — supported locales, typed dictionaries, and dictionary loading;
- `src/proxy.ts` — root-only redirect to the default locale;
- `src/modules/identity` — provider-agnostic identity and account contracts;
- `src/modules/authorization` — pure capability and policy contracts;
- `src/server` — server-only enforcement boundaries;
- `src/styles` — official tokens, shell primitives, sections, and responsive behavior;
- `tests/e2e` — reproducible end-to-end smoke tests;
- `docs/adr` and `docs/architecture` — architectural decisions and current state.

The structure remains intentionally limited to the public and access-preview
shells plus provider-agnostic identity and authorization contracts. Commercial
behavior, persistence, and provider integrations are introduced only after
their requirements and boundaries are approved.

## Quality gates

```sh
npm ci
npm run verify
npm run e2e:ci
npm audit --audit-level=high
```

`npm run verify` checks formatting, linting, TypeScript, unit tests, and the production build. Pull Requests are validated with read-only GitHub Actions permissions. CI consumes no repository secrets and performs no deployment.

## Data and credentials

This repository contains no production data, customer records, credentials, provider secrets, or production environment configuration. Future secrets must remain outside Git and isolated by environment.

## Repository boundaries

The production landing is developed and operated in a separate repository. It does not share Git history, deployment configuration, credentials, data, assets, or runtime dependencies with this platform repository.

Private brand source material is maintained outside this repository and is not tracked.

## Public visibility and licensing

This repository is publicly viewable for portfolio and technical transparency purposes. It is not open source, and no open-source license is granted.

See [NOTICE.md](NOTICE.md) for the rights notice and [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution policy.

## Security

Do not disclose vulnerabilities through public Issues, Discussions, or Pull Requests. Use GitHub Private Vulnerability Reporting as described in [SECURITY.md](SECURITY.md).
