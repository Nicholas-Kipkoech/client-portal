"use client";

import CustomButton from "@/app/utils/CustomButtom";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Accept = () => {
  const [quotes, setQuotes] = useState<any>({});
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const quotesString = localStorage.getItem("quotes");
      const quotes = quotesString ? JSON.parse(quotesString) : [];
      setQuotes(quotes);
    }
  }, []);

  const handleAcceptQuote = () => {
    router.push("/auth/login");
  };

  const handleRejectQuote = () => {
    router.push("/quote");
    localStorage.removeItem("state");
  };

  const CustomQuoteDiv = ({
    name,
    value,
    currency,
  }: {
    name: string;
    value: string | number;
    currency?: boolean;
  }) => {
    return (
      <div className="flex justify-between">
        <p>{name}</p>
        <p>{currency ? `KSH ${value}` : value}</p>
      </div>
    );
  };

  return (
    <div className="flex justify-center h-[100vh]   items-center border  bg-[white]">
      <div className=" border h-auto w-[600px] p-5 shadow-2xl divide-y rounded-md  gap-4">
        <CustomQuoteDiv
          currency
          name={"Total Premium"}
          value={quotes.totalPremium?.toLocaleString()}
        />
        <CustomQuoteDiv
          currency
          name={"Motor Value"}
          value={quotes.value?.toLocaleString()}
        />
        <CustomQuoteDiv
          currency
          name={"Basic Premium"}
          value={quotes.premium?.toLocaleString()}
        />
        <CustomQuoteDiv name={"Cover Date From"} value={quotes.coverDateFrom} />
        <CustomQuoteDiv name={"Cover Date From"} value={quotes.coverDateTo} />
        <CustomQuoteDiv name={"Model"} value={quotes.model} />
        <CustomQuoteDiv name={"Registration Number"} value={quotes.reqNumber} />
        <CustomQuoteDiv name={"Stamp Duty"} value={quotes.stamp_duty} />
        <CustomQuoteDiv name={"Training Levy"} value={quotes.trainning_levy} />
        <CustomQuoteDiv name={"Use"} value={quotes.use} />
        <CustomQuoteDiv
          name={"Year of Manufacture"}
          value={quotes.yearOfManufacture}
        />
        <div className="flex justify-between mt-2">
          <CustomButton
            name={"Accept Quote"}
            onClick={handleAcceptQuote}
            className="flex bg-[#cb7529] w-[100%] h-[2rem] rounded-md text-white  items-center justify-center border"
          />
          <CustomButton
            name={"Reject Quote"}
            onClick={handleRejectQuote}
            className="flex bg-red-600 w-[100%] h-[2rem] rounded-md text-white  items-center justify-center border"
          />
        </div>
      </div>
    </div>
  );
};

export default Accept;
