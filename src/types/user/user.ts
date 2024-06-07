import { UserRole } from ".";

export type User  = {
  id: string;
  email: string;
  username: string;
  avatar: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

