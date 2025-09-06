import Courses from "@/components/dashboard-teacher/courses/Courses";
import React from "react";

const page = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className=" h-full  ">
      <Courses searchParams={await searchParams}/>
    </div>
  );
};

export default page;
