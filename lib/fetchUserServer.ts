import { cookies } from "next/headers";

export async function fetchUserServer() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  console.log("token", token);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
      {
        // credentials: "include",
        headers: token
          ? { Authorization: `Bearer ${token}` } // لو التوكن موجود استعمله
          : {},
      }
    );
    const data = await res.json();
    console.log("data:fetching user", data.user);
    return data.user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
