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
    <div className="flex flex-col justify-center my-4 md:mx-8 sm:mx-4">
      <div
        className="flex my-4  items-center justify-between cursor-pointer "
        onClick={() => router.back()}
      >
        <div className="flex gap-0 items-center">
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="md:text-[1.8rem] sm:text-[1.3rem] font-semibold">
          Receipts
        </p>
        <p></p>
      </div>
      <div className="flex justify-center ">
        <div className="border h-[8rem] w-[100%] gap-2 rounded-md shadow-xl md:py-5 px-5 sm:py-3 sm:px-2 flex justify-center items-center flex-col">
          <p>Sample Reciept </p>
          <div
            className="mx-2 md:h-[4rem] sm:h-[2.5rem] border md:w-[10rem] flex items-center cursor-pointer justify-center rounded-md bg-[#cb7529] text-white"
            onClick={() => handleViewReceipt("Sample Receipt")}
          >
            View Reciept
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reciepts;
