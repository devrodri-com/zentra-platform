import { describe, expect, it } from "vitest";

import { createTestIdentityIds } from "../testing/identifiers";
import {
  createOrderAccountClaim,
  transitionOrderClaim,
  type OrderAccountClaim,
} from "./order-claim";

const ids = createTestIdentityIds("order-claim-001");
const otherIds = createTestIdentityIds("order-claim-002");
const createdAt = new Date("2026-08-02T10:00:00.000Z");
const challengeIssuedAt = new Date("2026-08-02T10:05:00.000Z");
const challengeExpiresAt = new Date("2026-08-02T10:30:00.000Z");
const verifiedAt = new Date("2026-08-02T10:10:00.000Z");
const claimExpiresAt = new Date("2026-08-02T11:00:00.000Z");

function requestedClaim(): OrderAccountClaim {
  return createOrderAccountClaim({
    id: ids.orderClaimId,
    orderId: ids.orderId,
    customerAccountId: ids.customerAccountId,
    createdAt,
    expiresAt: claimExpiresAt,
  });
}

function issuedClaim(): OrderAccountClaim {
  const result = transitionOrderClaim(requestedClaim(), {
    type: "ISSUE_CHALLENGE",
    at: challengeIssuedAt,
    tokenDigest: ids.tokenDigest,
    challengeExpiresAt,
  });

  if (!result.ok) throw new Error("expected challenge issue");
  return result.value;
}

function verifiedClaim(): OrderAccountClaim {
  const result = transitionOrderClaim(issuedClaim(), {
    type: "VERIFY_CHALLENGE",
    at: verifiedAt,
    tokenDigestMatches: true,
  });

  if (!result.ok) throw new Error("expected challenge verification");
  return result.value;
}

describe("order account claim lifecycle", () => {
  it("keeps a public request non-authoritative and reveals no public lookup inputs", () => {
    const claim = requestedClaim();

    expect(claim).toMatchObject({ status: "REQUESTED", claimedByUserId: null, claimedAt: null });
    expect(claim).not.toHaveProperty("email");
    expect(claim).not.toHaveProperty("orderNumber");
    expect(claim).not.toHaveProperty("accessGranted");
  });

  it("stores only the challenge digest and consumes it once", () => {
    const verified = verifiedClaim();

    expect(verified).toMatchObject({
      status: "VERIFIED",
      challengeTokenDigest: ids.tokenDigest,
      challengeConsumedAt: verifiedAt,
    });
    expect(verified).not.toHaveProperty("token");
    expect(verified).not.toHaveProperty("rawToken");
    expect(
      transitionOrderClaim(verified, {
        type: "VERIFY_CHALLENGE",
        at: verifiedAt,
        tokenDigestMatches: true,
      }),
    ).toMatchObject({ ok: false, reason: "CHALLENGE_ALREADY_USED" });
  });

  it("requires a secure principal and the canonical account", () => {
    const verified = verifiedClaim();

    expect(
      transitionOrderClaim(verified, {
        type: "CLAIM",
        at: verifiedAt,
        userId: ids.userId,
        targetCustomerAccountId: ids.customerAccountId,
        principalProof: null,
      }),
    ).toMatchObject({ ok: false, reason: "SECURE_IDENTITY_REQUIRED" });

    expect(
      transitionOrderClaim(verified, {
        type: "CLAIM",
        at: verifiedAt,
        userId: ids.userId,
        targetCustomerAccountId: otherIds.customerAccountId,
        principalProof: "AUTHENTICATED_IDENTITY",
      }),
    ).toMatchObject({ ok: false, reason: "CANONICAL_ACCOUNT_MISMATCH" });
  });

  it("claims idempotently for the same user and canonical account", () => {
    const verified = verifiedClaim();
    const event = {
      type: "CLAIM",
      at: verifiedAt,
      userId: ids.userId,
      targetCustomerAccountId: ids.customerAccountId,
      principalProof: "SECURE_ACTIVATION",
    } as const;
    const claimed = transitionOrderClaim(verified, event);

    expect(claimed).toMatchObject({
      ok: true,
      changed: true,
      value: { status: "CLAIMED", claimedByUserId: ids.userId },
    });
    if (!claimed.ok) throw new Error("expected order claim");

    expect(transitionOrderClaim(claimed.value, event)).toMatchObject({
      ok: true,
      changed: false,
      value: { version: claimed.value.version },
    });
    expect(transitionOrderClaim(claimed.value, { ...event, principalProof: null })).toMatchObject({
      ok: false,
      reason: "SECURE_IDENTITY_REQUIRED",
    });
  });

  it("rejects a structurally inconsistent verified claim", () => {
    const malformed = { ...verifiedClaim(), challengeConsumedAt: null };

    expect(
      transitionOrderClaim(malformed, {
        type: "CLAIM",
        at: verifiedAt,
        userId: ids.userId,
        targetCustomerAccountId: ids.customerAccountId,
        principalProof: "AUTHENTICATED_IDENTITY",
      }),
    ).toMatchObject({ ok: false, reason: "INVALID_CLAIM_CONTEXT" });
  });

  it("fails closed on a mismatched digest", () => {
    const failed = transitionOrderClaim(issuedClaim(), {
      type: "VERIFY_CHALLENGE",
      at: verifiedAt,
      tokenDigestMatches: false,
    });

    expect(failed).toMatchObject({
      ok: false,
      changed: true,
      reason: "CHALLENGE_DIGEST_MISMATCH",
      value: { status: "FAILED" },
    });
    if (failed.ok) throw new Error("expected failed claim");
    expect(transitionOrderClaim(failed.value, { type: "REVOKE", at: verifiedAt })).toMatchObject({
      ok: false,
      reason: "CLAIM_FAILED",
    });
  });

  it("denies expired and revoked claims", () => {
    const expired = transitionOrderClaim(issuedClaim(), {
      type: "VERIFY_CHALLENGE",
      at: challengeExpiresAt,
      tokenDigestMatches: true,
    });
    expect(expired).toMatchObject({ ok: false, reason: "CLAIM_EXPIRED" });

    const revoked = transitionOrderClaim(requestedClaim(), {
      type: "REVOKE",
      at: challengeIssuedAt,
    });
    if (!revoked.ok) throw new Error("expected revoked claim");
    expect(
      transitionOrderClaim(revoked.value, {
        type: "ISSUE_CHALLENGE",
        at: challengeIssuedAt,
        tokenDigest: ids.tokenDigest,
        challengeExpiresAt,
      }),
    ).toMatchObject({ ok: false, reason: "CLAIM_REVOKED" });
  });

  it("fails closed for invalid timestamps", () => {
    expect(() =>
      createOrderAccountClaim({
        id: ids.orderClaimId,
        orderId: ids.orderId,
        customerAccountId: ids.customerAccountId,
        createdAt,
        expiresAt: new Date(Number.NaN),
      }),
    ).toThrow(TypeError);
    expect(
      transitionOrderClaim(requestedClaim(), {
        type: "ISSUE_CHALLENGE",
        at: challengeIssuedAt,
        tokenDigest: ids.tokenDigest,
        challengeExpiresAt: new Date(Number.NaN),
      }),
    ).toMatchObject({ ok: false, reason: "CHALLENGE_EXPIRY_INVALID" });
    expect(
      transitionOrderClaim(requestedClaim(), {
        type: "REVOKE",
        at: new Date(Number.NaN),
      }),
    ).toMatchObject({ ok: false, reason: "INVALID_CLAIM_CONTEXT" });
    expect(
      transitionOrderClaim(requestedClaim(), {
        type: "REVOKE",
        at: new Date("2026-08-02T09:59:59.000Z"),
      }),
    ).toMatchObject({ ok: false, reason: "INVALID_CLAIM_CONTEXT" });
  });
});
