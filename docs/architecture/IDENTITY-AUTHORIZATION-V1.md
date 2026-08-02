# Identity and authorization v1

## Boundary

```text
PHASE=ZP-03A
PROVIDER_AGNOSTIC=true
IDENTITY_PROVIDER_CONNECTED=false
DATABASE_CONNECTED=false
REAL_AUTHENTICATION=false
REAL_SESSION=false
REAL_DATA=false
DENY_BY_DEFAULT=true
SERVER_SIDE_AUTHORIZATION_REQUIRED=true
```

This foundation defines contracts and pure policy only. It performs no network
or database I/O, reads no cookies, verifies no real provider token, hashes no
token, sends no email, and persists nothing.

## Domain model

| Entity              | Purpose                                   | Key invariants                                    |
| ------------------- | ----------------------------------------- | ------------------------------------------------- |
| `User`              | Physical person                           | Explicit lifecycle and optimistic version         |
| `CustomerAccount`   | Business or individual commercial subject | Exists independently from authentication          |
| `AccountMembership` | User-to-account many-to-many relationship | Role and lifecycle are application-owned          |
| `IdentityLink`      | Provider subject to application user link | Contains no role, capability, or account scope    |
| `AccountInvitation` | Expirable access invitation               | Digest-only, single-use, supersedable             |
| `OrderAccountClaim` | Safe guest-order association workflow     | Uniform disclosure, digest-only, idempotent claim |
| `AuditEvent`        | Safe record of decisions and actions      | Typed actor/outcome; restricted metadata          |

Opaque branded IDs prevent accidental substitution between users, accounts,
memberships, invitations, claims, orders, audit events, requests, and token
digests. Parsing is centralized and rejects blank values.

Audit metadata uses a conservative field allowlist with field-specific value
validation. Arbitrary descriptive strings and unknown keys are rejected so
secrets or personal information cannot be hidden behind a benign label.

## Ports

Small provider-agnostic ports separate responsibilities:

- `IdentitySessionReader` reads future authenticated identity context;
- `UserReader` resolves application users;
- `CustomerAccountReader` resolves commercial accounts;
- `MembershipReader` resolves account memberships;
- `StaffRoleReader` resolves application-owned staff roles;
- `InvitationRepository` reads and stores invitation state;
- `OrderClaimRepository` reads and stores claim state;
- `AuditSink` records safe audit events;
- `Clock` supplies deterministic time;
- `TokenDigestVerifier` compares presented material against a stored digest.

No port exposes Firebase custom claims as application roles. No adapter is
implemented outside tests.

## Authentication assurance

The policy engine recognizes `ANONYMOUS`, `EMAIL_VERIFIED`, `SINGLE_FACTOR`, and
`MFA`. Assurance is necessary but never sufficient: application user state,
membership or staff role, capability grant, and resource scope must also pass.

- Guests may only request the start of an order claim.
- Customer-account capabilities require an active user and active membership.
- Staff capabilities require an active user, staff role, and MFA.
- Provider subject alone grants nothing.
- Inactive users or memberships are denied.

## Authorization decisions

`evaluateAuthorization` is pure and returns:

- `allowed`;
- stable `reasonCode`;
- requested `capability`;
- optional account scope;
- a safe audit descriptor.

`requireCapability` is server-only and throws a typed `AuthorizationError` for
denied decisions. Future call sites must run it at the operation boundary; UI
state is not a substitute.

Stable reason codes are:

- `ALLOWED`;
- `UNAUTHENTICATED`;
- `INSUFFICIENT_ASSURANCE`;
- `USER_INACTIVE`;
- `MEMBERSHIP_REQUIRED`;
- `MEMBERSHIP_INACTIVE`;
- `ACCOUNT_MISMATCH`;
- `STAFF_ROLE_REQUIRED`;
- `CAPABILITY_NOT_GRANTED`;
- `INVALID_CONTEXT`.

Unknown capabilities cannot enter a typed request. Untrusted strings must be
parsed against the canonical capability list before policy evaluation.

## Account isolation

Every customer request carries the target account and resource account.
Authorization requires the two to match and requires an active membership for
that same account. Membership in one account never grants access to another,
even when the user has multiple valid memberships.

Staff access is capability-based and does not silently become a customer
membership. Technical staff receive no economic or customer-data capability.

## Invitation lifecycle

```text
PENDING -> ACCEPTED
PENDING -> EXPIRED
PENDING -> REVOKED
PENDING -> SUPERSEDED
```

Accepted, expired, revoked, and superseded invitations are terminal. A
superseding invitation invalidates the prior invitation. Transitions are pure,
exhaustive, expiry-aware, and retain only a token digest.

## Order-claim lifecycle

```text
REQUESTED -> CHALLENGE_ISSUED -> VERIFIED -> CLAIMED
REQUESTED|CHALLENGE_ISSUED|VERIFIED -> EXPIRED|REVOKED|FAILED
```

`CLAIMED` is terminal and repeated completion is idempotent. Challenge material
is single-use and expirable. A public request never returns order data or an
existence signal. Only the canonical customer account belonging to the order
may be linked.

## Architecture Preview routes

The `/en` and `/es` login, activation, portal, admin, and access-denied routes
are non-functional visual shells. They contain no provider SDK, route handler,
Server Action, fetch, cookies, browser storage, live form, or plausible customer
record. Their metadata is `noindex`, `nofollow`, and `nocache`.

## Future transitions

ZP-03B may implement a real identity-provider adapter and assurance mapping
only after separate authorization. ZP-03C may implement PostgreSQL-backed
repositories and migrations only after separate authorization. Both phases
must preserve the contracts, account isolation, server-side enforcement,
digest-only token storage, and audit restrictions defined here.

## Review closure

The architecture review approved the deny-by-default policy, cross-account
isolation, provider-independent role authority, and the contractual staff MFA
requirement. Test fakes remain outside runtime. The guest claim retains a
uniform response, digest-only state, and idempotent completion. The bilingual
shells represent neither live authentication nor live data. Firebase identity
and PostgreSQL integration remain pending and are not authorized by this
approval.
