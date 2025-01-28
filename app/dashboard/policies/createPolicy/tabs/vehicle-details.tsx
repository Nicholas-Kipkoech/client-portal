"use client";

import { useContextApi } from "@/app/context/context";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import CustomSelect from "@/app/utils/CustomSelect";
import Creatable from "react-select/creatable";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { createClientPolicy } from "@/app/services/apiServices";

const VehicleDetails = () => {
  const { systemCodes, branches, user }: any = useContextApi();

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

  const [messageApi, contextHolder] = message.useMessage();

  const [policyDetails, setPolicyDetails] = useState({
    p_pr_code: "",
    p_int_aent_code: "",
    p_int_ent_code: "",
    p_assr_aent_code: "10",
    p_assr_ent_code: "",
    p_os_code: "",
    p_fm_dt: "",
    p_to_dt: "",
    p_user_code: "",
    p_created_ip: "",
    p_make: "",
    p_model: "",
    p_regn_no: "",
    p_vehicle_use: "",
    p_color: "",
    p_engine_no: "",
    p_chassis_no: "",
    p_yom: "",
    p_cc: "",
    p_seating_cap: "",
    p_value: "",
    p_windscreen_value: "",
    p_radio_value: "",
    p_premium: "",
    p_vat: "",
    p_cover_type: "",
    p_vehicle_type: "",
  });

  useEffect(() => {
    const clientCode = localStorage.getItem("clientEntCode") as string;
    policyDetails.p_assr_ent_code = clientCode;
    policyDetails.p_user_code = user.userCode;
    policyDetails.p_int_ent_code = user.entCode;
    policyDetails.p_int_aent_code = user.aentCode;
    if (policyDetails.p_vehicle_use.includes("Commercial Use")) {
      policyDetails.p_pr_code = "0700";
    } else if (policyDetails.p_vehicle_use.includes("Private")) {
      policyDetails.p_pr_code = "0800";
    }
  }, [user, policyDetails]);

  const router = useRouter();
  const handleActionBtn = (action: "back" | "next") => {
    if (action === "back") {
      router.push("?tab=client-details");
    }
  };

  async function handleCreatePolicy() {
    try {
      const response = await createClientPolicy(policyDetails);
      if (response.success === true) {
        messageApi.success(response.message);
      }
    } catch (error) {
      console.error("error", error);
      messageApi.error("error while trying to create a policy, try again!");
    }
  }

  return (
    <div className="w-full">
      {contextHolder}
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
            onClick={handleCreatePolicy}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
