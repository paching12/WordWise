import {
  AUTH_ACTIONS,
  type AuthActionReducer,
  type AuthReducerState,
} from "./authReducer.types";

// Reducer
export const initialAuthState: AuthReducerState = {
  user: undefined,
  isAuthenticated: false,
};

export const AuthReducer = (
  state: AuthReducerState,
  action: AuthActionReducer
) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case AUTH_ACTIONS.LOGOUT:
    default:
      return initialAuthState;
  }
};
