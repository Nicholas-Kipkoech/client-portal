"use client";

import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <div className="sticky top-0 bg-[#F7F5FD] z-10 border h-[auto]">
      <div className="flex mx-10 my-10 gap-10 justify-between">
        <span className="flex  text-[18px] font-bold cursor-auto">
          CLIENT PORTAL
        </span>
        <div className="flex gap-10">
          <span className="cursor-pointer">Insurance</span>
          <span className="cursor-pointer">Claims</span>
          <span className="cursor-pointer">About Us</span>
          <span className="cursor-pointer">Help</span>
          <p
            className={
              "h-[40px] bg-[#cb7529] rounded-md shadow-md flex items-center w-[150px] justify-center text-white cursor-pointer"
            }
          >
            Get Covered
          </p>
        </div>
        <div className="flex gap-2">
          <p
            onClick={() => setOpenRegister(true)}
            className="bg-blue-950 cursor-pointer text-white flex justify-center items-center h-[30px] p-2 rounded-sm"
          >
            Register
          </p>
          <p
            onClick={() => setOpenLogin(true)}
            className="bg-blue-950 cursor-pointer text-white flex justify-center items-center h-[30px] p-2 rounded-sm"
          >
            Sign In
          </p>
        </div>
      </div>
      <Login open={openLogin} handleClose={() => setOpenLogin(false)} />
      <Register
        open={openRegister}
        handleClose={() => setOpenRegister(false)}
      />
    </div>
  );
};

export default Navbar;
