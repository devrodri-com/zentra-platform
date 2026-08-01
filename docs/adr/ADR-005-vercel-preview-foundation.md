# ADR-005: Isolated Vercel preview foundation

- Status: Accepted
- Date: 2026-08-01
- Scope: ZP-01B

```text
STATUS=ACCEPTED
VERCEL_PROJECT=zentra-platform
OWNERSHIP_DURING_DEVELOPMENT=EXISTING_RODRIGO_PRO_SCOPE
DEPLOYMENT_MODE=MANUAL_PREVIEW
GIT_INTEGRATION=false
PRODUCTION_DEPLOYMENT=false
CUSTOM_DOMAIN=false
EXTERNAL_PROVIDERS=false
TRANSFER_BEFORE_PRODUCTION=PLANNED
```

## Context

The platform foundation requires an isolated Preview deployment before a future merge can be considered. The production landing and its domain remain separate and cannot be reused as platform infrastructure.

The foundation is public, contains no product behavior, credentials, customer data, commercial data, or provider integrations, and already blocks search indexing. A Preview therefore validates the build and delivery boundary without authorizing production.

## Decision

Create a dedicated Vercel project for the platform foundation in the existing approved Pro scope during development. Link the canonical checkout locally and deploy the approved branch manually as a Preview.

The project must use:

- the Next.js framework preset;
- the repository root;
- `npm ci` as the install command;
- `npm run build` as the build command;
- Node.js 24.x;
- Vercel's default Next.js output configuration;
- Vercel Authentication with Standard Protection when available without an additional purchase.

The project must not use a Git repository connection, automatic deployments, a production deployment, a custom domain, environment variables, secrets, or external providers. Generated Preview URLs are allowed only for verification of this foundation.

## Operational controls

- A passing Pull Request check for the exact documented commit is required before project creation or deployment.
- The deployment command must omit every production target or promotion option.
- The deployment must finish in a non-production target and reach `READY` before it can satisfy the gate.
- The root page, assets, and `robots.txt` must pass HTTP checks, and the rendered page must remain `noindex` and `nofollow`.
- The production landing, its deployment, domains, environment-variable counts, Git connection, repository, and local checkout must remain unchanged.
- The Draft Pull Request remains open, unmerged, and the only Pull Request for this foundation branch.

## Ownership boundary

The existing approved Pro scope owns the isolated project only during development. Transfer to the final production owner is planned and required before any separately authorized production deployment. This decision does not authorize that transfer, production, a domain, or a provider.

## Consequences

- The foundation can be reviewed through an isolated, reproducible Preview.
- Pushes do not create deployments because no Git repository is connected.
- No production traffic or domain routing changes as part of ZP-01B.
- Any future authentication, portal, administration, commercial data, secrets, or provider work requires stronger Preview access controls and separate authorization.
