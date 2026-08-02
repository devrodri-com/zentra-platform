# ADR-002: Reproducible toolchain and quality controls

- Status: Accepted
- Date: 2026-08-01
- Scope: ZP-01A

## Context

The platform requires a reproducible foundation before product behavior or external providers are introduced. The production landing uses an independent baseline and does not determine this repository's toolchain.

## Decision

Pin:

- Node.js 24.18.1;
- npm 11.16.0;
- Next.js 16.2.12;
- React and React DOM 19.2.4;
- TypeScript 5.9.3;
- Tailwind CSS 4.3.x;
- Vitest 4.1.x;
- Playwright Test through the lockfile.

Node.js and npm are declared through `engines`, `packageManager`, Volta, and `.node-version`. `package-lock.json` is authoritative for transitive versions.

### Transitive security overrides

The reproducible installation uses compatible, validated overrides for `postcss=8.5.25` and `sharp=0.35.3`. Any update must revalidate the audit, tests, and build.

## TypeScript policy

The project requires:

```text
strict=true
allowJs=false
noUncheckedIndexedAccess=true
exactOptionalPropertyTypes=true
noImplicitOverride=true
noFallthroughCasesInSwitch=true
```

Explicit `any`, `@ts-ignore`, and `@ts-nocheck` are prohibited.

`skipLibCheck=true` remains a controlled compatibility boundary for third-party declarations. It does not skip project typechecking and must be reevaluated when principal dependencies or relevant third-party types change.

## Validation order

`verify` runs:

1. formatting;
2. lint;
3. typecheck;
4. unit tests;
5. build.

Playwright smoke tests run separately through `e2e:ci`. Dependency auditing runs with a high-severity failure threshold.

## CI

GitHub Actions validates Pull Requests with:

- read-only repository permissions;
- no secrets;
- no deployment;
- a pinned Node.js and npm toolchain;
- official actions pinned to full commit SHAs;
- concurrency cancellation for superseded PR runs;
- an explicit job timeout.

Dependabot reviews npm and GitHub Actions dependencies weekly.

## CodeQL

CodeQL default setup is a required managed control for public visibility under [ADR-004](ADR-004-public-source-visibility.md). A manual CodeQL workflow is intentionally not added when GitHub default setup is available.

CodeQL enablement and initial-analysis state are remote repository configuration and must be verified during publication. It may be reported as enabled while the first managed analysis remains pending.

## Consequences

- Local development and CI use the same baseline.
- Installations are reproducible through `npm ci`.
- Upgrades require deliberate changes and lockfile review.
- GitHub-managed security controls complement, but do not replace, local validation.
