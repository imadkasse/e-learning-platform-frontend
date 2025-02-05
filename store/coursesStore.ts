import { Course } from "@/types/course";
import { create } from "zustand";

export const useCoursesStore = create<{
  courses: Course[]; // Replace with actual course type
  setCourses: (courses: Course[]) => void; // Replace with actual course type
  loading: boolean; // Replace with actual boolean type
  setLoading: (loading: boolean) => void; // Replace with actual boolean type
}>((set) => ({
  courses: [],
  setCourses: (newCourses: Course[]) => {
    set(() => ({ courses: newCourses }));
  },
  loading: false,
  setLoading: (loading: boolean) => {
    set(() => ({ loading }));
  },
}));
