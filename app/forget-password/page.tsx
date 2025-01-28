import ResetPassword from "@/components/resetPassword/ResetPassword";
import React from "react";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <>
      <ToastContainer />
      <ResetPassword />
    </>
  );
};

export default page;
