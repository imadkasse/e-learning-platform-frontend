import { Lesson } from "@/types/lesson";
import { create } from "zustand";

export const useLesson = create<{
  lesson: Lesson | undefined;
  setLesson: (newLesson: Lesson) => void;
}>((set) => ({
  lesson: {
    _id: "",
    lessonTitle: "",
    url: "",
    duration: 0,
    isCompleted: false,
    completedBy: [],
  },
  setLesson: (newLesson: Lesson) => {
    set(() => ({ lesson: newLesson }));
  },
}));
