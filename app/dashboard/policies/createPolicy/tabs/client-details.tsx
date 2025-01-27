"use client";

import { useContextApi } from "@/app/context/context";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import CustomSelect from "@/app/utils/CustomSelect";
import { useRouter } from "next/navigation";
import React from "react";

const ClientDetails = () => {
  const { systemCodes }: any = useContextApi();

  const systemCodesOptions = systemCodes
    .filter((item: any) => item.SYS_TYPE === "Institutional_Sector")
    .map((clientType: any) => {
      return {
        label: clientType.SYS_NAME,
        value: clientType.SYS_CODE,
      };
    });

  const router = useRouter();
  const handleActionBtn = (action: "back" | "next") => {
    if (action === "back") {
      router.push("/dashboard");
    } else {
      router.push(`?tab=vehicle-details`);
    }
  };

  return (
    <div className="w-full">
      <p className="text-[1.3rem] flex justify-center font-bold">
        Client Details Form
      </p>
      <div className="grid grid-cols-2 gap-4">
        <CustomInput
          required
          name="First Name"
          className="w-full border-2 rounded-md"
          value={""}
          onChange={() => {}}
        />
        <CustomInput
          name="Second Name"
          className=" w-full border-2 rounded-md"
          value={""}
          required
          onChange={() => {}}
        />
        <CustomInput
          name="Email"
          type="email"
          required
          className=" w-full border-2 rounded-md"
          value={""}
          onChange={() => {}}
        />
        <CustomInput
          name="Phone Number"
          required
          className=" w-full border-2 rounded-md"
          value={""}
          onChange={() => {}}
        />
        <CustomSelect
          name="Client Type"
          defaultValue={systemCodesOptions[0]}
          options={systemCodesOptions}
          onChange={() => {}}
        />

        <CustomInput
          name="ID Number"
          required={false}
          className=" w-full border-2 rounded-md"
          value={""}
          onChange={() => {}}
        />
        <CustomInput
          name="Tax Number"
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

export default ClientDetails;
