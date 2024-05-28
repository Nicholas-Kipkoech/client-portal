"use client";
import PolicyContext from "@/app/context/policies/policies-context";
import { Spin } from "antd";
import React, { useContext, useState } from "react";

const PolicyDocuments = () => {
  const { policyDocuments }: any = useContext(PolicyContext);

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-full">
          <p className="text-[2rem] font-semibold">Policy Document</p>

          <iframe
            loading="lazy"
            allowFullScreen
            src={policyDocuments?.policyUrl}
            width={"80%"}
            height={"500px"}
          />
        </div>
        <div className="w-full">
          <p className="text-[2rem] font-semibold">
            Debit or Credit Note Document
          </p>

          <iframe
            loading="lazy"
            src={policyDocuments?.debitOrCreditUrl}
            width={"80%"}
            height={"500px"}
          />
        </div>
      </div>
    </div>
  );
};

export default PolicyDocuments;
