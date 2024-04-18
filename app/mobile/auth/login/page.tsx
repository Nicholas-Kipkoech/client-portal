"use client";
import { useCustomToast } from "@/app/constants/useToast";
import { userLogin, userRegister } from "@/app/services/apiServices";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GrPrevious } from "react-icons/gr";

const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLogging, setIsLogging] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //......//registration

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const showToast = useCustomToast();
  const handleLogin = async () => {
    try {
      setIsLogging(true);
      const res = await userLogin({
        email: email,
        password: password,
      });
      if (res.success === true) {
        localStorage.setItem("accessToken", res.access_token);
        showToast("loggin successful");
        router.push("/quotes");
        setIsLogging(false);
      }
      // refresh after loggin..
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      setIsLogging(false);
      console.error(error.response.data.error);
      showToast(error.response.data.error, "error");
    }
  };

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      const res = await userRegister({
        address: address,
        email: email,
        fullName: fullName,
        password: password,
        phoneNumber: phoneNumber,
      });
      if (res.success === true) {
        showToast("Registration successful");
        setIsRegistering(false);
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error(error.response.data.error);
      setIsRegistering(false);
      showToast(error.response.data.error, "error");
    }
  };

  return (
    <div className="my-2 mx-2">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.back()}
      >
        <GrPrevious size={15} />
        <p>Back</p>
      </div>
      {isLogin ? (
        <div className="p-8">
          <p className="text-[18px] font-bold flex justify-center">
            Login to your account to continue
          </p>
          <div className="py-8 flex flex-col items-center">
            <CustomInput
              name={"Email"}
              className="h-[40px] w-[20rem] border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomInput
              name={"Password"}
              value={password}
              className="h-[40px] w-[20rem] border rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <CustomButton
              onClick={handleLogin}
              disabled={isLogging}
              name={isLogging ? "Logging in..." : "Login"}
              className={
                "h-[40px] flex justify-center border items-center w-[100%]  rounded-md bg-[#cb7529] text-white"
              }
            />
          </div>
          <div className="flex justify-center gap-1 py-2">
            <p>Dont have an account?</p>
            <a onClick={() => setIsLogin(false)} className="text-[blue]">
              Register
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white my-2">
          <p className="flex justify-center text-[18px] font-bold">
            Create your account
          </p>
          <div className="pt-2 px-5 flex flex-col gap-2 text-[14px]">
            <CustomInput
              name={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={"h-[40px] border rounded-md"}
            />
            <CustomInput
              name={"Full Name"}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={"h-[40px] border rounded-md"}
            />
            <CustomInput
              name={"Phone Number"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={"h-[40px] border rounded-md"}
            />
            <CustomInput
              name={"Address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={"h-[40px] border rounded-md"}
            />
            <CustomInput
              name={"Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={"h-[40px]  border rounded-md"}
            />
          </div>
          <div className="flex justify-center my-2">
            <CustomButton
              name={isRegistering ? "Creating account...." : "Register"}
              disabled={isRegistering}
              onClick={handleRegister}
              className={
                "h-[40px] flex justify-center border items-center w-[85%] rounded-md bg-[#cb7529] text-white"
              }
            />
          </div>
          <div className="flex justify-center gap-1 py-2">
            <p>Already have an account?</p>
            <a onClick={() => setIsLogin(true)} className="text-[blue]">
              Login
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
