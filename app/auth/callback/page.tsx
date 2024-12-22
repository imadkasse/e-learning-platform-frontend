"use client";

import GoogleCallback from "@/components/googleCallBack/GoogleCallback ";
import React, { Suspense } from "react";

const AuthCallbackPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleCallback />
    </Suspense>
  );
};

export default AuthCallbackPage;
