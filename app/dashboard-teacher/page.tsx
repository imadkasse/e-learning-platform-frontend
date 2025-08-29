import HomePage from "@/components/dashboard-teacher/home/HomePage";
import { TeacherData } from "@/types/dashboard";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const getAnalyticsAdmin = async () => {
    const res = await fetch(`${process.env.BACK_URL}/api/teacher`, {
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    const { courses, totalEnrollments, totalRevenue, topCourse } = data;
    return {
      courses,
      totalEnrollments,
      totalRevenue,
      topCourse,
    }; //topCourse like  {"_id": "68ab1cb653fd0157aa62c5c8", "title": "دورة برمجة الويب المتكاملة","price": 1200,"studentsCount": 1 }
  };
  const data: TeacherData | null = await getAnalyticsAdmin();
  return (
    <div className="px-1 h-full container mx-auto  ">
      <HomePage data={data} />
    </div>
  );
};

export default page;
