type Videos = {
  _id: string;
  title: string;
  url: string;
  duration: string;
  //... Add more
};

export type Course = {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  instructor: string;
  duration: number;
  price: number;
  studentsCount: number;
  enrolledStudents: string[]; //edit in feature
  published: boolean;
  createdAt: Date;
  videos: Videos[]; //edit in feature
  files: string[]; //edit in feature
  avgRatings: number;
  active: boolean;
  progress?: number;
  reviews: string[]; //edit in feature
};
