import type { CustomerAccountId, MembershipId, UserId } from "./identifiers";
import type { CustomerAccountRole } from "./roles";
import { transitionFailure, transitionSuccess, type TransitionResult } from "./transition";

export const MEMBERSHIP_STATUSES = ["PENDING", "ACTIVE", "SUSPENDED", "REVOKED"] as const;

export type MembershipStatus = (typeof MEMBERSHIP_STATUSES)[number];

export interface AccountMembership {
  readonly id: MembershipId;
  readonly userId: UserId;
  readonly customerAccountId: CustomerAccountId;
  readonly role: CustomerAccountRole;
  readonly status: MembershipStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly version: number;
}

export type Membership = AccountMembership;

export interface CreateAccountMembershipInput {
  readonly id: MembershipId;
  readonly userId: UserId;
  readonly customerAccountId: CustomerAccountId;
  readonly role: CustomerAccountRole;
  readonly createdAt: Date;
  readonly status?: MembershipStatus;
}

export type MembershipTransitionReason = "MEMBERSHIP_TRANSITION_NOT_ALLOWED";

const allowedTransitions: Readonly<Record<MembershipStatus, readonly MembershipStatus[]>> = {
  PENDING: ["ACTIVE", "REVOKED"],
  ACTIVE: ["SUSPENDED", "REVOKED"],
  SUSPENDED: ["ACTIVE", "REVOKED"],
  REVOKED: [],
};

export function createAccountMembership(input: CreateAccountMembershipInput): AccountMembership {
  return {
    id: input.id,
    userId: input.userId,
    customerAccountId: input.customerAccountId,
    role: input.role,
    status: input.status ?? "PENDING",
    createdAt: input.createdAt,
    updatedAt: input.createdAt,
    version: 1,
  };
}

export function transitionMembershipStatus(
  membership: AccountMembership,
  targetStatus: MembershipStatus,
  at: Date,
): TransitionResult<AccountMembership, MembershipTransitionReason> {
  if (targetStatus === membership.status) {
    return transitionSuccess(membership, false);
  }

  if (!allowedTransitions[membership.status].includes(targetStatus)) {
    return transitionFailure(membership, "MEMBERSHIP_TRANSITION_NOT_ALLOWED");
  }

  return transitionSuccess(
    {
      ...membership,
      status: targetStatus,
      updatedAt: at,
      version: membership.version + 1,
    },
    true,
  );
}
