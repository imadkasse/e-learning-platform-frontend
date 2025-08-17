import Courses from "@/components/dashboard-user/courses/Courses";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="  container mx-auto h-full ">
      <Courses searchParams={await searchParams} />
    </div>
  );
};

export default page;
