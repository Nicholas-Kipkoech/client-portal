"use client";
import CsvDownloader from "react-csv-downloader";
import React, { useState } from "react";
import { useContextApi } from "@/app/context/context";
import { formatDate, Months } from "@/app/utils/helpers";
import { DatePicker } from "antd";
import CustomButton from "@/app/utils/CustomButtom";

const Premiums = () => {
  const {
    premiumReports,
    user,
    setFromDate,
    setToDate,
    loadingPremiumReports,
    fromDate,
    toDate: _toDate,
  }: any = useContextApi();
  const columns = [
    {
      id: "policyNo",
      displayName: "Policy Number",
    },
    {
      id: "endNo",
      displayName: "Endorsement Number",
    },
    {
      id: "sumInsured",
      displayName: "Sum Insured",
    },
    {
      id: "insuredName",
      displayName: "Insured Name",
    },
    {
      id: "issueDate",
      displayName: "Issue Date",
    },
    {
      id: "start",
      displayName: "Start Date",
    },
    {
      id: "expiry",
      displayName: "Expiry",
    },
    {
      id: "premium",
      displayName: "Premium",
    },
    {
      id: "earthQuake",
      displayName: "EarthQuake",
    },
    {
      id: "pvt",
      displayName: "PVT",
    },
    {
      id: "stamp",
      displayName: "Stamp",
    },
    {
      id: "PHCfund",
      displayName: "PHC Fund",
    },
    {
      id: "traningLevy",
      displayName: "Training Levy",
    },
    {
      id: "PTACharge",
      displayName: "PTA Charge",
    },
    {
      id: "AACharge",
      displayName: "AA Charge",
    },
    {
      id: "brokerComm",
      displayName: "Broker Commission",
    },
    {
      id: "witHoldingTax",
      displayName: "WitHolding Tax",
    },
    {
      id: "brokerCommNet",
      displayName: "Broker Commission Net",
    },
    {
      id: "netPremium",
      displayName: "Net premium",
    },
  ];

  const mappedPremiums = premiumReports.map((premium: any) => {
    return {
      policyNo: premium.policyNo,
      endNo: premium.endNo,
      sumInsured: premium.sumInsured,
      insuredName: premium.insuredName,
      issueDate: formatDate(premium.issueDate),
      start: formatDate(premium.start),
      expiry: formatDate(premium.expiry),
      premium: premium.premium,
      earthQuake: premium.earthQuake,
      pvt: premium.pvt,
      stamp: premium.stamp,
      PHCfund: premium.PHCfund,
      traningLevy: premium.traningLevy,
      PTACharge: premium.PTACharge,
      AACharge: premium.AACharge,
      brokerComm: premium.brokerComm,
      witHoldingTax: premium.witHoldingTax,
      brokerCommNet: premium.brokerCommNet,
      netPremium: premium.netPremium,
    };
  });
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

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[60%] flex flex-col gap-2">
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
            name={loadingPremiumReports ? "Running..." : "Run"}
            onClick={handleRunReports}
            className="border h-[40px] w-[15rem] bg-slate-800 text-white rounded-md mt-8"
          />
        </div>
        <p className="text-[1.5rem] font-bold flex justify-center">
          Premium Register for {fmDate ? fmDate : fromDate} to{" "}
          {toDate ? toDate : _toDate}
        </p>
        <CsvDownloader
          filename={`Premium Register ${fmDate}-${toDate}`}
          extension=".csv"
          columns={columns}
          datas={mappedPremiums}
          className="bg-[#cb7529] h-[3rem] rounded-sm text-white border w-auto p-2 flex justify-center items-center"
        >
          Download CSV {mappedPremiums.length} records
        </CsvDownloader>
      </div>
    </div>
  );
};

export default Premiums;
