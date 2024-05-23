import { User } from "@/types";

export type AuthResponse = {
    ok: boolean;
    message: string; 
    data: User
    token: string;
}