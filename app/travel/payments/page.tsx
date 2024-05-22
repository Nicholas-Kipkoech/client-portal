"use client";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import CustomSelect from "@/app/utils/CustomSelect";
import { Spin } from "antd";
import axios from "axios";
import { Kranky } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Payments = () => {
  const router = useRouter();

  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    secondName: "",
    phoneNumber: "",
    KraPinNo: "",
    postalAddress: "",
    physicalAddress: "",
    gender: "",
    mpesaNo: "",
    email: "",
  });
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("Processing");

  useEffect(() => {
    const quotePayload: any = localStorage.getItem("travelQuote");
    setPayload(JSON.parse(quotePayload));
    const total: any = localStorage.getItem("total");
    setTotal(total);
  }, []);
  const paymentPayload = {
    token: payload.token,
    paymentRequest: {
      phoneNumber: customerDetails.mpesaNo.replace(
        customerDetails.mpesaNo[0],
        "254"
      ),
      accountReference: payload.coverCode,
      amount: Number(total),
    },
    policyPayload: {
      requestSource: "ClientPortal",
      clientPayload: {
        clientFirstName: customerDetails.firstName,
        clientSecondName: customerDetails.secondName,
        clientCellphone: customerDetails.phoneNumber,
        clientTaxNo: customerDetails.KraPinNo,
        clientGender: customerDetails.gender,
        clientEmail: customerDetails.email,
        clientPostalAddress: customerDetails.postalAddress,
        clientPhysicalAddress: customerDetails.physicalAddress,
        clientFacebookUserID: "",
        clientTwitterHandle: "",
        token: payload.token,
      },
      policyDetails: {
        policyType: "Quote",
        policyProductCode: "093",
        policyCurrency: "USD",
        policyFromDate: payload.policyFromDate,
        policyExpiryDate: payload.policyExpiryDate,
        clientCode: "",
        token: payload.token,
        dob: payload.dob,
        coverCode: payload.coverCode,
      },
    },
  };
  async function handlePayments() {
    setLoading(true);
    try {
      setMessage("Processing....");
      const response = await axios.post(
        "http://105.27.207.82:8101/icon/bima/uw/create_quote_express",
        paymentPayload
      );
      if (response.data.info === "Success") {
        localStorage.setItem("policyResponse", JSON.stringify(response.data));
        setMessage("Success");
        setLoading(false);
        router.push("/travel/documents");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border h-auto w-auto p-10 bg-white shadow-2xl rounded-md">
        {loading ? (
          <div className="h-[20rem] flex justify-center items-center w-[30rem] border">
            <Spin size={"large"} />
            <p>{message}</p>
          </div>
        ) : (
          <>
            <p className="text-[1.5rem]">Fill in your details</p>
            <div className="flex gap-2">
              <CustomInput
                name={"First Name"}
                value={customerDetails.firstName}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    firstName: e.target.value,
                  })
                }
                className="w-[15rem] border rounded-md"
              />
              <CustomInput
                name={"Second Name"}
                value={customerDetails.secondName}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    secondName: e.target.value,
                  })
                }
                className="w-[15rem] border rounded-md"
              />
            </div>
            <div className="flex gap-2">
              <CustomInput
                name={"Phone Number"}
                value={customerDetails.phoneNumber}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    phoneNumber: e.target.value,
                  })
                }
                className="w-[15rem] border rounded-md"
              />
              <CustomInput
                name={"KRA PIN No"}
                value={customerDetails.KraPinNo}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    KraPinNo: e.target.value,
                  })
                }
                className="w-[15rem] border rounded-md"
              />
            </div>
            <div className="flex gap-2">
              <CustomInput
                name={"Postal Address"}
                value={customerDetails.postalAddress}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    postalAddress: e.target.value,
                  })
                }
                className="w-[15rem] border rounded-md"
              />
              <CustomInput
                name={"Physical Address"}
                value={customerDetails.physicalAddress}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    physicalAddress: e.target.value,
                  })
                }
                className="w-[15rem] border rounded-md"
              />
            </div>
            <CustomSelect
              name="Gender"
              onChange={(value: any) =>
                setCustomerDetails({ ...customerDetails, gender: value.value })
              }
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
            />
            <div className="flex gap-2">
              <CustomInput
                name={"MPESA Phone Number"}
                value={customerDetails.mpesaNo}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    mpesaNo: e.target.value,
                  })
                }
                className=" border rounded-md h-[2.4rem] w-[15rem]"
              />{" "}
              <CustomInput
                name={"Email"}
                value={customerDetails.email}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    email: e.target.value,
                  })
                }
                className=" border rounded-md h-[2.4rem] w-[15rem]"
              />
            </div>
            <div className="flex">
              <CustomButton
                name={"Pay for quote"}
                onClick={handlePayments}
                className="w-full border mt-2 h-[2.5rem] rounded-md bg-[#cb7529] text-white"
              />
              <CustomButton
                name={"Cancel"}
                onClick={() => router.back()}
                className="w-full border mt-2 h-[2.5rem] rounded-md bg-red-500 text-white"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payments;
