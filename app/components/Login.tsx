"use client";
import React from "react";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButtom";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import { useContextApi } from "../context/context";

const Login = ({ open, handleClose }: any) => {
  const router = useRouter();

  const handleLogin = async () => {
    router.push("/dashboard");
  };

  return (
    <Modal open={open} footer centered onCancel={handleClose}>
      <div className="  p-10">
        <p className="text-[18px] font-bold flex justify-center">
          Login to your account
        </p>
        <div className="py-8">
          <CustomInput
            name={"Email"}
            className="h-[40px] border rounded-md"
            value=""
          />
          <CustomInput
            name={"Password"}
            value=""
            className="h-[40px] border rounded-md"
          />
        </div>

        <CustomButton
          onClick={handleLogin}
          name={"Continue"}
          className={
            "h-[40px] flex justify-center border items-center w-[100%] rounded-md bg-[#cb7529] text-white"
          }
        />
      </div>
    </Modal>
  );
};

export default Login;
