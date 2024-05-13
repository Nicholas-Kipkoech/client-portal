"use client";
import FinanceContext from "@/app/context/finance/finance-context";
import { formatDate } from "@/app/utils/helpers";
import { ConfigProvider, Table } from "antd";
import React, { useContext } from "react";

const Debits = () => {
  const { debits }: any = useContext(FinanceContext);
  const columns = [
    {
      title: "Doc NO",
      dataIndex: "policyNo",
      render: (_: any, item: any) => <p>{item.docNumber}</p>,
    },
    {
      title: "GL Date",
      dataIndex: "endNo",
      render: (_: any, item: any) => <p>{formatDate(item.glDate)}</p>,
    },
    {
      title: "Policy No",
      dataIndex: "product",
      render: (_: any, item: any) => <p>{item.policyNo}</p>,
    },
    {
      title: "End No",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p> {item.endNo}</p>,
    },
    {
      title: "Insured",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p>{item.insured}</p>,
    },
    {
      title: "Premium",
      dataIndex: "status",
      render: (_: any, item: any) => <p>KSH {item.premium.toLocaleString()}</p>,
    },
    {
      title: "Paid",
      dataIndex: "status",
      render: (_: any, item: any) => <p>KSH {item.paid.toLocaleString()}</p>,
    },
    {
      title: "Outstanding Balance",
      dataIndex: "status",
      render: (_: any, item: any) => <p>KSH {item.os.toLocaleString()}</p>,
    },
    {
      title: "Action",
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div className="flex gap-2">
          <a
            target="_blank"
            href={item.receiptUrl}
            className="p-[4px] border cursor-pointer bg-slate-700 text-white rounded-md"
          >
            Download ETIMS
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
              padding: 2,
              paddingXXS: 5,
              colorBgContainer: "whitesmoke",
              rowHoverBg: "#cb7529",
            },
          },
        }}
      >
        <Table
          className="mt-2"
          columns={columns}
          dataSource={debits}
          scroll={{ x: 1200 }}
          pagination={{ pageSize: 20 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Debits;
