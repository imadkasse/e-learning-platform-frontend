import { User } from "./user";

type Reply = {
  _id: string;
  user: User;
  text: string;
  createdAt: string;
};

type Comment = {
  _id: string;
  user: User;
  text: string;
  createdAt: string;
  replies: Reply[];
};
type Videos = {
  _id: string;
  lessonTitle: string;
  url: string;
  duration: number;
  isCompleted: boolean;
  completedBy: string[];
  comments: Comment[];
};

export type Course = {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  instructor: Instructor;
  duration: number;
  price: number;
  studentsCount: number;
  enrolledStudents: string[]; //edit in feature
  published: boolean;
  createdAt: string;
  videos: Videos[]; //edit in feature
  files: File[]; //edit in feature
  avgRatings: number;
  active: boolean;
  progress?: number;
  reviews: review[]; //edit in feature
  category: string;
  concepts: string[];
};

type Instructor = {
  _id: string;
  username: string;
  thumbnail: string;
};
type review = {
  _id: string;
  user: Instructor;
  rating: number;
  createdAt: string;
  content: string;
};
export type File = {
  _id: string;
  filename: string;
  size: number;
  url: string;
};
