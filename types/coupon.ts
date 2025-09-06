import { Course } from "./course";

export type Coupon = {
  _id: string;
  code: string;
  discountType: string;
  discountValue: number;
  discountAsPercentage: number;
  courseId: string | Course | null;
  maxUsage: number;
  usedCount: number;
  createdAt: string;
  updatedAt: string;
};
