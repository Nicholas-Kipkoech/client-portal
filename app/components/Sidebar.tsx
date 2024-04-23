import React from "react";
import { GiCircle } from "react-icons/gi";
import iconLogo from "../assets/iconLogo.png";
import Image from "next/image";

const Menus = [
  {
    title: "Quotes",
    link: "/quotes",
  },
  {
    title: "Policies",
    link: "/policies",
  },
  {
    title: "Claims",
    link: "/claims",
  },
];

const Sidebar = () => {
  return (
    <div className="h-[780px] bg-slate-800 text-white w-full">
      <div className="h-[6rem] flex items-center justify-center">
        <Image src={iconLogo} alt="" className="h-[10rem] w-[10rem]" />
      </div>
      <div className="px-2 py-2">
        {Menus.map((menu, key) => (
          <div key={key} className="flex items-center gap-1">
            <GiCircle size={15} />
            {menu.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
