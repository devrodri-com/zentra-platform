# ADR-004: Public source visibility through clean rebootstrap

- Status: Accepted
- Date: 2026-08-01
- Scope: ZP-01A-PUB-R1

```text
STATUS=ACCEPTED
VISIBILITY=PUBLIC
OPEN_SOURCE=false
LICENSE=NONE
CLIENT_APPROVAL=true
CLEAN_REBOOTSTRAP=true
PRIVATE_ARCHIVE_RETAINED=true
```

## Context

The platform foundation may be publicly visible for portfolio and technical transparency. Public visibility does not grant an open-source license or permission for commercial use.

The original bootstrap repository contained private commit metadata and local-path references. Adding a commit would not remove historical metadata, so the canonical public repository requires a new history created only from sanitized tracked content. The original repository remains a separate private archive.

## Decision

Publish a clean canonical `devrodri-com/zentra-platform` repository with two intentionally authored commits:

1. public repository documentation on `main`;
2. the sanitized platform foundation on `foundation/zp-01a`.

Do not copy the original `.git` directory, history, bundle, untracked files, build output, provider metadata, environment files, or private source material. Do not publish a `LICENSE` file, SPDX license, or other open-source license.

The foundation remains in a Draft Pull Request and is not merged by this decision.

## Risks

- Public forks and copies can persist even after a later visibility change.
- Public copies cannot be technically revoked.
- Public visibility increases review of source and history.
- Configuration mistakes can expose secrets or private metadata.
- A missing or unclear rights notice can cause licensing ambiguity.

## Controls

Publication requires:

- a newly created, allowlisted Git identity;
- a complete scan of reachable history and content;
- no private email, unapproved PII, local path, secret, private business data, production data, or brand source file;
- local validation and successful PR CI;
- official actions pinned to full commit SHAs with read-only permissions;
- secret scanning and push protection;
- dependency graph, Dependabot alerts, and security updates;
- Private Vulnerability Reporting;
- CodeQL default setup;
- protection of `main` through Pull Requests, required CI, resolved conversations, linear history, and force-push/deletion blocking;
- future secrets kept outside Git and isolated by environment.

## Consequences

- Source is viewable and can be forked through GitHub subject to GitHub's terms.
- No additional permission to reproduce, redistribute, sublicense, sell, deploy, or use the source commercially is granted.
- Any future open-source license requires separate authorization and a new architectural decision.
- The private bootstrap archive is retained and must never be made public.
