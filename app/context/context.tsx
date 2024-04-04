"use client";
import { createContext, useContext, useState } from "react";

const Context = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState("Home");

  return (
    <Context.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);
export default ContextProvider;
