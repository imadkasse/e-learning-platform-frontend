import { Course } from "./course";

type ProgresItems = {
  course: string;
  completedVideos: string[];
  percentage: number;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "student" | "teacher" | null;
  active: boolean;
  progress: ProgresItems[];
  thumbnail: string;
  publishedCourses: string[];
  enrolledCourses: Course[]; //قابل للتعديل في لاحق
  phoneNumber: string;
  createdAt?: string;
};
