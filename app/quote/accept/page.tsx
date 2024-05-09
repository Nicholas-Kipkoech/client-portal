"use client";
import { IQuotes } from "@/app/types";
import React, { useEffect, useState } from "react";

const Accept = () => {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const quotesString = localStorage.getItem("payload");
      const quotes = quotesString ? JSON.parse(quotesString) : [];
      setQuotes(quotes);
    }
  }, []);

  const CustomProduct = ({
    model,
    premium,
    yearOfManufacture,
    reqNumber,
    totalPremium,
    value,
  }: IQuotes) => {
    return (
      <div className="md:w-auto border rounded-md shadow-2xl hover:border-[#cb7529] cursor-pointer">
        <div className="py-4 px-4 flex justify-between">
          <div>
            <p className="font-bold text-[1.15rem] sm:text-[0.8rem]">
              Quote Number: Q/02/03258/04/2024
            </p>
            <p className="sm:text-[0.9rem] md:text-[1rem]">Insured :Null</p>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              Sum Insured : KES {value?.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              Premium: {premium.toLocaleString()}
            </p>

            <p className="font-semibold sm:text-[0.9rem] md:text-[1rem]">
              Intermediary: Direct
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center   items-center">
      <div className="flex flex-wrap justify-center gap-4 mt-2 sm:flex-col md:flex-row">
        {quotes.map((quote: IQuotes, index: number) => (
          <CustomProduct
            key={index}
            model={quote.model}
            premium={quote.premium}
            yearOfManufacture={quote.yearOfManufacture}
            PHCfund={quote.PHCfund}
            trainning_levy={quote.trainning_levy}
            reqNumber={quote.reqNumber}
            stamp_duty={quote.stamp_duty}
            totalPremium={quote.totalPremium}
            days={quote.days}
            value={quote.value}
          />
        ))}
      </div>
    </div>
  );
};

export default Accept;
