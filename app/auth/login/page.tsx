"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useCustomToast } from "@/app/constants/useToast";
import { userLogin, userRegister } from "@/app/services/apiServices";
import CustomInput from "@/app/utils/CustomInput";
import CustomButton from "@/app/utils/CustomButtom";

const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLogging, setIsLogging] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [entCode, setEntCode] = useState("");
  const [error, setError] = useState("");

  //......//registration

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const showToast = useCustomToast();

  const handleLogin = async () => {
    try {
      setIsLogging(true);
      const res = await userLogin({
        ent_code: entCode,
      });
      if (res.success === true) {
        localStorage.setItem("accessToken", res.accessToken);
        showToast("loggin successful");
        router.push("/dashboard");
        setIsLogging(false);
      }
    } catch (error: any) {
      setIsLogging(false);
      console.error(error.response.data.message);
      setError(error.response.data.message);
      showToast(error.response.data.message, "error");
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
      console.error(error);
      setIsRegistering(false);
      showToast("Something went wrong try again!", "error");
    }
  };

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="md:w-[40%] sm:w-full border m-2 p-2 bg-white ">
        {isLogin ? (
          <div className="p-10">
            <p className="text-[18px] font-bold flex justify-center">
              Login to your account to continue
            </p>
            {error && <p className="text-[red] text-[14px]">{error}</p>}
            <div className="py-8">
              <CustomInput
                name={"Username"}
                className="h-[40px] border rounded-md"
                value={entCode}
                onChange={(e) => setEntCode(e.target.value)}
              />
              <CustomInput
                name={"Password"}
                value={entCode}
                className="h-[40px] border rounded-md"
                onChange={(e) => setEntCode(e.target.value)}
              />
            </div>

            <CustomButton
              onClick={handleLogin}
              disabled={isLogging}
              name={isLogging ? "Logging in..." : "Login"}
              className={
                "h-[40px] flex justify-center border items-center w-[100%] rounded-md bg-[#cb7529] text-white"
              }
            />
            <div className="flex justify-center gap-1 py-2">
              <p>Dont have an account?</p>
              <a onClick={() => setIsLogin(false)} className="text-[blue]">
                Register
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white mt-2">
            <p className="flex justify-center text-[18px] font-bold">
              Create your account
            </p>
            <div className="pt-4 px-10 flex flex-col gap-2 text-[14px]">
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
    </div>
  );
};

export default Login;
