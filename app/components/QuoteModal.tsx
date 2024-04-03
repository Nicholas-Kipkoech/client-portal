import React from "react";
import { Modal } from "antd";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButtom";

interface IModal {
  open: boolean;
  handleClose: () => void;
}

const QuoteModal = ({ open, handleClose }: IModal) => {
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
          name={"Street Address"}
          value=""
          className={"h-[40px] border rounded-md"}
        />
        <CustomInput
          name={"City"}
          value=""
          className={"h-[40px] border rounded-md"}
        />
        <CustomInput
          name={"State"}
          value=""
          className={"h-[40px] border rounded-md"}
        />
        <CustomInput
          name={"County"}
          value=""
          className={"h-[40px] border rounded-md"}
        />
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
