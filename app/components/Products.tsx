/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

interface IProduct {
  image: string;
  name: string;
  content: string;
}

const ProductsData = [
  {
    name: "Homeowner",
    image: `https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    content: `Protect your home and family from the worst disasters. Up to $500,000 in home value, personal property, and other structures. You deserve to be protected.`,
  },
  {
    name: "Homeowner",
    image: `https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    content: `Protect your home and family from the worst disasters. Up to $500,000 in home value, personal property, and other structures. You deserve to be protected.`,
  },
  {
    name: "Homeowner",
    image: `https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    content: `Protect your home and family from the worst disasters. Up to $500,000 in home value, personal property, and other structures. You deserve to be protected.`,
  },
];

const CustomProduct = ({ image, name, content }: IProduct) => {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <div className="flex flex-col ">
      {image && (
        <img
          src={image}
          alt=""
          className="h-[20rem]  2xl:h-[22rem] 2xl:w-[38rem] w-[22rem] rounded-lg"
        />
      )}

      <p className="text-[20px] 2xl:text-[25px] font-bold">{name}</p>
      <p className="text-slate-600 text-[16px]">{content}</p>
    </div>
  );
};

const Products = () => {
  return (
    <div>
      <p className="text-[2rem] font-semibold my-5">
        Different products for different needs
      </p>

      <div className="flex gap-2">
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
