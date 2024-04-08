"use client";
import React, { useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

const Testimonials = [
  {
    user: "Nicholas Kipkoech",
    content: `I was very pleased when I contacted CoverTree. They listened to
            what I needed and got back to me when they said they would. It was a
            wonderful experience.`,
    backgroundUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    user: "Eric Kweyu",
    content: `I was very pleased when I contacted CoverTree. They listened to
            what I needed and got back to me when they said they would. It was a
            wonderful experience.`,
    backgroundUrl:
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Testimonials.length);
  };
  const handlePrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + Testimonials.length) % Testimonials.length
    );
  };

  return (
    <div
      style={{
        position: "relative",
        height: 300, // Set the height of the container
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${Testimonials[currentIndex].backgroundUrl})`,
          backgroundSize: "contain",
        }}
        className="rounded-lg"
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
        className="p-2 mt-[100px] flex justify-between"
      >
        <div className="w-[300px] bg-[#4D3C34] opacity-[0.8] p-2 rounded-lg flex flex-col gap-5">
          <p style={{ color: "white" }}>
            “{Testimonials[currentIndex].content}”
          </p>
          <p
            style={{ color: "white" }}
            className="flex justify-start font-bold"
          >
            {Testimonials[currentIndex].user}
          </p>
        </div>
        <div className="text-white mt-[100px] flex gap-2 mr-4">
          <GrLinkPrevious
            onClick={handlePrevious}
            className="bg-white rounded-[50%] cursor-pointer text-[#cb7529] h-[40px] p-2 w-[40px]"
          />
          <GrLinkNext
            className="bg-white rounded-[50%] text-[#cb7529] cursor-pointer h-[40px] p-2 w-[40px]"
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
