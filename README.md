# ZENTRA Platform

ZENTRA Platform is the in-development technical foundation for ZENTRA's public site, commerce, subscriptions, customer portal, and administration experiences.

The current repository contains the platform scaffold and its engineering controls. Catalog, authentication, checkout, subscriptions, persistence, customer-facing workflows, administration workflows, and external-provider integrations are not yet implemented.

## Project status

- `FOUNDATION_BASELINE=APPROVED_FOR_MAIN`
- `ZP_01A_PUB_R1=PASS`
- `ZP_01B_R1=PASS`
- `REPOSITORY_VISIBILITY=PUBLIC`
- `ISOLATED_VERCEL_PROJECT=true`
- `VERCEL_GIT_INTEGRATION=false`
- `PROTECTED_MANUAL_PREVIEW=READY`
- `CUSTOM_DOMAIN_CONNECTED=false`
- `COMMERCIAL_PRODUCTION=false`

The Vercel project is isolated and contains only a neutral technical foundation and a protected manual Preview. It has no Git integration, commercial domain, environment variables, or external providers. Commercial production is not connected, and the existing production landing remains a separate system.

This approved foundation baseline does not imply commercial-production readiness or a delivery date.

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

The foundation requires no environment variables or external services.

## Architecture

The repository uses a modular Next.js App Router structure:

- `src/app` — routing, metadata, layouts, and application boundaries;
- `src/components` — reusable presentation components;
- `src/modules` — product modules introduced only after approval;
- `src/server` — server-only application and infrastructure code;
- `src/styles` — shared styling concerns;
- `tests/e2e` — reproducible end-to-end smoke tests;
- `docs/adr` and `docs/architecture` — architectural decisions and current state.

The structure is intentionally minimal. Commercial behavior and provider integrations are introduced only after their requirements and boundaries are approved.

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
