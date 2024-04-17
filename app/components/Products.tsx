/* eslint-disable @next/next/no-img-element */
import React from "react";
import CustomButton from "../utils/CustomButtom";

interface IProduct {
  image: string;
  name: string;
  content: string;
}

const ProductsData = [
  {
    name: "Homeowner",
    image:
      "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: `Protect your home and family from the worst disasters. Up to $500,000 in home value, personal property, and other structures. You deserve to be protected.`,
  },
  {
    name: "Renter",
    image:
      "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: `Protect your family and belongings from what life might throw at you. You have collected a lifetime of treasures. Renters insurance helps you get back on your feet.`,
  },
  {
    name: "Landlord",
    image:
      "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: `You worked hard for your investment. With landlord insurance, you can protect hard earned assets and avoid litigation. Flexible options maximize your return and budget.`,
  },
];

const CustomProduct = ({ image, name, content }: IProduct) => {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <div className="flex flex-col  border md:w-[22rem] sm:my-2 sm:w-[21rem] sm:text-[14px] 2xl:w-[29rem] rounded-md shadow-xl bg-slate-200">
      {image && (
        <img
          src={image}
          alt=""
          className="md:h-[18rem]  md:block 2xl:h-[20rem] 2xl:w-[29rem] md:w-[22rem] sm:hidden rounded-lg"
        />
      )}

      <p className="text-[20px] 2xl:text-[25px] font-bold p-2">{name}</p>
      <p className="text-slate-600 text-[16px] p-2">{content}</p>

      <div>
        <CustomButton
          name={"Apply now"}
          className={
            "h-[2.5rem] w-[10rem] 2xl:h-[3rem] 2xl:w-[14rem] rounded-[20px] 2xl:rounded-[30px] mx-2 my-2 text-white bg-[#cb7529] shadow-md"
          }
        />
      </div>
    </div>
  );
};

const Products = () => {
  return (
    <div className="sm:flex sm:flex-col sm:justify-center sm:items-center">
      <p className="md:text-[2rem] font-semibold my-5 sm:text-[1.5rem]">
        Different products for different needs
      </p>

      <div className=" md:justify-between  sm:h-[30rem] sm:justify-center sm:flex-col  md:flex md:flex-row md:gap-2  sm:overflow-auto">
        {ProductsData.map((product, index) => (
          <CustomProduct
            key={index}
            image={product.image}
            name={product.name}
            content={product.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
