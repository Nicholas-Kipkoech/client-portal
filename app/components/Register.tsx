"use client";
import React from "react";
import CustomInput from "../utils/CustomInput";
import CustomButtom from "../utils/CustomButtom";
import { Modal } from "antd";

const Register = ({ open, handleClose }: any) => {
  return (
    <Modal open={open} onCancel={handleClose} width={600} centered footer>
      <div className="bg-white">
        <p className="flex justify-center text-[18px] font-bold">
          Create your account
        </p>
        <div className="pt-4 px-10 flex flex-col gap-2 text-[14px]">
          <CustomInput
            name={"Email"}
            value=""
            className={"h-[40px] border rounded-md"}
          />
          <CustomInput
            name={"Full Name"}
            value=""
            className={"h-[40px] border rounded-md"}
          />
          <CustomInput
            name={"Phone Number"}
            value=""
            className={"h-[40px] border rounded-md"}
          />
          <CustomInput
            name={"Address"}
            value=""
            className={"h-[40px] border rounded-md"}
          />
          <CustomInput
            name={"Password"}
            value=""
            className={"h-[40px]  border rounded-md"}
          />
        </div>
        <div className="flex justify-center my-2">
          <CustomButtom
            name={"Register"}
            className={
              "h-[40px] flex justify-center border items-center w-[85%] rounded-md bg-[#cb7529] text-white"
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default Register;
