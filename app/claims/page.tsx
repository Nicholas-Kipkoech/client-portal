"use client";
import React, { useState } from "react";
import CustomButton from "../utils/CustomButtom";
import { MdDone } from "react-icons/md";
import { GrPrevious } from "react-icons/gr";

const PolicyDetails = () => {
  return (
    <div className="flex justify-center items-center">Policy Details Page</div>
  );
};
const LossLocation = () => {
  return (
    <div className="flex justify-center items-center">Loss Location Page</div>
  );
};
const ClaimDetails = () => {
  return (
    <div className="flex justify-center items-center">Claim Details Page</div>
  );
};

const UploadPhotos = () => {
  return (
    <div className="flex justify-center items-center">Upload Photos Page</div>
  );
};
const Reporter = () => {
  return <div className="flex justify-center items-center">Reporter Page</div>;
};

const Submit = () => {
  return <div className="flex justify-center items-center">Submit Page</div>;
};

const steps = [
  {
    title: "Policy Details",
    content: <PolicyDetails />,
  },
  {
    title: "Loss Location",
    content: <LossLocation />,
  },
  {
    title: "Claim Details",
    content: <ClaimDetails />,
  },
  {
    title: "Upload Photos",
    content: <UploadPhotos />,
  },
  {
    title: "Who's Reporting",
    content: <Reporter />,
  },
  {
    title: "Finalize and Submit",
    content: <Submit />,
  },
];

const Claims = () => {
  const [current, setCurrent] = useState(0);

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
        <div className="h-[20rem] border md:w-[80%] sm:w-[100%]">
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
