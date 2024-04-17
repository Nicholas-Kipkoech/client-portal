"use client";
import React, { useEffect, useState } from "react";
import { useContextApi } from "../context/context";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButtom";

const PaymentPage = () => {
  const { selectedQuote }: any = useContextApi();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (selectedQuote) {
      setAmount(selectedQuote.totalPremium);
    }
  }, [selectedQuote]);
  return (
    <div className="flex justify-center bg-white">
      <div className="w-[40rem] border py-10 my-6 rounded-md">
        <p className="flex justify-center text-[1.8rem] items-center">
          Pay KES {selectedQuote?.totalPremium?.toLocaleString()} with MPESA
        </p>

        <div className="px-5">
          <CustomInput
            name={"Phone Number"}
            placeholder={"+2547123..."}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={"h-[3rem] p-[5px] border rounded-md"}
          />
          <CustomInput
            name={"Amount (KES)"}
            value={amount}
            className={"h-[3rem] p-[5px] border rounded-md"}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex justify-center items-center">
            <CustomButton
              name={`Pay ${amount ? `KES ${amount}` : ""} `}
              className={
                "h-[3rem] border w-[50%] bg-[#cb7529] text-white my-5 rounded-md"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
