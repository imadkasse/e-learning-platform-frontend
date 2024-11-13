"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { User } from "@/types/user";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<User>(); // للحصول على query parameters

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(response.data.user); // تخزين بيانات المستخدم
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // الحصول على التوكن من كود الاستجابة بعد تسجيل الدخول
    const token = searchParams.get("token"); // استخدم searchParams بدلاً من router.query

    if (token) {
      fetchUserData(token);
      // تخزين التوكن في Cookies
      Cookies.set("token", token);

      const role = userData?.role === "student" ? "user" : "";

      if (role) {
        router.push(`/dashboard-${role}`);
      }

      // إعادة التوجيه إلى الصفحة الرئيسية أو أي صفحة أخرى
    }
  }, [searchParams, router, userData]);
};

export default GoogleCallback;
