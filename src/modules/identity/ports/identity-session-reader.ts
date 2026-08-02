import type { IdentitySession } from "../domain/authentication";

export interface IdentitySessionReader {
  readIdentitySession(): Promise<IdentitySession | null>;
}
