"use client";

import React from "react";
import CustomButton from "../utils/CustomButtom";
import { useRouter } from "next/navigation";

const HomeNavbar = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/login");
  };
  return (
    <div className="sticky top-0 bg-[#F7F5FD] flex justify-between z-10 md:p-[10px] sm:p-[1px] h-[5rem] ">
      <span className="flex md:text-[18px] sm:text-[14px] font-bold cursor-pointer">
        CLIENT PORTAL
      </span>
      <CustomButton
        name="Login"
        onClick={handleLogin}
        className="h-[2rem] w-[8rem]  bg-[#cb7529] rounded-md text-white"
      />
    </div>
  );
};

export default HomeNavbar;
