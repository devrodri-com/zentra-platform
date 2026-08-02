import type { UserId } from "@/modules/identity/domain/identifiers";
import type { StaffRole } from "@/modules/identity/domain/roles";
import type { StaffRoleReader } from "@/modules/identity/ports/staff-role-reader";

export type FakeStaffRoleAssignment = Readonly<{
  userId: UserId;
  roles: readonly StaffRole[];
}>;

export class FakeStaffRoleReader implements StaffRoleReader {
  constructor(private assignments: readonly FakeStaffRoleAssignment[] = []) {}

  setAssignments(assignments: readonly FakeStaffRoleAssignment[]): void {
    this.assignments = assignments;
  }

  listStaffRoles(userId: UserId): Promise<readonly StaffRole[]> {
    return Promise.resolve(
      this.assignments.find((assignment) => assignment.userId === userId)?.roles ?? [],
    );
  }
}
