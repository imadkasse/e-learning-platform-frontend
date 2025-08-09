"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { X } from "lucide-react";
import Image from "next/image";
// components/CourseUploader.tsx
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type AddSection = {
  title: string;
};
type Section = {
  _id: string;
  title: string;
};
interface UploadedFile {
  id: string;
  title: string;
  url: string;
  size: number; // بالبايت
}

interface StepFilesProps {
  courseId: string;
}
const baseUrl = process.env.NEXT_PUBLIC_BACK_URL;
const token = Cookies.get("token");
export default function CourseUploader() {
  const [step, setStep] = useState(1);
  const [newconcept, setNewConcept] = useState<string>("");
  const [concepts, setConcepts] = useState<string[]>([]);
  const [currentCourse, setCurrentCourse] = useState();

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

  //sections
  const [sections, setSections] = useState<AddSection[]>([]);
  const [title, setTitle] = useState("");

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

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
            setSections={setSections}
            title={title}
            setTitle={setTitle}
          />
        )}
        {step === 3 && <StepVideos sections={sections} />}
        {step === 4 && <StepFiles courseId="//! change to currntCourse._id" />}
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
            onClick={nextStep}
            disabled={step === 4}
            className="apply-fonts-normal px-4 py-2 bg-[#3D45EE] text-white rounded cursor-pointer hover:bg-[#2E36C0]"
          >
            التالي
          </button>
        ) : (
          <button
            onClick={nextStep}
            disabled={step === 4}
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
  concepts: string[];
  newconcept: string;
  setNewConcept: Dispatch<SetStateAction<string>>;
  addConcept: (concept: string) => void;
  removeConcept: (index: number) => void;
}
function StepGeneralDetails({
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
    }
  };
  const handleCreateCourse = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/courses`,
        {
          //! info
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="عنوان الكورس"
        className="apply-fonts-normal w-full border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
      />
      <input
        type="number"
        placeholder="السعر"
        className="w-full border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
      />
      <textarea
        placeholder="الوصف"
        className="apply-fonts-normal w-full border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
      />
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
          <div className="flex gap-4 mt-4 ">
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
  sections: AddSection[];
  setSections: Dispatch<SetStateAction<AddSection[]>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

function StepSections({
  sections,
  setSections,
  title,
  setTitle,
}: StepSectionsProps) {
  const addSection = () => {
    if (title.trim()) {
      setSections([
        ...sections,
        {
          title,
        },
      ]);
      setTitle("");
    }
  };
  const removeSection = (index: number) => {
    setSections(
      sections.filter((_: AddSection, i: number) => {
        return i !== index;
      })
    );
    setTitle("");
  };

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
          onClick={addSection}
          className="apply-fonts-normal px-4 py-2 bg-[#3D45EE] text-white rounded hover:bg-[#2E36C0] hoverEle"
        >
          حفظ
        </button>
      </div>
      <ul className="list-disc ">
        {sections.map((sec: AddSection, idx) => (
          <li key={idx} className="flex gap-2 mb-4">
            <input
              value={sec.title}
              onChange={(e) => setTitle(e.target.value)}
              disabled
              placeholder="عنوان القسم"
              className="apply-fonts-normal flex-1 border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
            />
            <button
              onClick={() => removeSection(idx)}
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
  sections: AddSection[];
}
function StepVideos({ sections }: StepVideosProps) {
  const [videos, setVideos] = useState<{
    [key: number]: { title: string; file?: File }[];
  }>({}); // before upload video

  const [uploadedLessons, setUploadedLessons] = useState<{
    [key: number]: { title: string }[];
  }>({}); // after upload video

  const handleVideoChange = (
    sectionIndex: number,
    videoIndex: number,
    field: "title" | "file",
    value: string | File
  ) => {
    setVideos((prev) => {
      const sectionVideos = prev[sectionIndex] || [];
      const updatedVideos = [...sectionVideos];
      if (!updatedVideos[videoIndex]) updatedVideos[videoIndex] = { title: "" };
      updatedVideos[videoIndex] = {
        ...updatedVideos[videoIndex],
        [field]: value,
      };
      return { ...prev, [sectionIndex]: updatedVideos };
    });
  };

  const addVideoField = (sectionIndex: number) => {
    setVideos((prev) => {
      const sectionVideos = prev[sectionIndex] || [];
      return { ...prev, [sectionIndex]: [...sectionVideos, { title: "" }] };
    });
  };

  const removeVideoField = (sectionIndex: number, videoIndex: number) => {
    setVideos((prev) => {
      const sectionVideos = prev[sectionIndex] || [];
      const updatedVideos = sectionVideos.filter((_, i) => i !== videoIndex);
      return { ...prev, [sectionIndex]: updatedVideos };
    });
  };

  // using  {{URL}}/api/courses/sections/:sectionId here
  const uploadVideo = (
    sectionIndex: number,
    video: { title: string; file?: File }
  ) => {
    if (!video.file) {
      alert("الرجاء اختيار ملف قبل الرفع");
      return;
    }
    console.log("رفع الفيديو:", video.title, video.file);
    alert(`تم رفع الفيديو: ${video.title}`);

    setUploadedLessons((prev) => {
      const sectionLessons = prev[sectionIndex] || [];
      return {
        ...prev,
        [sectionIndex]: [...sectionLessons, { title: video.title }],
      };
    });
  };
  // using  Delete lesson from backend
  const removeUploadedLesson = (sectionIndex: number, lessonIndex: number) => {
    setUploadedLessons((prev) => {
      const sectionLessons = prev[sectionIndex] || [];
      const updatedLessons = sectionLessons.filter((_, i) => i !== lessonIndex);
      return { ...prev, [sectionIndex]: updatedLessons };
    });
  };

  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border p-4 rounded-lg bg-gray-50">
          <h2 className="apply-fonts-normal font-bold text-lg mb-4">
            {section.title}
          </h2>

          {(videos[sectionIndex] || []).map((video, videoIndex) => (
            <div key={videoIndex} className="space-y-3 mb-4 border-b pb-4">
              <input
                type="text"
                placeholder="عنوان الفيديو"
                value={video.title}
                onChange={(e) =>
                  handleVideoChange(
                    sectionIndex,
                    videoIndex,
                    "title",
                    e.target.value
                  )
                }
                className="apply-fonts-normal w-full border p-3 rounded focus:outline-none focus:border-[#3D45EE]"
              />

              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleVideoChange(
                      sectionIndex,
                      videoIndex,
                      "file",
                      e.target.files[0]
                    );
                  }
                }}
                className=" w-full border p-3 rounded bg-gray-50"
              />

              <div className="apply-fonts-normal flex gap-3">
                <button
                  type="button"
                  onClick={() => uploadVideo(sectionIndex, video)}
                  className="bg-[#3D45EE] text-white px-4 py-2 rounded hover:bg-[#2E36C0] transition"
                >
                  رفع الفيديو
                </button>

                <button
                  type="button"
                  onClick={() => removeVideoField(sectionIndex, videoIndex)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  حذف الفيديو
                </button>
              </div>
            </div>
          ))}

          {/* عرض الدروس المرفوعة */}
          {uploadedLessons[sectionIndex] &&
            uploadedLessons[sectionIndex].length > 0 && (
              <div className="mt-4">
                <h3 className="apply-fonts-normal font-semibold mb-2">
                  📚 الدروس المرفوعة:
                </h3>
                <ul className="space-y-2">
                  {uploadedLessons[sectionIndex].map((lesson, lessonIndex) => (
                    <li
                      key={lessonIndex}
                      className="flex justify-between items-center border p-2 rounded bg-white"
                    >
                      <span className="apply-fonts-normal">{lesson.title}</span>
                      <button
                        onClick={() =>
                          removeUploadedLesson(sectionIndex, lessonIndex)
                        }
                        className="apply-fonts-normal text-red-500 hover:text-red-700"
                      >
                        ❌ حذف
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          <button
            type="button"
            onClick={() => addVideoField(sectionIndex)}
            className="apply-fonts-normal mt-4 bg-[#3D45EE] text-white px-4 py-2 rounded hover:bg-[#2E36C0] transition"
          >
            + إضافة فيديو
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Step 4 ---------------- */
function StepFiles({ courseId }: StepFilesProps) {
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
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!title || !file) {
      alert("الرجاء إدخال عنوان الملف واختيار الملف");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}/files`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("فشل رفع الملف");

      const data = await res.json();

      setUploadedFiles((prev) => [
        ...prev,
        {
          id: data.id,
          title: data.title,
          url: data.url,
          size: file.size,
        },
      ]);

      setTitle("");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء رفع الملف");
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (fileId: string) => {
    if (!confirm("هل تريد حذف هذا الملف؟")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}/files/${fileId}`,
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
          onClick={uploadFile}
          disabled={loading}
          className="apply-fonts-normal bg-[#3D45EE] text-white px-4 py-2 rounded hover:bg-[#2E36C0] transition disabled:opacity-50"
        >
          {loading ? "جارٍ الرفع..." : "رفع الملف"}
        </button>
      </div>

      {/* عرض الملفات المرفوعة */}
      {uploadedFiles.length > 0 && (
        <div>
          <h3 className="apply-fonts-normal font-semibold mb-3">
            📂 الملفات المرفوعة
          </h3>
          <ul className="space-y-2">
            {uploadedFiles.map((f) => (
              <li
                key={f.id}
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
