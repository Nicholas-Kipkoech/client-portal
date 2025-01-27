"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrOverview } from "react-icons/gr";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { VscOrganization } from "react-icons/vsc";
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { useContextApi } from "../context/context";
import iconLogo from "../assets/iconLogo.png";
import Image from "next/image";

const Sidebar = () => {
  const [showSubMenu, setShowSubMenu] = useState(0);
  const { roles }: any = useContextApi();

  const MenuLink = ({ item }: any) => {
    const pathname = usePathname();

    return (
      <Link
        href={item.path}
        className={`p-[5px] flex items-center  pl-6 gap-[5px] text-[13px] text-white hover:bg-[#2e2f3b] hover:text-white m-[2px] rounded-[10px] ${
          pathname === item.path && "bg-[#995224]"
        }`}
      >
        {item.icon}
        {item.title}
      </Link>
    );
  };

  //if user has a role then show based on role

  const hasRequiredRoles = (itemRoles: string[]) => {
    if (itemRoles.length === 0) return false;
    if (roles.length !== 0) {
      return itemRoles.some((role) => roles?.includes(role.toUpperCase()));
    }
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
      roles: ["bp_insights"],
    },
    {
      title: "Policies",
      list: [
        {
          title: "Create New Policy",
          path: "/dashboard/policies/createPolicy",
          icon: <LiaFileInvoiceSolid />,
        },
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
      roles: ["bp_policies"],
    },
    {
      title: "Claims",
      list: [
        // {
        //   title: 'File claim',
        //   path: '/dashboard/claims/file-claim',
        //   icon: <LiaFileInvoiceSolid />,
        // },
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
      roles: ["bp_claims"],
    },
    {
      title: "Reports",
      list: [
        {
          title: "View Premium Register",
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
        {
          title: "Unrenewed Policies",
          path: "/dashboard/reports/expectedRenewals",
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: "Commision Payable",
          path: "/dashboard/reports/commissionPayable",
          icon: <LiaFileInvoiceSolid />,
        },
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
      roles: ["bp_reports"],
    },
    {
      title: "Risk Notes",
      list: [
        {
          title: "Submit Risk Notes",
          path: "/dashboard/risk-notes/submit-note",
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: "View Risk Notes",
          path: "/dashboard/risk-notes/view-risk-notes",
          icon: <LiaFileInvoiceSolid />,
        },
      ],
      roles: ["bp_risk_notes"],
    },

    {
      title: "Travel Insurance",
      list: [
        {
          title: "Request Travel Policy",
          path: "/dashboard/travelInsurance/request-quote",
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: "Issued Travel Certificates",
          path: "/dashboard/travelInsurance/documents",
          icon: <LiaFileInvoiceSolid />,
        },
      ],
      roles: ["bp_travel"],
    },
  ];

  return (
    <div className="h-screen bg-[#092332] overflow-y-auto">
      <div className="flex items-center justify-center">
        <Image src={iconLogo} alt="icon Logo" height={80} />
      </div>
      <div className="flex gap-2 flex-col pr-2 pt-2 pl-3">
        <ul className="list-none flex flex-col gap-2 ">
          {menuItems
            .filter((cat) => hasRequiredRoles(cat?.roles))
            .map((cat, index) => (
              <li key={cat.title} className="text-white ">
                <div
                  className="flex justify-between mx-2  cursor-pointer hover:bg-[#7a7ea9] h-[2rem] rounded-md px-2 items-center"
                  onClick={() => handleShowMenu(index)}
                >
                  <span>{cat.title}</span>
                  <div>
                    {showSubMenu === index ? (
                      <FaChevronDown size={15} />
                    ) : (
                      <MdOutlineNavigateNext size={20} />
                    )}
                  </div>
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
