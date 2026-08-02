export const CUSTOMER_ACCOUNT_ROLES = ["OWNER", "ADMIN", "MEMBER", "VIEWER"] as const;

export type CustomerAccountRole = (typeof CUSTOMER_ACCOUNT_ROLES)[number];

export const STAFF_ROLES = ["BUSINESS_OWNER", "OPERATIONS_ADMIN", "TECHNICAL_ADMIN"] as const;

export type StaffRole = (typeof STAFF_ROLES)[number];
