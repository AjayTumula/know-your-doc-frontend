import { createContext, useState, useEffect } from "react";
import { loginUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("user"));

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", email);
    setUser(email);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
