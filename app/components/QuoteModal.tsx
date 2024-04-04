"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButtom";
import CustomSelect from "../utils/CustomSelect";

interface IModal {
  open: boolean;
  handleClose: () => void;
}

const QuoteModal = ({ open, handleClose }: IModal) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [purpose, setPurpose] = useState("");
  const [motor, setMotor] = useState(false);
  const [non_motor, setNonMotor] = useState(false);

  return (
    <Modal
      centered
      title="Apply for quote"
      open={open}
      footer
      onCancel={handleClose}
    >
      <div>
        <CustomInput
          type="text"
          name={"Address"}
          value={address}
          className={"h-[40px] border rounded-md"}
          onChange={(e) => setAddress(e.target.value)}
        />
        <CustomSelect
          name={"City"}
          options={[
            {
              label: "Nairobi",
              value: "Nairobi",
            },
          ]}
          onChange={(value: React.SetStateAction<string>) => setCity(value)}
        />
        <CustomSelect
          name={"Purpose"}
          options={[
            {
              label: "Purpose1",
              value: "Purpose1",
            },
          ]}
          onChange={(value: React.SetStateAction<string>) => setPurpose(value)}
        />
        <div className="my-2">
          <p className="text-[16px]">Type of Insurance</p>
        </div>
        <div className="flex gap-1 ">
          <input
            type="radio"
            name="motor"
            checked={motor}
            onChange={() => {
              setMotor(true);
              setNonMotor(false);
            }}
          />
          <label htmlFor="motor">Motor</label>
          <input
            type="radio"
            name="non-motor"
            checked={non_motor}
            onChange={() => {
              setNonMotor(true);
              setMotor(false);
            }}
          />
          <label htmlFor="non-motor">Non-motor</label>
        </div>
        {motor && (
          <div className="my-5">
            <CustomInput
              name="Make"
              className="border rounded-md p-[5px]"
              value=""
            />
            <CustomInput
              name="Model"
              className="border rounded-md p-[5px]"
              value=""
            />
          </div>
        )}

        {non_motor && (
          <div className="my-5">
            <CustomInput
              name="name"
              className="border rounded-md p-[5px]"
              value=""
            />
            <CustomInput
              name="name"
              className="border rounded-md p-[5px]"
              value=""
            />
          </div>
        )}
      </div>
      <div className="flex justify-center my-5">
        <CustomButton
          name={"Request Quote"}
          className={
            "h-[40px] bg-[#cb7529] flex justify-center items-center w-[100%] rounded-md text-white "
          }
          onClick={() => {}}
        />
      </div>
    </Modal>
  );
};

export default QuoteModal;
