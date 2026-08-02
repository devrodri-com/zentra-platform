export const ORDER_CLAIM_PRINCIPAL_PROOFS = [
  "AUTHENTICATED_IDENTITY",
  "SECURE_ACTIVATION",
] as const;

export type OrderClaimPrincipalProof = (typeof ORDER_CLAIM_PRINCIPAL_PROOFS)[number];

export function hasSecurePrincipalProof(
  proof: OrderClaimPrincipalProof | null,
): proof is OrderClaimPrincipalProof {
  return (
    proof !== null &&
    (ORDER_CLAIM_PRINCIPAL_PROOFS as readonly OrderClaimPrincipalProof[]).includes(proof)
  );
}
