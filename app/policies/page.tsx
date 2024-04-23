"use client";

import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { GrPrevious } from "react-icons/gr";
import { useContextApi } from "../context/context";
import { Months } from "../utils/months";

const Policies = () => {
  const router = useRouter();
  const { policies, loadingPolicies }: any = useContextApi();

  const handleViewReceipt = (name: string) => {
    localStorage.setItem("receipt_name", name);
    router.push(`/policies/${name.replace(" ", "")}`);
  };

  function formatDate(serverTime: string) {
    const date = new Date(serverTime);
    const day = date.getDate();
    const month = Months[date.getMonth()];
    const year = date.getFullYear();
    return day + "-" + month + "-" + year;
  }

  const columns = [
    {
      title: "Policy Number",
      dataIndex: "policyNo",
      render: (_: any, item: any) => <p>{item.policyNo}</p>,
    },
    {
      title: "End No",
      dataIndex: "endNo",
      render: (_: any, item: any) => <p>{item.endNo}</p>,
    },
    {
      title: "Product",
      dataIndex: "product",
      render: (_: any, item: any) => <p>{item.product}</p>,
    },
    {
      title: "Period",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => (
        <div>
          <p>From : {formatDate(item.periodFrom)}</p>
          <p>To : {formatDate(item.periodTo)}</p>
        </div>
      ),
    },
    {
      title: "Entities",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => (
        <div>
          <p>Insured : {item.client}</p>
          <p>Intermediary : {item.intermediary}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_: any, item: any) => <p>{item.status}</p>,
    },
  ];

  return (
    <div className="flex flex-col justify-center ">
      <div className="flex justify-between">
        <div
          className="cursor-pointer flex items-center"
          onClick={() => router.back()}
        >
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p>Policies</p>
        <p></p>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#092332",
              headerColor: "white",

              colorBgContainer: "whitesmoke",
              padding: 4,
              paddingXS: 5,
              paddingXXS: 1,
              rowHoverBg: "#cb7529",
            },
          },
        }}
      >
        <Table
          className="mt-2"
          dataSource={policies}
          loading={loadingPolicies}
          columns={columns}
        />
        ;
      </ConfigProvider>
    </div>
  );
};

export default Policies;
