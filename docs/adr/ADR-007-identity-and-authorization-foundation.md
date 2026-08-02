# ADR-007: Identity and authorization foundation

- Status: Accepted
- Date: 2026-08-02
- Scope: ZP-03A

```text
STATUS=ACCEPTED
IDENTITY_PROVIDER_DIRECTION=FIREBASE_IDENTITY_PLATFORM
IDENTITY_PROVIDER_CONNECTED=false
AUTHORIZATION_SOURCE_DIRECTION=APPLICATION_POSTGRESQL
DATABASE_CONNECTED=false
IDENTITY_PROVIDER_DOES_NOT_AUTHORIZE=true
APPLICATION_DATABASE_IS_ROLE_SOURCE_OF_TRUTH=true
CLIENT_UI_IS_NOT_AUTHORITY=true
DENY_BY_DEFAULT=true
CROSS_ACCOUNT_ACCESS_DENIED_BY_DEFAULT=true
SERVER_SIDE_AUTHORIZATION=true
STAFF_MFA_REQUIRED=true
RAW_INVITATION_TOKENS_STORED=false
RAW_CLAIM_TOKENS_STORED=false
AUDIT_LOG_REQUIRED=true
FAKE_ADAPTERS_TEST_ONLY=true
```

## Context

ZP-03A needs a stable model for people, customer accounts, memberships,
identity links, staff duties, invitations, guest order claims, and auditable
authorization decisions before a real identity provider or application
database is selected and connected.

An identity provider may establish who authenticated and the assurance reached.
It must not become the source of commercial roles, customer-account membership,
permissions, or account scope. Provider claims and client-rendered state are
inputs at most; neither is authority.

## Decision

### Identity and account model

- A `User` is a physical person who may authenticate.
- A `CustomerAccount` is the business or individual commercial subject.
- `AccountMembership` models the many-to-many relation between users and
  customer accounts.
- An account can exist before an authenticated user exists.
- `IdentityLink` associates a provider key and provider subject with one
  application user without carrying roles, permissions, or account IDs.
- Opaque branded identifiers are parsed centrally; test helpers remain separate
  from runtime constructors.

The future application PostgreSQL database is the intended source of truth for
users, accounts, memberships, staff roles, and grants. No database is connected
in this phase.

### Authorization

Authorization is evaluated on the server through a provider-independent, pure
policy engine. It is deny-by-default and returns a typed reason code and safe
audit descriptor for every decision.

Customer capabilities require an active user, active membership, and exact
resource-account match. Staff capabilities require an active user, an assigned
staff role, and MFA assurance. Contradictory or incomplete context is denied.
Suspended or deactivated users and suspended or revoked memberships are always
denied.

The UI may explain or hide unavailable actions for usability, but it never
grants permission. A server-only guard is required before future sensitive
operations.

### Invitations and order claims

Invitations are expirable, single-use, supersedable state machines. Entities
retain only a `TokenDigest`; raw invitation tokens are never stored.

A guest order-claim request returns a uniform public response and does not
reveal whether an order exists. Email plus order number never grants access.
Future challenge delivery must use the order's canonical email. Successful
claiming requires secure activation or authentication, digest verification,
expiry and single-use checks, and an idempotent link to the canonical customer
account for that operation. Claim entities never retain raw tokens.

### Audit boundary

Authorization decisions produce safe audit descriptors. The future application
layer must translate invitation transitions and account-claim actions into
`AuditEvent` records through `AuditSink`. Audit metadata must exclude raw
tokens, passwords, session cookies, provider secrets, payment-card data, full
request bodies, and unnecessary personal information.

### Test adapters and UI shells

Fake readers, clocks, audit sinks, and digest verifiers are allowed only under
the test boundary. Runtime modules cannot import or re-export them.

The login, activation, portal, administration, and access-denied routes are
non-functional architecture previews. They remain Server Components, accept no
credentials, submit nothing, create no session, and read no live data. Every
route is bilingual and non-indexable.

## Consequences

- Firebase Identity Platform can be evaluated later without coupling business
  authorization to Firebase custom claims.
- PostgreSQL can be introduced later behind small ports without changing the
  domain model or policy semantics.
- Release 1 may start with one person per customer account while preserving a
  many-to-many model.
- Account isolation and staff MFA are testable before infrastructure exists.
- ZP-03A creates no provider, database, email delivery, credential flow,
  session, token implementation, live data, domain, or production behavior.

Provider integration belongs to a separately authorized ZP-03B. Database and
real application-data integration belong to a separately authorized ZP-03C.
