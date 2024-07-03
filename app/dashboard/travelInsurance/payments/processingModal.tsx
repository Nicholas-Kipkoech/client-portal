import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Spin } from "antd";
import React from "react";
interface ProcessingModalProps {
  open: boolean;
  handleClose: () => void;
  message: string;
}

const ProcessingModal = ({
  open,
  handleClose,
  message,
}: ProcessingModalProps) => {
  return (
    <Modal open={open} centered footer onCancel={handleClose}>
      <div className="flex h-[5rem] justify-center flex-col gap-2 items-center">
        <p>{message}</p>
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    </Modal>
  );
};

export default ProcessingModal;
