"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useContextApi } from "../context/context";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButtom";
import { Months } from "../utils/helpers";
import { DatePicker } from "antd";

interface CustomCardProps {
  name: string;
  count: number;
  to: string | undefined;
  currency: boolean;
}

const Dashboard = () => {
  const {
    quotes,
    claims,
    policies,
    totalPremium,
    totalCommission,
    setFromDate,
    setToDate,
    loadingUwData,
  }: any = useContextApi();
  const [fmDate, setFmDate] = useState("");
  const [toDate, setTdDate] = useState("");

  const handleToDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split("-");
    let formattedMonth: any = "";
    if (month < 10) {
      formattedMonth = Months[month.toString().slice(1) - 1];
    } else {
      formattedMonth = Months[Number(month - 1)];
    }
    const formattedToDate = day + "-" + formattedMonth + "-" + year;
    setTdDate(formattedToDate);
  };

  const handleFromDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split("-");
    let formattedMonth: any = "";
    if (month < 10) {
      formattedMonth = Months[month.toString().slice(1) - 1];
    } else {
      formattedMonth = Months[Number(month - 1)];
    }
    const formattedToDate = day + "-" + formattedMonth + "-" + year;
    setFmDate(formattedToDate);
  };
  const checkDate = fmDate.split("-").join("") === "undefinedundefined";
  const handleRunReports = () => {
    if (checkDate === true) {
      alert("Please select from date and to date");
    } else {
      setFromDate(fmDate);
      setToDate(toDate);
    }
  };

  const CustomCard = ({
    name,
    count,
    to,
    currency,
  }: Partial<CustomCardProps>) => {
    return (
      <Link
        href={`dashboard/${to}`}
        className="h-[10rem] w-[20rem] border flex flex-col items-center justify-center shadow-xl"
      >
        <p className="flex justify-center text-[2rem] font-bold">{name}</p>
        <div className="flex justify-center">
          <p className="font-bold text-[1.2rem] text-slate-600">
            {" "}
            {currency && "KSH"} {count?.toLocaleString()}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <div className="pt-2">
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col mt-2">
          <label>From date</label>
          <DatePicker
            format={"DD-MM-YYYY"}
            placeholder={"DD-MM-YYYY"}
            className={"w-[250px] h-[40px] border p-2 rounded-md"}
            onChange={handleFromDate}
          />
        </div>
        <div className="flex flex-col mt-2">
          <label>To date</label>
          <DatePicker
            format={"DD-MM-YYYY"}
            placeholder={"DD-MM-YYYY"}
            className={"w-[250px] h-[40px] border p-2 rounded-md"}
            onChange={handleToDate}
          />
        </div>
        <CustomButton
          name={loadingUwData ? "Running..." : "Run"}
          onClick={handleRunReports}
          className="border h-[2rem] w-[10rem] bg-slate-800 text-white rounded-md mt-8"
        />
      </div>
      <div className="pt-2 flex flex-wrap gap-2">
        <CustomCard name="Quotes" count={quotes.length} to="quotes" />
        <CustomCard name="Policies" count={policies.length} to="policies" />
        <CustomCard name="Claims" count={claims.length} to="claims" />
        <CustomCard name="Receipts" count={0} to="" />
        <CustomCard name="Premium" count={totalPremium} to="" currency={true} />
        <CustomCard
          name="Commission"
          count={totalCommission}
          to=""
          currency={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;
