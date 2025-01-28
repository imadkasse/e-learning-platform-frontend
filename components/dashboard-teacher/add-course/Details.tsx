"use client";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import showToast from "@/utils/showToast";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import Spinner from "@/components/spinner/Spinner";

interface CourseDetails {
  imageCover: File | null;
  lessonName: string;
  lessonVideo: File | null;
  pdfFiles: File[];
  courseTitle: string;
  coursePrice: number;
  courseDescription: string;
  category: string;
  lessonVideoName: string;
  pdfFilesNames: string[];
  concepts: string[];
}

const Details: React.FC = () => {
  // add protected
  const token = Cookies.get("token");
  const loadingUser = useUserStore((state) => state.loading);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const user = useUserStore((state) => state.user);

  const [formData, setFormData] = useState<CourseDetails>({
    imageCover: null,
    lessonName: "",
    lessonVideo: null,
    pdfFiles: [],
    lessonVideoName: "",
    pdfFilesNames: [],
    courseTitle: "",
    coursePrice: 0,
    courseDescription: "",
    category: "",
    concepts: [],
  });
  // دالة لإضافة مفهوم جديد
  const handleAddConcept = (concept: string) => {
    if (concept.trim() === "") return;
    setFormData((prevState) => ({
      ...prevState,
      concepts: [...prevState.concepts, concept],
    }));
  };

  // دالة لحذف مفهوم
  const handleRemoveConcept = (index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      concepts: prevState.concepts.filter((_, i) => i !== index),
    }));
  };

  // تخزين قيمة الإدخال الحالي للمفهوم
  const [conceptInput, setConceptInput] = useState("");

  const [imageCoverPreview, setImageCoverPreview] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  if (loadingUser) {
    return <Spinner />;
  }

  //return this if the user is Not authenticated
  if (!token || user?.role !== "teacher") {
    return (
      <div className="bg-wygColor flex flex-col justify-center rounded-xl px-4 py-5 h-[100vh] ">
        <h1 className="apply-fonts-normal sm:text-3xl mt-5 w-full col-span-3 text-center text-mainColor ">
          أنت غير مسجل أو لا تملك الصلاحية للوصول الى هذه الصفحة
        </h1>
        <div className="mt-5 flex justify-center ">
          <Link
            href={"/login"}
            className="apply-fonts-normal py-2 px-4  bg-mainColor hover:bg-mainColorHoverLight hoverEle text-white rounded-lg"
          >
            سجل الدخول من هنا
          </Link>
        </div>
      </div>
    );
  }

  const handleImageCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, imageCover: file }));
      setImageCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleLessonVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      lessonVideo: file,
      // @ts-expect-error:fix that agin
      lessonVideoName: file.name, // تحديث اسم الفيديو
    }));
  };

  const handlePdfFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      pdfFiles: files,
      pdfFilesNames: files.map((file) => file.name), // تحديث أسماء ملفات PDF
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const courseData = new FormData();

    if (formData.imageCover)
      courseData.append("imageCover", formData.imageCover);
    courseData.append("lessonTitle", formData.lessonName);
    if (formData.lessonVideo) courseData.append("videos", formData.lessonVideo);
    formData.pdfFiles.forEach((file) => courseData.append("files", file));
    courseData.append("title", formData.courseTitle);
    courseData.append("price", formData.coursePrice.toString());
    courseData.append("description", formData.courseDescription);
    courseData.append("category", formData.category);
    formData.concepts.forEach((concept, index) => {
      courseData.append(`concepts[${index}]`, concept);
    });

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      showToast("success", "تم نشر الدورة بنجاح");

      setFormData({
        imageCover: null,
        lessonName: "",
        lessonVideo: null,
        pdfFiles: [],
        lessonVideoName: "",
        pdfFilesNames: [],
        courseTitle: "",
        coursePrice: 0,
        courseDescription: "",
        category: "",
        concepts: [],
      });
    } catch (error) {
      //@ts-expect-error:fix
      showToast("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-wygColor shadow-xl rounded-xl shadow-mainColorHoverLight min-h-screen">
      <h1 className="text-2xl font-bold mb-4 apply-fonts-normal">
        إضافة تفاصيل الدورة
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded shadow"
      >
        {/* صورة الغلاف */}
        <div className="flex items-center space-x-4">
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
              <div className="mt-4">
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

        {/* اسم الدرس */}
        <div>
          <label
            htmlFor="lessonName"
            className="apply-fonts-normal block font-medium mb-2"
          >
            اسم الدرس
          </label>
          <input
            type="text"
            id="lessonName"
            name="lessonName"
            value={formData.lessonName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* فيديو الدرس */}
        <div className="flex items-center space-x-4">
          <div className="w-full">
            <label
              htmlFor="lessonVideo"
              className="block font-medium mb-2 text-gray-700"
            >
              فيديو الدرس
            </label>
            <div className="relative">
              <input
                type="file"
                id="lessonVideo"
                accept="video/*"
                onChange={handleLessonVideoChange}
                className="hidden"
              />
              <label
                htmlFor="lessonVideo"
                className="cursor-pointer bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
              >
                اختر فيديو
              </label>
            </div>
            {formData.lessonVideoName && (
              <p className="mt-5 text-sm text-gray-500">
                الفيديو المرفوع: {formData.lessonVideoName}
              </p>
            )}
            <p className="mt-3 apply-fonts-normal text-sm text-blue-600">
              * يرجى رفع الفيديو الأول فقط الآن، ويمكنك تعديل الدورة لاحقًا
              لإضافة باقي الفيديوهات.
            </p>
          </div>
        </div>

        {/* ملفات PDF */}
        <div className="flex items-center space-x-4">
          <div className="w-full">
            <label
              htmlFor="pdfFiles"
              className="block font-medium mb-2 text-gray-700"
            >
              ملفات PDF
            </label>
            <div className="relative">
              <input
                type="file"
                id="pdfFiles"
                accept=".pdf"
                multiple
                onChange={handlePdfFilesChange}
                className="hidden"
              />
              <label
                htmlFor="pdfFiles"
                className="cursor-pointer bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300"
              >
                اختر ملفات PDF
              </label>
            </div>
            {formData.pdfFilesNames.length > 0 && (
              <ul className="mt-5 text-sm text-gray-500">
                {formData.pdfFilesNames.map((fileName, index) => (
                  <li key={index}>- {fileName}</li>
                ))}
              </ul>
            )}
            <p className="mt-3 apply-fonts-normal text-sm text-blue-600">
              * يمكن إضافة ملفات PDF إضافية عند تعديل الدورة لاحقًا.
            </p>
          </div>
        </div>

        {/* عنوان الدورة */}
        <div>
          <label htmlFor="courseTitle" className="block font-medium mb-2">
            عنوان الدورة
          </label>
          <input
            type="text"
            id="courseTitle"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* سعر الدورة */}
        <div>
          <label htmlFor="coursePrice" className="block font-medium mb-2">
            سعر الدورة
          </label>
          <input
            type="number"
            id="coursePrice"
            name="coursePrice"
            value={formData.coursePrice}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* وصف الدورة */}
        <div>
          <label htmlFor="courseDescription" className="block font-medium mb-2">
            وصف الدورة
          </label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows={4}
          ></textarea>
        </div>
        {/* مفاهيم الدورة */}
        <div>
          <label
            htmlFor="conceptInput"
            className="apply-fonts-normal block font-medium mb-2"
          >
            مفاهيم الدورة
          </label>
          <div className="flex items-center space-x-2 gap-2">
            <input
              type="text"
              id="conceptInput"
              value={conceptInput}
              onChange={(e) => setConceptInput(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="أدخل مفهومًا"
            />
            <button
              type="button"
              onClick={() => {
                handleAddConcept(conceptInput);
                setConceptInput("");
              }}
              className="apply-fonts-normal p-2 bg-mainColor text-white rounded"
            >
              أضف
            </button>
          </div>
        </div>

        {/* عرض المفاهيم المضافة */}
        <div>
          <h3 className="apply-fonts-normal font-medium mb-2">
            المفاهيم المضافة:
          </h3>
          {formData.concepts.length > 0 ? (
            <ul className="space-y-2">
              {formData.concepts.map((concept, index) => (
                <li
                  key={index}
                  className="apply-fonts-normal flex justify-between items-center bg-gray-100 p-2 rounded shadow"
                >
                  <span>{concept}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveConcept(index)}
                    className="apply-fonts-normal text-redColor"
                  >
                    حذف
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 apply-fonts-normal">
              لم تتم إضافة أي مفاهيم بعد.
            </p>
          )}
        </div>
        {/* الفئات */}
        <div>
          <label htmlFor="category" className="block font-medium mb-2">
            الفئة
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="apply-fonts-normal block w-full border rounded p-2"
            required
          >
            <option className="apply-fonts-normal" value="">
              اختر الفئة
            </option>
            <option className="apply-fonts-normal" value="development">
              علوم
            </option>
            <option className="apply-fonts-normal" value="design">
              فيزياء
            </option>
            <option className="apply-fonts-normal" value="marketing">
              رياضيات
            </option>
            <option className="apply-fonts-normal" value="business">
              أدب عربي
            </option>
            <option className="apply-fonts-normal" value="other">
              فلسفة
            </option>
          </select>
        </div>

        {/* زر الإرسال */}
        <button
          type="submit"
          className={`w-full p-2  text-white font-medium rounded  ${
            loading
              ? "bg-mainColorHoverLight cursor-not-allowed"
              : "bg-mainColor hover:bg-mainColorHoverLight"
          } hoverEle`}
        >
          {loading ? "جاري النشر" : "نشر"}
        </button>
      </form>
    </div>
  );
};

export default Details;
