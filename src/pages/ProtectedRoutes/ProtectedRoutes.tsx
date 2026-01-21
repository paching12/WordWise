import { useAuth } from "@contexts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ProtectedRoutesProps } from "./ProtectedRoutes.types";

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoutes;
