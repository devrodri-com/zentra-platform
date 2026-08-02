import type { TokenDigest } from "@/modules/identity/domain/identifiers";
import type { TokenDigestVerifier } from "@/modules/identity/ports/token-digest-verifier";

export type FakeTokenMatch = Readonly<{
  presentedToken: string;
  expectedDigest: TokenDigest;
}>;

export class FakeTokenDigestVerifier implements TokenDigestVerifier {
  constructor(private matchesToAllow: readonly FakeTokenMatch[] = []) {}

  setMatches(matchesToAllow: readonly FakeTokenMatch[]): void {
    this.matchesToAllow = matchesToAllow;
  }

  matches(presentedToken: string, expectedDigest: TokenDigest): Promise<boolean> {
    return Promise.resolve(
      this.matchesToAllow.some(
        (candidate) =>
          candidate.presentedToken === presentedToken &&
          candidate.expectedDigest === expectedDigest,
      ),
    );
  }
}
