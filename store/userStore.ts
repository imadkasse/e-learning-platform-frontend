// import { User } from "@/types/user";
import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";
import { User } from "@/types/user";

const token = Cookies.get("token");

export const useUserStore = create<{
  user: User;
  fetchUser: () => Promise<void>;
}>((set) => ({
  user: {
    _id: "",
    username: "",
    email: "",
    role: null,
    active: false,
    progress: 0,
    thumbnail: "",
    enrolledCourses: [],
  },
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
      set({ user: res.data.user });
    } catch (error) {
      console.log(error);
    }
  },
}));
