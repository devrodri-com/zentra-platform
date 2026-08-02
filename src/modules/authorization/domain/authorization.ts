import {
  AUTHENTICATION_ASSURANCE_LEVELS,
  type AuthenticationAssurance,
  type ProviderIdentity,
} from "@/modules/identity/domain/authentication";
import type { CustomerAccountId, UserId } from "@/modules/identity/domain/identifiers";
import type { AccountMembership } from "@/modules/identity/domain/membership";
import {
  CUSTOMER_ACCOUNT_ROLES,
  STAFF_ROLES,
  type StaffRole,
} from "@/modules/identity/domain/roles";
import type { User } from "@/modules/identity/domain/user";

import {
  CUSTOMER_ROLE_CAPABILITIES,
  GUEST_CAPABILITIES,
  STAFF_ROLE_CAPABILITIES,
  isCapability,
  isCustomerAccountCapability,
  isStaffCapability,
  type Capability,
} from "./capabilities";

export const AUTHORIZATION_REASON_CODES = [
  "ALLOWED",
  "UNAUTHENTICATED",
  "INSUFFICIENT_ASSURANCE",
  "USER_INACTIVE",
  "MEMBERSHIP_REQUIRED",
  "MEMBERSHIP_INACTIVE",
  "ACCOUNT_MISMATCH",
  "STAFF_ROLE_REQUIRED",
  "CAPABILITY_NOT_GRANTED",
  "INVALID_CONTEXT",
] as const;

export type AuthorizationReasonCode = (typeof AUTHORIZATION_REASON_CODES)[number];

export type AuthorizationRequest = Readonly<{
  capability: Capability;
  assurance: AuthenticationAssurance;
  providerIdentity?: ProviderIdentity;
  user?: Pick<User, "id" | "lifecycleStatus">;
  membership?: Pick<AccountMembership, "userId" | "customerAccountId" | "role" | "status">;
  staffRoles?: readonly StaffRole[];
  resourceAccountId?: CustomerAccountId;
}>;

export type AuthorizationAuditDescriptor = Readonly<{
  action: "authorization.evaluate";
  actor: "GUEST" | "USER";
  outcome: "ALLOWED" | "DENIED";
  reasonCode: AuthorizationReasonCode;
  capability: Capability;
  userId?: UserId;
  accountId?: CustomerAccountId;
}>;

export type AuthorizationDecision = Readonly<{
  allowed: boolean;
  reasonCode: AuthorizationReasonCode;
  capability: Capability;
  accountId?: CustomerAccountId;
  auditDescriptor: AuthorizationAuditDescriptor;
}>;

function hasCapability(granted: readonly Capability[], requested: Capability): boolean {
  return granted.includes(requested);
}

function decide(
  request: AuthorizationRequest,
  reasonCode: AuthorizationReasonCode,
): AuthorizationDecision {
  const allowed = reasonCode === "ALLOWED";
  const auditBase = {
    action: "authorization.evaluate" as const,
    actor: request.user === undefined ? ("GUEST" as const) : ("USER" as const),
    outcome: allowed ? ("ALLOWED" as const) : ("DENIED" as const),
    reasonCode,
    capability: request.capability,
  };
  const auditWithUser =
    request.user === undefined ? auditBase : { ...auditBase, userId: request.user.id };
  const auditDescriptor =
    request.resourceAccountId === undefined
      ? auditWithUser
      : { ...auditWithUser, accountId: request.resourceAccountId };
  const decisionBase = {
    allowed,
    reasonCode,
    capability: request.capability,
    auditDescriptor,
  };

  return request.resourceAccountId === undefined
    ? decisionBase
    : { ...decisionBase, accountId: request.resourceAccountId };
}

function hasContradictoryContext(request: AuthorizationRequest): boolean {
  if (!isCapability(request.capability)) {
    return true;
  }

  if (!(AUTHENTICATION_ASSURANCE_LEVELS as readonly string[]).includes(request.assurance)) {
    return true;
  }

  if (
    request.staffRoles?.some((role) => !(STAFF_ROLES as readonly string[]).includes(role)) === true
  ) {
    return true;
  }

  if (
    request.membership !== undefined &&
    !(CUSTOMER_ACCOUNT_ROLES as readonly string[]).includes(request.membership.role)
  ) {
    return true;
  }

  if (request.user === undefined) {
    return (
      request.assurance !== "ANONYMOUS" ||
      request.membership !== undefined ||
      (request.staffRoles?.length ?? 0) > 0
    );
  }

  if (request.assurance === "ANONYMOUS") {
    return true;
  }

  return request.membership !== undefined && request.membership.userId !== request.user.id;
}

function evaluateStaffRequest(request: AuthorizationRequest): AuthorizationDecision {
  if (request.user === undefined) {
    return decide(request, "UNAUTHENTICATED");
  }

  if ((request.staffRoles?.length ?? 0) === 0) {
    return decide(request, "STAFF_ROLE_REQUIRED");
  }

  if (request.assurance !== "MFA") {
    return decide(request, "INSUFFICIENT_ASSURANCE");
  }

  const granted = request.staffRoles?.some((role) =>
    hasCapability(STAFF_ROLE_CAPABILITIES[role], request.capability),
  );

  return decide(request, granted === true ? "ALLOWED" : "CAPABILITY_NOT_GRANTED");
}

function evaluateCustomerRequest(request: AuthorizationRequest): AuthorizationDecision {
  if (request.user === undefined) {
    return decide(request, "UNAUTHENTICATED");
  }

  if (request.resourceAccountId === undefined) {
    return decide(request, "INVALID_CONTEXT");
  }

  if (request.membership === undefined) {
    return decide(request, "MEMBERSHIP_REQUIRED");
  }

  if (request.membership.status !== "ACTIVE") {
    return decide(request, "MEMBERSHIP_INACTIVE");
  }

  if (request.membership.customerAccountId !== request.resourceAccountId) {
    return decide(request, "ACCOUNT_MISMATCH");
  }

  const granted = hasCapability(
    CUSTOMER_ROLE_CAPABILITIES[request.membership.role],
    request.capability,
  );

  return decide(request, granted ? "ALLOWED" : "CAPABILITY_NOT_GRANTED");
}

export function evaluateAuthorization(request: AuthorizationRequest): AuthorizationDecision {
  if (hasContradictoryContext(request)) {
    return decide(request, "INVALID_CONTEXT");
  }

  if (request.user === undefined && hasCapability(GUEST_CAPABILITIES, request.capability)) {
    return decide(request, request.resourceAccountId === undefined ? "ALLOWED" : "INVALID_CONTEXT");
  }

  if (request.user === undefined) {
    return decide(request, "UNAUTHENTICATED");
  }

  if (request.user.lifecycleStatus !== "ACTIVE") {
    return decide(request, "USER_INACTIVE");
  }

  if (isStaffCapability(request.capability)) {
    return evaluateStaffRequest(request);
  }

  if (isCustomerAccountCapability(request.capability)) {
    return evaluateCustomerRequest(request);
  }

  return decide(request, "CAPABILITY_NOT_GRANTED");
}
