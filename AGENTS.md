# AGENTS.md

## Repository scope

This repository contains the in-development ZENTRA platform foundation. Its source is publicly viewable for portfolio and technical transparency, but it is not open source and grants no open-source license.

ZP-01A establishes engineering foundations only. It does not authorize production deployment, commercial rules, providers, customer data, or production credentials.

## Non-negotiable boundaries

- Work through an isolated branch and Pull Request.
- Keep the foundation Pull Request as Draft until a later phase explicitly authorizes otherwise.
- Do not push directly to `main`.
- Do not merge without explicit authorization, passing checks, review, and an approved isolated preview.
- Do not deploy or modify production.
- Do not connect Vercel, domains, or external providers without explicit authorization.
- Do not add secrets, production data, customer data, or private business material.
- Do not track `.env*`, `.vercel`, generated build output, reports, or dependencies.
- Do not copy Git history, configuration, code, assets, fonts, credentials, or data from the production landing repository.
- Do not copy private brand source material into this repository.
- Do not implement commercial rules, authentication, catalog, checkout, subscriptions, customer portal, or administration features until their phase is authorized.

## External boundaries

```text
CURRENT_PRODUCTION_REPOSITORY=devrodri-com/zentra-coming-soon
BRAND_ASSET_SOURCE=private external brand asset library; not tracked
LOCAL_WORKSPACE_PATH=not part of repository canon
```

The production landing is a separate system. It is not a template, dependency, submodule, runtime source, or configuration source for this repository.

## TypeScript

- Keep `strict=true`.
- Keep `allowJs=false`.
- Keep `noUncheckedIndexedAccess=true`.
- Keep `exactOptionalPropertyTypes=true`.
- Keep `noImplicitOverride=true`.
- Keep `noFallthroughCasesInSwitch=true`.
- Do not use explicit `any`.
- Do not use `@ts-ignore` or `@ts-nocheck`.
- Do not weaken types to suppress a defect.
- `skipLibCheck=true` is governed by `docs/adr/ADR-002-toolchain.md`.

## Design and modularity

- Keep application, components, product modules, server code, styles, and tests separated.
- Do not create speculative empty product modules or provider integrations.
- Keep server-only dependencies out of client components.
- Avoid unrelated refactors and preventive abstractions.
- Introduce state management, SDKs, CMSs, UI kits, or infrastructure only after approval.

## Security

- User-interface state is never an authorization boundary.
- Future sensitive operations must enforce authorization on the server for every operation.
- Future secrets must remain server-side and outside Git.
- `NEXT_PUBLIC_*` may contain only explicitly public values.
- Do not use production accounts, data, or resources in development, tests, or previews.
- Report vulnerabilities through GitHub Private Vulnerability Reporting, never a public Issue.

## Quality

- Tests must be deterministic, isolated, and independent of live services.
- Update tests when observable behavior changes.
- Before delivery, run:
  - `npm ci`
  - `npm run verify`
  - `npm run e2e:ci`
  - `npm audit --audit-level=high`
- Keep `verify` ordered as formatting, lint, typecheck, unit tests, and build.
- Run `git diff --check` and inspect the staged diff before every commit.

## Documentation

- Record durable architectural decisions in `docs/adr/`.
- Keep `docs/architecture/STATUS.md` aligned with actual state.
- Keep private commercial planning outside this public repository.
- Reference private brand sources only through neutral boundaries; do not publish source filenames or local paths.
- Public visibility does not grant permission to reproduce, redistribute, sublicense, sell, deploy, or use this source commercially.
