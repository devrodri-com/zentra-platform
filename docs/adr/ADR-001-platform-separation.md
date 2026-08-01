# ADR-001: Platform and production-landing separation

- Status: Accepted
- Date: 2026-08-01
- Scope: ZP-01A

## Context

ZENTRA operates a production landing in an independent repository:

```text
CURRENT_PRODUCTION_REPOSITORY=devrodri-com/zentra-coming-soon
LOCAL_WORKSPACE_PATH=not part of repository canon
```

The platform has separate responsibilities: a public site, commerce, subscriptions, customer portal, and administration. Importing the landing's history or configuration would couple release cycles, infrastructure, credentials, and risks that must remain independent.

## Decision

Create `devrodri-com/zentra-platform` as a greenfield repository with independent, clean Git history. Repository visibility and licensing are governed by [ADR-004](ADR-004-public-source-visibility.md).

The platform:

- does not import history from the production landing;
- does not use the landing as a template;
- does not copy `.git`, refs, `.vercel`, environment files, package files, or configuration;
- does not copy code, assets, or fonts during ZP-01A;
- does not share deployment projects, domains, credentials, variables, or data;
- does not depend on the landing in build, runtime, development, or tests;
- does not modify the landing;
- uses `foundation/zp-01a` for foundation work and never pushes it directly to `main`.

Canonical brand material remains in a private external brand asset library. Its future integration requires a separately authorized phase.

## Consequences

### Positive

- Independent release and rollback cycles.
- Clear technical history and ownership.
- Reduced risk to the production landing.
- System-specific configuration and secrets.
- Auditable, deliberate migration boundaries.

### Costs

- Potentially useful assets and patterns require explicit reevaluation.
- Deliberate duplication of derived visual elements may occur.
- Cross-system coordination requires documented contracts rather than implicit access.

## Invariants

- The production landing must remain unchanged by platform work.
- No unrelated history may appear in `zentra-platform`.
- No mirror, broad refspec, template, bundle, or private `.git` directory may seed the canonical repository.
- The landing cannot be a submodule, package, or file dependency.
- The platform cannot reuse deployment projects or identifiers from the landing.
- Future content or asset migration must be selective, traceable, and authorized.

## Review criterion

Review this ADR only for an explicit integration proposal between the systems. A review does not authorize modifying the production landing or sharing infrastructure.
