import type { IdentityLinkId, UserId } from "./identifiers";

export const AUTHENTICATION_ASSURANCE_LEVELS = [
  "ANONYMOUS",
  "EMAIL_VERIFIED",
  "SINGLE_FACTOR",
  "MFA",
] as const;

export type AuthenticationAssurance = (typeof AUTHENTICATION_ASSURANCE_LEVELS)[number];

export interface ProviderIdentity {
  readonly providerKey: string;
  readonly providerSubject: string;
}

export interface IdentitySession {
  readonly userId: UserId | null;
  readonly identityLinkId: IdentityLinkId | null;
  readonly providerIdentity: ProviderIdentity | null;
  readonly assurance: AuthenticationAssurance;
  readonly authenticatedAt: Date | null;
}
