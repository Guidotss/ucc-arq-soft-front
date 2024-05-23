import { User } from "@/types";
import { AuthState } from ".";

type AuthAction =
  | { type: "[Auth] - Login"; payload: { userData: User; token: string } }
  | { type: "[Auth] - Logout" };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "[Auth] - Login":
      return {
        ...state,
        user: action.payload.userData,
        token: action.payload.token,
      };
    case "[Auth] - Logout":
      return {
        ...state,
        user: null,
        token: "",
      };
    default:
      return state;
  }
};
