import SignUp from "@/components/signup&login/SignUp";
import React from "react";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <>
      <SignUp />
      <ToastContainer />
    </>
  );
};

export default page;
