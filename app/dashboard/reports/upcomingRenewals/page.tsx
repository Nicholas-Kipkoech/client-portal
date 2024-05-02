"use client";
import { ConfigProvider, Table } from "antd";
import React from "react";
import { GrPrevious } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useContextApi } from "@/app/context/context";
import { format3months, formatDate } from "@/app/utils/helpers";

const UpcomingRenewals = () => {
  const { upcomingRenewals }: any = useContextApi();
  const { next3Month, systemDate } = format3months();

  const columns = [
    {
      title: "Policy No",
      dataIndex: "policyNo",
    },
    {
      title: "Insured",
      dataIndex: "insured",
    },
    {
      title: "Intermediary",
      dataIndex: "intermediary",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Expiry Date",
      dataIndex: "lossDate",
      render: (_: any, item: any) => <p> {formatDate(item.expiryDate)}</p>,
    },
    {
      title: "Sum Insured",
      dataIndex: "intimationDate",
      render: (_: any, item: any) => <p>{item.sumInsured.toLocaleString()}</p>,
    },
    {
      title: "Current Premium",
      dataIndex: "currency",
      render: (_: any, item: any) => (
        <p>{item.currentPremium.toLocaleString()}</p>
      ),
    },
    {
      title: "Renewal Premium",
      dataIndex: "currency",
      render: (_: any, item: any) => (
        <p>{item.renewalPremium.toLocaleString()}</p>
      ),
    },
    {
      title: "Loss Ratio",
      dataIndex: "total",
      render: (_: any, item: any) => <p> {item.lossRatio}/%</p>,
    },

    {
      title: "Branch",
      dataIndex: "branch",
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Reason",
      dataIndex: "paid",
      render: (_: any, item: any) => (
        <p> {item.reason ? item.reason : "null"}</p>
      ),
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
        <p className="md:text-[1rem] sm:text-[1rem] font-bold">
          Upcoming Renewals [{systemDate} to {next3Month}]
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
          loading={upcomingRenewals.length < 1}
          dataSource={upcomingRenewals}
          scroll={{ x: 2000 }}
          pagination={{ pageSize: 20 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default UpcomingRenewals;
