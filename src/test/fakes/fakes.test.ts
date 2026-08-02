import { describe, expect, it } from "vitest";

import { createAuditEvent, createSafeAuditMetadata } from "@/modules/identity/domain/audit-event";
import type { IdentitySession } from "@/modules/identity/domain/authentication";
import { createAccountMembership } from "@/modules/identity/domain/membership";
import { createTestIdentityIds } from "@/modules/identity/testing/identifiers";

import { FakeAuditSink } from "./fake-audit-sink";
import { FakeClock } from "./fake-clock";
import { FakeIdentitySessionReader } from "./fake-identity-session-reader";
import { FakeMembershipReader } from "./fake-membership-reader";
import { FakeStaffRoleReader } from "./fake-staff-role-reader";
import { FakeTokenDigestVerifier } from "./fake-token-digest-verifier";

const ids = createTestIdentityIds("fake-user");
const now = new Date("2030-01-01T00:00:00.000Z");

describe("test-only identity fakes", () => {
  it("returns controlled session, membership, staff role, and time values", async () => {
    const session: IdentitySession = {
      userId: ids.userId,
      identityLinkId: ids.identityLinkId,
      providerIdentity: { providerKey: "fake-provider", providerSubject: "subject-test" },
      assurance: "MFA",
      authenticatedAt: now,
    };
    const membership = createAccountMembership({
      id: ids.membershipId,
      userId: ids.userId,
      customerAccountId: ids.customerAccountId,
      role: "OWNER",
      createdAt: now,
      status: "ACTIVE",
    });
    const sessionReader = new FakeIdentitySessionReader(session);
    const membershipReader = new FakeMembershipReader([membership]);
    const staffRoleReader = new FakeStaffRoleReader([
      { userId: ids.userId, roles: ["TECHNICAL_ADMIN"] },
    ]);
    const clock = new FakeClock(now);

    await expect(sessionReader.readIdentitySession()).resolves.toBe(session);
    await expect(membershipReader.findMembership(ids.userId, ids.customerAccountId)).resolves.toBe(
      membership,
    );
    await expect(staffRoleReader.listStaffRoles(ids.userId)).resolves.toEqual(["TECHNICAL_ADMIN"]);
    expect(clock.now()).toEqual(now);
    expect(clock.now()).not.toBe(now);
  });

  it("captures audit events and verifies only explicitly arranged token pairs", async () => {
    const event = createAuditEvent({
      id: ids.auditEventId,
      occurredAt: now,
      requestId: ids.requestId,
      actor: { type: "GUEST" },
      action: "order.claim.request",
      resource: { kind: "order_claim", resourceId: null, customerAccountId: null },
      outcome: "ATTEMPTED",
      reasonCode: "REQUEST_ACCEPTED",
      safeMetadata: createSafeAuditMetadata({ policyVersion: "v1" }),
    });
    const sink = new FakeAuditSink();
    const verifier = new FakeTokenDigestVerifier([
      { presentedToken: "fake-presented-token", expectedDigest: ids.tokenDigest },
    ]);

    await sink.append(event);

    expect(sink.events).toEqual([event]);
    await expect(verifier.matches("fake-presented-token", ids.tokenDigest)).resolves.toBe(true);
    await expect(verifier.matches("different-token", ids.tokenDigest)).resolves.toBe(false);
  });
});
