import UpdatePassword from "@/components/resetPassword/UpdatePassword";
import React from "react";
import { ToastContainer } from "react-toastify";

type PageProps = { params: Promise<{ resetToken: string }> };
const page = async ({ params }: PageProps) => {
  const resetToken = (await params).resetToken;
  console.log(resetToken)
  return (
    <div>
      <ToastContainer />
      <UpdatePassword resetToken={resetToken} />
    </div>
  );
};

export default page;
