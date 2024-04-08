"use client";
import React, { useState } from "react";
import house from "../assets/house.jpg";
import Image from "next/image";
import { MdDone } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

const CoversData = [
  {
    name: "Your Home",
    content: `If something happens to your home – or any attached structures on your
                       property – we’ll cover the repairs or the rebuild.`,
  },
  {
    name: "Your Belongings",
    content: `It not just stuff. It’s your life. And if there’s ever a theft, fire, or other unfortunate event, we’ll help with the repair or replacement.`,
  },
  {
    name: "Personal Liability",
    content: `Our coverage protects you from bodily injury or property damage to others (or their stuff) – at home or anywhere else.`,
  },
  {
    name: "Loss of Use",
    content: `If your home is somehow destroyed or uninhabitable, we’ll provide you the funds to continue your lifestyle, including the cost of living elsewhere.`,
  },
  {
    name: "Other Structures",
    content: `For covered risks, we’ll help you repair or replace structures on your property—a fence, for instance`,
  },
  {
    name: "Medical Payments to Other",
    content: `If an injury happens on your property, you can be liable—and we’ll help cover those expenses.`,
  },
];

interface Toggle {
  name: string;
  content: string;
  active: boolean;
  onClick: () => void;
}

const CustomToggle = ({ name, content, active, onClick }: Toggle) => {
  return (
    <div className="p-1 rounded h-auto w-[38rem]">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onClick}
      >
        <div className="flex gap-2 items-center">
          <MdDone className="bg-[#cb7529] h-[2rem] w-[2rem] text-white rounded-[50%] p-1" />
          <p className="text-[20px] font-[500]">{name}</p>
        </div>
        {active ? <FaMinus size={25} /> : <FaPlus size={25} />}
      </div>
      <p className="mx-10">{active ? content : ""}</p>
    </div>
  );
};

const Covers = () => {
  const [activeToggle, setActiveToggle] = useState<number | null>(null);

  const handleToggleClick = (index: number) => {
    setActiveToggle(index === activeToggle ? null : index);
  };

  return (
    <div>
      <p className="text-[2rem] font-semibold my-5">
        We cover more than you think
      </p>

      <div className="flex gap-2 items-center">
        <Image
          src={house}
          alt="house"
          className="h-[20rem] w-[35rem] rounded-lg"
        />
        <div className="flex flex-col gap-1 divide-y divide-gray-300">
          {CoversData.map((cover, index) => (
            <CustomToggle
              key={index}
              name={cover.name}
              content={cover.content}
              onClick={() => handleToggleClick(index)}
              active={activeToggle === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Covers;
