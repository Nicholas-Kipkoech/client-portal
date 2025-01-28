"use client";

import { useContextApi } from "@/app/context/context";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import CustomSelect from "@/app/utils/CustomSelect";
import Creatable from "react-select/creatable";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const VehicleDetails = () => {
  const { systemCodes, branches }: any = useContextApi();

  const vehicleTypesOptions = systemCodes
    .filter((item: any) => item.SYS_TYPE === "AD_VEHICLE_TYPE")
    .map((vehicleType: any) => {
      return {
        label: vehicleType.SYS_NAME,
        value: vehicleType.SYS_CODE,
      };
    });

  const vehicleMakeOptions = systemCodes
    .filter((item: any) => item.SYS_TYPE === "AD_VEHICLE_MAKE")
    .map((vehicleType: any) => {
      return {
        label: vehicleType.SYS_NAME,
        value: vehicleType.SYS_CODE,
      };
    });

  const branchesOptions = branches.map((branch: any) => {
    return {
      label: branch.OS_NAME,
      value: branch.OS_CODE,
    };
  });

  const vehicleUseOptions = [
    {
      label: "Commercial Use",
      value: "Commercial Use",
    },
  ];
  const coverProductsOptions = [
    {
      label: "Third Party",
      value: "TP",
    },
    {
      label: "Comprehensive",
      value: "Comprehensive",
    },
  ];

  const [policyDetails, setPolicyDetails] = useState({
    p_pr_code: "0700",
    p_int_aent_code: "70",
    p_int_ent_code: "11179",
    p_assr_aent_code: "10",
    p_assr_ent_code: "J-1208",
    p_os_code: "02",
    p_fm_dt: "2025-01-01",
    p_to_dt: "2025-12-31",
    p_user_code: "sl3xvm0rio2s",
    p_created_ip: "192.168.1.1",
    p_make: "Test",
    p_model: "Corolla",
    p_regn_no: "ABC1234",
    p_vehicle_use: "Commercial Use",
    p_color: "Blue",
    p_engine_no: "ENG123456789",
    p_chassis_no: "CHASSIS987654321",
    p_yom: "2023",
    p_cc: "1500",
    p_seating_cap: "5",
    p_value: "20000",
    p_windscreen_value: "500",
    p_radio_value: "100",
    p_premium: "1500",
    p_vat: "180",
    p_cover_type: "TP",
    p_vehicle_type: "AD.VH.64",
  });

  const router = useRouter();
  const handleActionBtn = (action: "back" | "next") => {
    if (action === "back") {
      router.push("?tab=client-details");
    } else {
      router.push(`?tab=cover-details`);
    }
  };

  return (
    <div className="w-full">
      <div className="border p-5 rounded-md">
        <p className="text-[1.3rem] flex justify-center font-bold">
          Vehicle Details
        </p>
        <div className="grid grid-cols-2 gap-4">
          <CustomSelect
            name="Office Branch"
            className=""
            options={branchesOptions}
            defaultValue={branchesOptions[0]}
            onChange={(value: any) =>
              setPolicyDetails({ ...policyDetails, p_os_code: value.value })
            }
          />
          <CustomInput
            required
            name="Registration Number"
            className=" w-full border rounded-md"
            value={policyDetails.p_regn_no}
            onChange={(e) =>
              setPolicyDetails({ ...policyDetails, p_regn_no: e.target.value })
            }
          />
          <CustomInput
            name="Chassis Number"
            className=" w-full border rounded-md"
            required
            value={policyDetails.p_chassis_no}
            onChange={(e) =>
              setPolicyDetails({
                ...policyDetails,
                p_chassis_no: e.target.value,
              })
            }
          />
          <CustomInput
            name="Engine No"
            required
            className=" w-full border rounded-md"
            value={policyDetails.p_engine_no}
            onChange={(e) =>
              setPolicyDetails({
                ...policyDetails,
                p_engine_no: e.target.value,
              })
            }
          />
          <div className="mt-2">
            <label>Vehicle Type</label>
            <Creatable
              isClearable
              options={vehicleTypesOptions}
              onChange={(value: any) =>
                setPolicyDetails({
                  ...policyDetails,
                  p_vehicle_type: value.value,
                })
              }
            />
          </div>
          <CustomInput
            name="Year of Manufacture"
            required
            className=" w-full border rounded-md"
            value={policyDetails.p_yom}
            onChange={(e) =>
              setPolicyDetails({ ...policyDetails, p_yom: e.target.value })
            }
          />

          <CustomInput
            name="Vehicle CC"
            required
            className=" w-full border rounded-md"
            value={policyDetails.p_cc}
            onChange={(e) =>
              setPolicyDetails({ ...policyDetails, p_cc: e.target.value })
            }
          />
          <div className="mt-2">
            <label>Vehicle Make</label>
            <Creatable
              isClearable
              options={vehicleMakeOptions}
              onChange={(value: any) =>
                setPolicyDetails({
                  ...policyDetails,
                  p_make: value.value,
                })
              }
            />
          </div>
          <div className="mt-2">
            <label>Vehicle Model</label>
            <Creatable
              isClearable
              options={vehicleMakeOptions}
              onChange={(value: any) =>
                setPolicyDetails({
                  ...policyDetails,
                  p_model: value.value,
                })
              }
            />
          </div>

          <CustomSelect
            name="Vehicle Use"
            className=""
            defaultValue={vehicleMakeOptions[0]}
            options={vehicleUseOptions}
            onChange={(value: any) =>
              setPolicyDetails({
                ...policyDetails,
                p_vehicle_use: value.value,
              })
            }
          />

          <CustomInput
            name="Vehicle Value (KSH)"
            className=" w-full border rounded-md"
            required
            value={policyDetails.p_value}
            onChange={(e) =>
              setPolicyDetails({ ...policyDetails, p_value: e.target.value })
            }
          />
          <CustomInput
            name="Windscreen Value (KSH)"
            className=" w-full border rounded-md"
            required
            value={policyDetails.p_windscreen_value}
            onChange={(e) =>
              setPolicyDetails({
                ...policyDetails,
                p_windscreen_value: e.target.value,
              })
            }
          />
          <CustomInput
            name="Radio Gazette Value (KSH)"
            className=" w-full border rounded-md"
            required
            value={policyDetails.p_radio_value}
            onChange={(e) =>
              setPolicyDetails({
                ...policyDetails,
                p_radio_value: e.target.value,
              })
            }
          />
          <CustomInput
            name="Premium (KSH)"
            className=" w-full border rounded-md"
            required
            value={policyDetails.p_premium}
            onChange={(e) =>
              setPolicyDetails({
                ...policyDetails,
                p_premium: e.target.value,
              })
            }
          />

          {/* <CustomInput
            name="Log Book No"
            className=" w-full border rounded-md"
            value={""}
            required={false}
            onChange={() => {}}
          /> */}
        </div>
      </div>
      <div className="border p-5 rounded-md mt-10">
        <p className="text-[1.3rem] flex justify-center font-bold">
          Cover Details
        </p>
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            name="From Date"
            type="date"
            className=" w-full border rounded-md"
            required
            value={policyDetails.p_fm_dt}
            onChange={(e) =>
              setPolicyDetails({ ...policyDetails, p_fm_dt: e.target.value })
            }
          />
          <CustomInput
            name="To Date"
            type="date"
            className=" w-full border rounded-md"
            required
            value={policyDetails.p_to_dt}
            onChange={(e) =>
              setPolicyDetails({ ...policyDetails, p_to_dt: e.target.value })
            }
          />
          <CustomSelect
            required
            name="Cover Type"
            className=" w-full border rounded-md"
            options={coverProductsOptions}
            onChange={(value: any) =>
              setPolicyDetails({ ...policyDetails, p_cover_type: value.value })
            }
          />
        </div>

        <div className="mt-5 flex justify-center gap-[2rem]">
          <CustomButton
            name="Back"
            className="border bg-[#092332] text-white w-[8rem] h-[2.2rem] rounded-md"
            onClick={() => handleActionBtn("back")}
          />
          <CustomButton
            name="Submit"
            className="border bg-[#092332] text-white w-[8rem] h-[2.2rem] rounded-md"
            onClick={() => handleActionBtn("next")}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
