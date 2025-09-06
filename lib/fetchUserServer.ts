import { cookies } from "next/headers";

export async function fetchUserServer() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
      {
        headers: token
          ? { Authorization: `Bearer ${token}` } // لو التوكن موجود استعمله
          : {},
        // credentials: "include",
      }
    );
    const data = await res.json();
    console.log("data:fetching userr", data.user);
    return data.user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
