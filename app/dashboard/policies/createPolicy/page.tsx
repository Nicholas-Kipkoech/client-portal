"use client";

import React, { Suspense } from "react";
import ClientDetails from "./tabs/client-details";
import { useSearchParams } from "next/navigation";
import VehicleDetails from "./tabs/vehicle-details";

const TabContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  switch (tab) {
    case "client-details":
      return <ClientDetails />;
    case "vehicle-details":
      return <VehicleDetails />;
    default:
      return <ClientDetails />;
  }
};

const CreatePolicy = () => {
  return (
    <div className="flex justify-center h-auto items-center mx-[10%] my-[5%]">
      <Suspense fallback={<div>Loading....</div>}>
        <TabContent />
      </Suspense>
    </div>
  );
};

export default CreatePolicy;
