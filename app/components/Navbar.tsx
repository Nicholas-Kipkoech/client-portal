"use client";

import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { GoArrowRight } from "react-icons/go";
import QuoteModal from "./QuoteModal";

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="sticky top-0 bg-[#F7F5FD] z-10 py-[1px] h-[auto]">
      <div className="flex  my-10 gap-10 justify-between">
        <span className="flex text-[18px] font-bold cursor-auto">
          CLIENT PORTAL
        </span>
        <div className="flex gap-10 2xl:text-[18px]">
          <span className="cursor-pointer">Enterprise suite</span>
          <span className="cursor-pointer">Claims</span>
          <span className="cursor-pointer">Reviews</span>
          <span className="cursor-pointer">Contact</span>
          <span className="cursor-pointer">Login</span>
          <div
            onClick={() => setOpenModal(true)}
            className={
              "h-[40px] gap-1  bg-[#cb7529] rounded-[20px] shadow-md flex items-center w-[180px] justify-center text-white cursor-pointer"
            }
          >
            <p>Get a Quote</p>
            <GoArrowRight size={30} />
          </div>
        </div>
      </div>
      <Login open={openLogin} handleClose={() => setOpenLogin(false)} />
      <QuoteModal open={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Navbar;
