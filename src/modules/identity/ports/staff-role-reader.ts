import type { UserId } from "../domain/identifiers";
import type { StaffRole } from "../domain/roles";

export interface StaffRoleReader {
  listStaffRoles(userId: UserId): Promise<readonly StaffRole[]>;
}
