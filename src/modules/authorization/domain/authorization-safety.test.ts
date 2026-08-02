import { describe, expect, it } from "vitest";

import { createTestIdentityIds } from "@/modules/identity/testing/identifiers";

import { evaluateAuthorization, type AuthorizationRequest } from "./authorization";
import type { Capability } from "./capabilities";

const firstIds = createTestIdentityIds("first-user");
const secondIds = createTestIdentityIds("second-user");

describe("deny-by-default authorization safety", () => {
  it("denies unauthenticated account access", () => {
    const decision = evaluateAuthorization({
      capability: "account.profile.read",
      assurance: "ANONYMOUS",
      resourceAccountId: firstIds.customerAccountId,
    });

    expect(decision).toMatchObject({ allowed: false, reasonCode: "UNAUTHENTICATED" });
  });

  it("allows a guest to initiate only the public order claim request", () => {
    expect(
      evaluateAuthorization({ capability: "order.claim.request", assurance: "ANONYMOUS" }),
    ).toMatchObject({ allowed: true, reasonCode: "ALLOWED" });
    expect(
      evaluateAuthorization({ capability: "order.read", assurance: "ANONYMOUS" }).allowed,
    ).toBe(false);
  });

  it("rejects authenticated assurance without an application user", () => {
    expect(
      evaluateAuthorization({ capability: "order.claim.request", assurance: "MFA" }).reasonCode,
    ).toBe("INVALID_CONTEXT");
  });

  it("defensively rejects an unsupported runtime capability", () => {
    const unsupported = "order.unknown" as Capability;

    expect(
      evaluateAuthorization({ capability: unsupported, assurance: "ANONYMOUS" }).reasonCode,
    ).toBe("INVALID_CONTEXT");
  });

  it("does not treat a provider identity as an application role", () => {
    const decision = evaluateAuthorization({
      capability: "technical.diagnose",
      assurance: "MFA",
      providerIdentity: { providerKey: "future-provider", providerSubject: "subject-opaque" },
    });

    expect(decision.reasonCode).toBe("INVALID_CONTEXT");
  });

  it("denies a membership tied to a different user as contradictory", () => {
    const request: AuthorizationRequest = {
      capability: "account.profile.read",
      assurance: "SINGLE_FACTOR",
      user: { id: firstIds.userId, lifecycleStatus: "ACTIVE" },
      resourceAccountId: firstIds.customerAccountId,
      membership: {
        userId: secondIds.userId,
        customerAccountId: firstIds.customerAccountId,
        role: "OWNER",
        status: "ACTIVE",
      },
    };

    expect(evaluateAuthorization(request).reasonCode).toBe("INVALID_CONTEXT");
  });

  it("denies an anonymous assurance attached to a user", () => {
    expect(
      evaluateAuthorization({
        capability: "order.read",
        assurance: "ANONYMOUS",
        user: { id: firstIds.userId, lifecycleStatus: "ACTIVE" },
      }).reasonCode,
    ).toBe("INVALID_CONTEXT");
  });

  it("emits a stable, safe audit descriptor without provider identity", () => {
    const decision = evaluateAuthorization({
      capability: "customer.read",
      assurance: "MFA",
      providerIdentity: { providerKey: "future-provider", providerSubject: "subject-opaque" },
      user: { id: firstIds.userId, lifecycleStatus: "ACTIVE" },
      staffRoles: ["BUSINESS_OWNER"],
    });

    expect(decision.auditDescriptor).toEqual({
      action: "authorization.evaluate",
      actor: "USER",
      outcome: "ALLOWED",
      reasonCode: "ALLOWED",
      capability: "customer.read",
      userId: firstIds.userId,
    });
    expect(decision.auditDescriptor).not.toHaveProperty("providerIdentity");
  });
});
