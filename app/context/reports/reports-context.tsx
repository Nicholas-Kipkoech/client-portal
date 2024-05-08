"use client";
import {
  getCommissionPayable,
  getGLStatements,
  getPolicies,
  getPremiumReports,
  getUpcomingRenewals,
} from "@/app/services/apiServices";
import { format3months, formatYearly } from "@/app/utils/helpers";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

const ReportsContext = createContext({});

export const ReportsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [commissionPayable, setCommissionPayable] = useState([]);
  const [loadingCommissions, setLoadingCommissions] = useState(false);
  const [premiumReports, setPremiumReports] = useState([]);
  const [loadingPremiumReports, setLoadingPremiumReports] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [upcomingRenewals, setUpcomingRenewals] = useState([]);
  const [fromMonthDate, setFromMonthDate] = useState("1-Apr-2024");
  const [toMonthDate, setToMonthDate] = useState("30-Apr-2024");

  const [glStatements, setGLstatements] = useState([]);
  const [loadingGl, setLoadingGl] = useState(false);
  const [user, setUser] = useState<any>({});

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
    async function fetchCommissionPayable() {
      setLoadingCommissions(true);
      if (Object.keys(user).length > 0) {
        const response = await getCommissionPayable({
          fromDate: fromMonthDate,
          toDate: toMonthDate,
          intermediaryCode: user?.intermediaryCode,
          clientCode: user?.entityCode,
        });
        setLoadingCommissions(false);
        setCommissionPayable(response.results);
      }
    }
    fetchCommissionPayable();
  }, [user, toMonthDate, fromMonthDate]);

  useEffect(() => {
    async function fetchGlstatements() {
      setLoadingGl(true);
      if (Object.keys(user).length > 0) {
        const response = await getGLStatements({
          fromDate: fromMonthDate,
          toDate: toMonthDate,
          intermediaryCode: user?.intermediaryCode,
          clientCode: user?.entityCode,
        });

        setLoadingGl(false);
        setGLstatements(response.results);
      }
    }
    fetchGlstatements();
  }, [user, fromMonthDate, toMonthDate]);

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
  const { systemDate, next3Month } = format3months();
  useEffect(() => {
    async function fetchUpcomingRenewals() {
      if (Object.keys(user).length > 0) {
        const response = await getUpcomingRenewals({
          fromDate: systemDate,
          toDate: next3Month,
          intermediaryCode: user?.intermediaryCode,
          clientCode: user?.entityCode,
        });

        setUpcomingRenewals(response.results);
      }
    }
    fetchUpcomingRenewals();
  }, [user, systemDate, next3Month]);

  useEffect(() => {
    const { startDate, endDate } = formatYearly("2023");
    setFromDate(startDate);
    setToDate(endDate);
  }, []);

  return (
    <ReportsContext.Provider
      value={{
        commissionPayable,
        loadingCommissions,
        loadingGl,
        premiumReports,
        loadingPremiumReports,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        glStatements,
        upcomingRenewals,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsContext;
