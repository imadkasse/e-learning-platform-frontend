import { create } from "zustand";
import { User } from "@/types/user";

export const useSearchUser = create<{
  users: User[];
  setUsers: (users: User[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>((set) => ({
  users: [],
  loading: false,
  setUsers: (newUsers: User[]) => {
    set(() => ({ users: newUsers }));
  },
  setLoading: (newloading: boolean) => {
    set(() => ({ loading: newloading }));
  },
}));
