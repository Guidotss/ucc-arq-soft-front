"use client";
import { useReducer, FC, useEffect } from "react";
import cookies from "js-cookie";
import { AuthContext, authReducer } from ".";
import { LoginDto, RegisterDto, AuthResponse, User } from "@/types";
import { useToast } from "@/utils";

export interface AuthState {
  user: User | null;
  token: string;
}

const AUTH_INITIAL_STATE: AuthState = {
  user: null,
  token: "",
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { showToast } = useToast();

  useEffect(() => {
    refreshToken();
  }, []);

  const register = async (registerDto: RegisterDto): Promise<boolean> => {
    try {
      if (
        !registerDto.Username ||
        !registerDto.Email ||
        !registerDto.Password
      ) {
        showToast("Please fill in all fields", "error");
        return false;
      }
      console.log("RegisterDTO: ", registerDto);
      const reponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerDto),
        }
      );
      if (reponse.ok) {
        const data: AuthResponse = await reponse.json();
        cookies.set("token", data.token);
        dispatch({
          type: "[Auth] - Login",
          payload: { userData: data.user, token: data.token },
        });
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      showToast("An error occurred", "error");
      cookies.remove("token");
      return false;
    }
  };

  const login = async (loginDto: LoginDto): Promise<boolean> => {
    try {
      if (!loginDto.Email || !loginDto.Password) {
        showToast("Please fill in all fields", "error");
        return false;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(loginDto),
        }
      );
      if (response.ok) {
        const data: AuthResponse = await response.json();

        dispatch({
          type: "[Auth] - Login",
          payload: { userData: data.user, token: data.token },
        });
        cookies.set("token", data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      showToast("An error occurred", "error");
      cookies.remove("token");
      return false;
    }
  };

  const refreshToken = async () => {
    const token = cookies.get("token");
    if (!token) {
      return;
    }
    try {
      const reponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (reponse.ok) {
        const data: AuthResponse = await reponse.json();
        dispatch({
          type: "[Auth] - Login",
          payload: { userData: data.user, token: data.token },
        });
      } else {
        dispatch({ type: "[Auth] - Logout" });
      }
    } catch (error) {
      dispatch({ type: "[Auth] - Logout" });
    }
  };

  const logout = () => {
    cookies.remove("token");
    dispatch({ type: "[Auth] - Logout" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
