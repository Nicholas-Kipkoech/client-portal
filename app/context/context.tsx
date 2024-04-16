"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IQuotes } from "../types";
import { jwtDecode } from "jwt-decode";

const Context = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState("Home");
  const [quotes, setQuotes] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const quotesString = localStorage.getItem("quotes");
      const quotes = quotesString ? JSON.parse(quotesString) : [];
      setQuotes(quotes);
    }
  }, []);

  function isUserAuthenticated(): boolean {
    const accessTokenJson = localStorage.getItem("accessToken");
    if (!accessTokenJson) return false;
    const decodedToken: any = jwtDecode(accessTokenJson);
    const currentTime = Date.now() / 1000;
    if (currentTime >= decodedToken?.exp) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessTokenJson: any = localStorage.getItem("accessToken");
      const decodedToken: any = jwtDecode(accessTokenJson);
      setUser(decodedToken.payload);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        quotes,
        isUserAuthenticated,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);
export default ContextProvider;
