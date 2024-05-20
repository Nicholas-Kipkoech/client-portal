/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useCustomToast } from "@/app/constants/useToast";
import { requestMotorQuote } from "@/app/services/apiServices";
import CustomInput from "@/app/utils/CustomInput";
import CustomSelect from "@/app/utils/CustomSelect";
import CustomButton from "@/app/utils/CustomButtom";
import { getCoverDates } from "../utils/helpers";

const AddQuote = () => {
  const [address, setAddress] = useState("");
  const [car_reg, setCarReg] = useState("");
  const [motorValue, setMotorValue] = useState<number | any>(null);

  const [year, setYear] = useState(0);
  const [city, setCity] = useState("");
  const [purpose, setPurpose] = useState("");
  const [model, setModel] = useState("");
  const [product, setProduct] = useState("");
  const [use, setUse] = useState("");
  const [coverType, setCoverType] = useState("");
  const [motor, setMotor] = useState(false);
  const [non_motor, setNonMotor] = useState(false);
  const [active, setActive] = useState("motor");
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState<number[]>([]);
  const [month, setMonth] = useState("");

  useEffect(() => {
    const years: number[] = [];
    const currentYear = new Date(Date.now()).getFullYear();

    function getYears() {
      for (let i = currentYear - 15; i <= currentYear; i++) {
        years.push(i);
      }
    }
    setYears(years);
    getYears();
  }, []);

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
  const coverOptions = [
    {
      label: "Comprehensive",
      value: "comprehensive",
    },
    {
      label: "Third Party",
      value: "Third Party",
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

  const { coverDateFrom, coverDateTo } = getCoverDates();

  const payload = {
    use,
    coverDateFrom: coverDateFrom,
    coverDateTo: coverDateTo,
  };

  const handleRequestQuote = async () => {
    try {
      if (active === "motor") {
        const res = await requestMotorQuote({
          model: model,
          reqNumber: car_reg,
          value: motorValue,
          yearOfManufacture: year,
        });
        if (res.success === true) {
          const obj = { ...payload, ...res.response[0] };
          localStorage.setItem("quotes", JSON.stringify(obj));
          localStorage.setItem("state", "quote");
          router.push("/quote/accept");
        }
        showToast("Motor details submitted successfully");
      }
    } catch (error: any) {
      setLoading(false);
      showToast(error, "error");
    }
  };

  return (
    <div>
      <p
        className="ml-[5rem] mt-5 bg-red-700 w-[5rem] flex items-center justify-center p-1 text-white cursor-pointer"
        onClick={() => router.back()}
      >
        Back
      </p>
      <div className=" flex items-center justify-center ">
        <div className="md:w-[40%] sm:w-full">
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
                <CustomSelect
                  name={"Cover Type"}
                  placeholder="Select cover type..."
                  options={coverOptions}
                  onChange={(value: any) => setCoverType(value.value)}
                />
                <p className="mt-2">Select Period</p>
                <div className="flex flex-wrap justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="1month"
                      name="month"
                      value={"1"}
                      checked={month === "1"}
                      onChange={(e) => setMonth(e.target.value)}
                    />
                    <label htmlFor="1month">1 month</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="1month"
                      name="month"
                      value={"3"}
                      checked={month === "3"}
                      onChange={(e) => setMonth(e.target.value)}
                    />
                    <label htmlFor="1month">3 month</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="1month"
                      name="month"
                      value={"6"}
                      checked={month === "6"}
                      onChange={(e) => setMonth(e.target.value)}
                    />
                    <label htmlFor="1month">6 month</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="1month"
                      name="month"
                      value={"12"}
                      checked={month === "12"}
                      onChange={(e) => setMonth(e.target.value)}
                    />
                    <label htmlFor="1month">12 month</label>
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
    </div>
  );
};

export default AddQuote;
