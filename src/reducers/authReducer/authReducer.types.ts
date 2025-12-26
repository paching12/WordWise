import type { User } from "@shared/types/User";

export type AuthReducerState = {
  user?: User;
  isAuthenticated: boolean;
};

export const AUTH_ACTIONS = {
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
} as const;

export type ActionPayloadAuthTypes =
  (typeof AUTH_ACTIONS)[keyof typeof AUTH_ACTIONS];

export type PayloadAuthContent = {
  [AUTH_ACTIONS.LOGIN]: {
    user: User;
    password: string;
  };
  [AUTH_ACTIONS.LOGOUT]: undefined;
};

export type AuthAction = {
  [T in keyof PayloadAuthContent]: { type: T; payload: PayloadAuthContent[T] };
}[keyof PayloadAuthContent];

export type AuthActionReducer = AuthAction;
