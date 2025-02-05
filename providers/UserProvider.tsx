"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/user";

export default function UserProvider({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const { setUser } = useUserStore();

  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}
