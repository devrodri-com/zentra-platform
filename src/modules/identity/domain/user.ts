import type { UserId } from "./identifiers";
import { transitionFailure, transitionSuccess, type TransitionResult } from "./transition";

export const USER_LIFECYCLE_STATUSES = ["INVITED", "ACTIVE", "SUSPENDED", "DEACTIVATED"] as const;

export type UserLifecycleStatus = (typeof USER_LIFECYCLE_STATUSES)[number];

export interface User {
  readonly id: UserId;
  readonly lifecycleStatus: UserLifecycleStatus;
  readonly primaryEmail: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly version: number;
}

export interface CreateUserInput {
  readonly id: UserId;
  readonly primaryEmail: string;
  readonly createdAt: Date;
  readonly lifecycleStatus?: UserLifecycleStatus;
}

export type UserTransitionReason = "USER_TRANSITION_NOT_ALLOWED";

const allowedTransitions: Readonly<Record<UserLifecycleStatus, readonly UserLifecycleStatus[]>> = {
  INVITED: ["ACTIVE", "DEACTIVATED"],
  ACTIVE: ["SUSPENDED", "DEACTIVATED"],
  SUSPENDED: ["ACTIVE", "DEACTIVATED"],
  DEACTIVATED: [],
};

export function createUser(input: CreateUserInput): User {
  const primaryEmail = input.primaryEmail.trim().toLowerCase();

  if (!primaryEmail.includes("@") || /\s/.test(primaryEmail)) {
    throw new TypeError("primaryEmail must be a normalized email address");
  }

  return {
    id: input.id,
    lifecycleStatus: input.lifecycleStatus ?? "INVITED",
    primaryEmail,
    createdAt: input.createdAt,
    updatedAt: input.createdAt,
    version: 1,
  };
}

export function transitionUserLifecycle(
  user: User,
  targetStatus: UserLifecycleStatus,
  at: Date,
): TransitionResult<User, UserTransitionReason> {
  if (targetStatus === user.lifecycleStatus) {
    return transitionSuccess(user, false);
  }

  if (!allowedTransitions[user.lifecycleStatus].includes(targetStatus)) {
    return transitionFailure(user, "USER_TRANSITION_NOT_ALLOWED");
  }

  return transitionSuccess(
    {
      ...user,
      lifecycleStatus: targetStatus,
      updatedAt: at,
      version: user.version + 1,
    },
    true,
  );
}
