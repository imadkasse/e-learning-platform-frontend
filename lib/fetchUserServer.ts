import { cookies } from "next/headers";

export async function fetchUserServer() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
      {
        credentials: "include",
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      return null;
    }
    const data = await res.json();

    return data.user;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
