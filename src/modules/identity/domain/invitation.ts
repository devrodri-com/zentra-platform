import type { CustomerAccountId, InvitationId, TokenDigest } from "./identifiers";
import {
  assertNever,
  transitionFailure,
  transitionSuccess,
  type TransitionResult,
} from "./transition";
import { assertIncreasingTimeline, isIncreasingTimeline, isValidTransitionTime } from "./time";

export const INVITATION_PURPOSES = [
  "CUSTOMER_ACCOUNT_ACCESS",
  "STAFF_ACCESS",
  "ORDER_CLAIM_ACTIVATION",
] as const;

export const INVITATION_STATUSES = [
  "PENDING",
  "ACCEPTED",
  "EXPIRED",
  "REVOKED",
  "SUPERSEDED",
] as const;

export type InvitationPurpose = (typeof INVITATION_PURPOSES)[number];
export type InvitationStatus = (typeof INVITATION_STATUSES)[number];

export interface AccountInvitation {
  readonly id: InvitationId;
  readonly purpose: InvitationPurpose;
  readonly customerAccountId: CustomerAccountId | null;
  readonly tokenDigest: TokenDigest;
  readonly status: InvitationStatus;
  readonly expiresAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly version: number;
}

export type Invitation = AccountInvitation;

export interface CreateAccountInvitationInput {
  readonly id: InvitationId;
  readonly purpose: InvitationPurpose;
  readonly customerAccountId: CustomerAccountId | null;
  readonly tokenDigest: TokenDigest;
  readonly expiresAt: Date;
  readonly createdAt: Date;
}

export type InvitationEvent =
  | { readonly type: "ACCEPT"; readonly at: Date; readonly tokenDigestMatches: boolean }
  | { readonly type: "EXPIRE"; readonly at: Date }
  | { readonly type: "REVOKE"; readonly at: Date }
  | { readonly type: "SUPERSEDE"; readonly at: Date };

export type InvitationTransitionReason =
  | "INVITATION_ALREADY_ACCEPTED"
  | "INVITATION_EXPIRED"
  | "INVITATION_REVOKED"
  | "INVITATION_SUPERSEDED"
  | "INVITATION_NOT_EXPIRED"
  | "INVALID_INVITATION_CONTEXT"
  | "TOKEN_DIGEST_MISMATCH";

export function createAccountInvitation(input: CreateAccountInvitationInput): AccountInvitation {
  assertIncreasingTimeline(
    input.createdAt,
    input.expiresAt,
    "invitation expiry must be a valid instant later than creation",
  );

  if (input.purpose === "CUSTOMER_ACCOUNT_ACCESS" && input.customerAccountId === null) {
    throw new TypeError("customer account invitations require a customerAccountId");
  }

  return {
    ...input,
    status: "PENDING",
    updatedAt: input.createdAt,
    version: 1,
  };
}

function withStatus(
  invitation: AccountInvitation,
  status: InvitationStatus,
  at: Date,
): AccountInvitation {
  return {
    ...invitation,
    status,
    updatedAt: at,
    version: invitation.version + 1,
  };
}

function terminalReason(status: Exclude<InvitationStatus, "PENDING">): InvitationTransitionReason {
  switch (status) {
    case "ACCEPTED":
      return "INVITATION_ALREADY_ACCEPTED";
    case "EXPIRED":
      return "INVITATION_EXPIRED";
    case "REVOKED":
      return "INVITATION_REVOKED";
    case "SUPERSEDED":
      return "INVITATION_SUPERSEDED";
    default:
      return assertNever(status);
  }
}

export function transitionInvitation(
  invitation: AccountInvitation,
  event: InvitationEvent,
): TransitionResult<AccountInvitation, InvitationTransitionReason> {
  if (
    !isIncreasingTimeline(invitation.createdAt, invitation.expiresAt) ||
    !isValidTransitionTime(invitation.updatedAt, invitation.createdAt) ||
    !isValidTransitionTime(event.at, invitation.updatedAt)
  ) {
    return transitionFailure(invitation, "INVALID_INVITATION_CONTEXT");
  }

  if (invitation.status !== "PENDING") {
    return transitionFailure(invitation, terminalReason(invitation.status));
  }

  switch (event.type) {
    case "ACCEPT": {
      if (event.at.getTime() >= invitation.expiresAt.getTime()) {
        return transitionFailure(
          withStatus(invitation, "EXPIRED", event.at),
          "INVITATION_EXPIRED",
          true,
        );
      }

      if (!event.tokenDigestMatches) {
        return transitionFailure(invitation, "TOKEN_DIGEST_MISMATCH");
      }

      return transitionSuccess(withStatus(invitation, "ACCEPTED", event.at), true);
    }
    case "EXPIRE":
      return event.at.getTime() >= invitation.expiresAt.getTime()
        ? transitionSuccess(withStatus(invitation, "EXPIRED", event.at), true)
        : transitionFailure(invitation, "INVITATION_NOT_EXPIRED");
    case "REVOKE":
      return transitionSuccess(withStatus(invitation, "REVOKED", event.at), true);
    case "SUPERSEDE":
      return transitionSuccess(withStatus(invitation, "SUPERSEDED", event.at), true);
    default:
      return assertNever(event);
  }
}
