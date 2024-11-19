export type User = {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "student" | "teacher" | null;
  active: boolean;
  progress: number;
  thumbnail: string;
  publishedCourses?: boolean;
  enrolledCourses: string[]; //قابل للتعديل في لاحق
  phoneNumber: string;
};
