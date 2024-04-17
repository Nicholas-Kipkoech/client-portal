"use client";
import React, { useState } from "react";
import CustomButton from "../utils/CustomButtom";
import QuoteModal from "./QuoteModal";
import Image from "next/image";
import house from "../assets/house.jpg";

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenQuote = () => {
    setModalOpen(true);
  };
  return (
    <div className="flex gap-10 justify-between sm:flex-col sm:gap-4 items-center">
      <div className="flex flex-col justify-start gap-10 sm:gap-4">
        <p className=" sm:text-[1rem] text-[2rem] font-[700] 2xl:text-[4rem] font-sans">
          We keep you covered, wherever you’re planted.
        </p>

        <div className="md:border rounded-[30px] h-[60px] sm:h-[12px] bg-white  outline-[#cb7529] flex justify-between px-5 items-center">
          <input
            type="text"
            placeholder="Enter your addresss"
            className="h-[50px] w-full p-[5px] sm:hidden outline-none "
          />

          <CustomButton
            onClick={handleOpenQuote}
            name={"Get a Quote"}
            className={
              "sm:h-[2rem] sm:rounded-[10px] sm:text-[13px] h-[3rem] bg-[#cb7529] rounded-[30px] w-[10rem] 2xl:w-[15rem] text-white"
            }
          />
        </div>
      </div>

      <Image
        src={house}
        alt="house"
        className="rounded-[20px] sm:h-[10rem] sm:w-[20rem] sm:rounded-sm h-[20rem] 2xl:h-[25rem] w-[40rem]  2xl:w-[80rem]"
      />

      <QuoteModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </div>
  );
};

export default HomePage;
