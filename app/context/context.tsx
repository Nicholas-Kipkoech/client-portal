"use client";
import { createContext, useContext, useState } from "react";
import { IQuotes } from "../types";

const Context = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState("Home");
  const [quotes, setQuotes] = useState<IQuotes[]>([]);

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        quotes,
        setQuotes,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);
export default ContextProvider;
