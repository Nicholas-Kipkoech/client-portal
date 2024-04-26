"use client";
import Image from "next/image";
import React, { useState } from "react";
import iconLogo from "../assets/iconLogo.png";
import {
  MdDashboard,
  MdOutlineCircle,
  MdOutlineSettings,
} from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenu } from "react-icons/hi";
import { GrOverview } from "react-icons/gr";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { VscOrganization } from "react-icons/vsc";
interface NavProps {
  name: string;
  page: string;
  icon: any;
}

const menuItems = [
  {
    title: "Insights",
    list: [
      {
        title: "Overview",
        path: "/dashboard",
        icon: <GrOverview />,
      },
    ],
  },
  {
    title: "Quotes",
    list: [
      {
        title: "Request Quote",
        path: "/dashboard/quotes/add-quote",
        icon: <VscOrganization />,
      },
      {
        title: "View Quotes",
        path: "/dashboard/quotes",
        icon: <LiaFileInvoiceSolid />,
      },
    ],
  },
  {
    title: "Policies",
    list: [
      {
        title: "View All policies",
        path: "/dashboard/policies",
        icon: <LiaFileInvoiceSolid />,
      },
    ],
  },
  {
    title: "Claims",
    list: [
      {
        title: "File claim",
        path: "/dashboard/claims/file-claim",
        icon: <LiaFileInvoiceSolid />,
      },
      {
        title: "View claims",
        path: "/dashboard/claims",
        icon: <LiaFileInvoiceSolid />,
      },
    ],
  },
];

const Sidebar = () => {
  const MenuLink = ({ item }: any) => {
    const pathname = usePathname();

    return (
      <Link
        href={item.path}
        className={`p-[5px] flex items-center pl-6 gap-[5px] text-[13px] text-white hover:bg-[#2e2f3b] hover:text-white m-[2px] rounded-[10px] ${
          pathname === item.path && "bg-[#995224]"
        }`}
      >
        {item.icon}
        {item.title}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#092332]">
      <div className="flex gap-2 flex-col pr-2 pt-2 pl-3">
        <ul className="list-none ">
          {menuItems.map((cat) => (
            <li key={cat.title} className="text-white">
              <span>{cat.title}</span>
              {cat.list.map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
