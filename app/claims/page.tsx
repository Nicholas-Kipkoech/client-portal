"use client";
import { ConfigProvider, Table } from "antd";
import React from "react";
import { useContextApi } from "../context/context";
import { formatDate } from "../policies/page";
import { GrPrevious } from "react-icons/gr";
import { useRouter } from "next/navigation";

const Claims = () => {
  const { claims, loadingClaims }: any = useContextApi();

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
          } p-[5px] rounded-md`}
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
          <p className="text-[0.5rem] text-slate-600">{item.insured}</p>
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
        className="flex justify-between  cursor-pointer"
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
              colorBgContainer: "whitesmoke",
              paddingXS: 5,
              padding: 5,
              paddingXXS: 1,
              rowHoverBg: "#cb7529",
            },
          },
        }}
      >
        <Table
          columns={columns}
          loading={loadingClaims}
          dataSource={claims}
          scroll={{ x: 200 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Claims;
