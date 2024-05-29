"use client";
import CustomButton from "@/app/utils/CustomButtom";
import { Textarea } from "@chakra-ui/react";
import { Modal } from "antd";
import React from "react";

interface INotesModal {
  open: boolean;
  handleClose: () => void;
}

const NotesModal = ({ open, handleClose }: Partial<INotesModal>) => {
  return (
    <Modal
      title={"Add Note"}
      centered
      open={open}
      footer
      onCancel={handleClose}
    >
      <Textarea height={"auto"} />

      <CustomButton
        name={"Submit Note"}
        className={"border p-2 mt-2  bg-slate-800 text-white rounded-md"}
      />
    </Modal>
  );
};

export default NotesModal;
