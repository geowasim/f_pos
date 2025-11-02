import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user] = useState(null);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
