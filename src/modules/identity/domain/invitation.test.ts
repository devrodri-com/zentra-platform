import { describe, expect, it } from "vitest";

import { createTestIdentityIds } from "../testing/identifiers";
import {
  createAccountInvitation,
  transitionInvitation,
  type AccountInvitation,
} from "./invitation";

const ids = createTestIdentityIds("invitation-001");
const createdAt = new Date("2026-08-02T10:00:00.000Z");
const beforeExpiry = new Date("2026-08-02T10:30:00.000Z");
const expiresAt = new Date("2026-08-02T11:00:00.000Z");

function invitation(): AccountInvitation {
  return createAccountInvitation({
    id: ids.invitationId,
    purpose: "CUSTOMER_ACCOUNT_ACCESS",
    customerAccountId: ids.customerAccountId,
    tokenDigest: ids.tokenDigest,
    createdAt,
    expiresAt,
  });
}

describe("account invitation lifecycle", () => {
  it("accepts a valid invitation exactly once", () => {
    const accepted = transitionInvitation(invitation(), {
      type: "ACCEPT",
      at: beforeExpiry,
      tokenDigestMatches: true,
    });

    expect(accepted).toMatchObject({
      ok: true,
      changed: true,
      value: { status: "ACCEPTED", version: 2 },
    });
    if (!accepted.ok) throw new Error("expected invitation acceptance");

    expect(
      transitionInvitation(accepted.value, {
        type: "ACCEPT",
        at: beforeExpiry,
        tokenDigestMatches: true,
      }),
    ).toMatchObject({ ok: false, reason: "INVITATION_ALREADY_ACCEPTED" });
  });

  it("does not accept a mismatched digest", () => {
    expect(
      transitionInvitation(invitation(), {
        type: "ACCEPT",
        at: beforeExpiry,
        tokenDigestMatches: false,
      }),
    ).toMatchObject({ ok: false, changed: false, reason: "TOKEN_DIGEST_MISMATCH" });
  });

  it("expires at the deadline and blocks every later transition", () => {
    const expired = transitionInvitation(invitation(), {
      type: "ACCEPT",
      at: expiresAt,
      tokenDigestMatches: true,
    });

    expect(expired).toMatchObject({
      ok: false,
      changed: true,
      reason: "INVITATION_EXPIRED",
      value: { status: "EXPIRED" },
    });
    if (expired.ok) throw new Error("expected expired invitation");

    expect(transitionInvitation(expired.value, { type: "REVOKE", at: expiresAt })).toMatchObject({
      ok: false,
      reason: "INVITATION_EXPIRED",
    });
  });

  it("makes revoked and superseded invitations terminal", () => {
    for (const type of ["REVOKE", "SUPERSEDE"] as const) {
      const result = transitionInvitation(invitation(), { type, at: beforeExpiry });

      expect(result).toMatchObject({ ok: true, changed: true });
      if (!result.ok) throw new Error(`expected ${type}`);

      expect(
        transitionInvitation(result.value, {
          type: "ACCEPT",
          at: beforeExpiry,
          tokenDigestMatches: true,
        }),
      ).toMatchObject({ ok: false });
    }
  });

  it("stores a digest without exposing a raw token field", () => {
    const value = invitation();

    expect(value.tokenDigest).toBe(ids.tokenDigest);
    expect(value).not.toHaveProperty("token");
    expect(value).not.toHaveProperty("rawToken");
  });

  it("fails closed for invalid timestamps", () => {
    expect(() =>
      createAccountInvitation({
        id: ids.invitationId,
        purpose: "CUSTOMER_ACCOUNT_ACCESS",
        customerAccountId: ids.customerAccountId,
        tokenDigest: ids.tokenDigest,
        createdAt,
        expiresAt: new Date(Number.NaN),
      }),
    ).toThrow(TypeError);
    expect(
      transitionInvitation(invitation(), {
        type: "ACCEPT",
        at: new Date(Number.NaN),
        tokenDigestMatches: true,
      }),
    ).toMatchObject({ ok: false, reason: "INVALID_INVITATION_CONTEXT" });
    expect(
      transitionInvitation(invitation(), {
        type: "REVOKE",
        at: new Date("2026-08-02T09:59:59.000Z"),
      }),
    ).toMatchObject({ ok: false, reason: "INVALID_INVITATION_CONTEXT" });
  });
});
