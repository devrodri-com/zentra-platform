import type { TokenDigest } from "../domain/identifiers";

export interface TokenDigestVerifier {
  matches(presentedToken: string, expectedDigest: TokenDigest): Promise<boolean>;
}
