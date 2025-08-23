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
  url: string; //! this is just videoId you need to add baseUrl from .env
  duration: number;
  isCompleted: boolean;
  completedBy: string[];
  comments: Comment[];
  files: File[];
  description:string
};
export type Section = {
  _id: string;
  title: string;
  videos: Videos[];
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
  sections: Section[]; //! replace to Sections => [{title:'',videos:Videos[]}
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

export type CreateCourse = {
  title: string;
  description: string;
  imageCover: string;
  price: number;
  published: boolean;
  createdAt: string;
  sections: [
    {
      title: string;
      videos: Videos;
    }
  ];
  files: File[]; //edit in feature
  active: boolean;
  category: string;
  concepts: string[];
};
