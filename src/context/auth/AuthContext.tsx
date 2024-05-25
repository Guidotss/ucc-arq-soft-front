"use client"
import { LoginDto, RegisterDto, User } from "@/types";
import { createContext } from "react";

export interface AuthContextProps {
  user: User | null;
  token: string;
  login: (loginDto: LoginDto) => Promise<boolean>;
  register: (registerDto: RegisterDto) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);
