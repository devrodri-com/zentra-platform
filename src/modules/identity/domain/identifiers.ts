declare const userIdBrand: unique symbol;
declare const customerAccountIdBrand: unique symbol;
declare const membershipIdBrand: unique symbol;
declare const identityLinkIdBrand: unique symbol;
declare const invitationIdBrand: unique symbol;
declare const orderClaimIdBrand: unique symbol;
declare const orderIdBrand: unique symbol;
declare const auditEventIdBrand: unique symbol;
declare const requestIdBrand: unique symbol;
declare const tokenDigestBrand: unique symbol;

export type UserId = string & { readonly [userIdBrand]: "UserId" };
export type CustomerAccountId = string & {
  readonly [customerAccountIdBrand]: "CustomerAccountId";
};
export type MembershipId = string & { readonly [membershipIdBrand]: "MembershipId" };
export type IdentityLinkId = string & { readonly [identityLinkIdBrand]: "IdentityLinkId" };
export type InvitationId = string & { readonly [invitationIdBrand]: "InvitationId" };
export type OrderClaimId = string & { readonly [orderClaimIdBrand]: "OrderClaimId" };
export type OrderId = string & { readonly [orderIdBrand]: "OrderId" };
export type AuditEventId = string & { readonly [auditEventIdBrand]: "AuditEventId" };
export type RequestId = string & { readonly [requestIdBrand]: "RequestId" };
export type TokenDigest = string & { readonly [tokenDigestBrand]: "TokenDigest" };

const identifierBodyPattern = /^[a-z0-9][a-z0-9_-]{5,127}$/;
const digestBodyPattern = /^[A-Za-z0-9_-]{16,128}$/;

function parseIdentifier(value: string, prefix: string, label: string): string {
  const expectedPrefix = `${prefix}_`;
  const body = value.startsWith(expectedPrefix) ? value.slice(expectedPrefix.length) : "";

  if (!identifierBodyPattern.test(body)) {
    throw new TypeError(`${label} must be an opaque ${expectedPrefix} identifier`);
  }

  return value;
}

export function parseUserId(value: string): UserId {
  return parseIdentifier(value, "usr", "UserId") as UserId;
}

export function parseCustomerAccountId(value: string): CustomerAccountId {
  return parseIdentifier(value, "acct", "CustomerAccountId") as CustomerAccountId;
}

export function parseMembershipId(value: string): MembershipId {
  return parseIdentifier(value, "mem", "MembershipId") as MembershipId;
}

export function parseIdentityLinkId(value: string): IdentityLinkId {
  return parseIdentifier(value, "idlink", "IdentityLinkId") as IdentityLinkId;
}

export function parseInvitationId(value: string): InvitationId {
  return parseIdentifier(value, "invite", "InvitationId") as InvitationId;
}

export function parseOrderClaimId(value: string): OrderClaimId {
  return parseIdentifier(value, "claim", "OrderClaimId") as OrderClaimId;
}

export function parseOrderId(value: string): OrderId {
  return parseIdentifier(value, "order", "OrderId") as OrderId;
}

export function parseAuditEventId(value: string): AuditEventId {
  return parseIdentifier(value, "audit", "AuditEventId") as AuditEventId;
}

export function parseRequestId(value: string): RequestId {
  return parseIdentifier(value, "request", "RequestId") as RequestId;
}

export function parseTokenDigest(value: string): TokenDigest {
  const prefix = "digest_";
  const body = value.startsWith(prefix) ? value.slice(prefix.length) : "";

  if (!digestBodyPattern.test(body)) {
    throw new TypeError("TokenDigest must be a digest_ value, never a raw token");
  }

  return value as TokenDigest;
}
