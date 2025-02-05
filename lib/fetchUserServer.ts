import axios from "axios";
import { cookies } from "next/headers";

export async function fetchUserServer() {
  const cookiesStroe = await cookies();
  const token = cookiesStroe.get("token")?.value;
  if (!token) return null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
