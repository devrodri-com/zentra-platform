import type { CustomerAccountId, OrderClaimId, OrderId, TokenDigest, UserId } from "./identifiers";
import {
  assertValidOrderClaimCreation,
  hasCoherentConsumedChallenge,
  hasValidChallengeExpiry,
  hasValidOrderClaimTransition,
} from "./order-claim-invariants";
import { hasSecurePrincipalProof, type OrderClaimPrincipalProof } from "./order-claim-proof";
import {
  assertNever,
  transitionFailure,
  transitionSuccess,
  type TransitionResult,
} from "./transition";

export const ORDER_CLAIM_STATUSES = [
  "REQUESTED",
  "CHALLENGE_ISSUED",
  "VERIFIED",
  "CLAIMED",
  "EXPIRED",
  "REVOKED",
  "FAILED",
] as const;

export type OrderClaimStatus = (typeof ORDER_CLAIM_STATUSES)[number];
export interface OrderAccountClaim {
  readonly id: OrderClaimId;
  readonly orderId: OrderId;
  readonly customerAccountId: CustomerAccountId;
  readonly status: OrderClaimStatus;
  readonly expiresAt: Date;
  readonly challengeTokenDigest: TokenDigest | null;
  readonly challengeExpiresAt: Date | null;
  readonly challengeConsumedAt: Date | null;
  readonly claimedByUserId: UserId | null;
  readonly claimedAt: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly version: number;
}

export type OrderClaim = OrderAccountClaim;
export interface CreateOrderAccountClaimInput {
  readonly id: OrderClaimId;
  readonly orderId: OrderId;
  readonly customerAccountId: CustomerAccountId;
  readonly expiresAt: Date;
  readonly createdAt: Date;
}

export type OrderClaimEvent =
  | {
      readonly type: "ISSUE_CHALLENGE";
      readonly at: Date;
      readonly tokenDigest: TokenDigest;
      readonly challengeExpiresAt: Date;
    }
  | { readonly type: "VERIFY_CHALLENGE"; readonly at: Date; readonly tokenDigestMatches: boolean }
  | {
      readonly type: "CLAIM";
      readonly at: Date;
      readonly userId: UserId;
      readonly targetCustomerAccountId: CustomerAccountId;
      readonly principalProof: OrderClaimPrincipalProof | null;
    }
  | { readonly type: "EXPIRE"; readonly at: Date }
  | { readonly type: "REVOKE"; readonly at: Date }
  | { readonly type: "FAIL"; readonly at: Date };

export type OrderClaimTransitionReason =
  | "CLAIM_EXPIRED"
  | "CLAIM_REVOKED"
  | "CLAIM_FAILED"
  | "CLAIM_ALREADY_COMPLETED"
  | "CLAIM_NOT_EXPIRED"
  | "CLAIM_TRANSITION_NOT_ALLOWED"
  | "CHALLENGE_EXPIRY_INVALID"
  | "CHALLENGE_DIGEST_MISMATCH"
  | "CHALLENGE_ALREADY_USED"
  | "SECURE_IDENTITY_REQUIRED"
  | "CANONICAL_ACCOUNT_MISMATCH"
  | "INVALID_CLAIM_CONTEXT";

export function createOrderAccountClaim(input: CreateOrderAccountClaimInput): OrderAccountClaim {
  assertValidOrderClaimCreation(input);

  return {
    ...input,
    status: "REQUESTED",
    challengeTokenDigest: null,
    challengeExpiresAt: null,
    challengeConsumedAt: null,
    claimedByUserId: null,
    claimedAt: null,
    updatedAt: input.createdAt,
    version: 1,
  };
}

function updateClaim(
  claim: OrderAccountClaim,
  status: OrderClaimStatus,
  at: Date,
  updates: Partial<OrderAccountClaim> = {},
): OrderAccountClaim {
  return { ...claim, ...updates, status, updatedAt: at, version: claim.version + 1 };
}

function terminalReason(status: "EXPIRED" | "REVOKED" | "FAILED"): OrderClaimTransitionReason {
  switch (status) {
    case "EXPIRED":
      return "CLAIM_EXPIRED";
    case "REVOKED":
      return "CLAIM_REVOKED";
    case "FAILED":
      return "CLAIM_FAILED";
    default:
      return assertNever(status);
  }
}

function claimIsExpired(claim: OrderAccountClaim, at: Date): boolean {
  return at.getTime() >= claim.expiresAt.getTime();
}

export function transitionOrderClaim(
  claim: OrderAccountClaim,
  event: OrderClaimEvent,
): TransitionResult<OrderAccountClaim, OrderClaimTransitionReason> {
  if (!hasValidOrderClaimTransition(claim, event.at)) {
    return transitionFailure(claim, "INVALID_CLAIM_CONTEXT");
  }

  if (claim.status === "CLAIMED") {
    if (event.type === "CLAIM" && !hasSecurePrincipalProof(event.principalProof)) {
      return transitionFailure(claim, "SECURE_IDENTITY_REQUIRED");
    }

    if (
      event.type === "CLAIM" &&
      hasCoherentConsumedChallenge(claim, event.at) &&
      claim.claimedAt !== null &&
      claim.claimedAt.getTime() <= event.at.getTime() &&
      event.userId === claim.claimedByUserId &&
      event.targetCustomerAccountId === claim.customerAccountId
    ) {
      return transitionSuccess(claim, false);
    }

    return transitionFailure(claim, "CLAIM_ALREADY_COMPLETED");
  }

  if (claim.status === "EXPIRED" || claim.status === "REVOKED" || claim.status === "FAILED") {
    return transitionFailure(claim, terminalReason(claim.status));
  }

  if (claimIsExpired(claim, event.at)) {
    const expired = updateClaim(claim, "EXPIRED", event.at);
    return event.type === "EXPIRE"
      ? transitionSuccess(expired, true)
      : transitionFailure(expired, "CLAIM_EXPIRED", true);
  }

  switch (event.type) {
    case "ISSUE_CHALLENGE": {
      if (claim.status !== "REQUESTED") {
        return transitionFailure(
          claim,
          claim.status === "VERIFIED" ? "CHALLENGE_ALREADY_USED" : "CLAIM_TRANSITION_NOT_ALLOWED",
        );
      }

      if (!hasValidChallengeExpiry(event, claim.expiresAt)) {
        return transitionFailure(claim, "CHALLENGE_EXPIRY_INVALID");
      }

      return transitionSuccess(
        updateClaim(claim, "CHALLENGE_ISSUED", event.at, {
          challengeTokenDigest: event.tokenDigest,
          challengeExpiresAt: event.challengeExpiresAt,
        }),
        true,
      );
    }
    case "VERIFY_CHALLENGE": {
      if (claim.status === "VERIFIED") {
        return transitionFailure(claim, "CHALLENGE_ALREADY_USED");
      }

      if (
        claim.status !== "CHALLENGE_ISSUED" ||
        claim.challengeTokenDigest === null ||
        claim.challengeExpiresAt === null
      ) {
        return transitionFailure(claim, "INVALID_CLAIM_CONTEXT");
      }

      if (event.at.getTime() >= claim.challengeExpiresAt.getTime()) {
        return transitionFailure(updateClaim(claim, "EXPIRED", event.at), "CLAIM_EXPIRED", true);
      }

      if (!event.tokenDigestMatches) {
        return transitionFailure(
          updateClaim(claim, "FAILED", event.at),
          "CHALLENGE_DIGEST_MISMATCH",
          true,
        );
      }

      return transitionSuccess(
        updateClaim(claim, "VERIFIED", event.at, { challengeConsumedAt: event.at }),
        true,
      );
    }
    case "CLAIM":
      if (claim.status !== "VERIFIED") {
        return transitionFailure(claim, "CLAIM_TRANSITION_NOT_ALLOWED");
      }
      if (
        !hasCoherentConsumedChallenge(claim, event.at) ||
        claim.claimedByUserId !== null ||
        claim.claimedAt !== null
      ) {
        return transitionFailure(claim, "INVALID_CLAIM_CONTEXT");
      }
      if (!hasSecurePrincipalProof(event.principalProof)) {
        return transitionFailure(claim, "SECURE_IDENTITY_REQUIRED");
      }
      if (event.targetCustomerAccountId !== claim.customerAccountId) {
        return transitionFailure(claim, "CANONICAL_ACCOUNT_MISMATCH");
      }
      return transitionSuccess(
        updateClaim(claim, "CLAIMED", event.at, {
          claimedByUserId: event.userId,
          claimedAt: event.at,
        }),
        true,
      );
    case "EXPIRE":
      return transitionFailure(claim, "CLAIM_NOT_EXPIRED");
    case "REVOKE":
      return transitionSuccess(updateClaim(claim, "REVOKED", event.at), true);
    case "FAIL":
      return transitionSuccess(updateClaim(claim, "FAILED", event.at), true);
    default:
      return assertNever(event);
  }
}
