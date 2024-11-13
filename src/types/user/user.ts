import { UserRole } from ".";

export type User  = {
  id: string;
  email: string;
  name: string;
  lastname: string;
  avatar: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

