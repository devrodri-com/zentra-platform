import { describe, expect, it } from "vitest";

import { createTestIdentityIds } from "@/modules/identity/testing/identifiers";
import type { StaffRole } from "@/modules/identity/domain/roles";

import { evaluateAuthorization, type AuthorizationRequest } from "./authorization";
import type { Capability } from "./capabilities";

const ids = createTestIdentityIds("staff-account");

function staffRequest(
  capability: Capability,
  role: StaffRole,
  assurance: AuthorizationRequest["assurance"] = "MFA",
): AuthorizationRequest {
  return {
    capability,
    assurance,
    user: { id: ids.userId, lifecycleStatus: "ACTIVE" },
    staffRoles: [role],
  };
}

describe("staff authorization", () => {
  it("requires an application staff role", () => {
    const request = staffRequest("customer.read", "BUSINESS_OWNER");

    expect(evaluateAuthorization({ ...request, staffRoles: [] }).reasonCode).toBe(
      "STAFF_ROLE_REQUIRED",
    );
  });

  it.each(["catalog.publish", "pricing.publish", "refund.approve"] as const)(
    "lets a business owner use %s",
    (capability) => {
      expect(evaluateAuthorization(staffRequest(capability, "BUSINESS_OWNER")).allowed).toBe(true);
    },
  );

  it("does not grant technical deployment to a business owner", () => {
    expect(
      evaluateAuthorization(staffRequest("technical.deploy", "BUSINESS_OWNER")).reasonCode,
    ).toBe("CAPABILITY_NOT_GRANTED");
  });

  it.each([
    "customer.export.request",
    "subscription.cancel.request",
    "refund.request",
    "catalog.draft.write",
  ] as const)("lets an operations admin initiate or prepare %s", (capability) => {
    expect(evaluateAuthorization(staffRequest(capability, "OPERATIONS_ADMIN")).allowed).toBe(true);
  });

  it.each([
    "catalog.publish",
    "pricing.publish",
    "promotion.publish",
    "subscription.cancel.approve",
    "refund.approve",
    "customer.export.approve",
    "technical.deploy",
  ] as const)("denies an operations admin %s", (capability) => {
    expect(evaluateAuthorization(staffRequest(capability, "OPERATIONS_ADMIN")).reasonCode).toBe(
      "CAPABILITY_NOT_GRANTED",
    );
  });

  it.each(["technical.configure", "technical.deploy", "technical.diagnose"] as const)(
    "lets a technical admin use %s",
    (capability) => {
      expect(evaluateAuthorization(staffRequest(capability, "TECHNICAL_ADMIN")).allowed).toBe(true);
    },
  );

  it.each(["customer.read", "customer.export.request", "pricing.read", "refund.request"] as const)(
    "denies a technical admin commercial capability %s",
    (capability) => {
      expect(evaluateAuthorization(staffRequest(capability, "TECHNICAL_ADMIN")).reasonCode).toBe(
        "CAPABILITY_NOT_GRANTED",
      );
    },
  );

  it("requires MFA for every staff capability", () => {
    expect(
      evaluateAuthorization(staffRequest("order.update", "OPERATIONS_ADMIN", "SINGLE_FACTOR"))
        .reasonCode,
    ).toBe("INSUFFICIENT_ASSURANCE");
  });

  it("allows the granted staff capability with MFA", () => {
    expect(
      evaluateAuthorization(staffRequest("order.update", "OPERATIONS_ADMIN", "MFA")).allowed,
    ).toBe(true);
  });
});
