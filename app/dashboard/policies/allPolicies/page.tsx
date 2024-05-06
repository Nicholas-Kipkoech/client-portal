"use client";

import { useContextApi } from "@/app/context/context";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import { formatDate } from "@/app/utils/helpers";
import { ConfigProvider, Table } from "antd";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { GrPrevious } from "react-icons/gr";

const Policies = () => {
  const router = useRouter();
  const { policies, loadingPolicies }: any = useContextApi();
  const [initialPolicies, setInitialPolicies] = useState([]);

  const [searchParams, setSearchParams] = useState<any>({
    client: "",
    carRegNo: "",
    policyNo: "",
    endNo: "",
    product: "",
  });

  const handleSearch = () => {
    const filteredPolicies = policies.filter((policy: any) => {
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
    console.log(initialPolicies);
  };

  const handleReset = () => {
    setSearchParams({
      client: "",
      carRegNo: "",
      policyNo: "",
      endNo: "",
      product: "",
    });
    setInitialPolicies(policies);
  };

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
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">
          All Policies
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
          dataSource={initialPolicies.length > 0 ? initialPolicies : policies}
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
