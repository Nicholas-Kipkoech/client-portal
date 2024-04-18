"use client";

import React, { useState } from "react";
import CustomInput from "../../utils/CustomInput";
import CustomButton from "../../utils/CustomButtom";
import CustomSelect from "../../utils/CustomSelect";
import { requestMotorQuote } from "../../services/apiServices";
import { useRouter } from "next/navigation";
import { useContextApi } from "../../context/context";
import { useCustomToast } from "../../constants/useToast";
import { GrPrevious } from "react-icons/gr";

interface IModal {
  open: boolean;
  handleClose: () => void;
}

const MobileModal = ({ open, handleClose }: IModal) => {
  const { years }: any = useContextApi();
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

  const yearsOptions = years
    .sort((a: number, b: number) => b - a)
    .map((year: number) => {
      return {
        label: year,
        value: year,
      };
    });

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
    {
      label: "Nissan",
      value: "nissan",
    },
  ];
  const router = useRouter();
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
          value: Number(motorValue),
        });
        showToast("Motor details submitted successfully");
        if (res.success === true) {
          setLoading(false);
          const existingQuotes = JSON.parse(
            localStorage.getItem("quotes") || "[]"
          );
          const updatedQuotes = [...existingQuotes, ...res.response];
          localStorage.setItem("quotes", JSON.stringify(updatedQuotes));
          handleClose();
          router.push("/quotes");
        }
        // refresh the page once the quotes is added
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error.response.data.error);
      showToast(error.response.data.error, "error");
    }
  };

  return (
    <>
      <div className="h-auto my-2">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.back()}
        >
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <div className="flex  my-4 justify-center items-center">
          <p
            onClick={() => setActive("motor")}
            className={`${
              active === "motor" ? "bg-[#cb7529]" : "bg-[#094b6a]"
            } w-[45%] h-[30px] flex items-center cursor-pointer justify-center border rounded-l-md text-white `}
          >
            Motor
          </p>
          <p
            onClick={() => setActive("non_motor")}
            className={`${
              active === "non_motor" ? "bg-[#cb7529]" : "bg-[#094b6a]"
            } w-[45%] h-[30px] items-center flex  cursor-pointer justify-center border  text-white rounded-r-md`}
          >
            Non-Motor
          </p>
        </div>
        {active === "motor" && (
          <div className="flex justify-center flex-col px-4">
            <CustomSelect
              name={"Model/Make"}
              placeholder="Select model/make"
              options={makeOptions}
              className=""
              onChange={(value: any) => setModel(value.value)}
            />
            <CustomInput
              type="text"
              name={"Car Value (KES)"}
              value={motorValue}
              className={"h-[40px]  border rounded-md"}
              onChange={(e) => setMotorValue(e.target.value)}
            />
            <CustomInput
              type="text"
              name={"Car Registration"}
              value={car_reg}
              className={"h-[40px]  border rounded-md"}
              onChange={(e) => setCarReg(e.target.value.toUpperCase())}
            />

            <CustomSelect
              name={"Year of Manufacture"}
              placeholder="Select year of manufacture"
              options={yearsOptions}
              onChange={(value: any) => setYear(value.value)}
            />

            <CustomSelect
              name={"Use"}
              placeholder="Select use..."
              options={useOptions}
              onChange={(value: any) => setUse(value.value)}
            />
          </div>
        )}
        {active === "non_motor" && (
          <div className="px-4">
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
          </div>
        )}
      </div>
      <div className="flex justify-center my-5 px-4">
        <CustomButton
          disabled={loading}
          name={loading ? "Requesting quote...." : "Request Quote"}
          className={
            "h-[40px] bg-[#cb7529] flex justify-center items-center w-[100%] rounded-md text-white "
          }
          onClick={handleRequestQuote}
        />
      </div>
    </>
  );
};

export default MobileModal;
