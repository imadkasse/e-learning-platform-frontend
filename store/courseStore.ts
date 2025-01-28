import { Course } from "@/types/course";
import { create } from "zustand";

export const useCourse = create<{
  course: Course;
  setCourse: (newCourse: Course) => void;
}>((set) => ({
  course: {
    _id: "",
    title: "",
    description: "",
    imageCover: "",
    instructor: {
      _id: "",
      username: "",
      thumbnail: "",
    },
    duration: 0,
    price: 0,
    studentsCount: 0,
    enrolledStudents: [],
    published: false,
    createdAt: "",
    videos: [],
    files: [],
    avgRatings: 0,
    active: false,
    progress: undefined,
    reviews: [],
    category: "",
    concepts: [],
  },
  setCourse: (newCourse: Course) => {
    set({ course: newCourse });
  },
}));
