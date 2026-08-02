import type { IdentitySession } from "@/modules/identity/domain/authentication";
import type { IdentitySessionReader } from "@/modules/identity/ports/identity-session-reader";

export class FakeIdentitySessionReader implements IdentitySessionReader {
  constructor(private session: IdentitySession | null = null) {}

  setSession(session: IdentitySession | null): void {
    this.session = session;
  }

  readIdentitySession(): Promise<IdentitySession | null> {
    return Promise.resolve(this.session);
  }
}
