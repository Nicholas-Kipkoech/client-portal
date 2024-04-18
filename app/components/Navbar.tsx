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
  Button,
  IconButton,
} from "@chakra-ui/react";

import { FaChevronDown } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { userInitials, isUserAuthenticated, isMobile }: any = useContextApi();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const pathname = usePathname().replace("/", "");

  const user = pathname !== "" && userInitials;

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

  // Use useEffect to set initial state on client side only
  useEffect(() => {
    if (isUserAuthenticated() === true) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isUserAuthenticated]);

  return (
    <div className="sticky top-0 bg-[#F7F5FD] z-10 md:p-[10px] sm:p-[1px] h-[auto] ">
      <div className="flex sm:my-2 sm:px-2 items-center justify-between">
        <span
          className="flex md:text-[18px] sm:text-[14px] font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          CLIENT PORTAL
        </span>
        {isMobile ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<IoMenu />}
            />
            <MenuList>
              <MenuItem>Claims</MenuItem>
              {!isLoggedIn && <MenuItem onClick={handleLogin}>Login</MenuItem>}
              <MenuItem onClick={handleOpenModal}>Get a Quote</MenuItem>
              <MenuItem>Update Profile</MenuItem>
              {isLoggedIn && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
            </MenuList>
          </Menu>
        ) : (
          <div className="flex gap-8 md:text-[18px] sm:text-[12px] items-center">
            <span className="cursor-pointer hover:text-[blue]">Claims</span>
            <span
              className="cursor-pointer hover:text-[blue]"
              onClick={() => router.push("/quotes")}
            >
              {" "}
              Quotes
            </span>
            <span className="cursor-pointer hover:text-[blue]">Policies</span>
            {!isLoggedIn && (
              <div
                className="cursor-pointer hover:text-[blue]"
                onClick={handleLogin}
              >
                Login
              </div>
            )}
            <div
              onClick={handleOpenModal}
              className={
                "md:h-[2rem] sm:h-[1.4rem] gap-1  bg-[#cb7529] rounded-md shadow-md flex items-center px-3 justify-center text-white cursor-pointer"
              }
            >
              <div>Get a Quote</div>
              <GoArrowRight className="sm:h-[4rem] md:h-[5rem]" />
            </div>
            {user && (
              <Menu>
                <div className="flex items-center gap-1 cursor-pointer">
                  <MenuButton className="text-[1.2rem] font-semibold">
                    {user}
                  </MenuButton>
                  <FaChevronDown />
                </div>
                <MenuList>
                  <MenuItem>Update Profile</MenuItem>
                  {isLoggedIn && (
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  )}
                </MenuList>
              </Menu>
            )}
          </div>
        )}
      </div>
      <Login open={openLogin} handleClose={() => setOpenLogin(false)} />
      <QuoteModal open={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Navbar;
