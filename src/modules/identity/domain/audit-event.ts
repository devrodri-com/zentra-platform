import type {
  AuditEventId,
  CustomerAccountId,
  IdentityLinkId,
  InvitationId,
  MembershipId,
  OrderClaimId,
  OrderId,
  RequestId,
  UserId,
} from "./identifiers";

declare const safeAuditMetadataBrand: unique symbol;

export const AUDIT_ACTOR_TYPES = ["GUEST", "USER", "SYSTEM"] as const;
export const AUDIT_OUTCOMES = ["ATTEMPTED", "ALLOWED", "DENIED", "COMPLETED", "FAILED"] as const;

export type AuditActorType = (typeof AUDIT_ACTOR_TYPES)[number];
export type AuditOutcome = (typeof AUDIT_OUTCOMES)[number];
export type SafeAuditValue = string | number | boolean | null;
export type SafeAuditMetadata = Readonly<Record<string, SafeAuditValue>> & {
  readonly [safeAuditMetadataBrand]: true;
};

export type AuditActor =
  | { readonly type: "GUEST" }
  | { readonly type: "USER"; readonly userId: UserId }
  | { readonly type: "SYSTEM" };

export interface AuditResource {
  readonly kind: string;
  readonly resourceId:
    | UserId
    | CustomerAccountId
    | MembershipId
    | IdentityLinkId
    | InvitationId
    | OrderClaimId
    | OrderId
    | null;
  readonly customerAccountId: CustomerAccountId | null;
}

export interface AuditEvent {
  readonly id: AuditEventId;
  readonly occurredAt: Date;
  readonly requestId: RequestId;
  readonly actor: AuditActor;
  readonly action: string;
  readonly resource: AuditResource;
  readonly outcome: AuditOutcome;
  readonly reasonCode: string;
  readonly safeMetadata: SafeAuditMetadata;
}

export interface CreateAuditEventInput {
  readonly id: AuditEventId;
  readonly occurredAt: Date;
  readonly requestId: RequestId;
  readonly actor: AuditActor;
  readonly action: string;
  readonly resource: AuditResource;
  readonly outcome: AuditOutcome;
  readonly reasonCode: string;
  readonly safeMetadata: SafeAuditMetadata;
}

const codePattern = /^[A-Z][A-Z0-9_]{1,63}$/;
const actionPattern = /^[a-z][a-z0-9.]{1,95}$/;
const resourceKindPattern = /^[a-z][a-z0-9_]{1,63}$/;
const policyVersionPattern = /^v[1-9][0-9]{0,8}$/;

const safeMetadataValidators = {
  attempt: (value: unknown) => Number.isSafeInteger(value) && Number(value) >= 0,
  changed: (value: unknown) => typeof value === "boolean",
  idempotent: (value: unknown) => typeof value === "boolean",
  policyVersion: (value: unknown) => typeof value === "string" && policyVersionPattern.test(value),
  retry: (value: unknown) => typeof value === "boolean",
  state: (value: unknown) => typeof value === "string" && codePattern.test(value),
  transition: (value: unknown) => typeof value === "string" && codePattern.test(value),
  version: (value: unknown) => Number.isSafeInteger(value) && Number(value) >= 1,
} as const satisfies Record<string, (value: unknown) => boolean>;

type SafeMetadataKey = keyof typeof safeMetadataValidators;

function isSafeMetadataKey(key: string): key is SafeMetadataKey {
  return Object.hasOwn(safeMetadataValidators, key);
}

export function createSafeAuditMetadata(
  input: Readonly<Record<string, unknown>>,
): SafeAuditMetadata {
  const entries = Object.entries(input);

  if (entries.length > 24) {
    throw new TypeError("safe audit metadata accepts at most 24 fields");
  }

  const safeEntries = entries.map(([key, value]) => {
    if (!isSafeMetadataKey(key) || !safeMetadataValidators[key](value)) {
      throw new TypeError(`unsafe audit metadata field: ${key}`);
    }

    return [key, value] as const;
  });

  return Object.freeze(Object.fromEntries(safeEntries)) as SafeAuditMetadata;
}

export function createAuditEvent(input: CreateAuditEventInput): AuditEvent {
  if (!actionPattern.test(input.action)) {
    throw new TypeError("audit action must be a stable dotted identifier");
  }

  if (!resourceKindPattern.test(input.resource.kind)) {
    throw new TypeError("audit resource kind must be a stable identifier");
  }

  if (!codePattern.test(input.reasonCode)) {
    throw new TypeError("audit reasonCode must be a stable uppercase code");
  }

  return { ...input };
}
