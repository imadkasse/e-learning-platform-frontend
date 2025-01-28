import { Comment } from "./lesson";
import { User } from "./user";

export type Notifcation = {
  message: string;
  comment: Comment;
  courseImage: string;
  courseId: string;
  user: User;
  lessonNumber: number;
  createdAt: string;
};
