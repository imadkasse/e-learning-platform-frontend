import { Course } from "./course";
import { Notifcation } from "./notification";

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
  publishedCourses: Course[];
  enrolledCourses: Course[]; //قابل للتعديل في لاحق
  phoneNumber: string;
  notifications: Notifcation[];
  createdAt?: string;
  balance?: number;
};
