import Students from "@/components/dashboard-admin/students/Students";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="px-1 h-full  container mx-auto ">
      <Students searchParams={await searchParams} />
    </div>
  );
};

export default page;
