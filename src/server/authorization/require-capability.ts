import "server-only";

import {
  evaluateAuthorization,
  type AuthorizationDecision,
  type AuthorizationRequest,
} from "@/modules/authorization/domain/authorization";

export class AuthorizationError extends Error {
  override readonly name = "AuthorizationError";

  constructor(readonly decision: AuthorizationDecision) {
    super(`Authorization denied: ${decision.reasonCode}`);
  }
}

export function requireCapability(request: AuthorizationRequest): void {
  const decision = evaluateAuthorization(request);

  if (!decision.allowed) {
    throw new AuthorizationError(decision);
  }
}
