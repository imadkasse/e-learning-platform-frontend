import { Lesson } from "@/types/lesson";
import { create } from "zustand";

export const useLesson = create<{
  lesson: Lesson;
  setLesson: (newLesson: Lesson) => void;
}>((set) => ({
  lesson: {
    _id: "",
    lessonTitle: "",
    url: "",
    duration: 0,
    isCompleted: false,
    completedBy: [],
    comments: [],
  },
  setLesson: (newLesson: Lesson) => {
    set(() => ({ lesson: newLesson }));
  },
}));
