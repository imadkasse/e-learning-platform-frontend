type Videos = {
  _id: string;
  lessonTitle: string;
  url: string;
  duration: string;
  //... Add more
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
  files: string[]; //edit in feature
  avgRatings: number;
  active: boolean;
  progress?: number;
  reviews: review[]; //edit in feature
};

type Instructor = {
  id: string;
  username: string;
  thumbnail: string;
};
type review = {
  id: string;
  user: Instructor;
  rating: number;
  createdAt: string;
  content: string;
};
