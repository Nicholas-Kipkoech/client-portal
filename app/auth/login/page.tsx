"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useCustomToast } from "@/app/constants/useToast";
import { userLogin, userRegister } from "@/app/services/apiServices";
import CustomInput from "@/app/utils/CustomInput";
import CustomButton from "@/app/utils/CustomButtom";
import { message as Message } from "antd";

const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLogging, setIsLogging] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [password, setPassword] = useState("");
  const [kraPIN, setKraPIN] = useState("");
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [error, setError] = useState("");

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  //......//registration

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [message, messageContext] = Message.useMessage();

  const errorFn = (_message: string) => {
    message
      .open({
        type: "error",
        content: "Attempting to login...",
        duration: 1,
      })
      .then(() => message.error(_message));
  };

  const showToast = useCustomToast();

  const handleLogin = async () => {
    try {
      setIsLogging(true);
      const res = await userLogin({
        un: loginDetails.username,
        pw: loginDetails.password,
      });
      if (res.success === true) {
        if (res.userPayload !== null) {
          localStorage.setItem("accessToken", res.accessToken);
          message.success("loggin successful");
          router.push("/dashboard");
          setIsLogging(false);
        } else {
          errorFn("Unauthorized login!!!");
          setIsLogging(false);
        }
      }
    } catch (error) {
      setIsLogging(false);
      console.error(error);
      message.error("something went wrong!");
    }
  };

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      const payload = {
        address,
        email,
        fullName,
        password,
        phoneNumber,
        kraPIN,
      };
      const state = localStorage.getItem("state");
      const existingQuotesJSON = localStorage.getItem("quotes");
      const existingQuotes = existingQuotesJSON
        ? JSON.parse(existingQuotesJSON)
        : {};
      const updatedQuotes = {
        ...existingQuotes,
        ...payload,
      };
      if (state === "quote") {
        localStorage.setItem("quotes", JSON.stringify(updatedQuotes));
        router.push("/quote/payments");
      }
    } catch (error) {
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
              {messageContext}
            </p>
            {error && <p className="text-[red] text-[14px]">{error}</p>}
            <div className="py-8">
              <CustomInput
                name={"Username"}
                required
                className="h-[40px] border rounded-md"
                value={loginDetails.username}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, username: e.target.value })
                }
              />
              <CustomInput
                name={"Password"}
                required
                type={passwordVisible ? "text" : "password"}
                className="h-[40px] border rounded-md"
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
              />
              <div className="mt-2 flex items-center gap-1">
                <input
                  type="checkbox"
                  onChange={() => setPasswordVisible((prev) => !prev)}
                />
                <label>Show password</label>
              </div>
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
                name={"KRA PIN"}
                value={kraPIN}
                onChange={(e) => setKraPIN(e.target.value)}
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
