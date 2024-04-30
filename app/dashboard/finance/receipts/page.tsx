"use client";
import { useContextApi } from "@/app/context/context";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import { formatDate } from "@/app/utils/helpers";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GrPrevious } from "react-icons/gr";

const Receipts = () => {
  const router = useRouter();
  const { receiptsData, user }: any = useContextApi();
  const [initialReceipt, setInitialReceipt] = useState([]);
  const [searchParams, setSearchParams] = useState<any>({
    from: "",
    receiptNo: "",
    amount: "",
  });

  const handleSearch = () => {
    const filteredClaims = receiptsData.filter((receipt: any) => {
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
    setInitialReceipt(filteredClaims);
  };
 

  const handleReset = () => {
    setSearchParams({
      from: "",
      amount: "",
      receiptNo: "",
    });
    setInitialReceipt(receiptsData);
  };
  const columns = [
    {
      title: "Reeeipt NO",
      dataIndex: "policyNo",
      render: (_: any, item: any) => <p>{item.receiptNo}</p>,
    },
    {
      title: "Client",
      dataIndex: "endNo",
      render: (_: any, item: any) => <p>{item.from}</p>,
    },
    {
      title: "Intermediary",
      dataIndex: "endNo",
      render: (_: any, item: any) => <p>{user.entityName}</p>,
    },
    {
      title: "Narration",
      dataIndex: "product",
      render: (_: any, item: any) => <p>{item.narration}</p>,
    },
    {
      title: "Amount",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p> KSH {item.amount.toLocaleString()}</p>,
    },
    {
      title: "GL Date",
      dataIndex: "invoiceNumber",
      render: (_: any, item: any) => <p>{formatDate(item.GLDate)}</p>,
    },
    {
      title: "Receipt Mode",
      dataIndex: "status",
      render: (_: any, item: any) => <p>{item.receiptMode}</p>,
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
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">Receipts</p>
        <p></p>
      </div>
      <div className="flex flex-wrap gap-[0.2rem] my-2 items-center">
        <CustomInput
          name="Insured Name"
          onChange={(e) =>
            setSearchParams({ ...searchParams, from: e.target.value })
          }
          className="border w-[15rem] p-2"
          value={searchParams.from}
        />
        <CustomInput
          name="Receipt No"
          className="border w-[10rem] p-2"
          value={searchParams.receiptNo}
          onChange={(e) =>
            setSearchParams({ ...searchParams, receiptNo: e.target.value })
          }
        />
        <CustomInput
          name="Amount"
          className="border w-[10rem] p-2"
          value={searchParams.amount}
          onChange={(e) =>
            setSearchParams({ ...searchParams, amount: e.target.value })
          }
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
              lineHeight: 2,
            },
          },
        }}
      >
        <Table
          className="mt-2"
          columns={columns}
          dataSource={initialReceipt.length > 0 ? initialReceipt : receiptsData}
          scroll={{ x: 1600 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Receipts;
