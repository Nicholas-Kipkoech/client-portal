import { Modal } from "antd";
import React from "react";

interface IModal {
  open: boolean;
  handleClose: () => void;
  items: any;
}

const RiskNoteModal = ({ open, handleClose, items }: IModal) => {
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      width={800}
      centered
      title={"Attachments"}
    >
      {items &&
        items.map((item: any) => (
          <iframe width={"100%"} height={"500px"} src={item.file} />
        ))}
    </Modal>
  );
};

export default RiskNoteModal;
