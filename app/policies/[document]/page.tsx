"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GrPrevious } from "react-icons/gr";

const DocumentPage = () => {
  const [documentName, setDocumentName] = useState<string | null>("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const receiptName = localStorage.getItem("receipt_name");
      setDocumentName(receiptName);
    }
  }, []);

  return (
    <div>
      <div
        className="flex my-4 sm:my-2 items-center justify-between gap-1 cursor-pointer "
        onClick={() => router.back()}
      >
        <div className="flex items-center">
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="flex justify-center text-[1.5rem] sm:text-[1.2rem] ">
          {documentName}
        </p>
        <p></p>
      </div>
      <div className="flex justify-center my-3">
        <iframe
          src={
            "https://kra.go.ke/images/publications/OSCU_Specification_Document_v2.0.pdf"
          }
          className="h-screen sm:h-[50vh] w-screen sm:w-[90%]"
        />
      </div>
    </div>
  );
};

export default DocumentPage;
