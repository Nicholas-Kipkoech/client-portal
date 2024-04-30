"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrOverview } from "react-icons/gr";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { VscOrganization } from "react-icons/vsc";
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { useContextApi } from "../context/context";

const Sidebar = () => {
  const [showSubMenu, setShowSubMenu] = useState(0);
  const { user }: any = useContextApi();
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

  const handleShowMenu = (index: any) => {
    setShowSubMenu((prevIndex) => (prevIndex === index ? null : index));
  };

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
          title: "View Running policies",
          path: "/dashboard/policies/runningPolicies",
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: "View All policies",
          path: "/dashboard/policies/allPolicies",
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
          title: "Open claims",
          path: "/dashboard/claims/openClaims",
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: "View All claims",
          path: "/dashboard/claims/allClaims",
          icon: <LiaFileInvoiceSolid />,
        },
      ],
    },
    {
      title: "Reports",
      list: [
        {
          title: "View Premiums",
          path: "/dashboard/reports/premiums",
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: "View Statements",
          path: "/dashboard/reports/statements",
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: "Upcoming Renewals",
          path: "/dashboard/reports/upcomingRenewals",
          icon: <LiaFileInvoiceSolid />,
        },
        (user && user?.intermediaryCode === "70") ||
        user.intermediaryCode === "25"
          ? {
              title: "Commsion Payable",
              path: "/dashboard/reports/commissionPayable",
              icon: <LiaFileInvoiceSolid />,
            }
          : "",
      ],
    },
    {
      title: "Finance",
      list: [
        {
          title: "Receipts Download",
          path: "/dashboard/finance/receipts",
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: "Claim Credit Notes",
          path: "/dashboard/finance/claimCreditNotes",
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: "Debits",
          path: "/dashboard/finance/debits",
          icon: <LiaFileInvoiceSolid />,
        },
      ],
    },
  ];

  return (
    <div className="h-screen bg-[#092332] overflow-y-auto">
      <div className="flex gap-2 flex-col pr-2 pt-2 pl-3">
        <ul className="list-none ">
          {menuItems.map((cat, index) => (
            <li key={cat.title} className="text-white ">
              <div
                className="flex items-center cursor-pointer gap-2"
                onClick={() => handleShowMenu(index)}
              >
                <span>{cat.title}</span>
                {showSubMenu === index ? (
                  <FaChevronDown size={15} />
                ) : (
                  <MdOutlineNavigateNext size={20} />
                )}
              </div>
              {showSubMenu === index &&
                cat.list.map((item: any) => (
                  <MenuLink item={item} key={item?.title} />
                ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
