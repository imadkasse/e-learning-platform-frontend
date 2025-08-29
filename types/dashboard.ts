export interface AdminData {
  users: number;
  courses: number;
  totalEnrollments: number;
  teachers: number;
  totalRevenue: number;
  topCourse: {
    _id: string;
    title: string;
    price: number;
    studentsCount: number;
  };
}

export interface TeacherData {
  courses: number;
  totalEnrollments: number;
  totalRevenue: number;
  topCourse: {
    _id: string;
    title: string;
    price: number;
    studentsCount: number;
  };
}