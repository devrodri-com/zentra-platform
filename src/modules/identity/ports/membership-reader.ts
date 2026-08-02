import type { CustomerAccountId, UserId } from "../domain/identifiers";
import type { AccountMembership } from "../domain/membership";

export interface MembershipReader {
  findMembership(
    userId: UserId,
    customerAccountId: CustomerAccountId,
  ): Promise<AccountMembership | null>;
}
