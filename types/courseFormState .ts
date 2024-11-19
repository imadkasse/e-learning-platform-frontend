export type CourseFormState = {
  title: string;
  description: string;
  price: number;
  category: string;
  imageCover: string;
  videos: any[]; // أو كائن يحتوي على معلومات الفيديو
  files: any[];
  setFormData: (key: string, value: any) => void;
  setRestForm: () => void;
};
