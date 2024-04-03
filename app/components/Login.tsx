import React from "react";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButtom";

const Login = ({ toggleView }: any) => {
  return (
    <div className="border w-[40%] h-screen">
      <span className="flex justify-center py-10 text-[24px] font-bold">
        CLIENT PORTAL
      </span>
      <div className="bg-white shadow-md   p-10">
        <span className="text-[20px] font-bold">Sign in to your account</span>
        <div className="py-10">
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
          name={"Continue"}
          className={
            "h-[40px] flex justify-center border items-center w-[100%] rounded-md bg-[#cb7529] text-white"
          }
        />
        <div className="flex gap-1 justify-center my-2 text-[13px]">
          <span>Dont have an account?</span>
          <span className="text-blue-800 cursor-pointer" onClick={toggleView}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
