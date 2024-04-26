"use client";

import { useContextApi } from "@/app/context/context";
import { formatDate } from "@/app/utils/helpers";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";

import React from "react";
import { GrPrevious } from "react-icons/gr";

const Policies = () => {
  const router = useRouter();
  const { filteredPolicies, loadingPolicies }: any = useContextApi();

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
      <div
        onClick={() => router.back()}
        className="flex justify-between  cursor-pointer"
      >
        <div className="flex items-center">
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">Policies</p>
        <p></p>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#092332",
              headerColor: "white",
              padding: 2,
              colorBgContainer: "whitesmoke",
              rowHoverBg: "#cb7529",
            },
          },
        }}
      >
        <Table
          className="mt-2"
          dataSource={filteredPolicies}
          loading={loadingPolicies}
          columns={columns}
          scroll={{ x: 1500 }}
        />
        ;
      </ConfigProvider>
    </div>
  );
};

export default Policies;
