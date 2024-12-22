"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { User } from "@/types/user";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      Cookies.set("token", token); // تخزين التوكن
      fetchUserData(token);
    } else {
      setLoading(false); // في حالة عدم وجود التوكن
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loading && userData) {
      const role = userData?.role === "student" ? "user" : "";
      if (role) {
        router.push(`/dashboard-${role}`);
      } else {
        router.push("/"); // إعادة التوجيه للصفحة الرئيسية في حال عدم وجود دور
      }
    }
  }, [loading, userData, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
};

export default GoogleCallback;
