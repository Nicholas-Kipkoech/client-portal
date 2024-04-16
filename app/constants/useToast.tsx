"use client";

import { toast } from "react-toastify";

export const useCustomToast = () => {
  const showToast = (message: string, type: string | any = "success") =>
    toast(message, { type });
  return showToast;
};
