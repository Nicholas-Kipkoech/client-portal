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
        className="flex my-4 items-center gap-1 cursor-pointer "
        onClick={() => router.back()}
      >
        <GrPrevious size={20} />
        <p>Back</p>
      </div>
      <p className="flex justify-center text-[1.5rem]">{documentName}</p>
      <div className="flex justify-center my-3">
        <iframe
          src={
            "https://kra.go.ke/images/publications/OSCU_Specification_Document_v2.0.pdf"
          }
          className="h-screen w-screen"
        />
      </div>
    </div>
  );
};

export default DocumentPage;
