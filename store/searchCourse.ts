import { Course } from "@/types/course";
import { create } from "zustand";

export const useSearchCourse = create<{
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>((set) => ({
  courses: [],
  loading: false,
  setCourses: (newCourses: Course[]) => {
    set(() => ({ courses: newCourses }));
  },
  setLoading: (newloading: boolean) => {
    set(() => ({ loading: newloading }));
  },
}));
