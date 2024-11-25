export type Video = {
  lessonTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  video: any;
};

export type CourseFormState = {
  title: string;
  description: string;
  price: number;
  category: string;
  imageCover: string;
  imageCoverStr: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videos: Video[]; // أو كائن يحتوي على معلومات الفيديو
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormData: (key: string, value: any) => void;
  resetForm: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addVideo: (video: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateVideo: (index: number, updatedVideo: any) => void;
  deleteVideo: (index: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addFile: (file: any) => void;
  deleteFile: (index: number) => void;
};
export type Course = {
  title: string;
  description: string;
  price: number;
  category: string;
  imageCover: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videos: Video[]; // أو كائن يحتوي على معلومات الفيديو
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: any[];
};
