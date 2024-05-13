"use client";
import React, { useEffect, useState } from "react";
import { useContextApi } from "../../context/context";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { GrPrevious } from "react-icons/gr";
import CustomInput from "@/app/utils/CustomInput";
import CustomButton from "@/app/utils/CustomButtom";
import { createPolicy } from "@/app/services/apiServices";
import { useCustomToast } from "@/app/constants/useToast";

const PaymentPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      const quotes: any = localStorage.getItem("quotes");
      const JSONresults = JSON.parse(quotes);
      setQuote(JSONresults);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(quote).length > 0) {
      setAmount(quote.totalPremium);
      setPhoneNumber(quote.phoneNumber);
    }
  }, [quote]);

  const router = useRouter();
  const showToast = useCustomToast();
  const handlePay = async () => {
    try {
      setLoading(true);
      const res = await createPolicy({
        paymentNumber: phoneNumber,
        kraPin: quote.kraPIN,
        name: quote.fullName,
        address: quote.address,
        mobileNumber: quote.phoneNumber,
        email: quote.email,
        coverDateFrom: quote.coverDateFrom,
        coverDateTo: quote.coverDateTo,
        vehicleReg: quote.reqNumber,
        vehicleUse: quote.use,
        vehicleManYear: quote.yearOfManufacture,
        vehiclePremium: quote.premium,
        grossPremium: quote.totalPremium,
        vehicleMake: quote.model,
        vehicleModel: quote.model,
        vehicleValue: parseInt(quote.value),
      });
      console.log(res);
      if (res.response.success === true) {
        setLoading(false);
        showToast("Policy created successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center bg-white h-[100vh]">
      <div
        className="flex items-center mt-2 cursor-pointer"
        onClick={() => router.back()}
      >
        <GrPrevious size={15} />
        <p>Back</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="md:w-[40rem] sm:w-[22rem] border py-10 my-6 hover:border-[#cb7529]  rounded-md shadow-2xl">
          <p className="flex justify-center md:text-[1.8rem] sm:text-[1.2rem] items-center">
            Pay{" "}
            {quote?.totalPremium
              ? `KES ${quote?.totalPremium?.toLocaleString()}`
              : ""}{" "}
            with MPESA
          </p>

          <div className="px-5 flex justify-center flex-col">
            {loading ? (
              <div className=" justify-center flex flex-col py-10">
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 60,
                        color: "#cb7229",
                      }}
                      spin
                    />
                  }
                />
                <p className="flex justify-center">
                  {"Processing payments..."}
                </p>
              </div>
            ) : (
              <>
                <CustomInput
                  name={"Phone Number"}
                  placeholder={"+2547123..."}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={"h-[3rem]  p-[5px] border rounded-md"}
                />
                <CustomInput
                  name={"Amount (KES)"}
                  value={amount}
                  disabled
                  className={"h-[3rem] p-[5px] border rounded-md"}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="flex justify-center items-center">
                  <CustomButton
                    name={`Pay ${
                      amount ? `KES ${amount.toLocaleString()}` : ""
                    } `}
                    onClick={handlePay}
                    className={
                      "md:h-[3rem] border w-[50%]  bg-[#cb7529] text-white my-5 rounded-md"
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
