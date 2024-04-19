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
import Gravatar from "react-gravatar";

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { userEmail, isUserAuthenticated, isMobile }: any = useContextApi();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const pathname = usePathname().replace("/", "");

  const user = pathname !== "" && userEmail;

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
              <MenuItem onClick={() => router.push("/claims")}>Claims</MenuItem>
              <MenuItem onClick={() => router.push("/quotes")}>Quotes</MenuItem>
              <MenuItem onClick={() => router.push("/policies")}>
                Policies
              </MenuItem>
              {!isLoggedIn && <MenuItem onClick={handleLogin}>Login</MenuItem>}
              <MenuItem onClick={handleOpenModal}>Get a Quote</MenuItem>
              <MenuItem>Update Profile</MenuItem>
              {isLoggedIn && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
              <MenuItem>
                {user && <Gravatar email={user} className="rounded-[50%]" />}
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <div className="flex gap-8 md:text-[18px] sm:text-[12px] items-center">
            <span
              className="cursor-pointer hover:text-[blue]"
              onClick={() => router.push("/claims")}
            >
              Claims
            </span>
            <span
              className="cursor-pointer hover:text-[blue]"
              onClick={() => router.push("/quotes")}
            >
              {" "}
              Quotes
            </span>
            <span
              className="cursor-pointer hover:text-[blue]"
              onClick={() => router.push("/policies")}
            >
              Policies
            </span>
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
                  <Gravatar email={user} className="rounded-[50%]" />
                  <MenuButton>
                    <FaChevronDown size={15} />
                  </MenuButton>
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
