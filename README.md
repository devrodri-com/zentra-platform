# ZENTRA Platform

ZENTRA Platform is the in-development foundation for ZENTRA's public site and future commerce, subscriptions, customer portal, and administration experiences.

The current branch contains the first bilingual public visual shell and its engineering controls. Catalog, authentication, checkout, subscriptions, persistence, customer-facing workflows, administration workflows, and external-provider integrations are not yet implemented.

## Project status

- `FOUNDATION_BASELINE=APPROVED_FOR_MAIN`
- `ZP_01A_PUB_R1=PASS`
- `ZP_01B_R1=PASS`
- `ZP_02A=IMPLEMENTATION_IN_PROGRESS`
- `ZP_02A_PUBLIC_COPY=PROVISIONAL_PUBLIC_COPY`
- `ZP_02A_PROTECTED_MANUAL_PREVIEW=PENDING`
- `ZP_02A_VISUAL_APPROVAL=PENDING`
- `REPOSITORY_VISIBILITY=PUBLIC`
- `ISOLATED_VERCEL_PROJECT=true`
- `VERCEL_GIT_INTEGRATION=false`
- `FOUNDATION_PROTECTED_MANUAL_PREVIEW=READY`
- `CUSTOM_DOMAIN_CONNECTED=false`
- `COMMERCIAL_PRODUCTION=false`

The isolated Vercel project retains the validated neutral foundation baseline and its protected manual Preview. The new ZP-02A Preview has not yet been created. The project has no Git integration, commercial domain, environment variables, or external providers. Commercial production is not connected, and the existing production landing remains a separate system.

This implementation-in-progress state does not imply visual approval, final editorial approval, commercial-production readiness, or a delivery date.

## Public shell v1

The PRE-preview shell provides:

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

The next gate is local validation, Pull Request CI, and one protected manual Preview with inherited Vercel Authentication and no Git integration. Visual approval remains pending. See [ADR-006](docs/adr/ADR-006-bilingual-public-shell.md) and [Public shell v1](docs/architecture/PUBLIC-SHELL-V1.md).

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
- `src/i18n` — supported locales, typed dictionaries, and dictionary loading;
- `src/proxy.ts` — root-only redirect to the default locale;
- `src/modules` — product modules introduced only after approval;
- `src/server` — server-only application and infrastructure code;
- `src/styles` — official tokens, shell primitives, sections, and responsive behavior;
- `tests/e2e` — reproducible end-to-end smoke tests;
- `docs/adr` and `docs/architecture` — architectural decisions and current state.

The structure remains intentionally limited to the public shell. Commercial behavior and provider integrations are introduced only after their requirements and boundaries are approved.

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
