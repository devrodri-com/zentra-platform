import {
  parseAuditEventId,
  parseCustomerAccountId,
  parseIdentityLinkId,
  parseInvitationId,
  parseMembershipId,
  parseOrderClaimId,
  parseOrderId,
  parseRequestId,
  parseTokenDigest,
  parseUserId,
} from "../domain/identifiers";

export function createTestIdentityIds(seed: string) {
  const safeSeed = seed
    .toLowerCase()
    .replaceAll(/[^a-z0-9_-]/g, "-")
    .padEnd(6, "x");

  return {
    userId: parseUserId(`usr_${safeSeed}`),
    customerAccountId: parseCustomerAccountId(`acct_${safeSeed}`),
    membershipId: parseMembershipId(`mem_${safeSeed}`),
    identityLinkId: parseIdentityLinkId(`idlink_${safeSeed}`),
    invitationId: parseInvitationId(`invite_${safeSeed}`),
    orderClaimId: parseOrderClaimId(`claim_${safeSeed}`),
    orderId: parseOrderId(`order_${safeSeed}`),
    auditEventId: parseAuditEventId(`audit_${safeSeed}`),
    requestId: parseRequestId(`request_${safeSeed}`),
    tokenDigest: parseTokenDigest(`digest_${safeSeed.padEnd(16, "x")}`),
  } as const;
}
