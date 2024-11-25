"use client";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Course } from "@/types/course";
import Link from "next/link";
import { Lesson } from "@/types/lesson";
import { Close, DeleteOutline, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface CourseDetails {
  imageCover: File | null;
  lessonName: string;
  lessonVideo: File | null;
  pdfFiles: File[];
  courseTitle: string;
  coursePrice: string;
  courseDescription: string;
  category: string;
  lessonVideoName: string;
  pdfFilesNames: string[];
}

type Props = {
  id: string;
};

const EditCourse = ({ id }: Props) => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [course, setCourse] = useState<Course>();

  const getCourse = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${id}`
    );

    const data = await res.json();
    setCourse(data.course);
    setImageCoverPreview(data.course.imageCover);
  };

  const [formData, setFormData] = useState<CourseDetails>({
    imageCover: null,
    lessonName: "",
    lessonVideo: null,
    pdfFiles: [],
    lessonVideoName: "",
    pdfFilesNames: [],
    courseTitle: "",
    coursePrice: "",
    courseDescription: "",
    category: "",
  });
  const [lessons, setLessons] = useState<Lesson>();

  const [showComponent, setShowComponent] = useState<boolean>(true);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const [imageCoverPreview, setImageCoverPreview] = useState<string | null>(
    null
  );

  //loadings
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDeleteBtn, setLoadingDeleteBtn] = useState<boolean>(false);
  const [loadingEditBtn, setLoadingEditBtn] = useState<boolean>(false);

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

  useEffect(() => {
    getCourse(id);
  }, [id]);

  const handelEditCourse = async (e: FormEvent) => {
    e.preventDefault();

    const courseData = new FormData();

    if (formData.imageCover)
      courseData.append("imageCover", formData.imageCover);
    courseData.append("lessonTitle", formData.lessonName);
    if (formData.lessonVideo) courseData.append("videos", formData.lessonVideo);
    formData.pdfFiles.forEach((file) => courseData.append("files", file));
    courseData.append("title", formData.courseTitle);
    courseData.append("price", formData.coursePrice);
    courseData.append("description", formData.courseDescription);
    courseData.append("category", formData.category);

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
      toast.success("تم نشر الدورة بنجاح", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      setFormData({
        imageCover: null,
        lessonName: "",
        lessonVideo: null,
        pdfFiles: [],
        lessonVideoName: "",
        pdfFilesNames: [],
        courseTitle: "",
        coursePrice: "",
        courseDescription: "",
        category: "",
      });
    } catch (error) {
      console.log(error);
      //@ts-expect-error:fix
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
    } finally {
      setLoading(false);
    }
  };

  const handelAddLesson = () => {};

  const handelDeleteLesson = async (videoId: string) => {
    setLoadingDeleteBtn(true);
    try {
      const data = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${id}/videos/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("تم حذف الفيديو بنجاح", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
      router.refresh();
    } catch (error) {
      //@ts-expect-error:fix agin
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-white text-black dark:bg-gray-800 dark:text-white",
      });
    } finally {
      setLoadingDeleteBtn(false);
    }
  };

  const handelEditLesson = () => {};
  return (
    <div className="p-6 bg-wygColor shadow-xl rounded-xl shadow-mainColorHoverLight min-h-screen ">
      {/* Btns */}
      <div className="w-full flex justify-between">
        <button
          onClick={() => {
            setShowComponent(!showComponent);
          }}
          className={`${
            showComponent ? "border-b-2 border-mainColor" : ""
          } apply-fonts-normal  w-full py-2 px-4`}
        >
          تفاصيل الدورة
        </button>
        <button
          onClick={() => {
            setShowComponent(!showComponent);
          }}
          className={`${
            showComponent ? "" : "border-b-2 border-mainColor"
          } apply-fonts-normal  w-full py-2 px-4`}
        >
          دروس الدورة
        </button>
      </div>

      {showComponent ? (
        <div className=" p-6 bg-wygColor shadow-xl rounded-xl shadow-mainColorHoverLight min-h-screen">
          <h1 className="text-2xl font-bold mb-4 apply-fonts-normal">
            تعديل تفاصيل الدورة
          </h1>
          <section className="space-y-6 bg-white p-6 rounded shadow">
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
                      className="w-[500px] h-[322px]   rounded-2xl border-2 "
                      width={550}
                      height={550}
                    />
                  </div>
                )}
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
              <label
                htmlFor="courseDescription"
                className="block font-medium mb-2"
              >
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
                    accept=".docx, .pdf"
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
              </div>
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
              {loading ? "جاري التعديل ..." : "تعديل "}
            </button>
          </section>
        </div>
      ) : (
        <div className=" p-6 bg-wygColor shadow-xl rounded-xl shadow-mainColorHoverLight min-h-screen ">
          <h1 className="text-2xl font-bold mb-4 apply-fonts-normal">
            تعديل دروس الدورة
          </h1>
          <section className="space-y-6 bg-white p-6 rounded shadow relative">
            {/* قائمة الدروس */}
            <div className=" mx-auto p-4">
              <h1 className="text-2xl apply-fonts-normal mb-6 ">
                قائمة الدروس الحالية
              </h1>
              {/*Edit Toogle*/}
              {showEdit && (
                <div className=" bg-black/60 absolute top-0 rounded left-0 w-full h-full px-6 z-10 flex flex-col items-start gap-5">
                  <button
                    className="p-3 focus:animate-ping"
                    onClick={() => {
                      setShowEdit(!showEdit);
                    }}
                  >
                    <Close className="text-redColor hoverEle hover:text-redColorHoverLight hover:rotate-180 " />
                  </button>
                  <form className="w-full  flex-grow">
                    {/* إسم الدرس */}
                    <div>
                      <label
                        htmlFor="lessonName"
                        className="apply-fonts-normal block font-medium mb-2 text-white"
                      >
                        إسم الدرس الجديد
                      </label>
                      <input
                        type="text"
                        id="lessonName"
                        name="lessonName"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    {/* فيديو الدرس */}
                    <div className="flex items-center space-x-4">
                      <div className="w-full">
                        <label
                          htmlFor="lessonVideo"
                          className="block font-medium mb-2 text-white"
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
                      </div>
                    </div>
                    <button className="mt-5 flex gap-3 apply-fonts-normal rounded-lg bg-mainColor hoverEle hover:bg-mainColorHoverLight text-white py-2 px-4">
                      <p>تعديل </p>
                      <Edit />
                    </button>
                  </form>
                </div>
              )}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="table-auto w-full overflow-x-scroll">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-right text-gray-600">
                        اسم الدرس
                      </th>
                      <th className="px-4 py-2 text-right text-gray-600">
                        رابط الفيديو
                      </th>
                      <th className="px-4 py-2 text-right text-gray-600">
                        المدة
                      </th>
                      <th className="px-4 py-2 text-right text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {course?.videos.map((video, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="apply-fonts-normal text-[14px] px-4 py-2 text-gray-800">
                          {video.lessonTitle}
                        </td>
                        <td className="px-4 py-2 text-blue-600 underline">
                          <Link
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            مشاهدة الفيديو
                          </Link>
                        </td>
                        <td className="px-4 py-2 text-gray-800">
                          {Math.floor(Number(video.duration) / 60)} دقيقة
                          {Number(video.duration) % 60} ثانية
                        </td>

                        <td className="px-4 py-2 flex justify-center gap-4  ">
                          <button
                            onClick={() => {
                              setShowEdit(!showEdit);
                            }}
                            className="flex gap-1 apply-fonts-normal text-white bg-mainColor hover:bg-mainColorHoverLight hoverEle px-4 py-2 rounded-md"
                          >
                            <Edit />
                            <p>تعديل</p>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handelDeleteLesson(video._id);
                            }}
                            className={`${
                              loadingDeleteBtn
                                ? "bg-redColorHoverLight cursor-not-allowed"
                                : "bg-redColor hover:bg-redColorHoverLight"
                            } flex gap-1 apply-fonts-normal text-white  hoverEle px-4 py-2 rounded-md`}
                          >
                            <DeleteOutline />
                            <p>
                              {loadingDeleteBtn ? "جاري حذف الدرس ...." : "حذف"}
                            </p>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <form>
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
                </div>
              </div>
              {/* زر إضافة الدرس */}
              <button
                type="submit"
                className={`mt-4 p-2  text-white font-medium rounded  ${
                  loading
                    ? "bg-mainColorHoverLight cursor-not-allowed"
                    : "bg-mainColor hover:bg-mainColorHoverLight"
                } hoverEle`}
              >
                {loading ? "جاري الإضافة ..." : "إضافة "}
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
