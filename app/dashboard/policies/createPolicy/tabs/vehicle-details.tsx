"use client";

import { useContextApi } from "@/app/context/context";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import CustomSelect from "@/app/utils/CustomSelect";
import Creatable from "react-select/creatable";
import { useRouter } from "next/navigation";
import React from "react";

const VehicleDetails = () => {
  const { systemCodes }: any = useContextApi();

  const vehicleTypesOptions = systemCodes
    .filter((item: any) => item.SYS_TYPE === "AD_VEHICLE_TYPE")
    .map((vehicleType: any) => {
      return {
        label: vehicleType.SYS_NAME,
        value: vehicleType.SYS_CODE,
      };
    });

  const vehicleMakeOptions = systemCodes
    .filter((item: any) => item.SYS_TYPE === "AD_VEHICLE_MAKE")
    .map((vehicleType: any) => {
      return {
        label: vehicleType.SYS_NAME,
        value: vehicleType.SYS_CODE,
      };
    });

  const vehicleUseOptions = [
    {
      label: "Commercial Use",
      value: "Commercial Use",
    },
  ];
  const coverProductsOptions = [
    {
      label: "Third Party",
      value: "TP",
    },
    {
      label: "Comprehensive",
      value: "Comprehensive",
    },
  ];
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
      <div className="border p-5 rounded-md">
        <p className="text-[1.3rem] flex justify-center font-bold">
          Vehicle Details
        </p>
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            required
            name="Registration Number"
            className=" w-full border rounded-md"
            value={""}
            onChange={() => {}}
          />
          <CustomInput
            name="Chassis Number"
            className=" w-full border rounded-md"
            value={""}
            required
            onChange={() => {}}
          />
          <CustomInput
            name="Engine No"
            required
            className=" w-full border rounded-md"
            value={""}
            onChange={() => {}}
          />
          <div className="mt-2">
            <label>Vehicle Type</label>
            <Creatable
              isClearable
              options={vehicleTypesOptions}
              onChange={(value) => console.log("value", value)}
            />
          </div>

          <CustomInput
            name="Year of Manufacture"
            required
            className=" w-full border rounded-md"
            value={""}
            onChange={() => {}}
          />

          <CustomInput
            name="Vehicle CC"
            required={false}
            className=" w-full border rounded-md"
            value={""}
            onChange={() => {}}
          />
          <div className="mt-2">
            <label>Vehicle Make</label>
            <Creatable
              isClearable
              options={vehicleMakeOptions}
              onChange={(value) => console.log("value", value)}
            />
          </div>
          <div className="mt-2">
            <label>Vehicle Model</label>
            <Creatable
              isClearable
              options={vehicleMakeOptions}
              onChange={(value) => console.log("value", value)}
            />
          </div>

          <CustomSelect
            name="Vehicle Use"
            className=""
            defaultValue={vehicleMakeOptions[0]}
            options={vehicleUseOptions}
            onChange={() => {}}
          />

          <CustomInput
            name="Log Book No"
            className=" w-full border rounded-md"
            value={""}
            required={false}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="border p-5 rounded-md mt-10">
        <p className="text-[1.3rem] flex justify-center font-bold">
          Cover Details
        </p>
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            name="From Date"
            type="date"
            className=" w-full border rounded-md"
            value={""}
            required
            onChange={() => {}}
          />
          <CustomInput
            name="To Date"
            type="date"
            className=" w-full border rounded-md"
            value={""}
            required
            onChange={() => {}}
          />
          <CustomSelect
            required
            name="Cover Type"
            className=" w-full border rounded-md"
            options={coverProductsOptions}
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
            name="Submit"
            className="border bg-[#092332] text-white w-[8rem] h-[2.2rem] rounded-md"
            onClick={() => handleActionBtn("next")}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
