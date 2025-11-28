import { createContext, useContext, useReducer, type FC } from "react";
import type { AuthContextProps, AuthContextState } from "./AuthContext.types";
import {
  AuthReducer,
  initialAuthState,
} from "../../reducers/authReducer/authReducer";
import { AUTH_ACTIONS } from "../../reducers/authReducer/authReducer.types";
// import { AUTH_ACTIONS } from "../../reducers/authReducer/authReducer.types";

const AuthContext = createContext<AuthContextState>({
  user: undefined,
  isAuthenticated: false,
});

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    AuthReducer,
    initialAuthState
  );

  const login = (newUser: string, password: string) => {
    dispatch({
      type: AUTH_ACTIONS.LOGIN,
      payload: {
        user: newUser,
        password,
      },
    });
  };
  const logout = () => {};
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Auth context was used outside the AuthProvider ");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
