"use client";
import { ConfigProvider, Table } from "antd";
import React from "react";

import { GrPrevious } from "react-icons/gr";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/app/utils/helpers";
import { useContextApi } from "@/app/context/context";

const OpenClaims = () => {
  const { openClaims, loadingClaims }: any = useContextApi();

  const columns = [
    {
      title: "Claim No",
      dataIndex: "claimNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className={`${
            item.status === "Open"
              ? "bg-blue-400 text-black"
              : "bg-red-400 text-white"
          } w-[6rem] h-[2rem] rounded-md flex items-center justify-center`}
        >
          {item.status}
        </div>
      ),
    },
    {
      title: "Policy No",
      dataIndex: "policyNumber",
    },
    {
      title: "Insured",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => (
        <div>
          <p className="text-[12px]">{item.intermediary}</p>
          <p className="text-[12px]">{item.insured}</p>
        </div>
      ),
    },
    {
      title: "Loss Date",
      dataIndex: "lossDate",
      render: (_: any, item: any) => <p>{formatDate(item.lossDate)}</p>,
    },
    {
      title: "Intimation Date",
      dataIndex: "intimationDate",
      render: (_: any, item: any) => <p>{formatDate(item.intimationDate)}</p>,
    },
    {
      title: "Currency",
      dataIndex: "currency",
    },
    {
      title: "Outstanding",
      dataIndex: "total",
      render: (_: any, item: any) => <p>{item.total.toLocaleString()}</p>,
    },
    {
      title: "Paid",
      dataIndex: "paid",
      render: (_: any, item: any) => <p>{item.paid.toLocaleString()}</p>,
    },
  ];
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => router.back()}
        className="flex justify-between items-center  cursor-pointer"
      >
        <div className="flex items-center">
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">Claims</p>
        <p></p>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#092332",
              headerColor: "white",
              padding: 2,
              rowHoverBg: "#cb7529",
            },
          },
        }}
      >
        <Table
          columns={columns}
          loading={loadingClaims}
          dataSource={openClaims}
          scroll={{ x: 1500 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default OpenClaims;
