"use client";

import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import CustomSelect from "@/app/utils/CustomSelect";
import { useRouter } from "next/navigation";
import React from "react";

const CoverDetails = () => {
  const router = useRouter();
  const handleActionBtn = (action: "back" | "next") => {
    if (action === "back") {
      router.push("?tab=vehicle-details");
    }
  };

  return (
    <div className="w-full">
      <p className="text-[1.3rem] flex justify-center font-bold">
        Cover Details Form
      </p>
      <div className="grid grid-cols-2 gap-4">
        <CustomSelect
          required
          name="Cover Name"
          className=" w-full border-2 rounded-md"
          options={[]}
          onChange={() => {}}
        />
        <CustomInput
          name="From Date"
          type="date"
          className=" w-full border-2 rounded-md"
          value={""}
          required
          onChange={() => {}}
        />
        <CustomInput
          name="To Date"
          type="date"
          className=" w-full border-2 rounded-md"
          value={""}
          required
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

export default CoverDetails;
