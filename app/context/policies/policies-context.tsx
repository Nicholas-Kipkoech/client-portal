"use client";
import { getPolicies } from "@/app/services/apiServices";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

const PolicyContext = createContext({});

export const PolicyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [policies, setPolicies] = useState([]);
  const [loadingPolicies, setLoadingPolices] = useState(false);
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

  const currentYear = new Date(Date.now()).getFullYear();
  const nextYear = currentYear + 1;

  const filteredPolicies = policies.filter((policy: any) => {
    const policyYear = new Date(policy.periodTo).getFullYear();
    return policyYear === currentYear || policyYear === nextYear;
  });

  return (
    <PolicyContext.Provider
      value={{ loadingPolicies, policies, filteredPolicies }}
    >
      {children}
    </PolicyContext.Provider>
  );
};

export default PolicyContext;
