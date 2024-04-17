"use client";

import React, { useEffect, useState } from "react";
import Login from "./Login";
import { GoArrowRight } from "react-icons/go";
import QuoteModal from "./QuoteModal";
import { useContextApi } from "../context/context";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { userInitials }: any = useContextApi();

  const pathname = usePathname().replace("/", "");

  const user = pathname !== "" && userInitials;

  return (
    <div className="sticky top-0 bg-[#F7F5FD] z-10 py-[1px] h-[auto]">
      <div className="flex  my-10 gap-10 justify-between">
        <span className="flex text-[18px] font-bold cursor-auto">
          CLIENT PORTAL
        </span>
        <div className="flex gap-8 2xl:text-[18px]">
          <span className="cursor-pointer">Claims</span>
          <span className="cursor-pointer" onClick={() => setOpenLogin(true)}>
            Login
          </span>
          <div
            onClick={() => setOpenModal(true)}
            className={
              "h-[2rem] gap-1  bg-[#cb7529] rounded-md shadow-md flex items-center px-3 justify-center text-white cursor-pointer"
            }
          >
            <p>Get a Quote</p>
            <GoArrowRight size={25} />
          </div>
          {user && (
            <div className="bg-[#092332] text-white h-[2rem] text-[15px] w-auto px-2 rounded-md flex justify-center items-center">
              {user}
            </div>
          )}
        </div>
      </div>
      <Login open={openLogin} handleClose={() => setOpenLogin(false)} />
      <QuoteModal open={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Navbar;
