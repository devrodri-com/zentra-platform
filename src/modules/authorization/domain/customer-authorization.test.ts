import { describe, expect, it } from "vitest";

import { createTestIdentityIds } from "@/modules/identity/testing/identifiers";

import { evaluateAuthorization, type AuthorizationRequest } from "./authorization";
import type { Capability } from "./capabilities";

const primaryIds = createTestIdentityIds("primary-account");
const secondaryIds = createTestIdentityIds("secondary-account");
const activeUser = { id: primaryIds.userId, lifecycleStatus: "ACTIVE" } as const;

type CustomerAuthorizationRequest = AuthorizationRequest & {
  readonly user: NonNullable<AuthorizationRequest["user"]>;
  readonly membership: NonNullable<AuthorizationRequest["membership"]>;
  readonly resourceAccountId: NonNullable<AuthorizationRequest["resourceAccountId"]>;
};

function customerRequest(
  capability: Capability,
  role: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER" = "OWNER",
): CustomerAuthorizationRequest {
  return {
    capability,
    assurance: "SINGLE_FACTOR",
    user: activeUser,
    resourceAccountId: primaryIds.customerAccountId,
    membership: {
      userId: primaryIds.userId,
      customerAccountId: primaryIds.customerAccountId,
      role,
      status: "ACTIVE",
    },
  };
}

describe("customer account authorization", () => {
  it("allows an active membership to access its own account", () => {
    expect(evaluateAuthorization(customerRequest("account.profile.read"))).toMatchObject({
      allowed: true,
      reasonCode: "ALLOWED",
      accountId: primaryIds.customerAccountId,
    });
  });

  it("requires an application membership", () => {
    const request: AuthorizationRequest = {
      capability: "account.profile.read",
      assurance: "SINGLE_FACTOR",
      user: activeUser,
      resourceAccountId: primaryIds.customerAccountId,
    };

    expect(evaluateAuthorization(request).reasonCode).toBe("MEMBERSHIP_REQUIRED");
  });

  it("denies cross-account access even when the role grants the capability", () => {
    const request = {
      ...customerRequest("account.profile.read"),
      resourceAccountId: secondaryIds.customerAccountId,
    };

    expect(evaluateAuthorization(request)).toMatchObject({
      allowed: false,
      reasonCode: "ACCOUNT_MISMATCH",
    });
  });

  it.each(["PENDING", "SUSPENDED", "REVOKED"] as const)("denies a %s membership", (status) => {
    const baseline = customerRequest("account.profile.read");
    const request = {
      ...baseline,
      membership: { ...baseline.membership, status },
    };

    expect(evaluateAuthorization(request).reasonCode).toBe("MEMBERSHIP_INACTIVE");
  });

  it.each(["INVITED", "SUSPENDED", "DEACTIVATED"] as const)(
    "denies a %s user",
    (lifecycleStatus) => {
      const request = {
        ...customerRequest("account.profile.read"),
        user: { id: primaryIds.userId, lifecycleStatus },
      };

      expect(evaluateAuthorization(request).reasonCode).toBe("USER_INACTIVE");
    },
  );

  it.each(["OWNER", "ADMIN"] as const)("lets %s update an account profile", (role) => {
    expect(evaluateAuthorization(customerRequest("account.profile.update", role)).allowed).toBe(
      true,
    );
  });

  it("limits members to reads, purchases, support, and permitted operational changes", () => {
    expect(evaluateAuthorization(customerRequest("product.purchase", "MEMBER")).allowed).toBe(true);
    expect(
      evaluateAuthorization(customerRequest("subscription.fragrance.change", "MEMBER")).allowed,
    ).toBe(true);
    expect(
      evaluateAuthorization(customerRequest("account.profile.update", "MEMBER")).reasonCode,
    ).toBe("CAPABILITY_NOT_GRANTED");
  });

  it("keeps viewers read-only", () => {
    expect(evaluateAuthorization(customerRequest("shipment.read", "VIEWER")).allowed).toBe(true);
    expect(evaluateAuthorization(customerRequest("product.purchase", "VIEWER")).reasonCode).toBe(
      "CAPABILITY_NOT_GRANTED",
    );
  });
});
