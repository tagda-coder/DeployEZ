import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [actionLoading, setActionLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [actionType, setActionType] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        actionLoading,
        setActionLoading,
        actionType,
        setActionType,
        authLoading,
        setAuthLoading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
