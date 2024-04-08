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
    <div className="flex justify-between">
      <div className="flex flex-col justify-start gap-10">
        <p className="text-[40px] font-[700] font-sans">
          We keep you covered, wherever you’re planted.
        </p>

        <CustomButton
          onClick={handleOpenQuote}
          name={"Get Quote"}
          className={"h-[50px] bg-[#cb7529] rounded-md w-[20rem] text-white"}
        />
      </div>

      <Image
        src={house}
        alt="house"
        className="rounded-[20px] h-[400px] w-[800px]"
      />

      <QuoteModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </div>
  );
};

export default HomePage;
