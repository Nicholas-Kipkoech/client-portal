"use client";

import React, { useState } from "react";
import { useContextApi } from "../context/context";
import { useRouter } from "next/navigation";

import CustomButton from "../utils/CustomButtom";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { IoChevronDownCircleOutline } from "react-icons/io5";

const Navbar = () => {
  const { user }: any = useContextApi();

  const router = useRouter();

  function formatName(name: string) {
    if (name !== undefined) {
      let finalName = "";
      const splittedName = name?.split(" ");
      for (let i = 0; i < splittedName?.length; i++) {
        finalName += splittedName[i][0];
      }
      return finalName;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
  };

  return (
    <div className="sticky top-0 bg-[grey] flex justify-between items-center z-10  sm:p-[1px] h-auto ">
      <span className="flex md:text-[18px] sm:text-[14px] font-bold cursor-pointer">
        CLIENT PORTAL
      </span>
      <div className="flex gap-4 items-center m-3">
        <div className="border h-auto p-2 rounded-md bg-white w-auto flex items-center justify-center flex-col">
          <div className="flex items-center gap-2">
            <div className="p-3  border rounded-[50%] text-bold bg-slate-900 text-white items-center flex justify-center">
              {formatName(user?.entityName)}
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <p className="font-bold text-[0.8rem] ">{user.entityName}</p>
                <p className="font-bold text-[0.8rem] ">
                  Category [{user.entityCodeName}]
                </p>
                <p className="font-bold text-[0.8rem] ">
                  Code [{user.entityCode}]
                </p>
              </div>

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<IoChevronDownCircleOutline />}
                ></MenuButton>
                <MenuList>
                  <div className="p-2">
                    <p className="font-bold text-[0.8rem] ">
                      {" "}
                      Email accounts [
                      {user.entityEmail ? user.entityEmail : "N/A"}]
                    </p>
                    <p className="font-bold text-[0.8rem] ">
                      Phone No [{user.entityPhone ? user.entityPhone : "N/A"}]
                    </p>
                    <p className="font-bold text-[0.8rem] ">
                      Type [{user.entityType}]
                    </p>
                  </div>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
        <CustomButton
          name="Logout"
          onClick={handleLogout}
          className="h-[2rem] w-[5rem]  bg-[#cb7529] rounded-md text-white"
        />
      </div>
    </div>
  );
};

export default Navbar;
