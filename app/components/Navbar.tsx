import React from "react";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-[#F7F5FD] z-10 border h-[auto]">
      <div className="flex mx-10 my-10 gap-10">
        <span className="flex  text-[18px] font-bold">CLIENT PORTAL</span>
        <div className="flex gap-10">
          <span>Insurance</span>
          <span>Claims</span>
          <span>About Us</span>
          <span>Help</span>
          <span>Get Covered</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
