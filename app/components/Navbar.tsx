"use client";

import React, { useEffect, useState } from "react";
import Login from "./Login";
import { GoArrowRight } from "react-icons/go";
import QuoteModal from "./QuoteModal";
import { useContextApi } from "../context/context";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

import { FaChevronDown } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import CustomButton from "../utils/CustomButtom";

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { isUserAuthenticated, isMobile, user }: any = useContextApi();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const pathname = usePathname().replace("/", "");

  const handleOpenModal = () => {
    if (isMobile) {
      router.push("/mobile/quote");
    } else {
      setOpenModal(true);
    }
  };
  const handleLogin = () => {
    if (isMobile) {
      router.push("/mobile/auth/login");
    } else {
      setOpenLogin(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    if (isUserAuthenticated() === true) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isUserAuthenticated]);

  return (
    <div className="sticky top-0 bg-[#F7F5FD] flex justify-between items-center z-10 md:p-[10px] sm:p-[1px] h-[5rem] ">
      <span
        className="flex md:text-[18px] sm:text-[14px] font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        CLIENT PORTAL
      </span>
      <div className="flex gap-4 items-center">
        <div className="border h-[3rem] rounded-md bg-white w-[20rem] flex items-center justify-center flex-col">
          <div className="flex items-center gap-2">
            <div className="p-2 border rounded-[50%] text-bold bg-slate-900 text-white items-center flex justify-center">
              NM
            </div>
            <div>
              <p className="font-bold text-[0.8rem] ">{user.entityName}</p>
            </div>
          </div>
        </div>
        <CustomButton
          name="Logout"
          className="h-[2rem] w-[5rem] bg-[#cb7529] rounded-md text-white"
        />
      </div>
    </div>
  );
};

export default Navbar;
