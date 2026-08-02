import { describe, expect, it } from "vitest";

import { createCustomerAccount, transitionCustomerAccountLifecycle } from "./customer-account";
import {
  parseCustomerAccountId,
  parseIdentityLinkId,
  parseMembershipId,
  parseTokenDigest,
  parseUserId,
} from "./identifiers";
import { createIdentityLink } from "./identity-link";
import { createAccountMembership, transitionMembershipStatus } from "./membership";
import { CUSTOMER_ACCOUNT_ROLES, STAFF_ROLES } from "./roles";
import { createUser, transitionUserLifecycle } from "./user";

const createdAt = new Date("2026-08-02T10:00:00.000Z");
const updatedAt = new Date("2026-08-02T11:00:00.000Z");

describe("opaque identity identifiers", () => {
  it("centralizes parsing for branded identifiers and token digests", () => {
    expect(parseUserId("usr_test-user-001")).toBe("usr_test-user-001");
    expect(parseCustomerAccountId("acct_test-account-001")).toBe("acct_test-account-001");
    expect(parseTokenDigest("digest_abcdefghijklmnop")).toBe("digest_abcdefghijklmnop");
  });

  it.each(["user-001", "usr_x", "usr_not valid"])('rejects unsafe UserId value "%s"', (value) => {
    expect(() => parseUserId(value)).toThrow(TypeError);
  });

  it("rejects values that could be raw tokens instead of digests", () => {
    expect(() => parseTokenDigest("raw-secret-value")).toThrow(TypeError);
  });
});

describe("identity entities", () => {
  it("normalizes a user and enforces terminal deactivation", () => {
    const invited = createUser({
      id: parseUserId("usr_test-user-001"),
      primaryEmail: "  member@example.test ",
      createdAt,
    });
    const activated = transitionUserLifecycle(invited, "ACTIVE", updatedAt);

    expect(invited).toMatchObject({ lifecycleStatus: "INVITED", version: 1 });
    expect(invited.primaryEmail).toBe("member@example.test");
    expect(activated).toMatchObject({ ok: true, changed: true });
    if (!activated.ok) throw new Error("expected user activation");

    const deactivated = transitionUserLifecycle(activated.value, "DEACTIVATED", updatedAt);
    if (!deactivated.ok) throw new Error("expected user deactivation");

    expect(transitionUserLifecycle(deactivated.value, "ACTIVE", updatedAt)).toMatchObject({
      ok: false,
      reason: "USER_TRANSITION_NOT_ALLOWED",
    });
  });

  it("models customer accounts independently from authenticated users", () => {
    const account = createCustomerAccount({
      id: parseCustomerAccountId("acct_test-account-001"),
      kind: "BUSINESS",
      displayName: "  Example Workspace  ",
      createdAt,
    });
    const closed = transitionCustomerAccountLifecycle(account, "CLOSED", updatedAt);

    expect(account).toMatchObject({
      displayName: "Example Workspace",
      lifecycleStatus: "ACTIVE",
    });
    expect(closed).toMatchObject({ ok: true, value: { lifecycleStatus: "CLOSED" } });
  });

  it("supports many users per account and many accounts per user through memberships", () => {
    const firstUser = parseUserId("usr_test-user-001");
    const secondUser = parseUserId("usr_test-user-002");
    const firstAccount = parseCustomerAccountId("acct_test-account-001");
    const secondAccount = parseCustomerAccountId("acct_test-account-002");
    const memberships = [
      createAccountMembership({
        id: parseMembershipId("mem_test-membership-001"),
        userId: firstUser,
        customerAccountId: firstAccount,
        role: "OWNER",
        createdAt,
      }),
      createAccountMembership({
        id: parseMembershipId("mem_test-membership-002"),
        userId: firstUser,
        customerAccountId: secondAccount,
        role: "MEMBER",
        createdAt,
      }),
      createAccountMembership({
        id: parseMembershipId("mem_test-membership-003"),
        userId: secondUser,
        customerAccountId: firstAccount,
        role: "VIEWER",
        createdAt,
      }),
    ];

    expect(memberships.filter(({ userId }) => userId === firstUser)).toHaveLength(2);
    expect(
      memberships.filter(({ customerAccountId }) => customerAccountId === firstAccount),
    ).toHaveLength(2);

    const active = transitionMembershipStatus(memberships[0]!, "ACTIVE", updatedAt);
    if (!active.ok) throw new Error("expected membership activation");
    const revoked = transitionMembershipStatus(active.value, "REVOKED", updatedAt);
    if (!revoked.ok) throw new Error("expected membership revocation");
    expect(transitionMembershipStatus(revoked.value, "ACTIVE", updatedAt)).toMatchObject({
      ok: false,
      reason: "MEMBERSHIP_TRANSITION_NOT_ALLOWED",
    });
  });

  it("keeps provider identity links free of roles, permissions, and account authority", () => {
    const link = createIdentityLink({
      id: parseIdentityLinkId("idlink_test-link-001"),
      userId: parseUserId("usr_test-user-001"),
      providerKey: "future-provider",
      providerSubject: "opaque-subject",
      createdAt,
    });

    expect(link).not.toHaveProperty("roles");
    expect(link).not.toHaveProperty("permissions");
    expect(link).not.toHaveProperty("customerAccountIds");
  });

  it("defines the approved customer and staff role vocabulary", () => {
    expect(CUSTOMER_ACCOUNT_ROLES).toEqual(["OWNER", "ADMIN", "MEMBER", "VIEWER"]);
    expect(STAFF_ROLES).toEqual(["BUSINESS_OWNER", "OPERATIONS_ADMIN", "TECHNICAL_ADMIN"]);
  });
});
