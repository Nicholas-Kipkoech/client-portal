"use client";

import { useState } from "react";
import CustomButton from "./utils/CustomButtom";
import QuoteModal from "./components/QuoteModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenQuote = () => {
    setModalOpen(true);
  };
  return (
    <div className="container m-10 flex">
      <div className="flex flex-col justify-start gap-10">
        <p className="text-[40px]">
          A better kind of manufactured home insurance.
        </p>

        <CustomButton
          onClick={handleOpenQuote}
          name={"Get Quote"}
          className={"h-[50px] bg-[#cb7529] rounded-md w-[20rem] text-white"}
        />
      </div>
      <div className="w-1/2"></div>

      <QuoteModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </div>
  );
}
