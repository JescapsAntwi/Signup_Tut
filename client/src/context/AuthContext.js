import React, { createContext, useState, useEffect, useContext } from "react";
import apiService from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          //Get user profile
          const { user } = await apiService.getProfile();
          setUser(user);
        } catch (error) {
          //Token is invalid or expired
          console.error("Auth error:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }

      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  //Register a new user
  const register = async (userData) => {
    const response = await apiService.register(userData);

    //Save token to localStorage
    localStorage.setItem("token", response.token);

    //Set user in state
    setUser(response.user);
    return response;
  };

  //Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  //Context value
  const value = {
    user,
    loading,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
