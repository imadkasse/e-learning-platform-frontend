import { create } from "zustand";
import { CourseFormState } from "@/types/courseFormState ";

export const useCourseFormStore = create<CourseFormState>((set) => ({
  title: "",
  description: "",
  category: "",
  videos: [],
  files: [],
  price: 0,
  imageCover: "",
  setFormData: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
  setRestForm: () =>
    set((state) => ({
      title: "",
      description: "",
      category: "",
      videos: [],
      files: [],
      price: 0,
      imageCover: "",
    })),
}));
