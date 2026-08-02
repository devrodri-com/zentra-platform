import type { CustomerAccountId } from "./identifiers";
import { transitionFailure, transitionSuccess, type TransitionResult } from "./transition";

export const CUSTOMER_ACCOUNT_KINDS = ["BUSINESS", "INDIVIDUAL"] as const;
export const CUSTOMER_ACCOUNT_LIFECYCLE_STATUSES = ["ACTIVE", "INACTIVE", "CLOSED"] as const;

export type CustomerAccountKind = (typeof CUSTOMER_ACCOUNT_KINDS)[number];
export type CustomerAccountLifecycleStatus = (typeof CUSTOMER_ACCOUNT_LIFECYCLE_STATUSES)[number];

export interface CustomerAccount {
  readonly id: CustomerAccountId;
  readonly kind: CustomerAccountKind;
  readonly displayName: string;
  readonly lifecycleStatus: CustomerAccountLifecycleStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly version: number;
}

export interface CreateCustomerAccountInput {
  readonly id: CustomerAccountId;
  readonly kind: CustomerAccountKind;
  readonly displayName: string;
  readonly createdAt: Date;
}

export type CustomerAccountTransitionReason = "ACCOUNT_TRANSITION_NOT_ALLOWED";

const allowedTransitions: Readonly<
  Record<CustomerAccountLifecycleStatus, readonly CustomerAccountLifecycleStatus[]>
> = {
  ACTIVE: ["INACTIVE", "CLOSED"],
  INACTIVE: ["ACTIVE", "CLOSED"],
  CLOSED: [],
};

export function createCustomerAccount(input: CreateCustomerAccountInput): CustomerAccount {
  const displayName = input.displayName.trim();

  if (displayName.length === 0 || displayName.length > 160) {
    throw new TypeError("displayName must contain between 1 and 160 characters");
  }

  return {
    ...input,
    displayName,
    lifecycleStatus: "ACTIVE",
    updatedAt: input.createdAt,
    version: 1,
  };
}

export function transitionCustomerAccountLifecycle(
  account: CustomerAccount,
  targetStatus: CustomerAccountLifecycleStatus,
  at: Date,
): TransitionResult<CustomerAccount, CustomerAccountTransitionReason> {
  if (targetStatus === account.lifecycleStatus) {
    return transitionSuccess(account, false);
  }

  if (!allowedTransitions[account.lifecycleStatus].includes(targetStatus)) {
    return transitionFailure(account, "ACCOUNT_TRANSITION_NOT_ALLOWED");
  }

  return transitionSuccess(
    {
      ...account,
      lifecycleStatus: targetStatus,
      updatedAt: at,
      version: account.version + 1,
    },
    true,
  );
}
