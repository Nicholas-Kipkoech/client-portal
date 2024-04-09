import React from "react";

const Footer = () => {
  return (
    <div className="divide-y divide-gray-300 border p-5 rounded-md bg-[#092332] text-white opacity-[0.9]">
      <div>
        <p className="text-[2rem] 2xl:text-[3rem]">
          Get covered in minutes. <br /> Everything should be this easy.
        </p>
      </div>

      <div className="flex justify-between">
        <div>
          <p className="font-bold">{"Inquiries".toUpperCase()}</p>
          <ul className="text-[15px] 2xl:text-[18px]">
            <li>team@mail.com</li>
          </ul>
        </div>
        <div>
          <p className="font-bold">{"Services".toUpperCase()}</p>
          <ul className="text-[15px] 2xl:text-[18px]">
            <li>Get a Quote</li>
            <li>File a claim</li>
            <li>Community Operators</li>
            <li>Independent Agents</li>
            <li>Book conversions</li>
            <li>Lenders</li>
            <li>API</li>
          </ul>
        </div>
        <div>
          <p className="font-bold">{"Company".toUpperCase()}</p>
          <ul className="text-[15px] 2xl:text-[18px]">
            <li>About Us</li>
            <li>Contact</li>
            <li>FAQs</li>
            <li>Blog</li>
            <li>Reviews</li>
            <li>Resources</li>
            <li>Legal Center</li>
          </ul>
        </div>
        <div>
          <p className="font-bold">{"Social".toUpperCase()}</p>
          <ul className="text-[15px] 2xl:text-[18px]">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
      <p className="my-2 text-[18px] 2xl:text-[20px]">
        {" "}
        &copy; All rights reserved {new Date().getFullYear()}{" "}
      </p>
    </div>
  );
};

export default Footer;
