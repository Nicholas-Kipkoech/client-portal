"use client";
import React from "react";
import { MdDone } from "react-icons/md";
import { products } from "./travelUtils";
import { benefitsData } from "./benefits";
import { GrLinkNext } from "react-icons/gr";
import { useRouter } from "next/navigation";

interface IProductCard {
  name: string;
  benefits?: any[];
  code: string;
}

const Products = () => {
  const router = useRouter();

  function handleViewPricing(code: string) {
    router.push("/travel/quote");
    localStorage.setItem("productCode", code);
  }

  const CustomProductCard = ({ name, benefits, code }: IProductCard) => {
    return (
      <div className="bg-[#F9FAFE] shadow-2xl border-gray-500 p-8 w-[30rem] rounded-[20px] h-auto border-1">
        <p className="text-[1.5rem] font-bold flex justify-center">{name}</p>

        <p className="text-[1.2rem] font-semibold">Product Benefits</p>

        <div className="list-none">
          {benefits?.map((benefit) => {
            const matchingDetail = benefit.details.find(
              (detail: { code: string }) => detail.code === code
            );
            const value = matchingDetail ? matchingDetail.value : 0;
            return (
              <div
                key={benefit.name}
                className="flex items-center justify-between gap-[0.3rem]"
              >
                <div className="flex gap-[0.3rem]">
                  <MdDone size={20} color="blue" />
                  <p className="text-ellipsis text-[10px]">{benefit.name}</p>
                </div>
                <p>${value.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
        <div
          onClick={() => handleViewPricing(code)}
          className="flex items-center mt-2 gap-1 h-[2.5rem] rounded-[20px] cursor-pointer bg-[#cb7529] text-white justify-center"
        >
          <p>View Pricing</p>
          <GrLinkNext />
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center  p-20">
      <div className="flex flex-wrap gap-4">
        {products.map((product) => (
          <CustomProductCard
            key={product.CC_CODE}
            name={product.CC_NAME}
            code={product.CC_CODE}
            benefits={benefitsData}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
