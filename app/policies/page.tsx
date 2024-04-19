"use client";

import { Table } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { GrPrevious } from "react-icons/gr";

const Policies = () => {
  const router = useRouter();

  const handleViewReceipt = (name: string) => {
    localStorage.setItem("receipt_name", name);
    router.push(`/policies/${name.replace(" ", "")}`);
  };

  const columns = [
    {
      title: "Quote Number",
      dataIndex: "invoiceNumber",
      render: (_: any, item: string) => <p>Q/02/03258/04/2024</p>,
    },
    {
      title: "End No",
      dataIndex: "invoiceNumber",
      render: (_: any, item: string) => <p>Q/02/03258/04/2024</p>,
    },
    {
      title: "Product",
      dataIndex: "invoiceNumber",
      render: (_: any, item: string) => <p>Q/02/03258/04/2024</p>,
    },
    {
      title: "Period",
      dataIndex: "invoiceNumber",
      render: (_: any, item: string) => <p>Q/02/03258/04/2024</p>,
    },
    {
      title: "Entities",
      dataIndex: "invoiceNumber",
      render: (_: any, item: string) => <p>Q/02/03258/04/2024</p>,
    },
    {
      title: "Status",
      dataIndex: "invoiceNumber",
      render: (_: any, item: string) => <p>Q/02/03258/04/2024</p>,
    },
  ];

  return (
    <div className="flex flex-col justify-center my-4 md:mx-8 sm:mx-4">
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
      <Table columns={columns} dataSource={[]} />
    </div>
  );
};

export default Policies;
