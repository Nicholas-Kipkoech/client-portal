"use client";
import React, { useEffect, useState } from "react";
import CustomSelect from "../../utils/CustomSelect";
import CustomInput from "../../utils/CustomInput";
import CustomButton from "../../utils/CustomButtom";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import { countriesOptions, ProductOptions, products } from "../travelUtils";
import { Table } from "antd";
import { benefitsData } from "../benefits";

const Travel = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [product, setProduct] = useState<any>("");
  const handleGetQuote = () => {
    router.push("/travel/acceptQuote");
  };

  useEffect(() => {
    const productCode = localStorage.getItem("productCode");
    const _product = products.find(
      (product) => product.CC_CODE === productCode
    );
    setProduct(_product?.CC_NAME);
  }, []);

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
        <div className="w-[50%] border  bg-white shadow-2xl rounded-md h-[30rem] flex items-center justify-center  flex-col p-3">
          <p className="text-[1.6rem] font-semibold">Product: {product}</p>
          <CustomSelect
            name="Destination"
            options={countriesOptions}
            className="w-[30rem] "
            placeholder={"Select Destination..."}
            onChange={() => {}}
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
              "bg-[#cb7229] text-white w-[30rem] my-5 h-[3rem] rounded-[30px] text-[1.2rem]"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Travel;
