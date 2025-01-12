import React, { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axiosInstance from "../instances/axiosInstance";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
}

interface CustomJwtPayload extends JwtPayload {
  id?: string; // Add custom claims if needed
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newToken}`;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    axiosInstance.defaults.headers.common["Authorization"] = ""; // Clear token from Axios
    window.location.href = "/login"; // Redirect to login
  };

  // Auto-login on app load if token is valid
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);

        // Check if the token has expired
        if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
        } else {
          logout(); // Expired token
        }
      } catch {
        logout(); // Invalid token
      }
    }
  }, [token]); // Run when `token` changes

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        login,
        logout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
