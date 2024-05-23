import { RegisterDto } from ".";

export type LoginDto = Omit<RegisterDto, "userName">;
