"use client";

import { useContextApi } from "@/app/context/context";
import { createClient } from "@/app/services/apiServices";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import CustomSelect from "@/app/utils/CustomSelect";
import { message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ClientDetails = () => {
  const { systemCodes, user }: any = useContextApi();

  const systemCodesOptions = systemCodes
    .filter((item: any) => item.SYS_TYPE === "Institutional_Sector")
    .map((clientType: any) => {
      return {
        label: clientType.SYS_NAME,
        value: clientType.SYS_CODE,
      };
    });

  const genderOptions = [
    {
      label: "Male",
      value: "M",
    },
    {
      label: "Female",
      value: "F",
    },
  ];

  const router = useRouter();

  const [clientDetails, setClientDetails] = useState({
    full_name: "",
    p_user: "",
    p_created_ip: "",
    client_type: "",
    gender: "",
    tax_no: "",
    phoneNumber: "",
    branch_code: "",
    email: "",
    clientIDNo: "",
  });

  clientDetails.p_user = user.userCode;

  const [messageApi, contextHolder] = message.useMessage();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (clientDetails.full_name !== "" || clientDetails.email !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [clientDetails.full_name, clientDetails.email]);

  const handleCreateClient = async () => {
    // try {
    //   const response = await createClient(clientDetails);
    //   console.log("response", response.success);
    //   if (response.success === true) {
    //     messageApi.success(response.message);
    //     localStorage.setItem("clientEntCode", response.data.p_ent_code);
    //     handleActionBtn("next");
    //   }
    // } catch (error: any) {
    //   console.error("error", error);
    //   messageApi.error("Something went wrong try again!", error.error);
    // }
    handleActionBtn("next");
  };

  const handleActionBtn = (action: "back" | "next") => {
    if (action === "back") {
      router.push("/dashboard");
    } else {
      router.push(`?tab=vehicle-details`);
    }
  };

  return (
    <div className="w-full">
      {contextHolder}
      <p className="text-[1.3rem] flex justify-center font-bold">
        Client Details Form
      </p>
      <div className="grid grid-cols-2 gap-4">
        <CustomInput
          required
          name="Full Name"
          className="w-full border rounded-md"
          value={clientDetails.full_name}
          onChange={(e) =>
            setClientDetails({ ...clientDetails, full_name: e.target.value })
          }
        />
        <CustomInput
          name="Email"
          type="email"
          required
          className=" w-full border rounded-md"
          value={clientDetails.email}
          onChange={(e) =>
            setClientDetails({ ...clientDetails, email: e.target.value })
          }
        />
        <CustomInput
          name="Phone Number"
          required
          className=" w-full border rounded-md"
          value={clientDetails.phoneNumber}
          onChange={(e) =>
            setClientDetails({ ...clientDetails, phoneNumber: e.target.value })
          }
        />
        <CustomSelect
          name="Client Type"
          defaultValue={systemCodesOptions[0]}
          options={systemCodesOptions}
          onChange={(value: any) =>
            setClientDetails({ ...clientDetails, client_type: value.value })
          }
        />

        <CustomSelect
          name="Gender"
          defaultValue={genderOptions[0]}
          options={genderOptions}
          onChange={(value: any) =>
            setClientDetails({ ...clientDetails, gender: value.value })
          }
        />

        <CustomInput
          name="ID Number"
          required={clientDetails.client_type.includes("INDIV")}
          className=" w-full border rounded-md"
          value={clientDetails.clientIDNo}
          onChange={(e) =>
            setClientDetails({ ...clientDetails, clientIDNo: e.target.value })
          }
        />
        <CustomInput
          name="Tax Number"
          className=" w-full border rounded-md"
          required={clientDetails.client_type.includes("GOV")}
          value={clientDetails.tax_no}
          onChange={(e) =>
            setClientDetails({ ...clientDetails, tax_no: e.target.value })
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
          name="Next"
          disabled={buttonDisabled}
          className="border bg-[#092332] text-white w-[8rem] h-[2.2rem] rounded-md"
          onClick={handleCreateClient}
        />
      </div>
    </div>
  );
};

export default ClientDetails;
