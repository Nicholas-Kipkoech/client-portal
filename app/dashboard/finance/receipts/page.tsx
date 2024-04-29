"use client";
import { useContextApi } from "@/app/context/context";
import { formatDate } from "@/app/utils/helpers";
import { ConfigProvider, Table } from "antd";
import React from "react";

const Receipts = () => {
  const { receiptsData, user }: any = useContextApi();
  const columns = [
    {
      title: "Reeeipt NO",
      dataIndex: "policyNo",
      render: (_: any, item: any) => <p>{item.receiptNo}</p>,
    },
    {
      title: "Client",
      dataIndex: "endNo",
      render: (_: any, item: any) => <p>{item.from}</p>,
    },
    {
      title: "Intermediary",
      dataIndex: "endNo",
      render: (_: any, item: any) => <p>{user.entityName}</p>,
    },
    {
      title: "Narration",
      dataIndex: "product",
      render: (_: any, item: any) => <p>{item.narration}</p>,
    },
    {
      title: "Amount",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p> KSH {item.amount.toLocaleString()}</p>,
    },
    {
      title: "GL Date",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p>{formatDate(item.GLDate)}</p>,
    },
    {
      title: "Receipt Mode",
      dataIndex: "status",
      render: (_: any, item: any) => <p>{item.receiptMode}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_: any, item: any) => <p>{item.status}</p>,
    },
    {
      title: "Posted",
      dataIndex: "status",
      render: (_: any, item: any) => <p>{item.posted}</p>,
    },
    {
      title: "Action",
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div className="flex gap-2">
          <a
            target="__blank"
            href={item.receiptUrl}
            className="p-[4px] border cursor-pointer bg-slate-700 text-white rounded-md"
          >
            Download Receipt
          </a>{" "}
        </div>
      ),
    },
  ];
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#092332",
              headerColor: "white",
              padding: 4,
              colorBgContainer: "whitesmoke",
              rowHoverBg: "#cb7529",
            },
          },
        }}
      >
        <Table
          className="mt-2"
          columns={columns}
          dataSource={receiptsData}
          scroll={{ x: 1600 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Receipts;
