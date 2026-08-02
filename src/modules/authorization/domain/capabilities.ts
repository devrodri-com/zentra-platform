import type { CustomerAccountRole, StaffRole } from "@/modules/identity/domain/roles";

export const CAPABILITIES = [
  "account.profile.read",
  "account.profile.update",
  "order.read",
  "order.repeat",
  "order.claim.request",
  "subscription.read",
  "subscription.fragrance.change",
  "subscription.address.update",
  "shipment.read",
  "product.purchase",
  "support.request.create",
  "catalog.read",
  "catalog.draft.write",
  "catalog.publish",
  "pricing.read",
  "pricing.publish",
  "promotion.draft.write",
  "promotion.publish",
  "order.read.all",
  "order.update",
  "tracking.update",
  "customer.read",
  "customer.export.request",
  "customer.export.approve",
  "subscription.read.all",
  "subscription.operate",
  "subscription.cancel.request",
  "subscription.cancel.approve",
  "refund.request",
  "refund.approve",
  "inventory.read",
  "inventory.adjust",
  "fragrance.change",
  "address.update",
  "technical.configure",
  "technical.deploy",
  "technical.diagnose",
] as const;

export type Capability = (typeof CAPABILITIES)[number];

export const GUEST_CAPABILITIES = ["order.claim.request"] as const satisfies readonly Capability[];

export const CUSTOMER_ACCOUNT_CAPABILITIES = [
  "account.profile.read",
  "account.profile.update",
  "order.read",
  "order.repeat",
  "order.claim.request",
  "subscription.read",
  "subscription.fragrance.change",
  "subscription.address.update",
  "shipment.read",
  "product.purchase",
  "support.request.create",
] as const satisfies readonly Capability[];

export const STAFF_CAPABILITIES = [
  "catalog.read",
  "catalog.draft.write",
  "catalog.publish",
  "pricing.read",
  "pricing.publish",
  "promotion.draft.write",
  "promotion.publish",
  "order.read.all",
  "order.update",
  "tracking.update",
  "customer.read",
  "customer.export.request",
  "customer.export.approve",
  "subscription.read.all",
  "subscription.operate",
  "subscription.cancel.request",
  "subscription.cancel.approve",
  "refund.request",
  "refund.approve",
  "inventory.read",
  "inventory.adjust",
  "fragrance.change",
  "address.update",
  "technical.configure",
  "technical.deploy",
  "technical.diagnose",
] as const satisfies readonly Capability[];

const memberCapabilities = [
  "account.profile.read",
  "order.read",
  "order.repeat",
  "order.claim.request",
  "subscription.read",
  "subscription.fragrance.change",
  "subscription.address.update",
  "shipment.read",
  "product.purchase",
  "support.request.create",
] as const satisfies readonly Capability[];

const viewerCapabilities = [
  "account.profile.read",
  "order.read",
  "subscription.read",
  "shipment.read",
] as const satisfies readonly Capability[];

export const CUSTOMER_ROLE_CAPABILITIES = {
  OWNER: CUSTOMER_ACCOUNT_CAPABILITIES,
  ADMIN: CUSTOMER_ACCOUNT_CAPABILITIES,
  MEMBER: memberCapabilities,
  VIEWER: viewerCapabilities,
} as const satisfies Record<CustomerAccountRole, readonly Capability[]>;

const businessOwnerCapabilities = STAFF_CAPABILITIES.filter(
  (capability) => !capability.startsWith("technical."),
);

const operationsAdminCapabilities = [
  "catalog.read",
  "catalog.draft.write",
  "pricing.read",
  "promotion.draft.write",
  "order.read.all",
  "order.update",
  "tracking.update",
  "customer.read",
  "customer.export.request",
  "subscription.read.all",
  "subscription.operate",
  "subscription.cancel.request",
  "refund.request",
  "inventory.read",
  "inventory.adjust",
  "fragrance.change",
  "address.update",
] as const satisfies readonly Capability[];

const technicalAdminCapabilities = [
  "technical.configure",
  "technical.deploy",
  "technical.diagnose",
] as const satisfies readonly Capability[];

export const STAFF_ROLE_CAPABILITIES = {
  BUSINESS_OWNER: businessOwnerCapabilities,
  OPERATIONS_ADMIN: operationsAdminCapabilities,
  TECHNICAL_ADMIN: technicalAdminCapabilities,
} as const satisfies Record<StaffRole, readonly Capability[]>;

export function isCapability(value: unknown): value is Capability {
  return typeof value === "string" && (CAPABILITIES as readonly string[]).includes(value);
}

export function isCustomerAccountCapability(
  capability: Capability,
): capability is (typeof CUSTOMER_ACCOUNT_CAPABILITIES)[number] {
  return (CUSTOMER_ACCOUNT_CAPABILITIES as readonly Capability[]).includes(capability);
}

export function isStaffCapability(
  capability: Capability,
): capability is (typeof STAFF_CAPABILITIES)[number] {
  return (STAFF_CAPABILITIES as readonly Capability[]).includes(capability);
}
