import AdminHomePage from "@/components/dashboard-admin/administration/AdminHomePage";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="px-1 h-full  container mx-auto ">
      <AdminHomePage searchParams={await searchParams} />
    </div>
  );
};

export default page;
