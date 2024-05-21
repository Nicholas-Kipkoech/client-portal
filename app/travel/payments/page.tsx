"use client";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import CustomSelect from "@/app/utils/CustomSelect";
import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const Payments = () => {
  const router = useRouter();
  function handlePayments() {
    router.push("/travel/documents");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border h-auto w-auto p-10 bg-white shadow-2xl rounded-md">
        <p className="text-[1.5rem]">Fill your details</p>
        <div className="flex gap-2">
          <CustomInput
            name={"First Name"}
            value={""}
            className="w-[15rem] border rounded-md"
          />
          <CustomInput
            name={"Second Name"}
            value={""}
            className="w-[15rem] border rounded-md"
          />
        </div>
        <div className="flex gap-2">
          <CustomInput
            name={"Phone Number"}
            value={""}
            className="w-[15rem] border rounded-md"
          />
          <CustomInput
            name={"KRA PIN No"}
            value={""}
            className="w-[15rem] border rounded-md"
          />
        </div>
        <div className="flex gap-2">
          <CustomInput
            name={"Postal Address"}
            value={""}
            className="w-[15rem] border rounded-md"
          />
          <CustomInput
            name={"Physical Address"}
            value={""}
            className="w-[15rem] border rounded-md"
          />
        </div>
        <CustomSelect name="Gender" onChange={() => {}} options={[]} />

        <CustomInput
          name={"MPESA Phone Number"}
          value={""}
          className=" border rounded-md h-[2.4rem]"
        />
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
      </div>
    </div>
  );
};

export default Payments;
