import type { AuthReducerState } from "../../reducers/authReducer/authReducer.types";

export type AuthContextProps = {
  children: React.ReactNode;
};

export type AuthContextState = {
  login?: (n: string, p: string) => void;
  logout?: () => void;
} & AuthReducerState;
