"use client";
import CustomButton from "@/app/utils/CustomButtom";
import { useRouter } from "next/navigation";

import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const AcceptQuote = () => {
  const router = useRouter();
  return (
    <div className="m-5">
      <div
        onClick={() => router.back()}
        className="flex gap-2 items-center cursor-pointer  py-1 bg-yellow-950 text-white w-[6rem] justify-center rounded-md"
      >
        <IoArrowBackOutline size={20} />
        <p>Back</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div className="w-[40%] border bg-white h-[28rem] overflow-y-auto">
          <div>
            <p className="flex justify-center text-[2rem] font-bold border b">
              Product
            </p>
            <div className="px-2 max-h-[10rem] h-[5rem]">
              <p>Details.......</p>
            </div>
          </div>
          <div>
            <p className="flex justify-center text-[2rem] font-bold border b">
              Benefits
            </p>
            <div className="px-2 max-h-[10rem] h-[5rem]">
              <p>Details.......</p>
            </div>
          </div>
        </div>
        <div className="w-[40%] border bg-white h-[28rem]">
          <p className="flex justify-center text-[2rem] font-bold border b">
            Premiums
          </p>
          <div className="max-h-[20rem] h-[15rem]">
            <p className="text-[1.4rem] px-2 font-semibold">Premiums in USD</p>
          </div>
          <div className="max-h-[20rem] h-[15rem]">
            <p className="text-[1.4rem] px-2 font-semibold">Premiums in KSH</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <CustomButton
          name={"Accept Quote"}
          onClick={() => router.push("/travel/payments")}
          className="h-[2.8rem] w-[30rem] rounded-[30px] bg-[#cb7529] text-white text-[1.3rem] border"
        />
      </div>
    </div>
  );
};

export default AcceptQuote;
