"use client";
import React, { useEffect, useState } from "react";
import { useContextApi } from "../context/context";
import { IQuotes } from "../types";
import CustomButton from "../utils/CustomButtom";
import Login from "../components/Login";
import { useRouter } from "next/navigation";
import { GrPrevious } from "react-icons/gr";
import { Table } from "antd";

interface QuoteInterface extends IQuotes {
  data: any;
}

const QuotesPage = () => {
  const router = useRouter();
  const { quotes, isUserAuthenticated, setSelectedQuote, user }: any =
    useContextApi();

  const [openLogin, setOpenLogin] = useState(false);

  const handleSelectQuote = (data: any) => {
    if (!isUserAuthenticated()) {
      setOpenLogin(true);
    } else {
      setSelectedQuote(data);
      router.push("/payments");
    }
  };

  const CustomProduct = ({
    model,
    premium,
    yearOfManufacture,
    PHCfund,
    use,
    stamp_duty,
    trainning_levy,
    reqNumber,
    data,
    totalPremium,
    days,
  }: QuoteInterface) => {
    return (
      <div className="md:w-[46%] sm:w-[100%] border rounded-md shadow-2xl hover:border-[#cb7529] cursor-pointer">
        <div className="py-4 px-4 flex justify-between">
          <div>
            <p className="font-bold text-[1.15rem] sm:text-[0.8rem]">
              Total Premium: KES {totalPremium?.toLocaleString()}
            </p>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              Basic premium: KES {premium?.toLocaleString()}
            </p>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              Stamp Duty: KES {stamp_duty}
            </p>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              PHC Fund: KES {PHCfund?.toLocaleString()}
            </p>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              Training Levy: KES {trainning_levy?.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              Model: {model?.toUpperCase()}
            </p>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              Year: {yearOfManufacture}
            </p>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              Use: {use?.toUpperCase()}
            </p>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              Reg Number: {reqNumber}
            </p>
            <p className="font-semibold sm:text-[0.9rem] md:text-[1rem]">
              Cover Period: {365} days
            </p>
          </div>
        </div>
        <div className="flex justify-center px-5 py-5">
          <CustomButton
            name={"View Receipt"}
            onClick={() => handleSelectQuote(data)}
            className=" h-[40px] border w-[20rem]  rounded-md bg-[#cb7529] text-white"
          />
        </div>
      </div>
    );
  };

  const columns = [
    {
      title: "Quote Number",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p>Q/02/03258/04/2024</p>,
    },
    {
      title: "Product",
      dataIndex: "use",
      render: (_: any, item: any) => <p>Motor {item.use}</p>,
    },
    {
      title: "Insured",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p>{user.fullName}</p>,
    },
    {
      title: "Sum Insured",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p>KSH {item.value?.toLocaleString()}</p>,
    },
    {
      title: "Premium",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p>KSH {item.premium.toLocaleString()}</p>,
    },
    {
      title: "Intermediary",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p className="cursor-pointer">Direct</p>,
    },
  ];

  return (
    <div className="bg-[white] py-4 px-4 h-auto md:flex md:flex-col">
      <div
        onClick={() => router.back()}
        className="flex justify-between  cursor-pointer"
      >
        <div className="flex items-center">
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">Quotes</p>
        <p></p>
      </div>

      <Table
        columns={columns}
        dataSource={quotes}
        className="sm:hidden md:block hover:bg-none"
        rowHoverable={false}
      />

      <div className="flex flex-wrap md:hidden sm:block justify-center gap-4 mt-2 sm:flex-col md:flex-row">
        {quotes.map((quote: IQuotes, index: number) => (
          <CustomProduct
            key={index}
            model={quote.model}
            premium={quote.premium}
            yearOfManufacture={quote.yearOfManufacture}
            PHCfund={quote.PHCfund}
            use={quote.use}
            trainning_levy={quote.trainning_levy}
            reqNumber={quote.reqNumber}
            stamp_duty={quote.stamp_duty}
            totalPremium={quote.totalPremium}
            days={quote.days}
            data={quote}
          />
        ))}
      </div>
      <Login open={openLogin} handleClose={() => setOpenLogin(false)} />
    </div>
  );
};

export default QuotesPage;
