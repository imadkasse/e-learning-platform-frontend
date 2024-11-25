import { Course } from "@/types/course";
import { create } from "zustand";

export const useSearchCourse = create<{
  courses: Course[];
  setCourses: (courses: Course[]) => void;
}>((set) => ({
  courses: [],
  setCourses: (newCourses: Course[]) => {
    set(() => ({ courses: newCourses }));
  },
}));
