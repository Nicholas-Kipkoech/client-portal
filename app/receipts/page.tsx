"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { GrPrevious } from "react-icons/gr";

const Reciepts = () => {
  const router = useRouter();

  const handleViewReceipt = (name: string) => {
    localStorage.setItem("receipt_name", name);
    router.push(`/receipts/${name.replace(" ", "")}`);
  };

  return (
    <div className="flex flex-col justify-center my-4 mx-8">
      <div
        className="flex my-4 items-center gap-1 cursor-pointer "
        onClick={() => router.back()}
      >
        <GrPrevious size={20} />
        <p>Back</p>
      </div>
      <p className="text-[1.8rem] font-semibold">Receipts</p>
      <div className="border h-[6rem] w-[25%] rounded-md shadow-xl py-5 px-5 flex justify-center items-center flex-col">
        <p>Sample Reciept </p>
        <div
          className="mx-2 h-[4rem] border w-[10rem] flex items-center cursor-pointer justify-center rounded-md bg-[#cb7529] text-white"
          onClick={() => handleViewReceipt("Sample Receipt")}
        >
          View Reciept
        </div>
      </div>
    </div>
  );
};

export default Reciepts;
