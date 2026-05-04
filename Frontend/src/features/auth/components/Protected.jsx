import { Navigate } from "react-router";
import { useAuth } from "../hook/useAuth"; 

const Protected = ({ children }) => {
  const { authLoading, user } = useAuth();

  if (authLoading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  return children;
};

export default Protected;
