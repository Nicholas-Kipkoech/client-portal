"use client";
import React from "react";
import CustomButton from "../utils/CustomButtom";
import Image from "next/image";
import house from "../assets/house.jpg";

const HomePage = () => {
  return (
    <div className="md:flex md:gap-10 justify-between">
      <div className="flex md:flex-col sm:flex-col sm:justify-start md:gap-10 sm:gap-4 sm:p-2">
        <p className=" sm:text-[1.9rem] md:text-[2rem] font-[700] 2xl:text-[4rem] font-sans">
          We keep you covered, wherever you’re planted.
        </p>

        <div className="md:border md:rounded-[30px] md:h-[60px] sm:h-[12px] bg-white   outline-[#cb7529] flex  md:justify-between sm:justify-start px-5 items-center ">
          <input
            type="text"
            placeholder="Enter your addresss"
            className="h-[50px] md:w-full p-[5px] md:block sm:hidden outline-none "
          />

          <CustomButton
            name={"Get a Quote"}
            className={
              "sm:h-[2.5rem] sm:rounded-[10px] sm:text-[1.2rem]  md:h-[3rem] bg-[#cb7529] md:rounded-[30px] sm:w-[15rem] md:w-[14rem] 2xl:w-[15rem] text-white sm:mt-2"
            }
          />
        </div>
      </div>

      <Image
        src={house}
        alt="house"
        className="md:rounded-[20px] sm:hidden md:block md:h-[20rem] 2xl:h-[25rem] md:w-[40rem]  2xl:w-[80rem]"
      />
    </div>
  );
};

export default HomePage;
