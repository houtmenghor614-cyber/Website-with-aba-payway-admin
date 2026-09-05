import React, { useCallback, useMemo, useState } from "react";
import { adminLogin } from "../api/authApi";
import { clearAuthStorage, getStorage, setStorage } from "../utils/storage";

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStorage("token"));
  const [admin, setAdmin] = useState(() => getStorage("admin"));

  const persist = useCallback((accessToken, user) => {
    setStorage("token", accessToken);
    setStorage("admin", user);
    setToken(accessToken);
    setAdmin(user);
  }, []);

  const login = useCallback(
    async (payload) => {
      const data = await adminLogin(payload); // throws unless role === admin
      persist(data.access_token, data.user);
      return data;
    },
    [persist]
  );

  const logout = useCallback(() => {
    clearAuthStorage();
    setToken(null);
    setAdmin(null);
  }, []);

  const updateAdmin = useCallback(
    (next) => {
      const merged = { ...admin, ...(next || {}) };
      setStorage("admin", merged);
      setAdmin(merged);
    },
    [admin]
  );

  const value = useMemo(
    () => ({
      token,
      admin,
      isAuthenticated: Boolean(token && admin?.role === "admin"),
      login,
      logout,
      updateAdmin,
    }),
    [token, admin, login, logout, updateAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
