"use client";
import { ConfigProvider, Table } from "antd";
import React from "react";

import { GrPrevious } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { formatDate } from "@/app/utils/helpers";
import { useContextApi } from "@/app/context/context";

const CommissionPayble = () => {
  const { commissionPayable, loadingCommissions }: any = useContextApi();

  const columns = [
    {
      title: "Policy No",
      dataIndex: "policyNo",
    },
    {
      title: "End No",
      dataIndex: "endNo",
    },
    {
      title: "GL Date",
      dataIndex: "glDate",
    },
    {
      title: "Insured",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => (
        <p className="text-[13px] font-bold">{item.insured}</p>
      ),
    },
    {
      title: "Total Premium",
      dataIndex: "lossDate",
      render: (_: any, item: any) => <p>{item.totalPremium}</p>,
    },
    {
      title: "Paid Premium",
      dataIndex: "intimationDate",
      render: (_: any, item: any) => <p>{item.paidPremium}</p>,
    },
    {
      title: "Outstanding",
      dataIndex: "currency",
      render: (_: any, item: any) => <p>{item.osPremium}</p>,
    },
    {
      title: "Basic Premium",
      dataIndex: "total",
      render: (_: any, item: any) => <p>{item.basicPremium}</p>,
    },
    {
      title: "Comm Rate",
      dataIndex: "paid",
      render: (_: any, item: any) => <p>{item.commRate}</p>,
    },
    {
      title: "Commission",
      dataIndex: "paid",
      render: (_: any, item: any) => <p>{item.commission}</p>,
    },
    {
      title: "WHT on Comm",
      dataIndex: "paid",
      render: (_: any, item: any) => <p>{item.WHTonComm}</p>,
    },
    {
      title: "Paid Commission",
      dataIndex: "paid",
      render: (_: any, item: any) => <p>{item.paidComm}</p>,
    },
    {
      title: "Net Comm Payable",
      dataIndex: "paid",
      render: (_: any, item: any) => <p>{item.netPayable}</p>,
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
          Commission Payable
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
          loading={loadingCommissions}
          dataSource={commissionPayable}
          scroll={{ x: 1500 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default CommissionPayble;
