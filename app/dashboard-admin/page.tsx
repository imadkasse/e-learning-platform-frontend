import HomePage from "@/components/dashboard-admin/home/HomePage";
import { AdminData } from "@/types/dashboard";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const getAnalyticsAdmin = async () => {
    const res = await fetch(`${process.env.BACK_URL}/api/admin`, {
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    const {
      users,
      courses,
      teachers,
      totalEnrollments,
      totalRevenue,
      topCourse,
    } = data;
    return {
      users,
      courses,
      totalEnrollments,
      teachers,
      totalRevenue,
      topCourse,
    }; //topCourse like  {"_id": "68ab1cb653fd0157aa62c5c8", "title": "دورة برمجة الويب المتكاملة","price": 1200,"studentsCount": 1 }
  };
  const data: AdminData | null = await getAnalyticsAdmin();
  return (
    <div className="px-1 h-full  container mx-auto ">
      <HomePage data={data} />
    </div>
  );
};

export default page;
