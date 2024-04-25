"use client";
import Image from "next/image";
import React, { useState } from "react";
import iconLogo from "../assets/iconLogo.png";
import { MdOutlineCircle } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface NavProps {
  name: string;
  page: string;
}
const Menus = [
  {
    name: "Quotes",
    page: "/quotes",
  },
  {
    name: "Policies",
    page: "/policies",
  },
  {
    name: "Claims",
    page: "/claims",
  },
];
const Sidebar = () => {
  const [active, setActive] = useState("quotes");

  const CustomNavItem = ({ name, page }: NavProps) => {
    return (
      <Link
        href={`/dashboard${page}`}
        className={`${
          usePathname().replace("/", "") === page.replace("/", "")
            ? "bg-[#cb7529]"
            : "bg-slate-700"
        } text-white h-[2.4rem]  flex items-center pl-5 gap-2 rounded-r-[50px]`}
      >
        <MdOutlineCircle size={15} />
        {name}
      </Link>
    );
  };

  return (
    <div className="min-h-[800px] max-h-[1400px] bg-[#092332]">
      <div className="flex gap-2 flex-col pr-2 pt-2">
        {Menus.map((menu, key) => (
          <CustomNavItem name={menu.name} key={key} page={menu.page} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
