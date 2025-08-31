"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types/user";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (token: string) => {
    try {
      // localStorage.setItem("token", token); // 🔑 تخزين التوكن
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
        {
          withCredentials: true,
        }
      );
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      router.push("/signup"); // إعادة توجيه عند الخطأ
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
      router.push("/signup");
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loading && userData) {
      if (userData.role === "student") {
        router.push("/dashboard-user");
      } else if (userData.role === "admin") {
        router.push("/dashboard-admin");
      } else {
        router.push("/sigunp");
      }
    }
  }, [loading, userData, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return null;
};

export default GoogleCallback;
