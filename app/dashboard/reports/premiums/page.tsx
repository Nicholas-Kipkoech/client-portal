"use client";
import CsvDownloader from "react-csv-downloader";
import React, { useContext, useState } from "react";
import { formatDate, Months } from "@/app/utils/helpers";
import { DatePicker, Spin } from "antd";
import CustomButton from "@/app/utils/CustomButtom";
import { LoadingOutlined } from "@ant-design/icons";
import ReportsContext from "@/app/context/reports/reports-context";

const Premiums = () => {
  const {
    premiumReports,
    setFromDate,
    setToDate,
    loadingPremiumReports,
    fromDate,
    toDate: _toDate,
  }: any = useContext(ReportsContext);

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
      id: "premClass",
      displayName: "Class",
    },
    {
      id: "premSubClass",
      displayName: "Sub Class",
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
      premClass: premium.premClass,
      premSubClass: premium.premSubClass,
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
    <div className="flex flex-col items-center justify-center md:mt-[6rem] sm:mt-[2rem]">
      <p className="flex justify-center font-bold">
        Running Period [ {fromDate}-{toDate} ]
      </p>
      <div className="md:w-[60%] sm:w-full flex flex-col gap-2 border p-2">
        <div className="flex sm:flex-col md:flex-row items-center justify-center gap-2">
          <div className="flex flex-col md:mt-2 sm:mt-1">
            <label>From date</label>
            <DatePicker
              format={"DD-MM-YYYY"}
              placeholder={fromDate}
              className={"w-[250px] h-[40px] border p-2 rounded-md"}
              onChange={handleFromDate}
            />
          </div>
          <div className="flex flex-col md:mt-2 sm:mt-1">
            <label>To date</label>
            <DatePicker
              format={"DD-MM-YYYY"}
              placeholder={toDate}
              className={"w-[250px] h-[40px] border p-2 rounded-md"}
              onChange={handleToDate}
            />
          </div>
          <CustomButton
            name={loadingPremiumReports ? "Running..." : "Run"}
            onClick={handleRunReports}
            className="border h-[40px] w-[15rem] bg-slate-800 text-white rounded-md md:mt-8 sm:mt-4"
          />
        </div>
        <p className="md:text-[1.5rem] sm:text-[0.8rem] font-bold flex justify-center">
          [ {fmDate ? fmDate : fromDate} to {toDate ? toDate : _toDate}]
        </p>
        <CsvDownloader
          disabled={loadingPremiumReports}
          filename={`Premium Register [${fmDate}] - [${toDate}]`}
          extension=".csv"
          columns={columns}
          datas={mappedPremiums}
          className="bg-[#cb7529] h-[3rem] rounded-sm text-white border w-auto p-2 flex justify-center items-center"
        >
          {loadingPremiumReports ? (
            <Spin
              spinning={loadingPremiumReports}
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 25,
                    color: "white",
                  }}
                />
              }
            />
          ) : (
            `Download CSV ${mappedPremiums.length} records`
          )}
        </CsvDownloader>
      </div>
    </div>
  );
};

export default Premiums;
