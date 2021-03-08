import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(() => {
    let localData = localStorage.getItem("userContext");
    localData = localData ? JSON.parse(localData) : { user: {} };
    return localData.user;
  });

  useEffect(() => {
    const userContext = { user };
    localStorage.setItem("userContext", JSON.stringify(userContext));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;