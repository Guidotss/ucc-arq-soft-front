import { User } from "@/types";

export type AuthResponse = {
    ok: boolean;
    message: string; 
    user: User
    token: string;
}