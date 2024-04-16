"use client";

import React, { useEffect, useState } from "react";
import Login from "./Login";
import { GoArrowRight } from "react-icons/go";
import QuoteModal from "./QuoteModal";
import { useContextApi } from "../context/context";

function formatUser(array1: any, array2: any) {
  return array1[0].slice(0, 1) + array2[0].slice(0, 1);
}

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user }: any = useContextApi();
  const [userInitials, setUserInitials] = useState("");

  useEffect(() => {
    if (Object.keys(user).length > 1) {
      const _user = user?.fullName;
      const userArray = _user.split(" ");
      setUserInitials(
        formatUser(userArray[0].slice(0, 1), userArray[1].slice(0, 1))
      );
    }
  }, [user]);

  return (
    <div className="sticky top-0 bg-[#F7F5FD] z-10 py-[1px] h-[auto]">
      <div className="flex  my-10 gap-10 justify-between">
        <span className="flex text-[18px] font-bold cursor-auto">
          CLIENT PORTAL
        </span>
        <div className="flex gap-8 2xl:text-[18px]">
          <span className="cursor-pointer">Claims</span>
          <span className="cursor-pointer">Reviews</span>
          <span className="cursor-pointer">Contact</span>
          <span className="cursor-pointer" onClick={() => setOpenLogin(true)}>
            Login
          </span>
          <div
            onClick={() => setOpenModal(true)}
            className={
              "h-[40px] gap-1  bg-[#cb7529] rounded-[20px] shadow-md flex items-center w-[180px] justify-center text-white cursor-pointer"
            }
          >
            <p>Get a Quote</p>
            <GoArrowRight size={30} />
          </div>
          {Object.keys(user).length > 1 && (
            <div className="bg-[#092332] text-white h-[40px] w-[40px] rounded-[50%] flex justify-center items-center">
              {userInitials}
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
