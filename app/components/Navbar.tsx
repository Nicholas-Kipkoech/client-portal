"use client";

import React, { useState } from "react";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-[#F7F5FD] z-10 border h-[auto]">
      <div className="flex mx-10 my-10 gap-10 justify-between">
        <span className="flex  text-[18px] font-bold cursor-auto">
          CLIENT PORTAL
        </span>
        <div className="flex gap-10">
          <span>Insurance</span>
          <span>Claims</span>
          <span>About Us</span>
          <span>Help</span>
          <p
            className={
              "h-[40px] bg-[#cb7529] rounded-md shadow-md flex items-center w-[150px] justify-center text-white cursor-pointer"
            }
          >
            Get Covered
          </p>
        </div>
        <div>
          <p>Account</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
