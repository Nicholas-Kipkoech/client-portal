import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface IChildren {
  children: React.ReactNode;
}

const Layout = ({ children }: IChildren) => {
  return (
    <div className="h-screen flex">
      <div className="w-[250px] h-full bg-[#F7F5FD]">
        <Sidebar />
      </div>
      <div className="w-full h-full overflow-y-auto bg-white">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
