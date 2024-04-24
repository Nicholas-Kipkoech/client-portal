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
    <div className="sticky top-0 bg-[#F7F5FD] flex justify-between z-10 md:p-[10px] sm:p-[1px] h-[auto] ">
      <span
        className="flex md:text-[18px] sm:text-[14px] font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        CLIENT PORTAL
      </span>
      <div>{user.entityName}</div>
    </div>
  );
};

export default Navbar;
