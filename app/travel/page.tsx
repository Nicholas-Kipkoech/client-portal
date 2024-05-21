"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import { countriesOptions } from "./travelUtils";
import CustomSelect from "../utils/CustomSelect";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButtom";
import axios from "axios";
import { formatDate } from "../utils/helpers";

const Travel = () => {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dob, setDOB] = useState("");
  const [token, setToken] = useState("");

  async function getToken() {
    const response = await axios.post(
      "http://105.27.207.82:8101/icon/bima/auth/generatetoken",
      {
        un: "icon",
        pw: "B1MA",
      }
    );
    setToken(response.data.value);
  }

  useEffect(() => {
    getToken();
  }, []);

  function getDates() {
    let fmDate = "";
    let _toDate = "";
    let _dob = "";

    if (fromDate !== "" && toDate !== "" && dob !== "") {
      fmDate = formatDate(new Date(fromDate).toISOString());
      _toDate = formatDate(new Date(toDate).toISOString());
      _dob = formatDate(new Date(dob).toISOString());
    }
    return {
      fmDate,
      _toDate,
      _dob,
    };
  }
  const { _toDate, fmDate, _dob } = getDates();
  const payload = {
    destination: destination,
    policyFromDate: fmDate,
    policyExpiryDate: _toDate,
    token: token,
    dob: _dob,
  };

  const handleGetQuote = () => {
    router.push("/travel/quote");
    localStorage.setItem("travelQuote", JSON.stringify(payload));
  };

  return (
    <div className="m-5">
      <div
        onClick={() => router.back()}
        className="flex gap-2 items-center cursor-pointer  py-1 bg-yellow-950 text-white w-[6rem] mb-2 justify-center rounded-md"
      >
        <IoArrowBackOutline size={20} />
        <p>Back</p>
      </div>

      <div className="flex items-center  gap-2 justify-center">
        <div className="w-auto border  bg-white shadow-2xl rounded-md h-[30rem] flex items-center justify-center  flex-col p-5">
          <CustomSelect
            name="Destination"
            options={countriesOptions}
            className="w-[30rem] "
            placeholder={"Select Destination..."}
            onChange={(value: any) => setDestination(value.value)}
          />
          <CustomInput
            name="Travel Date"
            type="date"
            className={"border w-[30rem] h-[2.6rem] rounded-md"}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <CustomInput
            name="Return Date"
            type="date"
            className={"border w-[30rem] h-[2.6rem] rounded-md"}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <CustomInput
            name="Date of Birth"
            type="date"
            className={"border w-[30rem] h-[2.6rem] rounded-md"}
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
          />
          <CustomButton
            name={"Get Quote"}
            onClick={handleGetQuote}
            className={
              "bg-[#cb7229] text-white w-[30rem] my-5 h-[3rem] rounded-[30px] text-[1.2rem]"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Travel;
