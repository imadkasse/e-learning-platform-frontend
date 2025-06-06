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
  duration: number;
  isCompleted: boolean;
  completedBy: string[];
  comments: Comment[];
};
