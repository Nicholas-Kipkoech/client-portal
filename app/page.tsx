"use client";

import CustomButton from "./utils/CustomButtom";

export default function Home() {
  return (
    <div className="container m-10 flex">
      <div className="flex flex-col justify-start gap-10">
        <p className="text-[40px]">
          A better kind of manufactured home insurance.
        </p>

        <CustomButton
          name={"Get Quote"}
          className={"h-[50px] bg-[#cb7529] rounded-md w-[20rem] text-white"}
        />
      </div>
      <div className="w-1/2"></div>
    </div>
  );
}
