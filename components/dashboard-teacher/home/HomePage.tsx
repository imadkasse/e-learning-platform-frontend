// "use client";
// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { useUserStore } from "@/store/userStore";
// import { User } from "@/types/user";

import { User } from "@/types/user";
import axios from "axios";
import { cookies } from "next/headers";

const HomePage = async () => {
  //with cilent componenet
  // const [token, setToken] = useState<string | undefined>(undefined);
  // const [user, setUser] = useState<User>();
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   setToken(token);
  // }, [setToken]);
  // const fetchingUser = useUserStore((state) => state.fetchUser);
  // const saveUser = useUserStore((state) => state.user);

  // useEffect(() => {
  //   fetchingUser();
  //   setUser(saveUser);
  // }, [fetchingUser, saveUser, setUser]);

  // if (!token ) {
  //   return (
  //     <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] ">
  //       You are not logged in.
  //     </div>
  //   );
  // }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user: User;

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data.user);
      user = res.data.user;
    } catch (err) {
      console.log(err);
    }
  };

  await fetchUser();

  //@ts-expect-error: fix afte time in user
  if (!token || user?.role !== "teacher") {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] ">
        You are not logged in.
      </div>
    );
  }

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] ">
      HomePage Teacher
    </div>
  );
};

export default HomePage;
