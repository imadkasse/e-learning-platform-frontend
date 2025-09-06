import { User } from "./user";

type Reply = {
  _id: string;
  user: User;
  text: string;
  createdAt: string;
};

export type Comment = {
  _id: string;
  user: User;
  text: string;
  createdAt: string;
  replies: Reply[];
};

export type Lesson = {
  _id: string;
  lessonTitle: string;
  url: string;
  duration: string;
  isCompleted: boolean;
  completedBy: string[];
  comments: Comment[];
  files: File[];
  description: string;
};
type File = {
  _id: string;
  filename: string;
  size: number;
  url: string;
};
