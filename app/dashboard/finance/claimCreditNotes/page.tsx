"use client";
import { useContextApi } from "@/app/context/context";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import { formatDate } from "@/app/utils/helpers";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GrPrevious } from "react-icons/gr";

const ClaimsCreditNotes = () => {
  const { claimCreditNotes }: any = useContextApi();
  const router = useRouter();

  const [initialClaimCreditNotes, setInitialCreditNotes] = useState([]);

  const [searchParams, setSearchParams] = useState<any>({
    journalNo: "",
    insured: "",
  });

  const handleSearch = () => {
    const filteredReceipts = claimCreditNotes.filter((receipt: any) => {
      for (const key in searchParams) {
        if (searchParams[key]) {
          // Check if the search param is not empty
          const fieldValue = receipt[key]?.toLowerCase(); // Get the field value of the policy (if exists)
          const searchTerm = searchParams[key].toLowerCase(); // Get the search term
          if (fieldValue && fieldValue.includes(searchTerm)) {
            return true; // Include policy if field value matches the search term
          }
        }
      }
      return false;
    });
    setInitialCreditNotes(filteredReceipts);
  };
  const handleReset = () => {
    setSearchParams({
      insured: "",
      journalNo: "",
    });
    setInitialCreditNotes(claimCreditNotes);
  };

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
            target="_blank"
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
      <div className="flex justify-between items-center">
        <div className="flex items-center" onClick={() => router.back()}>
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">
          Claim Credit Notes
        </p>
        <p></p>
      </div>
      <div className="flex flex-wrap gap-[0.2rem] my-2 items-center">
        <CustomInput
          name="Insured Name"
          onChange={(e) =>
            setSearchParams({ ...searchParams, insured: e.target.value })
          }
          className="border w-[15rem] p-2"
          value={searchParams.insured}
        />
        <CustomInput
          name="Journal No"
          onChange={(e) =>
            setSearchParams({ ...searchParams, journalNo: e.target.value })
          }
          className="border w-[15rem] p-2"
          value={searchParams.journalNo}
        />

        <CustomButton
          onClick={handleSearch}
          name="Search"
          className="border h-[2.2rem] bg-slate-800 text-white w-[5rem] mt-7"
        />
        <CustomButton
          onClick={handleReset}
          name="Reset"
          className="border h-[2.2rem] bg-red-600 text-white w-[5rem] mt-7"
        />
      </div>
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
          dataSource={
            initialClaimCreditNotes.length > 0
              ? initialClaimCreditNotes
              : claimCreditNotes
          }
          scroll={{ x: 1200 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default ClaimsCreditNotes;