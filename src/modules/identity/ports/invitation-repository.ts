import type { InvitationId } from "../domain/identifiers";
import type { AccountInvitation } from "../domain/invitation";

export interface InvitationRepository {
  findInvitationById(invitationId: InvitationId): Promise<AccountInvitation | null>;
  saveInvitation(invitation: AccountInvitation, expectedVersion: number): Promise<void>;
}
