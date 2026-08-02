import type { TokenDigest } from "./identifiers";
import { assertIncreasingTimeline, isIncreasingTimeline, isValidTransitionTime } from "./time";

interface ClaimTimelineState {
  readonly createdAt: Date;
  readonly expiresAt: Date;
  readonly updatedAt: Date;
}

interface ChallengeIssueTime {
  readonly at: Date;
  readonly challengeExpiresAt: Date;
}

export interface ConsumedChallengeState {
  readonly challengeTokenDigest: TokenDigest | null;
  readonly challengeExpiresAt: Date | null;
  readonly challengeConsumedAt: Date | null;
  readonly expiresAt: Date;
}

export function assertValidOrderClaimCreation(
  claim: Pick<ClaimTimelineState, "createdAt" | "expiresAt">,
): void {
  assertIncreasingTimeline(
    claim.createdAt,
    claim.expiresAt,
    "claim expiry must be a valid instant later than creation",
  );
}

export function hasValidOrderClaimTransition(claim: ClaimTimelineState, at: Date): boolean {
  return (
    isIncreasingTimeline(claim.createdAt, claim.expiresAt) &&
    isValidTransitionTime(claim.updatedAt, claim.createdAt) &&
    isValidTransitionTime(at, claim.updatedAt)
  );
}

export function hasValidChallengeExpiry(event: ChallengeIssueTime, claimExpiresAt: Date): boolean {
  return (
    isIncreasingTimeline(event.at, event.challengeExpiresAt) &&
    event.challengeExpiresAt.getTime() <= claimExpiresAt.getTime()
  );
}

export function hasCoherentConsumedChallenge(
  claim: ConsumedChallengeState,
  observedAt: Date,
): boolean {
  return (
    claim.challengeTokenDigest !== null &&
    claim.challengeExpiresAt !== null &&
    claim.challengeConsumedAt !== null &&
    claim.challengeConsumedAt.getTime() < claim.challengeExpiresAt.getTime() &&
    claim.challengeConsumedAt.getTime() <= observedAt.getTime() &&
    claim.challengeExpiresAt.getTime() <= claim.expiresAt.getTime()
  );
}
