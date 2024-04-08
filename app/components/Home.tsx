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
    <div className="flex gap-10 justify-between">
      <div className="flex flex-col justify-start gap-10">
        <p className="text-[40px] font-[700] font-sans">
          We keep you covered, wherever you’re planted.
        </p>

        <div className="border rounded-[30px] h-[60px] bg-white  outline-[#cb7529] flex justify-between px-5 items-center">
          <input
            type="text"
            placeholder="Enter your addresss"
            className="h-[50px] w-full p-[5px]  outline-none "
          />

          <CustomButton
            onClick={handleOpenQuote}
            name={"Get a Quote"}
            className={
              "h-[40px] bg-[#cb7529] rounded-[30px] w-[10rem] text-white"
            }
          />
        </div>
      </div>

      <Image
        src={house}
        alt="house"
        className="rounded-[20px] h-[20rem]  w-[40rem]"
      />

      <QuoteModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </div>
  );
};

export default HomePage;
