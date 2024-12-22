import { User } from "./user";

//need this in dashboard-user/support/MsgCard.tsx
export type replie = {
  user: User;
  message: string;
};

export type Faq = {
  _id: string;
  user: User;
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  replies: replie[];
};
