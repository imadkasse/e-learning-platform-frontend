export type Lesson = {
  _id: string;
  lessonTitle: string;
  url: string;
  duration: number;
  isCompleted: boolean;
  completedBy: string[];
};
