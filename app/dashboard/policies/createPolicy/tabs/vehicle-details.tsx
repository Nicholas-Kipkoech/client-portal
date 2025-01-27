"use client";

import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import CustomSelect from "@/app/utils/CustomSelect";
import { useRouter } from "next/navigation";
import React from "react";

const VehicleDetails = () => {
  const router = useRouter();
  const handleActionBtn = (action: "back" | "next") => {
    if (action === "back") {
      router.push("?tab=client-details");
    } else {
      router.push(`?tab=cover-details`);
    }
  };

  return (
    <div className="w-full">
      <p className="text-[1.3rem] flex justify-center font-bold">
        Vehicle Details Form
      </p>
      <div className="grid grid-cols-2 gap-4">
        <CustomInput
          required
          name="Registration Number"
          className=" w-full border-2 rounded-md"
          value={""}
          onChange={() => {}}
        />
        <CustomInput
          name="Chassis Number"
          className=" w-full border-2 rounded-md"
          value={""}
          required
          onChange={() => {}}
        />
        <CustomInput
          name="Engine No"
          required
          className=" w-full border-2 rounded-md"
          value={""}
          onChange={() => {}}
        />
        <CustomSelect name="Vehicle Type" options={[]} onChange={() => {}} />
        <CustomInput
          name="Year of Manufacture"
          required
          className=" w-full border-2 rounded-md"
          value={""}
          onChange={() => {}}
        />

        <CustomInput
          name="Vehicle CC"
          required={false}
          className=" w-full border-2 rounded-md"
          value={""}
          onChange={() => {}}
        />
        <CustomInput
          name="Vehicle Make"
          className=" w-full border-2 rounded-md"
          value={""}
          required
          onChange={() => {}}
        />
        <CustomInput
          name="Vehicle Model"
          className=" w-full border-2 rounded-md"
          value={""}
          required
          onChange={() => {}}
        />
        <CustomInput
          name="Log Book No"
          className=" w-full border-2 rounded-md"
          value={""}
          required={false}
          onChange={() => {}}
        />
      </div>

      <div className="mt-5 flex justify-center gap-[2rem]">
        <CustomButton
          name="Back"
          className="border bg-[#092332] text-white w-[8rem] h-[2.2rem] rounded-md"
          onClick={() => handleActionBtn("back")}
        />
        <CustomButton
          name="Next"
          className="border bg-[#092332] text-white w-[8rem] h-[2.2rem] rounded-md"
          onClick={() => handleActionBtn("next")}
        />
      </div>
    </div>
  );
};

export default VehicleDetails;
