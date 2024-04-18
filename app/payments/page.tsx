"use client";
import React, { useEffect, useState } from "react";
import { useContextApi } from "../context/context";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButtom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { GrPrevious } from "react-icons/gr";

const PaymentPage = () => {
  const { selectedQuote }: any = useContextApi();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedQuote) {
      setAmount(selectedQuote.totalPremium);
    }
  }, [selectedQuote]);
  const router = useRouter();
  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/receipts");
    }, 3000); // First timeout after 1 second
  };

  return (
    <div className="flex flex-col  justify-center bg-white">
      <div
        className="flex items-center mt-2 cursor-pointer"
        onClick={() => router.back()}
      >
        <GrPrevious size={15} />
        <p>Back</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[40rem] sm:w-[22rem] border py-10 my-6  rounded-md shadow-2xl">
          <p className="flex justify-center text-[1.8rem] sm:text-[1.2rem] items-center">
            Pay{" "}
            {selectedQuote?.totalPremium
              ? `KES ${selectedQuote?.totalPremium?.toLocaleString()}`
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
                  className={"h-[3rem] p-[5px] border rounded-md"}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="flex justify-center items-center">
                  <CustomButton
                    name={`Pay ${amount ? `KES ${amount}` : ""} `}
                    onClick={handlePay}
                    className={
                      "h-[3rem] border w-[50%] sm:w-[100%] sm:h-[2.8rem] bg-[#cb7529] text-white my-5 rounded-md"
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
