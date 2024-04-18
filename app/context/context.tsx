"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IQuotes } from "../types";
import { jwtDecode } from "jwt-decode";

const Context = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState("Home");
  const [quotes, setQuotes] = useState([]);
  const [user, setUser] = useState<any>({});
  const [years, setYears] = useState<number[]>([]);
  const [selectedQuote, setSelectedQuote] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const years: number[] = [];
    const currentYear = new Date(Date.now()).getFullYear();

    function getYears() {
      for (let i = currentYear - 15; i <= currentYear; i++) {
        years.push(i);
      }
    }
    setYears(years);
    getYears();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const quotesString = localStorage.getItem("quotes");
      const quotes = quotesString ? JSON.parse(quotesString) : [];
      setQuotes(quotes);
    }
  }, []);

  function isUserAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      const accessTokenJson = localStorage.getItem("accessToken");
      if (!accessTokenJson) return false;
      const decodedToken: any = jwtDecode(accessTokenJson);
      const currentTime = Date.now() / 1000;
      if (currentTime >= decodedToken?.exp) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessTokenJson: any = localStorage.getItem("accessToken");
      if (accessTokenJson) {
        const decodedToken: any = jwtDecode(accessTokenJson);
        setUser(decodedToken.payload);
      }
    }
  }, []);

  const [userInitials, setUserInitials] = useState("");

  useEffect(() => {
    if (Object.keys(user).length > 1) {
      setUserInitials(user?.fullName);
    }
  }, [user]);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        return window.innerWidth < 768;
      }
      return false;
    };
    setIsMobile(checkMobile());
  }, []);

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        quotes,
        isUserAuthenticated,
        user,
        userInitials,
        years,
        selectedQuote,
        setSelectedQuote,
        isMobile,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);
export default ContextProvider;
