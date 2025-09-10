import Settings from "@/components/dashboard-user/settings/Settings";
import React from "react";
const fetchingUser = async () => {
  try {
    const res = await fetch(`${process.env.BACK_URL}/api/users/me`, {
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data.user;
  } catch {
    return null;
  }
};
const page = async () => {
  const user = await fetchingUser();
  return (
    <div className=" h-full  ">
      <Settings userFetcher={user} />
    </div>
  );
};

export default page;
