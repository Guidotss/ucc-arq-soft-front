import { UserRole } from ".";

export type User  = {
  id: string;
  email: string;
  userName: string;
  avatar: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

