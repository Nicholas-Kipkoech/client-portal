"use client";
import { useContextApi } from "@/app/context/context";
import PolicyContext from "@/app/context/policies/policies-context";
import CustomButton from "@/app/utils/CustomButtom";
import CustomInput from "@/app/utils/CustomInput";
import CustomSelect from "@/app/utils/CustomSelect";
import React, { useContext, useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";

interface FileObject {
  file: string; // Base64 string
  type: string;
  name: string;
}
const SubmitNote = () => {
  const { filteredPolicies, products }: any = useContext(PolicyContext);
  const { user }: any = useContextApi();

  const [checked, setChecked] = useState("newBusiness");
  const [images, setImages] = useState<FileObject[]>([]);
  const [policyNo, setPolicyNo] = useState("");
  const [clientName, setClientName] = useState("");
  const [product, setProduct] = useState("");

  const inputRef = useRef<any>();

  const uniquePolicies = Array.from(
    new Set(filteredPolicies.map((policy: any) => policy.policyNo))
  ).map((policyNumber) => {
    return filteredPolicies.find(
      (policy: any) => policy.policyNo === policyNumber
    );
  });

  const policyClient = uniquePolicies.filter(
    (policy) => policy.policyNo === policyNo
  );
  console.log(policyClient);

  const policyOptions = uniquePolicies.map((policy: any) => {
    return {
      label: policy.policyNo,
      value: policy.policyNo,
    };
  });

  const productOptions = products.map((product: any) => {
    return {
      value: product.productCode,
      label: product.productName,
    };
  });

  const handleUploadRenewalAttachment = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newFiles = await Promise.all(
        filesArray.map(async (file) => {
          const base64 = await convertToBase64(file);
          return {
            file: base64,
            type,
            name: file.name,
          };
        })
      );
      const updatedImages = [...images, ...newFiles];
      setImages(updatedImages);
      localStorage.setItem("images", JSON.stringify(updatedImages));
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleDeleteFile = (key: number) => {
    setImages(images.filter((image, index) => index !== key));
  };

  const handleSubmit = () => {
    let payload;
    if (checked === "newBusiness") {
      payload = {
        sender: user.entityName,
        type: "New Business",
        clientName: clientName,
        images,
        sentDate: new Date(),
        policyNo,
        product,
      };
    } else if (checked === "renewals") {
      payload = {
        sender: user.entityName,
        type: "Renewal",
        clientName: policyClient[0].client,
        images,
        sentDate: new Date(),
        policyNo,
        product: policyClient[0].product,
      };
    } else {
      payload = {
        sender: user.entityName,
        type: "Others",
        clientName: policyClient[0].client,
        images,
        sentDate: new Date(),
        policyNo,
        product: policyClient[0].product,
      };
    }
    let existingRiskNotes: any = localStorage.getItem("riskNotes");
    existingRiskNotes = existingRiskNotes ? JSON.parse(existingRiskNotes) : [];
    const newRisksNotes = [...existingRiskNotes, payload];
    localStorage.setItem("riskNotes", JSON.stringify(newRisksNotes));
  };

  return (
    <div className="">
      <p className="flex justify-center text-[2rem]">Submit Risk Note</p>
      <div className="flex gap-2">
        <div className="flex justify-center">
          <div className="border w-[35rem] shadow-xl rounded-md h-auto p-5">
            <div className="flex justify-evenly">
              <div className="flex gap-2">
                <input
                  type="radio"
                  value={"newBusiness"}
                  checked={checked === "newBusiness"}
                  onChange={(e) => setChecked(e.target.value)}
                  name="policyType"
                />
                <label htmlFor="newBusiness">New Business</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  value={"renewals"}
                  name="policyType"
                  checked={checked === "renewals"}
                  onChange={(e) => setChecked(e.target.value)}
                />
                <label htmlFor="renewals">Renewals</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  value={"others"}
                  name="policyType"
                  checked={checked === "others"}
                  onChange={(e) => setChecked(e.target.value)}
                />
                <label htmlFor="others">Others</label>
              </div>
            </div>

            <div>
              {checked === "newBusiness" && (
                <>
                  <CustomInput
                    name="Client Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="border rounded-md p-5"
                  />
                  <CustomSelect
                    placeholder="Select product"
                    options={productOptions}
                    className=""
                    name={"Product"}
                    onChange={(value: any) => setProduct(value.label)}
                  />
                </>
              )}
              {checked === "renewals" && (
                <>
                  <CustomSelect
                    placeholder="Select policy no"
                    options={policyOptions}
                    className=""
                    name={"Policy No"}
                    onChange={(value: any) => setPolicyNo(value.value)}
                  />
                  {policyNo && (
                    <CustomInput
                      name="Product"
                      value={policyClient[0].product}
                      className="border rounded-md p-5"
                      disabled
                    />
                  )}
                </>
              )}
              {checked === "others" && (
                <>
                  <CustomSelect
                    placeholder="Select policy no"
                    options={policyOptions}
                    className=""
                    name={"Policy No"}
                    onChange={(value: any) => setPolicyNo(value.value)}
                  />
                  {policyNo && (
                    <CustomInput
                      name="Product"
                      value={policyClient[0].product}
                      className="border rounded-md p-5"
                      disabled
                    />
                  )}
                </>
              )}
            </div>
            <div className="flex justify-between">
              <div
                className="mt-2 cursor-pointer border bg-slate-500 text-white h-[3rem] gap-2 rounded-md flex justify-center items-center w-[20rem]"
                onClick={handleUploadRenewalAttachment}
              >
                <IoMdCloudUpload size={25} />
                <p>Upload Attachment</p>
                <input
                  type="file"
                  className="hidden"
                  ref={inputRef}
                  multiple
                  onChange={(e) => handleFileChange(e, checked)}
                />
              </div>
              <CustomButton
                name={"Submit"}
                onClick={handleSubmit}
                className="border w-[10rem] h-[3rem] mt-2 rounded-md bg-yellow-700 text-white"
              />
            </div>
          </div>
        </div>
        <div className="w-auto max-h-[20rem] overflow-y-auto">
          <p className="flex justify-center text-[1.6rem]">
            Preview Attachments
          </p>
          <div className="flex flex-col gap-4">
            {images
              .filter((image) => image.type == checked)
              .map((image, index) => (
                <div className="flex justify-between">
                  <p>
                    {index + 1}: {image.name}
                  </p>
                  <p
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDeleteFile(index)}
                  >
                    Delete
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitNote;
