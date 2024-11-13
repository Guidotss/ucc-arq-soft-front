import { RegisterDto } from "@/types";

export const registerUserMapper = (registerDto: RegisterDto) => {
    return { 
        name: registerDto.Username,
        lastname: "perez", 
        email: registerDto.Email,
        password: registerDto.Password,
        birthdate: new Date().toISOString(),
    }
}