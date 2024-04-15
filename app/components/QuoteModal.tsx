"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButtom";
import CustomSelect from "../utils/CustomSelect";

interface IModal {
  open: boolean;
  handleClose: () => void;
}

const QuoteModal = ({ open, handleClose }: IModal) => {
  const [address, setAddress] = useState("");
  const [car_reg, setCarReg] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [year, setYear] = useState(2000);
  const [city, setCity] = useState("");
  const [purpose, setPurpose] = useState("");
  const [model, setModel] = useState("");
  const [product, setProduct] = useState("");
  const [use, setUse] = useState("");
  const [motor, setMotor] = useState(false);
  const [non_motor, setNonMotor] = useState(false);
  const [active, setActive] = useState("motor");

  const useOptions = [
    {
      label: "Commercial",
      value: "commercial",
    },
    {
      label: "Private",
      value: "private",
    },
  ];

  return (
    <Modal centered open={open} footer onCancel={handleClose}>
      <div className="h-auto">
        <div className="flex  my-8">
          <p
            onClick={() => setActive("motor")}
            className={`${
              active === "motor" ? "bg-[#cb7529]" : "bg-[#094b6a]"
            } w-1/2 h-[30px] flex items-center cursor-pointer justify-center border rounded-l-md text-white `}
          >
            Motor
          </p>
          <p
            onClick={() => setActive("non_motor")}
            className={`${
              active === "non_motor" ? "bg-[#cb7529]" : "bg-[#094b6a]"
            } w-1/2 h-[30px] items-center flex  cursor-pointer justify-center border  text-white rounded-r-md`}
          >
            Non-Motor
          </p>
        </div>
        {active === "motor" && (
          <>
            <CustomSelect
              name={"Model"}
              placeholder="Select model...."
              options={[
                {
                  label: "Model1",
                  value: "Model2",
                },
              ]}
              onChange={(value: React.SetStateAction<string>) =>
                setModel(value)
              }
            />
            <CustomInput
              type="text"
              name={"Reg number"}
              value={car_reg}
              className={"h-[40px]  border rounded-md"}
              onChange={(e) => setCarReg(e.target.value)}
            />
            <div className="flex gap-2">
              <CustomInput
                type="date"
                name={"Start Date"}
                value={startDate}
                className={"h-[40px] w-[232px] border rounded-md"}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <CustomInput
                type="date"
                name={"End Date"}
                value={endDate}
                className={"h-[40px] w-[232px] border rounded-md"}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <CustomInput
              type="number"
              name={"Year of Manufacture"}
              value={year}
              className={"h-[40px] border  rounded-md"}
              onChange={(e) => setYear(e.target.value)}
            />

            <CustomSelect
              name={"Use"}
              placeholder="Select use..."
              options={useOptions}
              onChange={(value: React.SetStateAction<string>) => setUse(value)}
            />
          </>
        )}
        {active === "non_motor" && (
          <>
            <CustomInput
              type="text"
              name={"Address"}
              value={address}
              className={"h-[40px] border rounded-md"}
              onChange={(e) => setAddress(e.target.value)}
            />
            <CustomSelect
              name={"City"}
              options={[
                {
                  label: "Nairobi",
                  value: "Nairobi",
                },
              ]}
              onChange={(value: React.SetStateAction<string>) => setCity(value)}
            />
            <CustomSelect
              name={"Purpose"}
              options={[
                {
                  label: "Purpose1",
                  value: "Purpose1",
                },
              ]}
              onChange={(value: React.SetStateAction<string>) =>
                setPurpose(value)
              }
            />
            <CustomSelect
              name={"Products"}
              placeholder="Select product..."
              options={[
                {
                  label: "Product1",
                  value: "Product1",
                },
              ]}
              onChange={(value: React.SetStateAction<string>) =>
                setProduct(value)
              }
            />
          </>
        )}
      </div>
      <div className="flex justify-center my-5">
        <CustomButton
          name={"Request Quote"}
          className={
            "h-[40px] bg-[#cb7529] flex justify-center items-center w-[100%] rounded-md text-white "
          }
          onClick={() => {}}
        />
      </div>
    </Modal>
  );
};

export default QuoteModal;
