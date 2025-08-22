import { Comment } from "./lesson";
import { User } from "./user";

export type Notifcation = {
  _id: string;
  message: string;
  comment: Comment;
  courseImage: string;
  courseId: string;
  user: User;
  lessonNumber: number;
  createdAt: string;
};
