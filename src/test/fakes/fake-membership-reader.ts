import type { CustomerAccountId, UserId } from "@/modules/identity/domain/identifiers";
import type { AccountMembership } from "@/modules/identity/domain/membership";
import type { MembershipReader } from "@/modules/identity/ports/membership-reader";

export class FakeMembershipReader implements MembershipReader {
  constructor(private memberships: readonly AccountMembership[] = []) {}

  setMemberships(memberships: readonly AccountMembership[]): void {
    this.memberships = memberships;
  }

  findMembership(
    userId: UserId,
    customerAccountId: CustomerAccountId,
  ): Promise<AccountMembership | null> {
    const membership = this.memberships.find(
      (candidate) =>
        candidate.userId === userId && candidate.customerAccountId === customerAccountId,
    );

    return Promise.resolve(membership ?? null);
  }
}
