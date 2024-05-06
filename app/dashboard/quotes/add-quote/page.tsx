/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import { Modal } from "antd";

import { useRouter } from "next/navigation";
import { useContextApi } from "@/app/context/context";
import { useCustomToast } from "@/app/constants/useToast";
import { requestMotorQuote } from "@/app/services/apiServices";
import CustomInput from "@/app/utils/CustomInput";
import CustomSelect from "@/app/utils/CustomSelect";
import CustomButton from "@/app/utils/CustomButtom";

const AddQuote = () => {
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
          router.push("/dashboard/quotes");
        }
        // refresh the page once the quotes is added
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error.response.data.error);
      showToast(error.response.data.error, "error");
    }
  };

  const inputRef = useRef<any>(null);

  const handleInputclick = (event: any) => {
    if (inputRef.current) {
      inputRef?.current?.click();
    }
  };

  const [carImages, setCarImages] = useState<any[]>([]);

  const handleImageChange = function loadFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setCarImages((prevImage) => [...prevImage, ...selectedImage]);
    }
  };
  const handleImageDelete = (index: number) => {
    setCarImages(carImages.filter((image, key) => key !== index));
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className="md:w-[60%] sm:w-full">
        <div className="h-auto ">
          <div className="flex  my-8 ">
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
                placeholder="Select model/make"
                options={makeOptions}
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

              <div>
                <p className="flex justify-center text-[1.2rem]">Car Photos</p>
                <p className="flex justify-center text-[1rem] text-slate-500">
                  Add front,sides,back view
                </p>

                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2">
                    {carImages.map((image, index) => (
                      <div key={index} className="">
                        <p
                          className="flex justify-end text-red-700 cursor-pointer"
                          onClick={() => handleImageDelete(index)}
                        >
                          X
                        </p>
                        <img
                          src={image}
                          alt="image"
                          className="h-[8rem] w-[12rem]"
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    onClick={handleInputclick}
                    className="h-[2rem] border w-[10rem] mt-5 cursor-pointer bg-slate-800 text-white rounded-md items-center flex justify-center"
                  >
                    Upload Images
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    ref={inputRef}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
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
                onChange={(value: React.SetStateAction<string>) =>
                  setCity(value)
                }
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
      </div>
    </div>
  );
};

export default AddQuote;
