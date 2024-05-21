"use client";
import React from "react";
import CustomSelect from "../utils/CustomSelect";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButtom";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

const Travel = () => {
  const router = useRouter();
  const handleGetQuote = () => {
    router.push("/travel/acceptQuote");
  };
  return (
    <div className="m-5">
      <div
        onClick={() => router.back()}
        className="flex gap-2 items-center cursor-pointer  py-1 bg-yellow-950 text-white w-[6rem] justify-center rounded-md"
      >
        <IoArrowBackOutline size={20} />
        <p>Back</p>
      </div>

      <div className="flex items-center  gap-2 justify-center">
        <div className="w-[40%] border  bg-white shadow-2xl rounded-md h-[30rem] flex items-center justify-center  flex-col p-3">
          <CustomSelect
            name="Destination"
            options={[]}
            className="w-[30rem] "
            placeholder={"Select Destination..."}
            onChange={() => {}}
          />
          <CustomSelect
            name="Product"
            options={[]}
            placeholder={"Select Product..."}
            className="w-[30rem] "
            onChange={() => {}}
          />
          <CustomInput
            name="Travel Date"
            type="date"
            className={"border w-[30rem] h-[2.6rem] rounded-md"}
            value={""}
            onChange={() => {}}
          />
          <CustomInput
            name="Return Date"
            type="date"
            className={"border w-[30rem] h-[2.6rem] rounded-md"}
            value={""}
            onChange={() => {}}
          />
          <CustomInput
            name="Date of Birth"
            type="date"
            className={"border w-[30rem] h-[2.6rem] rounded-md"}
            value={""}
            onChange={() => {}}
          />
          <CustomButton
            name={"Get Quote"}
            onClick={handleGetQuote}
            className={
              "bg-[#cb7229] text-white w-[30rem] my-5 h-[3rem] rounded-[30px] text-[1.4rem]"
            }
          />
        </div>
        <div className="w-[40%]  border bg-white shadow-2xl rounded-md h-[30rem] flex items-center justify-center  flex-col p-2">
          benefits
        </div>
      </div>
    </div>
  );
};

export default Travel;
