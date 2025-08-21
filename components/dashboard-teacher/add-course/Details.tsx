"use client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import showToast from "@/utils/showToast";
import axios from "axios";
import { Loader, X } from "lucide-react";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

interface CourseDetails {
  title: string;
  description: string;
  category: string;
  price: number;
  imageCover: File | null;
}
interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  sections: Section[];
  files: string[];
  price: number;
  category: string;
  studentsCount: number;
  imageCover: string;
  enrolledStudents: string[];
  reviews: string[];
  numberRatings: number;
  avgRatings: number;
  concepts: string[];
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
}
type AddSection = {
  title: string;
};
type Section = {
  _id: string;
  title: string;
  videos: Videos[];
};
interface UploadedFile {
  id: string;
  title: string;
  url: string;
  size: number; // بالبايت
}
interface Videos {
  _id: string;
  lessonTitle: string;
  url: string;
  format: string;
  duration: number;
  uploadedBy: string;
  sectionId: string;
  isCompleted: string;
  completedBy: string[];
  comments: string[];
  createdAt: string;
  publishedDate: string;
}
interface VideoUpload {
  title: string;
  file: File;
}

const baseUrl = process.env.NEXT_PUBLIC_BACK_URL;

export default function CourseUploader() {
  // stepre
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  // const [isCreateingCourse, setIsCreateingCourse] = useState(false);

  // step one create course  details
  const [newconcept, setNewConcept] = useState<string>("");
  const [concepts, setConcepts] = useState<string[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetails>({
    imageCover: null,
    title: "",
    price: 0,
    description: "",
    category: "",
  });
  const [currentCourse, setCurrentCourse] = useState<Course>({
    _id: "",
    title: "",
    description: "",
    instructor: "",
    sections: [],
    files: [],
    price: 0,
    category: "",
    studentsCount: 0,
    imageCover: "",
    enrolledStudents: [],
    reviews: [],
    numberRatings: 0,
    avgRatings: 0,
    concepts: [],
    publishedDate: "",
    createdAt: "",
    updatedAt: "",
  });
  const [loadingCreatingCourse, setloadingCreatingCourse] = useState(false);
  const [loadingAddSection, setloadingAddSection] = useState(false);
  const [loadingAddVideoToSection, setloadingAddVideoToSection] =
    useState(false);
  const [loadingAddFilesToCourse, setloadingAddFilesToCourse] = useState(false);

  // concepts
  const addConcept = (concept: string) => {
    if (concept.trim() === "") return;
    setConcepts((prev) => [...prev, concept]);
  };
  const removeConcept = (index: number) => {
    setConcepts(
      concepts.filter((concept: string, i: number) => {
        return i !== index;
      })
    );
  };

  const handleCreateCourse = async () => {
    // check before send
    if (!courseDetails.title?.trim()) {
      showToast("error", "الرجاء إدخال عنوان الكورس");
      return;
    }
    if (!courseDetails.description?.trim()) {
      showToast("error", "الرجاء إدخال وصف الكورس");
      return;
    }
    if (!courseDetails.price || isNaN(Number(courseDetails.price))) {
      showToast("error", "الرجاء إدخال سعر صحيح");
      return;
    }
    if (!courseDetails.imageCover) {
      showToast("error", "الرجاء اختيار صورة غلاف");
      return;
    }
    if (!concepts || concepts.length === 0) {
      showToast("error", "الرجاء إضافة مفهوم واحد على الأقل");
      return;
    }

    setloadingCreatingCourse(true);
    const formData = new FormData();

    formData.append("title", courseDetails.title);
    formData.append("description", courseDetails.description);
    formData.append("price", String(courseDetails.price));
    if (courseDetails.imageCover) {
      formData.append("imageCover", courseDetails.imageCover); // لازم يكون ملف (File)
    }

    if (concepts && concepts.length > 0) {
      concepts.forEach((concept: string, index: number) => {
        formData.append(`concepts[${index}]`, concept);
      });
    }

    try {
      const res = await axios.post(`${baseUrl}/api/courses`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast("success", res.data.message);
      setCurrentCourse(res.data.course);
      nextStep();
    } catch (error) {
      console.error("Error creating course:", error);
      showToast("error", "حدث خطأ أثناء إنشاء الكورس");
    } finally {
      setloadingCreatingCourse(false);
    }
  };

  // step two create course  details
  const [sections, setSections] = useState<Section[]>([]);
  const [title, setTitle] = useState("");
  const handleAddSctions = async () => {
    if (!title.trim()) {
      showToast("error", "الرجاء إدخال عنوان القسم");
      return;
    }
    setloadingAddSection(true);
    try {
      const res = await axios.post(
        `${baseUrl}/api/courses/${currentCourse._id}`,
        {
          sectionTitle: title,
        }
      );
      showToast("success", res.data.message);
      setCurrentCourse({
        ...currentCourse,
        sections: [...currentCourse.sections, res.data.section._id],
      });
      setSections([...sections, res.data.section]);
    } catch (error) {
      console.log(error);
      showToast("error", "حدث خطأ أثناء إنشاء الكورس");
    } finally {
      setloadingAddSection(false);
    }
  };
  // step three add videos to sections
  const addVideoToSection = async (
    sectionId: string,
    title: string,
    file: File
  ) => {
    if (!sectionId?.trim()) {
      showToast("error", "الرجاء اختيار القسم أولا");
      return;
    }
    if (!title?.trim()) {
      showToast("error", "الرجاء إدخال عنوان الدرس");
      return;
    }
    if (!file) {
      showToast("error", "الرجاء رفع الفيديو");
      return;
    }
    setloadingAddVideoToSection(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${baseUrl}/api/courses/${currentCourse._id}/sections/${sectionId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showToast("success", res.data.message);
      setSections((prevSections) =>
        prevSections.map((sec) =>
          sec._id === sectionId
            ? { ...sec, videos: [...sec.videos, res.data.video] }
            : sec
        )
      );
    } catch (error) {
      console.error("Error creating course:", error);
      showToast("error", "حدث خطأ أثناء الفييديو");
    } finally {
      setloadingAddVideoToSection(false);
    }
  };
  // step four add files to course
  const addFilesToCourse = async (fileName: string, file: File | null) => {
    if (!fileName.trim()) {
      showToast("error", "الرجاء إدخال إسم الملف");
      return;
    }
    if (!file) {
      showToast("error", "الرجاء إدخال الملف");
      return;
    }

    setloadingAddFilesToCourse(true);
    const formData = new FormData();
    formData.append("filename", fileName);
    if (file) {
      formData.append("file", file);
    }
    try {
      const res = await axios.post(
        `${baseUrl}/api/courses/${currentCourse._id}/files`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showToast("success", res.data.message);
      setCurrentCourse({
        ...currentCourse,
        files: [...currentCourse.files, res.data.file],
      });
    } catch (error) {
      console.error("Error creating course:", error);
      showToast("error", "حدث خطأ أثناء الفييديو");
    } finally {
      setloadingAddFilesToCourse(false);
    }
  };
  return (
    <div className="bg-wygColor rounded-lg p-6 mt-1 ">
      <section>
        {/* Stepper */}
        <div className="flex justify-between mb-8">
          {["تفاصيل عامة", "الأقسام", "الفيديوهات", "الملفات"].map(
            (label, index) => (
              <div
                key={index}
                className={`flex-1 text-center apply-fonts-normal py-2 border-b-4 ${
                  step === index + 1
                    ? "border-[#3D45EE] text-[#3D45EE] font-bold"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                {label}
              </div>
            )
          )}
        </div>
        {/* Step Content */}
        {step === 1 && (
          <StepGeneralDetails
            courseDetails={courseDetails}
            setCourseDetails={setCourseDetails}
            concepts={concepts}
            setNewConcept={setNewConcept}
            newconcept={newconcept}
            addConcept={addConcept}
            removeConcept={removeConcept}
          />
        )}
        {step === 2 && (
          <StepSections
            sections={sections}
            loadingAddSection={loadingAddSection}
            currentCourse={currentCourse}
            handleAddSctions={handleAddSctions}
            title={title}
            setTitle={setTitle}
          />
        )}
        {step === 3 && (
          <StepVideos
            sections={sections}
            addVideoToSection={addVideoToSection}
            loadingAddVideoToSection={loadingAddVideoToSection}
          />
        )}
        {step === 4 && (
          <StepFiles
            addFilesToCourse={addFilesToCourse}
            currentCourse={currentCourse}
            loadingAddFilesToCourse={loadingAddFilesToCourse}
          />
        )}
      </section>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="apply-fonts-normal px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 disabled:opacity-50"
        >
          رجوع
        </button>
        {step !== 4 ? (
          <button
            type="submit"
            onClick={async () => {
              if (step === 1) {
                await handleCreateCourse();
              } else {
                nextStep();
              }
            }}
            disabled={step === 4}
            className={`apply-fonts-normal px-4 py-2 bg-[#3D45EE] text-white rounded  hover:bg-[#2E36C0] flex items-center justify-center gap-2 ${
              step === 4
                ? "bg-mainColorHoverLight cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            {loadingCreatingCourse && <Loader className="animate-spin" />}
            {loadingCreatingCourse ? "جارٍ الإنشاء..." : "التالي"}
          </button>
        ) : (
          <button
            onClick={() => {
              console.log(currentCourse);
            }}
            className="apply-fonts-normal px-4 py-2 bg-[#3D45EE] text-white rounded cursor-pointer hover:bg-[#2E36C0]"
          >
            نشر
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- Step 1 ---------------- */
interface StepGeneralDetailsProps {
  courseDetails: CourseDetails;
  setCourseDetails: Dispatch<SetStateAction<CourseDetails>>;
  concepts: string[];
  newconcept: string;
  setNewConcept: Dispatch<SetStateAction<string>>;
  addConcept: (concept: string) => void;
  removeConcept: (index: number) => void;
}
function StepGeneralDetails({
  courseDetails,
  setCourseDetails,
  concepts,
  newconcept,
  setNewConcept,
  addConcept,
  removeConcept,
}: StepGeneralDetailsProps) {
  const [imageCoverPreview, setImageCoverPreview] = useState<string | null>(
    null
  );
  const handleImageCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImageCoverPreview(URL.createObjectURL(file));
      setCourseDetails((prev) => ({ ...prev, imageCover: file }));
    }
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourseDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="عنوان الكورس"
        value={courseDetails?.title}
        onChange={handleInputChange}
        name="title"
        className="apply-fonts-normal w-full border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
      />
      <input
        type="number"
        placeholder="السعر"
        value={courseDetails?.price}
        onChange={handleInputChange}
        name="price"
        className="w-full border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
      />
      <textarea
        placeholder="الوصف"
        value={courseDetails?.description}
        onChange={handleInputChange}
        rows={7}
        name="description"
        className="apply-fonts-normal w-full border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
      />
      <div>
        <label className="apply-fonts-normal block font-medium mb-2 text-gray-700">
          الفئة
        </label>
        <select
          name="category"
          value={courseDetails?.category}
          onChange={handleInputChange}
          className="apply-fonts-normal w-full border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
        >
          <option value="">اختر الفئة</option>
          <option value="رياضيات">رياضيات</option>
          <option value="فيزياء">فيزياء</option>
          <option value="كيمياء">كيمياء</option>
          <option value="برمجة">برمجة</option>
          <option value="لغات">لغات</option>
        </select>
      </div>
      <div className="apply-fonts-normal flex items-center space-x-4">
        <div className="w-full">
          <label
            htmlFor="imageCover"
            className="block font-medium mb-2 text-gray-700"
          >
            صورة الغلاف
          </label>
          <div className="relative">
            <input
              type="file"
              id="imageCover"
              accept="image/*"
              onChange={handleImageCoverChange}
              className="hidden"
            />
            <label
              htmlFor="imageCover"
              className="apply-fonts-normal cursor-pointer bg-mainColor text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-mainColorHoverLight transition-colors duration-300"
            >
              اختر صورة
            </label>
          </div>
          {imageCoverPreview && (
            <div className="mt-4 apply-fonts-normal">
              <p className="text-gray-600 text-sm mb-2 apply-fonts-normal">
                معاينة الصورة:
              </p>
              <Image
                src={imageCoverPreview}
                alt="صورة الغلاف"
                className="w-[500px] h-[322px]   rounded border"
                width={250}
                height={250}
              />
            </div>
          )}
        </div>
      </div>
      <div className="apply-fonts-normal">
        <div className="flex  gap-4">
          <input
            type="text"
            value={newconcept}
            onChange={(e) => setNewConcept(e.target.value)}
            placeholder="المفاهيم"
            className="w-full border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
          />
          <button
            type="button"
            onClick={() => {
              if (newconcept.length > 0) {
                addConcept(newconcept);
                setNewConcept("");
              }
            }}
            className="px-4 py-2 bg-[#3D45EE] text-white rounded hover:bg-[#2E36C0]"
          >
            أضف
          </button>
        </div>
        <div>
          <div className="flex  flex-wrap gap-4 mt-4 ">
            {concepts.map((concept: string, index: number) => {
              return (
                <div
                  key={index}
                  className="p-1 bg-violet-200 flex rounded-md gap-2  "
                >
                  <h1>{concept}</h1>
                  <button
                    type="button"
                    onClick={() => removeConcept(index)}
                    className="text-red-500"
                  >
                    <X size={17} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Step 2 ---------------- */
interface StepSectionsProps {
  sections: Section[];
  loadingAddSection: boolean;
  handleAddSctions: () => void;
  currentCourse: Course;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

function StepSections({
  sections,
  // currentCourse,
  loadingAddSection,
  handleAddSctions,
  title,
  setTitle,
}: StepSectionsProps) {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان القسم"
          className="apply-fonts-normal flex-1 border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
        />
        <button
          onClick={handleAddSctions}
          disabled={loadingAddSection}
          className="apply-fonts-normal px-4 py-2 bg-[#3D45EE] text-white rounded hover:bg-[#2E36C0] hoverEle"
        >
          {loadingAddSection ? "جاري الحفظ..." : "حفظ"}
        </button>
      </div>

      <ul className="list-disc">
        {sections.map((sec: { _id: string; title: string }) => (
          <li key={sec._id} className="flex gap-2 mb-4">
            <input
              value={sec.title}
              disabled
              placeholder={sec.title}
              className="apply-fonts-normal flex-1 border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
            />
            <button
              // onClick={() => handleRemoveSection(sec._id)}
              className="apply-fonts-normal px-4 py-2 bg-redColor text-white rounded hover:bg-redColorHoverLight hoverEle"
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Step 3 ---------------- */
interface StepVideosProps {
  sections: Section[];
  addVideoToSection: (sectionId: string, title: string, file: File) => void;
  loadingAddVideoToSection: boolean;
}
function StepVideos({
  sections,
  addVideoToSection,
  loadingAddVideoToSection,
}: StepVideosProps) {
  // قبل التحميل: لكل قسم قائمة فيديوهات تحت الإنشاء
  const [videosUpload, setVideosUpload] = useState<
    Record<string, VideoUpload[]>
  >({});

  // بعد التحميل: لكل قسم فيديوهات مرفوعة
  // const [videos, setVideos] = useState<Record<string, Videos[]>>({});

  // تعديل بيانات فيديو قبل التحميل
  const handleVideoChange = (
    sectionId: string,
    videoIndex: number,
    field: "title" | "file",
    value: string | File
  ) => {
    setVideosUpload((prev) => {
      const sectionVideos = prev[sectionId] || [];
      const updated = [...sectionVideos];
      updated[videoIndex] = { ...updated[videoIndex], [field]: value };
      return { ...prev, [sectionId]: updated };
    });
  };

  // إضافة حقل فيديو قبل التحميل
  const addVideoField = (sectionId: string) => {
    setVideosUpload((prev) => {
      const sectionVideos = prev[sectionId] || [];
      return {
        ...prev,
        [sectionId]: [...sectionVideos, { title: "", file: null as any }],
      };
    });
  };

  // حذف فيديو قبل التحميل
  const removeVideoField = (sectionId: string, videoIndex: number) => {
    setVideosUpload((prev) => {
      const sectionVideos = prev[sectionId] || [];
      return {
        ...prev,
        [sectionId]: sectionVideos.filter((_, i) => i !== videoIndex),
      };
    });
  };

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section._id} className="border p-4 rounded-lg bg-gray-50">
          <h2 className="apply-fonts-normal font-bold text-lg mb-4">
            {section.title}
          </h2>

          {/* فيديوهات قبل الرفع */}
          {(videosUpload[section._id] || []).map((video, videoIndex) => (
            <div key={videoIndex} className="space-y-3 mb-4 border-b pb-4">
              <input
                type="text"
                placeholder="عنوان الفيديو"
                value={video.title}
                onChange={(e) =>
                  handleVideoChange(
                    section._id,
                    videoIndex,
                    "title",
                    e.target.value
                  )
                }
                className="apply-fonts-normal w-full border p-3 rounded"
              />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleVideoChange(
                      section._id,
                      videoIndex,
                      "file",
                      e.target.files[0]
                    );
                  }
                }}
                className="w-full border p-3 rounded bg-gray-50"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    video.file &&
                      (await addVideoToSection(
                        section._id,
                        video.title,
                        video.file
                      ));
                    removeVideoField(section._id, videoIndex);
                  }}
                  className="bg-[#3D45EE] text-white px-4 py-2 rounded hover:bg-[#2E36C0]"
                >
                  {loadingAddVideoToSection ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "رفع الفيديو"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => removeVideoField(section._id, videoIndex)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  حذف الفيديو
                </button>
              </div>
            </div>
          ))}

          {/* عرض الفيديوهات المرفوعة */}
          {section.videos.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">📚 الدروس المرفوعة:</h3>
              <ul className="space-y-2">
                {section.videos.map((lesson) => (
                  <li
                    key={lesson._id}
                    className="flex justify-between items-center border p-2 rounded bg-white"
                  >
                    <span>{lesson.lessonTitle}</span>
                    <div className="flex gap-3">
                      <a
                        href={lesson.url}
                        className="text-blue-600 hover:underline"
                      >
                        مشاهدة
                      </a>
                      <button className="text-red-500 hover:text-red-700">
                        ❌ حذف
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="button"
            onClick={() => addVideoField(section._id)}
            className="mt-4 bg-[#3D45EE] text-white px-4 py-2 rounded hover:bg-[#2E36C0]"
          >
            + إضافة فيديو
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Step 4 ---------------- */
interface StepFilesProps {
  currentCourse: Course;
  loadingAddFilesToCourse: boolean;
  addFilesToCourse: (fileName: string, file: File) => void;
}
function StepFiles({
  currentCourse,
  loadingAddFilesToCourse,
  addFilesToCourse,
}: StepFilesProps) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      title: "Python",
      url: "/asdd",
      id: "1231",
      size: 12331,
    },
  ]);

  const deleteFile = async (fileId: string) => {
    if (!confirm("هل تريد حذف هذا الملف؟")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${currentCourse._id}/files/${fileId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("فشل حذف الملف");

      setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء حذف الملف");
    }
  };

  return (
    <div className="space-y-6">
      {/* إدخال ملف جديد */}
      <div className="space-y-3 border p-4 rounded-lg bg-gray-50">
        <input
          type="text"
          placeholder="عنوان الملف"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="apply-fonts-normal w-full border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="w-full border p-3 rounded bg-white"
        />
        <button
          type="button"
          onClick={() => {
            if (file) {
              addFilesToCourse(title, file);
            }
          }}
          disabled={loadingAddFilesToCourse}
          className="apply-fonts-normal bg-[#3D45EE] text-white px-4 py-2 rounded hover:bg-[#2E36C0] transition disabled:opacity-50"
        >
          {loadingAddFilesToCourse ? (
            <Loader className="animate-spin" />
          ) : (
            "رفع الملف"
          )}
        </button>
      </div>

      {/* عرض الملفات المرفوعة */}
      {currentCourse.files.length > 0 && (
        <div>
          <h3 className="apply-fonts-normal font-semibold mb-3">
            📂 الملفات المرفوعة
          </h3>
          <ul className="space-y-2">
            {currentCourse.files.map((f) => (
              <li
                key={f._id}
                className="flex justify-between items-center border p-3 rounded bg-white"
              >
                <div className="flex flex-col">
                  <span className="apply-fonts-normal font-medium">
                    {f.title}
                  </span>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apply-fonts-normal text-blue-600 hover:underline text-sm"
                  >
                    رابط التحميل
                  </a>
                  <span className="apply-fonts-normal text-gray-500 text-sm">
                    حجم الملف:{" "}
                    <span className="font-sans">
                      {(f.size / 1024).toFixed(2)}
                    </span>{" "}
                    ك.ب
                  </span>
                </div>
                <button
                  onClick={() => deleteFile(f.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
