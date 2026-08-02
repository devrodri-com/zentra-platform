import type { IdentityLinkId, UserId } from "./identifiers";
import { transitionFailure, transitionSuccess, type TransitionResult } from "./transition";

export const IDENTITY_LINK_STATUSES = ["ACTIVE", "DISABLED", "REVOKED"] as const;

export type IdentityLinkStatus = (typeof IDENTITY_LINK_STATUSES)[number];

export interface IdentityLink {
  readonly id: IdentityLinkId;
  readonly userId: UserId;
  readonly providerKey: string;
  readonly providerSubject: string;
  readonly status: IdentityLinkStatus;
  readonly createdAt: Date;
  readonly lastSeenAt: Date | null;
}

export interface CreateIdentityLinkInput {
  readonly id: IdentityLinkId;
  readonly userId: UserId;
  readonly providerKey: string;
  readonly providerSubject: string;
  readonly createdAt: Date;
}

export type IdentityLinkTransitionReason = "IDENTITY_LINK_TRANSITION_NOT_ALLOWED";

const allowedTransitions: Readonly<Record<IdentityLinkStatus, readonly IdentityLinkStatus[]>> = {
  ACTIVE: ["DISABLED", "REVOKED"],
  DISABLED: ["ACTIVE", "REVOKED"],
  REVOKED: [],
};

export function createIdentityLink(input: CreateIdentityLinkInput): IdentityLink {
  if (input.providerKey.trim().length === 0 || input.providerSubject.trim().length === 0) {
    throw new TypeError("provider identity values must not be empty");
  }

  return {
    ...input,
    providerKey: input.providerKey.trim(),
    providerSubject: input.providerSubject.trim(),
    status: "ACTIVE",
    lastSeenAt: null,
  };
}

export function transitionIdentityLinkStatus(
  link: IdentityLink,
  targetStatus: IdentityLinkStatus,
): TransitionResult<IdentityLink, IdentityLinkTransitionReason> {
  if (targetStatus === link.status) {
    return transitionSuccess(link, false);
  }

  if (!allowedTransitions[link.status].includes(targetStatus)) {
    return transitionFailure(link, "IDENTITY_LINK_TRANSITION_NOT_ALLOWED");
  }

  return transitionSuccess({ ...link, status: targetStatus }, true);
}

export function recordIdentityLinkSeen(link: IdentityLink, at: Date): IdentityLink {
  return link.status === "ACTIVE" ? { ...link, lastSeenAt: at } : link;
}
