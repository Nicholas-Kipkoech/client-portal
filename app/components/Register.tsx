import React from "react";
import CustomInput from "../utils/CustomInput";
import CustomButtom from "../utils/CustomButtom";
import { RiCheckboxCircleLine } from "react-icons/ri";

const ContentComponent = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="flex gap-2 items-start">
      <div>
        <RiCheckboxCircleLine size={25} color={"#cb7529"} />
      </div>
      <div>
        <p className="text-[18px] font-[600]">{title}</p>
        <p className="text-slate-500 text-[14px]">{content}</p>
      </div>
    </div>
  );
};

const Register = ({ toggleView }: any) => {
  return (
    <div className="w-[85%] flex gap-2 p-8  h-screen">
      <div className="w-1/2 flex flex-col items-start gap-2 justify-center divide-y bg-white shadow-md p-2">
        <ContentComponent
          title={"Get started quickly"}
          content={"Apply for an insurance easily following few steps"}
        />

        <ContentComponent
          title={"Join thousands of users"}
          content={"This platform is trusted by thousands of users"}
        />
        <ContentComponent
          title={"Join thousands of users"}
          content={"This platform is trusted by thousands of users"}
        />
        <ContentComponent
          title={"Join thousands of users"}
          content={"This platform is trusted by thousands of users"}
        />
        <ContentComponent
          title={"Join thousands of users"}
          content={"This platform is trusted by thousands of users"}
        />
      </div>
      <div className="w-1/2 border shadow-md bg-white">
        <p className="flex pl-10 mt-2 text-[20px] font-bold">
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
            name={"Password"}
            value=""
            className={"h-[40px] border rounded-md"}
          />
          <div className="mt-2 flex items-center ">
            <input type="checkbox" />
            <p className="text-[13px] pt-4 p-2">
              Get emails from app about product updates, industry news, and
              events. You can unsubscribe at any time.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <CustomButtom
            name={"Create Account"}
            className={
              "h-[40px] flex justify-center border items-center w-[80%] rounded-md bg-[#cb7529] text-white"
            }
          />
        </div>
        <div className="flex justify-center mt-2 text-[14px] gap-1">
          <span>Have an account</span>
          <span className="text-blue-800 cursor-pointer" onClick={toggleView}>
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;