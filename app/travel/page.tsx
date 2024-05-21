"use client";
import React, { useEffect, useState } from "react";
import CustomSelect from "../utils/CustomSelect";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButtom";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import { ProductOptions } from "./travelUtils";
import { Table } from "antd";
import { benefitsData } from "./benefits";

const Travel = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [productCode, setProductCode] = useState("093");
  const handleGetQuote = () => {
    router.push("/travel/acceptQuote");
  };

  useEffect(() => {
    const filteredData = benefitsData
      .flatMap((benefit) =>
        benefit.details.map((detail) => ({ ...detail, name: benefit.name }))
      )
      .filter((data) => data.code === productCode);

    setData(filteredData);
  }, [productCode]);

  const columns = [
    {
      title: "Benefit",
      dataIndex: "name",
      key: "name",
      render: (_: any, item: any) => <p>{item.name}</p>,
    },
    {
      title: "Value (USD)",
      dataIndex: "key",
      key: "key",
      render: (_: any, item: any) => <p> {item.value.toLocaleString()} </p>,
    },
  ];
  return (
    <div className="m-5">
      <div
        onClick={() => router.back()}
        className="flex gap-2 items-center cursor-pointer  py-1 bg-yellow-950 text-white w-[6rem] mb-2 justify-center rounded-md"
      >
        <IoArrowBackOutline size={20} />
        <p>Back</p>
      </div>

      <div className="flex items-center  gap-2 justify-center">
        <div className="w-[40%] border  bg-white shadow-2xl rounded-md h-[30rem] flex items-center justify-center  flex-col p-3">
          <CustomSelect
            name="Destination"
            options={[]}
            className="w-[30rem] "
            placeholder={"Select Destination..."}
            onChange={() => {}}
          />
          <CustomSelect
            name="Product"
            defaultValue={ProductOptions[0]}
            options={ProductOptions}
            placeholder={"Select Product..."}
            className="w-[30rem] "
            onChange={(value: any) => setProductCode(value.value)}
          />
          <CustomInput
            name="Travel Date"
            type="date"
            className={"border w-[30rem] h-[2.6rem] rounded-md"}
            value={""}
            onChange={() => {}}
          />
          <CustomInput
            name="Return Date"
            type="date"
            className={"border w-[30rem] h-[2.6rem] rounded-md"}
            value={""}
            onChange={() => {}}
          />
          <CustomInput
            name="Date of Birth"
            type="date"
            className={"border w-[30rem] h-[2.6rem] rounded-md"}
            value={""}
            onChange={() => {}}
          />
          <CustomButton
            name={"Get Quote"}
            onClick={handleGetQuote}
            className={
              "bg-[#cb7229] text-white w-[30rem] my-5 h-[3rem] rounded-[30px] text-[1.4rem]"
            }
          />
        </div>
        <div className="w-[60%] max-h-[30rem] border bg-white shadow-2xl rounded-md h-[30rem] overflow-y-auto  p-2">
          <p className="text-[1.5rem] font-bold flex justify-center">
            Benefits
          </p>
          <Table dataSource={data} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Travel;
