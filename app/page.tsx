"use client";

import { useState } from "react";
import CustomButton from "./utils/CustomButtom";
import QuoteModal from "./components/QuoteModal";
import HomePage from "./components/Home";
import TestimonialCarousel from "./components/TestimonialCarousel";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 my-10">
      <HomePage />
      <TestimonialCarousel />
    </div>
  );
}
