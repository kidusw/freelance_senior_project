import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Initialize state from localStorage if available
    const storedStatus = localStorage.getItem("isLoggedIn");
    return storedStatus === "true";
  });

  // Login function
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Persist to localStorage
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false"); // Persist to localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
