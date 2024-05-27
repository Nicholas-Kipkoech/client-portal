"use client";
import { formatDate } from "@/app/utils/helpers";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import RiskNoteModal from "./riskNoteModal";

const RiskNotes = () => {
  const [riskNotes, setRiskNotes] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [items, setItems] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const riskNotes: any = localStorage.getItem("riskNotes");
      console.log(riskNotes);
      setRiskNotes(JSON.parse(riskNotes));
    }
  }, []);
  const router = useRouter();

  const columns = [
    {
      title: "Attachments",
      dataIndex: "sender",
      render: (_: any, item: any) => (
        <p
          onClick={() => {
            setOpenModal(true);
            setItems(item.images);
          }}
          className="p-2 bg-slate-600 text-white cursor-pointer"
        >
          View Attachments
        </p>
      ),
    },
    {
      title: "Sender",
      dataIndex: "sender",
    },
    {
      title: "Date Sent",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p>{formatDate(item?.sentDate)}</p>,
    },
    {
      title: "Document Type",
      dataIndex: "type",
    },
    {
      title: "Policy",
      dataIndex: "policyNo",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Insured",
      dataIndex: "clientName",
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <p
          onClick={() => router.back()}
          className="bg-yellow-600 cursor-pointer text-white h-[1.8rem] rounded-md flex items-center w-[6rem] justify-center"
        >
          Back
        </p>
        <p className=" text-[1.6rem] font-semibold">Risk notes data table</p>
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
        <Table dataSource={riskNotes} columns={columns} scroll={{ x: 1200 }} />
      </ConfigProvider>
      <RiskNoteModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        items={items}
      />
    </div>
  );
};

export default RiskNotes;
