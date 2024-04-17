"use client";
import React, { useEffect, useState } from "react";
import { useContextApi } from "../context/context";
import { IQuotes } from "../types";
import CustomButton from "../utils/CustomButtom";
import Login from "../components/Login";
import { useRouter } from "next/navigation";

interface QuoteInterface extends IQuotes {
  data: any;
}

const QuotesPage = () => {
  const router = useRouter();
  const { quotes, isUserAuthenticated, setSelectedQuote }: any =
    useContextApi();
  const [openLogin, setOpenLogin] = useState(false);

  const handleSelectQuote = (data: any) => {
    if (!isUserAuthenticated()) {
      setOpenLogin(true);
    } else {
      setSelectedQuote(data);
      router.push("/payments");
    }
  };

  const CustomProduct = ({
    model,
    premium,
    yearOfManufacture,
    PHCfund,
    use,
    stamp_duty,
    trainning_levy,
    reqNumber,
    data,
    totalPremium,
    days,
  }: QuoteInterface) => {
    return (
      <div className="w-[46%]  border rounded-md shadow-2xl hover:border-[#cb7529] cursor-pointer">
        <div className="py-4 px-4 flex justify-between">
          <div>
            <p className="font-bold text-[1.15rem]">
              Total Premium: KES {totalPremium?.toLocaleString()}
            </p>
            <p>Basic premium: KES {premium?.toLocaleString()}</p>
            <p>Stamp Duty: KES {stamp_duty}</p>
            <p>PHC Fund: KES {PHCfund?.toLocaleString()}</p>
            <p>Training Levy: KES {trainning_levy?.toLocaleString()}</p>
          </div>
          <div>
            <p>Model: {model?.toUpperCase()}</p>
            <p>Year: {yearOfManufacture}</p>
            <p>Use: {use?.toUpperCase()}</p>
            <p>Reg Number: {reqNumber}</p>
            <p className="font-semibold">Cover Period: {days}</p>
          </div>
        </div>
        <div className="flex justify-center px-5 py-5">
          <CustomButton
            name={"Accept Quote"}
            onClick={() => handleSelectQuote(data)}
            className=" h-[40px] border w-[20rem] rounded-md bg-[#cb7529] text-white"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[white] py-4 px-4 h-auto">
      <p className="text-[1.8rem] font-bold">Requested Quotes</p>

      <div className="flex flex-wrap justify-center gap-4">
        {quotes.map((quote: IQuotes, index: number) => (
          <CustomProduct
            key={index}
            model={quote.model}
            premium={quote.premium}
            yearOfManufacture={quote.yearOfManufacture}
            PHCfund={quote.PHCfund}
            use={quote.use}
            trainning_levy={quote.trainning_levy}
            reqNumber={quote.reqNumber}
            stamp_duty={quote.stamp_duty}
            totalPremium={quote.totalPremium}
            days={quote.days}
            data={quote}
          />
        ))}
      </div>
      <Login open={openLogin} handleClose={() => setOpenLogin(false)} />
    </div>
  );
};

export default QuotesPage;