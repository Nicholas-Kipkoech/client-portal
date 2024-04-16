"use client";
import { createContext, useContext, useState } from "react";
import { IQuotes } from "../types";

const Context = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState("Home");

  const quotesString = localStorage.getItem("quotes");
  const quotes = quotesString ? JSON.parse(quotesString) : [];

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        quotes,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);
export default ContextProvider;
