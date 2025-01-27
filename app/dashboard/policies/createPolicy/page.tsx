"use client";

import React from "react";
import ClientDetails from "./tabs/client-details";
import { useSearchParams } from "next/navigation";
import VehicleDetails from "./tabs/vehicle-details";
import CoverDetails from "./tabs/cover-details";

const CreatePolicy = () => {
  const renderTabContent = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");

    switch (tab) {
      case "client-details":
        return <ClientDetails />;
      case "vehicle-details":
        return <VehicleDetails />;
      case "cover-details":
        return <CoverDetails />;
      default:
        return <ClientDetails />;
    }
  };

  return (
    <div className="flex justify-center h-auto items-center mx-[10%] my-[5%]">
      {renderTabContent()}
    </div>
  );
};

export default CreatePolicy;
