import type { UserId } from "../domain/identifiers";
import type { User } from "../domain/user";

export interface UserReader {
  findUserById(userId: UserId): Promise<User | null>;
}
