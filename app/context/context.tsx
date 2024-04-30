"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  getClaimCreditNotes,
  getClaimDebits,
  getClaims,
  getPolicies,
  getPremiumReports,
  getPremiumsAndCommission,
  getReceipts,
  getReceiptsData,
} from "../services/apiServices";

const Context = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState("Home");
  const [quotes, setQuotes] = useState([]);
  const [user, setUser] = useState<any>({});
  const [years, setYears] = useState<number[]>([]);
  const [selectedQuote, setSelectedQuote] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [loadingPolicies, setLoadingPolices] = useState(false);
  const [loadingClaims, setLoadingClaims] = useState(false);
  const [acceptedQuotes, setAcceptedQuotes] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [fromDate, setFromDate] = useState("1-Jan-2023");
  const [toDate, setToDate] = useState("31-Dec-2023");
  const [uwData, setUwData] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [premiumReports, setPremiumReports] = useState([]);
  const [claimCreditNotes, setClaimCreditNotes] = useState([]);
  const [receiptsData, setReceiptsData] = useState([]);
  const [debits, setDebits] = useState([]);
  const [loadingPremiumReports, setLoadingPremiumReports] = useState(false);
  const [loadingUwData, setLoadingUwData] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchPolicies() {
      setLoadingPolices(true);
      if (Object.keys(user).length > 0) {
        const response = await getPolicies({
          intermediaryCode: user?.intermediaryCode,
          clientCode: user?.entityCode,
        });
        setLoadingPolices(false);
        setPolicies(response.results);
      }
    }
    fetchPolicies();
  }, [user]);

  useEffect(() => {
    async function fetchClaims() {
      setLoadingClaims(true);
      if (Object.keys(user).length > 0) {
        const response = await getClaims({
          intermediaryCode: user?.intermediaryCode,
          clientCode: user?.entityCode,
        });
        setLoadingClaims(false);
        setClaims(response.results);
      }
    }
    fetchClaims();
  }, [user]);
  useEffect(() => {
    async function fetchPremiums() {
      setLoadingUwData(true);
      if (Object.keys(user).length > 0) {
        const response = await getPremiumsAndCommission({
          fromDate: fromDate,
          toDate: toDate,
          intermediaryCode: user?.intermediaryCode,
          clientCode: user?.entityCode,
        });
        setLoadingUwData(false);
        setUwData(response.results);
      }
    }
    fetchPremiums();
  }, [user, fromDate, toDate]);

  useEffect(() => {
    async function fetchReceipts() {
      if (Object.keys(user).length > 0) {
        const response = await getReceiptsData({
          fromDate: fromDate,
          toDate: toDate,
          intermediaryCode: user?.intermediaryCode,
          clientCode: user?.entityCode,
        });
        setReceipts(response.results);
      }
    }
    fetchReceipts();
  }, [user, fromDate, toDate]);
  useEffect(() => {
    async function fetchPremiumReports() {
      setLoadingPremiumReports(true);
      if (Object.keys(user).length > 0) {
        const response = await getPremiumReports({
          fromDate: fromDate,
          toDate: toDate,
          intermediaryCode: user?.intermediaryCode,
          clientCode: user?.entityCode,
        });
        setLoadingPremiumReports(false);
        setPremiumReports(response.results);
      }
    }
    fetchPremiumReports();
  }, [user, fromDate, toDate]);

  useEffect(() => {
    async function fetchClaimCreditNotes() {
      if (Object.keys(user).length > 0) {
        const response = await getClaimCreditNotes({
          intermediaryCode: user?.intermediaryCode,
          clientCode: user?.entityCode,
        });
        setClaimCreditNotes(response.results);
      }
    }
    fetchClaimCreditNotes();
  }, [user]);
  useEffect(() => {
    async function fetchReceipts() {
      if (Object.keys(user).length > 0) {
        const response = await getReceipts({
          intermediaryCode: user?.intermediaryCode,
          clientCode: user?.entityCode,
        });
        setReceiptsData(response.results);
      }
    }
    fetchReceipts();
  }, [user]);
  useEffect(() => {
    async function fetchClaimDebits() {
      if (Object.keys(user).length > 0) {
        const response = await getClaimDebits({
          intermediaryCode: user?.intermediaryCode,
          clientCode: user?.entityCode,
        });
        setDebits(response.results);
      }
    }
    fetchClaimDebits();
  }, [user]);

  const calculateUwData = (uwData: any[]) => {
    const totalPremium = uwData.reduce((total: number, uw) => {
      return (
        total +
        uw.newBusiness +
        uw.renewals +
        uw.refund +
        uw.additional +
        uw.facin +
        uw.commission
      );
    }, 0);
    const totalCommission = uwData.reduce((total: number, uw) => {
      return total + uw.commission;
    }, 0);
    return { totalPremium, totalCommission };
  };
  const { totalPremium, totalCommission } = calculateUwData(uwData);

  const calculateTotalByCurrency = (receipts: any[]) => {
    return receipts.reduce((acc: any, curr) => {
      const { currencyCode, receiptAmount } = curr;
      // Check if the currency code already exists in the accumulator object
      if (acc[currencyCode]) {
        // If exists, add the current receipt amount to the existing total
        acc[currencyCode].total += receiptAmount;
        // Increment the count for the currency code
        acc[currencyCode].count++;
      } else {
        // If currency code doesn't exist, create a new entry
        acc[currencyCode] = {
          total: receiptAmount,
          count: 1,
        };
      }
      return acc;
    }, {});
  };
  const receiptResults = calculateTotalByCurrency(receipts);

  const currentYear = new Date(Date.now()).getFullYear();
  const nextYear = currentYear + 1;

  const filteredPolicies = policies.filter((policy: any) => {
    const policyYear = new Date(policy.periodTo).getFullYear();
    return policyYear === currentYear || policyYear === nextYear;
  });
  const openClaims = claims.filter((claim: any) => {
    return claim.status === "Open";
  });

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        quotes,
        isUserAuthenticated,
        user,
        years,
        selectedQuote,
        setSelectedQuote,
        isMobile,
        acceptedQuotes,
        setAcceptedQuotes,
        policies,
        filteredPolicies,
        loadingPolicies,
        claims,
        loadingClaims,
        totalPremium,
        totalCommission,
        setFromDate,
        setToDate,
        loadingUwData,
        receiptResults,
        openClaims,
        premiumReports,
        loadingPremiumReports,
        fromDate,
        toDate,
        claimCreditNotes,
        receiptsData,
        debits,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);
export default ContextProvider;
