
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    let localData = localStorage.getItem("authContext");
    localData = localData ? JSON.parse(localData) : { isAuthenticated: false };
    return localData.isAuthenticated;
  });

  const [token, setToken] = useState(() => {
    let localData = localStorage.getItem("authContext");
    localData = localData ? JSON.parse(localData) : { token: "" };
    return localData.token;
  });

  useEffect(() => {
    const authContext = { isAuthenticated, token };
    localStorage.setItem("authContext", JSON.stringify(authContext));
  }, [isAuthenticated, token]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, token, setToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
