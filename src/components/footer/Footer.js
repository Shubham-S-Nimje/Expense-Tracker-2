import React from "react";
import logo from "../../logo.svg";

const Footer = () => {
  return (
    <div className="bg-blue-600 text-white bottom-0 inset-x-0 w-full text-center p-2">
      <div className="justify-center flex">
        <a href="#" className="flex mb-2 sm:mb-0">
          <img src={logo} className="h-8" alt="Logo" />
          <span className="text-2xl font-semibold">ExpenseTracker</span>
        </a>
      </div>
      <hr className="my-3 sm:mx-auto lg:my-2" />
      <span className="text-sm sm:text-center">
        © 2023{" "}
        <a href="#" className="hover:underline">
          ExpenseTracker™
        </a>
        . All Rights Reserved.
      </span>
    </div>
  );
};

export default Footer;
