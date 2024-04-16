"use client";

import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
interface Children {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: Children) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
