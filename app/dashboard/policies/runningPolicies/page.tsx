"use client";

import PolicyContext from "@/app/context/policies/policies-context";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import { formatDate } from "@/app/utils/helpers";
import { ConfigProvider, Table, Popover } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useContext, useState } from "react";
import { GrDocumentPdf, GrPrevious } from "react-icons/gr";
import NotesModal from "../NotesModal";

const Policies = () => {
  const router = useRouter();
  const { filteredPolicies: runningPolicies, loadingPolicies }: any =
    useContext(PolicyContext);
  const [initialPolicies, setInitialPolicies] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [searchParams, setSearchParams] = useState<any>({
    client: "",
    carRegNo: "",
    policyNo: "",
    endNo: "",
    product: "",
  });

  const handleSearch = () => {
    const filteredPolicies = runningPolicies.filter((policy: any) => {
      for (const key in searchParams) {
        if (searchParams[key]) {
          // Check if the search param is not empty
          const fieldValue = policy[key]?.toLowerCase(); // Get the field value of the policy (if exists)
          const searchTerm = searchParams[key].toLowerCase(); // Get the search term
          if (fieldValue && fieldValue.includes(searchTerm)) {
            return true; // Include policy if field value matches the search term
          }
        }
      }
      return false;
    });
    setInitialPolicies(filteredPolicies);
  };

  const handleReset = () => {
    setSearchParams({
      client: "",
      carRegNo: "",
      policyNo: "",
      endNo: "",
      product: "",
    });
    setInitialPolicies(runningPolicies);
  };

  const content = (items: any) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <GrDocumentPdf />
          <a target="_blank" href={items?.policyUrl} download>
            Policy Document
          </a>
        </div>
        <div className="flex items-center gap-2">
          <GrDocumentPdf />
          <a target="_blank" href={items?.debitOrCreditUrl} download>
            Debit Or CreditNote
          </a>
        </div>
      </div>
    );
  };

  const columns = [
    {
      title: "Policy Number",
      dataIndex: "policyNo",
      render: (_: any, item: any) => (
        <Popover
          className="cursor-pointer"
          content={() => content(item.reportUrl)}
          title={"Downloads"}
          trigger={"click"}
        >
          {item.policyNo}
        </Popover>
      ),
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
    {
      title: "Engagement",
      dataIndex: "status",
      render: (_: any, item: any) => (
        <CustomButton
          name={"Add note"}
          onClick={() => setOpenModal(true)}
          className={"h-[2rem] border rounded-md  px-3 bg-slate-900 text-white"}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-center ">
      <div className="flex justify-between">
        <div className="flex items-center" onClick={() => router.back()}>
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">
          Running Policies
        </p>
        <p></p>
      </div>

      <div className="md:flex md:flex-wrap sm:flex-nowrap sm:flex-col md:flex-row gap-[0.2rem] my-2 md:items-center">
        <CustomInput
          name="Insured"
          onChange={(e) =>
            setSearchParams({ ...searchParams, client: e.target.value })
          }
          className="border md:w-[15rem]  p-2 sm:w-full"
          value={searchParams.client}
        />
        <CustomInput
          name="Vehicle Reg No"
          className="border md:w-[10rem] p-2 sm:w-full"
          value={searchParams.carRegNo}
          onChange={(e) =>
            setSearchParams({ ...searchParams, carRegNo: e.target.value })
          }
        />
        <CustomInput
          name="Policy No"
          className="border md:w-[15rem] p-2 sm:w-full"
          value={searchParams.policyNo}
          onChange={(e) =>
            setSearchParams({ ...searchParams, policyNo: e.target.value })
          }
        />
        <CustomInput
          name="End No"
          className="border md:w-[15rem] p-2 sm:w-full"
          value={searchParams.endNo}
          onChange={(e) =>
            setSearchParams({ ...searchParams, endNo: e.target.value })
          }
        />
        <CustomInput
          name="Product Name"
          className="border md:w-[15rem] p-2 sm:w-full"
          value={searchParams.product}
          onChange={(e) =>
            setSearchParams({ ...searchParams, product: e.target.value })
          }
        />
        <div className="sm:flex  gap-2">
          <CustomButton
            onClick={handleSearch}
            name="Search"
            className="border h-[2.2rem] bg-slate-800 text-white sm:w-full md:w-[15rem] mt-7"
          />
          <CustomButton
            onClick={handleReset}
            name="Reset"
            className="border h-[2.2rem] bg-red-600 text-white  sm:w-full md:w-[15rem] mt-7"
          />
        </div>
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
          dataSource={
            initialPolicies.length > 0 ? initialPolicies : runningPolicies
          }
          loading={loadingPolicies}
          columns={columns}
          scroll={{ x: 1500 }}
        />
        ;
      </ConfigProvider>
      <NotesModal open={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Policies;
