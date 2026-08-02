# ADR-005: Controlled Vercel bootstrap and isolated Preview

- Status: Accepted
- Date: 2026-08-01
- Scope: ZP-01B-R1

```text
STATUS=ACCEPTED
VERCEL_PROJECT=zentra-platform
FIRST_DEPLOYMENT_RULE=ALWAYS_PRODUCTION
CONTROLLED_BOOTSTRAP_PRODUCTION=AUTHORIZED
COMMERCIAL_PRODUCTION=false
CUSTOM_DOMAIN=false
GENERATED_VERCEL_DOMAIN_ONLY=true
ROBOTS_NOINDEX=true
SECOND_DEPLOYMENT_TARGET=preview
API_PREVIEW_TARGET_REPRESENTATION=null_or_preview
GIT_INTEGRATION=false
EXTERNAL_PROVIDERS=false
TRANSFER_BEFORE_COMMERCIAL_PRODUCTION=PLANNED
```

## Validated result

```text
VALIDATION_STATUS=PASS
CONTROLLED_TECHNICAL_BOOTSTRAP=READY
MANUAL_PREVIEW=READY
PREVIEW_TARGET_API_REPRESENTATION=null
PREVIEW_PROTECTION=VERCEL_AUTHENTICATION
PREVIEW_VISUAL_ACCEPTANCE=PASS
CUSTOM_DOMAINS=0
ENVIRONMENT_VARIABLES=0
GIT_INTEGRATION=false
LIVE_ZENTRA_PRODUCTION_TOUCHED=false
```

The validated technical bootstrap remains an isolated Vercel baseline. It is not and must not be converted, described, or reused as commercial production.

## Context

The platform foundation requires an isolated Preview deployment before a future merge can be considered. The production landing and its domains remain separate and cannot be reused as platform infrastructure.

ZP-01B assumed that an initial manual deployment without a production flag would be a Preview. Vercel instead classified the first deployment of the new project as Production. The stop gate fired correctly, the deployment was removed, and the project returned to zero deployments without a Git connection, custom domain, environment variable, secret, or provider.

ZP-01B-R1 subsequently authorizes the technical Production bootstrap required by this project behavior, followed by one explicit Preview deployment. This authorization is limited to the neutral, public, non-indexable foundation.

## Decision

Keep the dedicated Vercel project in the existing approved Pro scope during development. After the exact documentation commit passes Pull Request CI:

1. create one explicit Production deployment as a controlled technical bootstrap;
2. verify its target, neutral content, `noindex`, aliases, and isolation;
3. keep the valid bootstrap without assigning a custom domain;
4. create one distinct deployment with the explicit `preview` target and a forced build;
5. accept the Deployment API's `null` target as its canonical Preview representation, or an explicit equivalent Preview value.

No third deployment is permitted by this decision.

Both deployments must use:

- the existing Next.js framework preset;
- the repository root;
- `npm ci` as the install command;
- `npm run build` as the build command;
- Node.js 24.x;
- Vercel's default Next.js output configuration;
- the exact approved foundation commit;
- neutral foundation content with robots metadata set to `noindex` and `nofollow`;
- a `robots.txt` policy that disallows crawling.

The project must not use a Git repository connection, automatic deployments, a custom domain, environment variables, secrets, external providers, promotion, or production-domain cutover. Only Vercel-generated `*.vercel.app` deployment and project domains are allowed.

## Technical target versus commercial production

The controlled Production target is a Vercel project bootstrap, not a commercial launch, release, domain cutover, or declaration of production readiness. It contains the same neutral foundation as the Preview and exposes no product, authentication, portal, administration, checkout, pricing, customer data, or commercial data.

The generated Vercel domain has a low controlled risk because the content is public, neutral, contains no data or credentials, and blocks indexing. This baseline must never be represented or reused as a ZENTRA commercial launch.

## Operational controls

- A passing Pull Request check for the exact documented commit is required before either deployment.
- The bootstrap must be explicitly targeted to Production and must reach `READY` before the Preview is attempted.
- The second deployment must be explicitly targeted to Preview, remain distinct from the bootstrap, and must not receive the project Production alias.
- The root page, primary assets, and `robots.txt` must pass authorized HTTP checks, and the rendered page must remain `noindex` and `nofollow`.
- Vercel Authentication with Standard Protection must remain inherited for generated deployment URLs.
- The final isolated-project state must contain exactly one Production bootstrap and one Preview deployment.
- A target, alias, content, or isolation failure triggers the phase-specific removal and stop procedure; it never authorizes a promotion or third deployment.
- The production landing, its deployment, domains, environment-variable counts, Git connection, repository, and local checkout must remain unchanged.
- The Draft Pull Request remains open, unmerged, and the only Pull Request for this foundation branch.

## Ownership boundary

The existing approved Pro scope owns the isolated project only during development. Transfer to the final commercial-production owner is planned and required before any separately authorized commercial deployment. This decision does not authorize that transfer, a custom domain, a provider, a cutover, or commercial production.

## Consequences

- The foundation can be reviewed through an isolated, reproducible Preview after Vercel's technical bootstrap requirement is satisfied.
- Pushes do not create deployments because no Git repository is connected.
- The isolated project has a technical Production target without becoming the live ZENTRA production system.
- No production-landing traffic or custom-domain routing changes as part of ZP-01B-R1.
- Any future authentication, portal, administration, commercial data, secrets, or provider work requires stronger Preview access controls and separate authorization.
