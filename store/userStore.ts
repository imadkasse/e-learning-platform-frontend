import { User } from "@/types/user";
import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const useUserStore = create<User & { fetchUser: () => Promise<void> }>(
  (set) => ({
    _id: "",
    username: "",
    email: "",
    role: "",
    active: false,
    progress: 0,
    thumbnail: "",
    enrolledCourses: [],
    fetchUser: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        set(res.data.user);
      } catch (error) {
        console.log(error);
      }
    },
  })
);
