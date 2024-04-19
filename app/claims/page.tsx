/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from "react";
import CustomButton from "../utils/CustomButtom";
import { MdDone } from "react-icons/md";
import { GrPrevious } from "react-icons/gr";
import CustomSelect from "../utils/CustomSelect";
import CustomInput from "../utils/CustomInput";
import Image from "next/image";

const Claims = () => {
  const [current, setCurrent] = useState(0);
  const [image, setImage] = useState(" ");

  const handleImageChange = function loadFile(e: any) {
    if (e.target.files.length > 0) {
      const file = URL.createObjectURL(e.target.files[0]);
      setImage(file);
    }
  };
  const inputRef = useRef<any>(null);
  const handleInputclick = (event: any) => {
    if (inputRef.current) {
      inputRef?.current?.click();
    }
  };

  const PolicyDetails = () => {
    return (
      <div className="flex justify-center  items-center">
        <div>
          <CustomInput
            onChange={() => {}}
            value={""}
            name={"Car Registration No"}
            className="h-[2.8rem] border w-[25rem] rounded-sm"
          />
          <CustomInput
            onChange={() => {}}
            value={""}
            type="date"
            name={"Loss Date"}
            className="h-[2.8rem] border w-[25rem] rounded-sm"
          />
        </div>
      </div>
    );
  };

  const ClaimDetails = () => {
    return (
      <div className="flex  flex-col justify-center items-center">
        <p>Description</p>
        <textarea
          className="h-[10rem] border w-[40rem] outline-[#cb7529]"
          value={""}
        />
      </div>
    );
  };

  const UploadPhotos = () => {
    return (
      <div className="flex flex-col justify-center gap-2 items-center">
        <div
          onClick={handleInputclick}
          className="h-[3rem] rounded-md bg-slate-500 text-white w-[10rem] flex items-center border justify-center cursor-pointer"
        >
          Upload Photo
        </div>
        <input
          name="Upload Photo"
          id="upload"
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        <label htmlFor="upload">
          <div>
            {image.length > 1 && (
              <img
                alt="uploadImage"
                src={image}
                className="h-[12rem] w-[23rem]"
              />
            )}
          </div>
        </label>
      </div>
    );
  };

  const steps = [
    {
      title: "Policy Details",
      content: <PolicyDetails />,
    },
    {
      title: "Claim Details",
      content: <ClaimDetails />,
    },
    {
      title: "Upload Photos",
      content: <UploadPhotos />,
    },
  ];

  const renderPage = () => {
    return <>{steps[current].content}</>;
  };

  const handleNext = () => {
    setCurrent((index) => {
      if (index === steps.length - 1) return steps.length - 1;
      return index + 1;
    });
  };

  const handlePrevious = () => {
    setCurrent((index) => {
      if (index === 0) return 0;
      return index - 1;
    });
  };

  return (
    <div className="flex justify-center flex-col mx-9 my-9">
      <div className="flex justify-between">
        <div className="flex items-center">
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="font-semibold text-[1rem]">File A Claim</p>
        <p></p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex flex-col gap-6 sm:hidden md:block">
          {steps.map((item, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <MdDone
                className={` ${
                  current === index ? "bg-[#cb7529]" : "bg-[grey] opacity-[0.4]"
                }  h-[2rem] w-[2rem] rounded-[50%] border text-white p-1`}
              />
              <p className={` ${current === index ? "" : "opacity-[0.4]"} `}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
        <div className="h-[20rem] flex items-center justify-center border md:w-[80%] sm:w-[100%]">
          {renderPage()}
        </div>
      </div>
      <div className="flex justify-center mt-2 gap-2">
        {current > 0 && (
          <CustomButton
            name={"Previous"}
            onClick={handlePrevious}
            className="bg-[#cb7529] md:h-[3rem] md:w-[12rem] sm:h-[2rem] sm:w-[10rem] rounded-md text-white"
          />
        )}
        {current < steps.length - 1 && (
          <CustomButton
            name={"Next"}
            onClick={handleNext}
            className="bg-[#cb7529] md:h-[3rem] md:w-[12rem] sm:h-[2rem] sm:w-[10rem] rounded-md text-white"
          />
        )}
        {current === steps.length - 1 && (
          <CustomButton
            name={"Submit"}
            onClick={() => {}}
            className="bg-[#092332] md:h-[3rem] md:w-[12rem] sm:h-[2rem] sm:w-[10rem] rounded-md text-white"
          />
        )}
      </div>
    </div>
  );
};

export default Claims;
