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
  imageCoverStr: "",
  setFormData: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
  addVideo: (video) =>
    set((state) => ({
      ...state,
      videos: [...state.videos, video],
    })),

  // تعديل درس محدد
  updateVideo: (index, updatedVideo) =>
    set((state) => ({
      ...state,
      videos: state.videos.map((video, i) =>
        i === index ? { ...video, ...updatedVideo } : video
      ),
    })),

  // حذف درس
  deleteVideo: (index) =>
    set((state) => ({
      ...state,
      videos: state.videos.filter((_, i) => i !== index),
    })),

  // إضافة ملف جديد
  addFile: (file) =>
    set((state) => ({
      ...state,
      files: [...state.files, file],
    })),

  // حذف ملف
  deleteFile: (index) =>
    set((state) => ({
      ...state,
      files: state.files.filter((_, i) => i !== index),
    })),

  resetForm: () =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
