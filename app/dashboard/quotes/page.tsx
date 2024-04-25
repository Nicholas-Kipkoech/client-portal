"use client";
import React from "react";
import { useContextApi } from "../../context/context";

import { GrPrevious } from "react-icons/gr";
import { ConfigProvider, Table } from "antd";
import { IQuotes } from "../../types";
import CustomButton from "@/app/utils/CustomButtom";
import Link from "next/link";
import { useRouter } from "next/navigation";

const QuotesPage = () => {
  const router = useRouter();

  const { quotes, user }: any = useContextApi();

  const CustomProduct = ({
    model,
    premium,
    yearOfManufacture,
    use,
    reqNumber,
    totalPremium,
    value,
  }: IQuotes) => {
    return (
      <div className="md:w-[46%] sm:w-[100%] border rounded-md shadow-2xl hover:border-[#cb7529] cursor-pointer">
        <div className="py-4 px-4 flex justify-between">
          <div>
            <p className="font-bold text-[1.15rem] sm:text-[0.8rem]">
              Quote Number: Q/02/03258/04/2024
            </p>
            <p className="font-bold text-[1.15rem] sm:text-[0.8rem]">
              Product : Motor {use}
            </p>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              Insured : {user.fullName}
            </p>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              Sum Insured : KES {value?.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="sm:text-[0.9rem] md:text-[1rem]">
              Premium: {premium.toLocaleString()}
            </p>

            <p className="font-semibold sm:text-[0.9rem] md:text-[1rem]">
              Intermediary: Direct
            </p>
          </div>
        </div>
      </div>
    );
  };

  const columns = [
    {
      title: "Quote Number",
      dataIndex: "invoiceNumber",
      render: (_: any) => <p>Q/02/03258/04/2024</p>,
    },
    {
      title: "Product",
      dataIndex: "use",
      render: (_: any, item: any) => <p>Motor {item.use}</p>,
    },
    {
      title: "Insured",
      dataIndex: "invoiceNumber",
      render: (_: any) => <p>{user.fullName}</p>,
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
      render: (_: any) => <p className="cursor-pointer">Direct</p>,
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

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#092332",
              headerColor: "white",
              colorBgContainer: "whitesmoke",
              padding: 10,
              rowHoverBg: "#cb7529",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={quotes}
          className="sm:hidden md:block hover:bg-none"
          scroll={{ x: 1000 }}
        />
      </ConfigProvider>
      <div className="flex flex-wrap md:hidden justify-center gap-4 mt-2 sm:flex-col md:flex-row">
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
            value={quote.value}
          />
        ))}
      </div>
    </div>
  );
};

export default QuotesPage;
