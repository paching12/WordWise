export type AuthReducerState = {
  user?: string;
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
    user: string;
    password: string;
  };
  [AUTH_ACTIONS.LOGOUT]: undefined;
};

export type AuthAction = {
  [T in keyof PayloadAuthContent]: { type: T; payload: PayloadAuthContent[T] };
}[keyof PayloadAuthContent];

export type AuthActionReducer = AuthAction;
