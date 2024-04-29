"use client";
import { useContextApi } from "@/app/context/context";
import { formatDate } from "@/app/utils/helpers";
import { ConfigProvider, Table } from "antd";
import React from "react";

const ClaimsCreditNotes = () => {
  const { claimCreditNotes }: any = useContextApi();
  const columns = [
    {
      title: "Journal NO",
      dataIndex: "policyNo",
      render: (_: any, item: any) => <p>{item.journalNo}</p>,
    },
    {
      title: "GL Date",
      dataIndex: "endNo",
      render: (_: any, item: any) => <p>{formatDate(item.glDate)}</p>,
    },
    {
      title: "Currency",
      dataIndex: "product",
      render: (_: any, item: any) => <p>{item.currency}</p>,
    },
    {
      title: "DR Total",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p> {item.DRTotal.toLocaleString()}</p>,
    },
    {
      title: "CR Total",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p>{item.CRTotal.toLocaleString()}</p>,
    },
    {
      title: "Type",
      dataIndex: "status",
      render: (_: any, item: any) => <p>{item.type}</p>,
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
      title: "Narration",
      dataIndex: "status",
      render: (_: any, item: any) => <p>{item.narration}</p>,
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
          dataSource={claimCreditNotes}
          scroll={{ x: 1200 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default ClaimsCreditNotes;
