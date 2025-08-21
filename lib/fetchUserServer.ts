import axios from "axios";
import { cookies } from "next/headers";

export async function fetchUserServer() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
      {
        withCredentials: true,
        headers: token
          ? { Authorization: `Bearer ${token}` } // لو التوكن موجود استعمله
          : {},
      }
    );
    return res.data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
