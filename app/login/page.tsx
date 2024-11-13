import React from "react";
import Login from "../../components/signup&login/Login";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default page;
