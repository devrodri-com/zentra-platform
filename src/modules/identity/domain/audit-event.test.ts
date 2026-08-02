import { describe, expect, it } from "vitest";

import { createTestIdentityIds } from "../testing/identifiers";
import { createAuditEvent, createSafeAuditMetadata } from "./audit-event";

const ids = createTestIdentityIds("audit-event-001");

describe("safe audit events", () => {
  it("records a structured actor, outcome, reason, and account-scoped resource", () => {
    const safeMetadata = createSafeAuditMetadata({ attempt: 1, policyVersion: "v1", retry: false });
    const event = createAuditEvent({
      id: ids.auditEventId,
      occurredAt: new Date("2026-08-02T10:00:00.000Z"),
      requestId: ids.requestId,
      actor: { type: "USER", userId: ids.userId },
      action: "order.claim",
      resource: {
        kind: "order_claim",
        resourceId: ids.orderClaimId,
        customerAccountId: ids.customerAccountId,
      },
      outcome: "DENIED",
      reasonCode: "ACCOUNT_MISMATCH",
      safeMetadata,
    });

    expect(event).toMatchObject({
      actor: { type: "USER", userId: ids.userId },
      outcome: "DENIED",
      reasonCode: "ACCOUNT_MISMATCH",
    });
    expect(event.safeMetadata).toEqual({ attempt: 1, policyVersion: "v1", retry: false });
    expect(Object.isFrozen(event.safeMetadata)).toBe(true);
  });

  it.each([
    { rawToken: "not-allowed" },
    { sessionCookie: "not-allowed" },
    { cardCvv: "123" },
    { customerEmail: "member@example.test" },
    { requestBody: "not-allowed" },
    { providerSecret: "not-allowed" },
    { passwordHash: "not-allowed" },
  ])("rejects prohibited metadata keys", (metadata) => {
    expect(() => createSafeAuditMetadata(metadata)).toThrow(TypeError);
  });

  it("rejects nested request data and unbounded string values", () => {
    expect(() => createSafeAuditMetadata({ requestData: { nested: true } })).toThrow(TypeError);
    expect(() => createSafeAuditMetadata({ detail: "x".repeat(161) })).toThrow(TypeError);
  });

  it("rejects sensitive content hidden behind an innocent key", () => {
    expect(() => createSafeAuditMetadata({ detail: "member@example.test" })).toThrow(TypeError);
    expect(() => createSafeAuditMetadata({ detail: "raw-secret-token" })).toThrow(TypeError);
  });
});
