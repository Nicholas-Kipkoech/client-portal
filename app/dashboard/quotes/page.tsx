"use client";
import React from "react";
import { useContextApi } from "../../context/context";

import { GrPrevious } from "react-icons/gr";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";

const QuotesPage = () => {
  const router = useRouter();

  const { quotes, user }: any = useContextApi();

  const columns = [
    {
      title: "Quote Number",
      dataIndex: "invoiceNumber",
      render: (_: any) => <p>Q/02/03258/04/2024</p>,
    },
    {
      title: "Product",
      dataIndex: "use",
      render: (_: any, item: any) => <p>Motor {item.use}</p>,
    },
    {
      title: "Insured",
      dataIndex: "invoiceNumber",
      render: (_: any) => <p>{user.fullName}</p>,
    },
    {
      title: "Sum Insured",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p>KSH {item.value?.toLocaleString()}</p>,
    },
    {
      title: "Premium",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p>KSH {item.premium.toLocaleString()}</p>,
    },
    {
      title: "Intermediary",
      dataIndex: "invoiceNumber",
      render: (_: any) => <p className="cursor-pointer">Direct</p>,
    },
  ];

  return (
    <div className="bg-[white] py-4 px-4 h-auto md:flex md:flex-col">
      <div
        onClick={() => router.back()}
        className="flex justify-between  cursor-pointer"
      >
        <div className="flex items-center">
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">Quotes</p>
        <p></p>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#092332",
              headerColor: "white",
              colorBgContainer: "whitesmoke",
              padding: 10,
              rowHoverBg: "#cb7529",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={quotes}
          className=" hover:bg-none"
          scroll={{ x: 1000 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default QuotesPage;
