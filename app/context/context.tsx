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
  const [cachedQuotes, setCachedQuotes] = useState({});

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

  // const getQuotes = async (forceRefresh = false) => {
  //   if (!forceRefresh) {
  //     return cachedQuotes;
  //   }else{
  //     const fetchedQuotes =
  //   }
  // };

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

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (Object.keys(user).length > 1) {
      setUserEmail(user?.email);
    }
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        quotes,
        isUserAuthenticated,
        user,
        userEmail,
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
