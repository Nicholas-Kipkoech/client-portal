"use client";

import Covers from "./components/Covers";
import HomePage from "./components/Home";
import TestimonialCarousel from "./components/TestimonialCarousel";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 my-10">
      <HomePage />
      <TestimonialCarousel />
      <Covers />
    </div>
  );
}
