"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { GrPrevious } from "react-icons/gr";

const Documents = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-evenly gap-2 items-center">
        <div
          className="flex gap-2 items-center cursor-pointer  py-1 bg-yellow-950 text-white w-[6rem] justify-center rounded-md"
          onClick={() => router.back()}
        >
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="text-[2rem] font-semibold">My Documents</p>
        <p></p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex  gap-2">
          <div>
            <iframe
              width="100%"
              height="400px"
              src="https://www.clickdimensions.com/links/TestPDFfile.pdf"
              allowFullScreen
            />
            <p className="flex items-center justify-center">Receipt</p>
          </div>
          <div>
            <iframe
              width="100%"
              height="400px"
              src="https://www.clickdimensions.com/links/TestPDFfile.pdf"
              allowFullScreen
            />
            <p className="flex items-center justify-center">ETIMS Invoice</p>
          </div>
          <div>
            <iframe
              width="100%"
              height="400px"
              src="https://www.clickdimensions.com/links/TestPDFfile.pdf"
              allowFullScreen
            />
            <p className="flex items-center justify-center">
              Travel Certificate
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documents;
