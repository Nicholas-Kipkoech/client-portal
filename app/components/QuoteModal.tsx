"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButtom";
import CustomSelect from "../utils/CustomSelect";
import { requestMotorQuote } from "../services/apiServices";
import { useRouter } from "next/navigation";
import { useContextApi } from "../context/context";
import { useCustomToast } from "../constants/useToast";

interface IModal {
  open: boolean;
  handleClose: () => void;
}

const QuoteModal = ({ open, handleClose }: IModal) => {
  const [address, setAddress] = useState("");
  const [car_reg, setCarReg] = useState("");
  const [motorValue, setMotorValue] = useState<number | any>(null);

  const [year, setYear] = useState(null);
  const [city, setCity] = useState("");
  const [purpose, setPurpose] = useState("");
  const [model, setModel] = useState("");
  const [product, setProduct] = useState("");
  const [use, setUse] = useState("");
  const [motor, setMotor] = useState(false);
  const [non_motor, setNonMotor] = useState(false);
  const [active, setActive] = useState("motor");
  const [loading, setLoading] = useState(false);

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
  const makeOptions = [
    {
      label: "Audi",
      value: "audi",
    },
    {
      label: "Mazda",
      value: "mazda",
    },
  ];
  const router = useRouter();
  const { setQuotes }: any = useContextApi();
  const showToast = useCustomToast();

  const handleRequestQuote = async () => {
    try {
      if (active === "motor") {
        setLoading(true);
        const res = await requestMotorQuote({
          model: model,
          reqNumber: car_reg,
          use: use,
          yearOfManufacture: Number(year),
          value: motorValue,
        });
        showToast("Motor details submitted successfully");
        if (res.success === true) {
          setLoading(false);
          setQuotes(res.response);
          handleClose();
          router.push("/dashboard");
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error.response.data.error);
      showToast(error.response.data.error, "error");
    }
  };

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
              name={"Model/Make"}
              placeholder="Select model/make...."
              options={makeOptions}
              onChange={(value: any) => setModel(value.value)}
            />
            <CustomInput
              type="number"
              name={"Car Value"}
              value={motorValue}
              className={"h-[40px]  border rounded-md"}
              onChange={(e) => setMotorValue(e.target.value)}
            />
            <CustomInput
              type="text"
              name={"Car Registration"}
              value={car_reg}
              className={"h-[40px]  border rounded-md"}
              onChange={(e) => setCarReg(e.target.value)}
            />

            <CustomInput
              type="text"
              name={"Year of Manufacture"}
              value={year}
              className={"h-[40px] border  rounded-md"}
              maxLength={4}
              onChange={(e) => setYear(e.target.value)}
            />

            <CustomSelect
              name={"Use"}
              placeholder="Select use..."
              options={useOptions}
              onChange={(value: any) => setUse(value.value)}
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
          disabled={loading}
          name={loading ? "Requesting quote...." : "Request Quote"}
          className={
            "h-[40px] bg-[#cb7529] flex justify-center items-center w-[100%] rounded-md text-white "
          }
          onClick={handleRequestQuote}
        />
      </div>
    </Modal>
  );
};

export default QuoteModal;
