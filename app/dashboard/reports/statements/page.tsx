"use client";
import { ConfigProvider, Table } from "antd";
import React from "react";
import { GrPrevious } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useContextApi } from "@/app/context/context";
import { formatDate } from "@/app/utils/helpers";

const Statements = () => {
  const { glStatements, loadingGl }: any = useContextApi();

  const columns = [
    {
      title: "Issue Date",
      dataIndex: "policyNo",
      render: (_: any, item: any) => <p>{formatDate(item.issueDate)}</p>,
    },
    {
      title: "Doc No",
      dataIndex: "docNo",
    },
    {
      title: "End No",
      dataIndex: "endNo",
    },
    {
      title: "Debit No",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => (
        <p className="text-[13px]">{item.debitNo}</p>
      ),
    },
    {
      title: "Vehicles",
      dataIndex: "lossDate",
      render: (_: any, item: any) => <p> {item.vehicles}</p>,
    },
    {
      title: "Insured",
      dataIndex: "intimationDate",
      render: (_: any, item: any) => <p>{item.insured}</p>,
    },
    {
      title: "DR/DC",
      dataIndex: "currency",
      render: (_: any, item: any) => (
        <p>{item.drCr === "D" ? "Debit" : "Credit"}</p>
      ),
    },
    {
      title: "DR/DC",
      dataIndex: "currency",
      render: (_: any, item: any) => <p>{item.currency}</p>,
    },
    {
      title: "Premium",
      dataIndex: "total",
      render: (_: any, item: any) => <p> {item.premium.toLocaleString()}</p>,
    },

    {
      title: "PVT premium",
      dataIndex: "paid",
      render: (_: any, item: any) => <p> {item.PVTprem.toLocaleString()}</p>,
    },
    {
      title: "Stamp Duty",
      dataIndex: "paid",
      render: (_: any, item: any) => <p> {item.stampDuty.toLocaleString()}</p>,
    },
    {
      title: "Training Levy",
      dataIndex: "paid",
      render: (_: any, item: any) => (
        <p> {item.trainingLevy.toLocaleString()}</p>
      ),
    },
    {
      title: "PHC Fund",
      dataIndex: "paid",
      render: (_: any, item: any) => <p> {item.PHCfund.toLocaleString()}</p>,
    },
    {
      title: "Comm",
      dataIndex: "comm",
      render: (_: any, item: any) => <p> {item.comm.toLocaleString()}</p>,
    },
    {
      title: "W Tax",
      dataIndex: "paid",
      render: (_: any, item: any) => <p> {item.Wtax.toLocaleString()}</p>,
    },
    {
      title: "Policy Net",
      dataIndex: "paid",
      render: (_: any, item: any) => <p> {item.policyNet.toLocaleString()}</p>,
    },
    {
      title: "Credit Net",
      dataIndex: "creditNet",
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
    },
  ];
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center" onClick={() => router.back()}>
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">
          GL Statements
        </p>
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
          loading={loadingGl}
          dataSource={glStatements}
          scroll={{ x: 1800 }}
          pagination={{ pageSize: 20 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Statements;
