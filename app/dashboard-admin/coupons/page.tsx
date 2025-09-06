import Coupons from "@/components/dashboard-admin/coupons/Coupons";
import { Coupon } from "@/types/coupon";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const fetchCoupons = async () => {
    try {
      const res = await fetch(`${process.env.BACK_URL}/api/coupons`, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      return data.coupons;
    } catch (error) {
      console.log("error:", error);
    }
  };
  const coupons: Coupon[] | [] = await fetchCoupons();
  return (
    <div className="px-1 h-full  container mx-auto ">
      <Coupons couponsData={coupons} />
    </div>
  );
};

export default page;
