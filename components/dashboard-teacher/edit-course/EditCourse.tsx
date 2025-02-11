/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Course } from "@/types/course";
import Link from "next/link";

import { Close, DeleteOutline, Edit, ErrorOutline } from "@mui/icons-material";
import { useUserStore } from "@/store/userStore";
import Spinner from "@/components/spinner/Spinner";

interface CourseDetails {
  //
  imageCover: any;
  title: string;
  price: number;
  description: string;
  category: string;
}
type Lesson = {
  lessonTitle: string;
  video: File | null;
};
type file = {
  filename: string;
  file: File | null;
};

type Props = {
  id: string;
};

const showToast = (type: "success" | "error", message: string) => {
  toast[type](message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "bg-white text-black dark:bg-gray-800 dark:text-white",
  });
};

const EditCourse = ({ id }: Props) => {
  // add protected
  const token = Cookies.get("token");

  const loadingUser = useUserStore((state) => state.loading);


  const [course, setCourse] = useState<Course>();

  const getCourse = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${id}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();
    setCourse(data.course);
    setImageCoverPreview(data.course.imageCover);
  };

  const [formData, setFormData] = useState<CourseDetails>({
    imageCover: null,
    title: "",
    price: 0,
    description: "",
    category: "",
  });

  const [lessons, setLessons] = useState<Lesson>({
    lessonTitle: "",
    video: null,
  });
  const [editLessons, setEditLessons] = useState<Lesson>({
    lessonTitle: "",
    video: null,
  });
  const [file, setFile] = useState<file>({
    filename: "",
    file: null,
  });

  const [showComponent, setShowComponent] = useState<boolean>(true);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showDeleteFile, setShowDeleteFile] = useState<boolean>(false);

  const [videoId, setVideoId] = useState<string>("");
  const [fileId, setFileId] = useState<string>("");

  const [imageCoverPreview, setImageCoverPreview] = useState<string | null>(
    null
  );

  //loadings
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDeleteBtn, setLoadingDeleteBtn] = useState<boolean>(false);
  const [loadingEditBtn, setLoadingEditBtn] = useState<boolean>(false);
  const [loadingAddBtn, setLoadingAddBtn] = useState<boolean>(false);
  const [loadingAddFile, setLoadingAddFile] = useState<boolean>(false);
  const [loadingDeleteFileBtn, setLoadingDeleteFileBtn] =
    useState<boolean>(false);

  useEffect(() => {
    getCourse(id);
  }, [id]);

  if (loadingUser) {
    return <Spinner />;
  }



  const handleImageCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, imageCover: file }));
      setImageCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handelEditCourse = async (e: FormEvent, courseId: string) => {
    e.preventDefault();

    const courseData = new FormData();

    if (formData.imageCover)
      courseData.append("imageCover", formData.imageCover);

    if (formData.title) courseData.append("title", formData.title);
    if (formData.price) courseData.append("price", formData.price.toString());
    if (formData.description) {
      courseData.append("description", formData.description);
    }
    if (formData.category) courseData.append("category", formData.category);

    setLoading(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast("success", "تم تعديل الدورة بنجاح");
      setFormData({
        imageCover: course?.imageCover,
        title: "",
        price: 0,
        description: "",
        category: "",
      });

      await getCourse(courseId);
    } catch (error) {
      //@ts-expect-error:fix
      showToast("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handelAddLesson = async (e: FormEvent, id: string) => {
    e.preventDefault();

    const lessonData = new FormData();
    if (lessons.video) {
      lessonData.append("video", lessons.video);
    }
    lessonData.append("lessonTitle", lessons.lessonTitle);

    setLoadingAddBtn(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${id}`,
        lessonData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newLesson = res.data.newLesson;
      showToast("success", "تم إضافة الدرس بنجاح");

      setCourse((prevCourse) => {
        if (!prevCourse) return undefined;
        return {
          ...prevCourse,
          videos: [...(prevCourse.videos || []), newLesson],
        };
      });
      setLessons({
        video: null,
        lessonTitle: "",
      });

      await getCourse(id);

      setShowEdit(false);
    } catch (error) {
      //@ts-expect-error:fix agin
      showToast("error", error.response.data.message);
    } finally {
      setLoadingAddBtn(false);
    }
  };

  const handelDeleteLesson = async (videoId: string) => {
    setLoadingDeleteBtn(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${id}/videos/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast("success", "تم حذف الفيديو بنجاح");

      setCourse((prevCourse) => {
        if (!prevCourse) return undefined;
        return {
          ...prevCourse,
          videos: [...prevCourse.videos.filter((v) => v._id !== v._id)],
        };
      });
      setShowDelete(false);

      await getCourse(id);
    } catch (error) {
      //@ts-expect-error:fix agin
      showToast("error", error.response.data.message);
    } finally {
      setLoadingDeleteBtn(false);
    }
  };

  const handelEditLesson = async (e: FormEvent, videoId: string) => {
    e.preventDefault();
    setLoadingEditBtn(true);
    const lessonData = new FormData();
    if (editLessons.video) {
      lessonData.append("video", editLessons.video);
    }
    lessonData.append("lessonTitle", editLessons.lessonTitle);

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${id}/videos/${videoId}`,
        lessonData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedLesson = res.data.updatedLesson;

      showToast("success", "تم تعديل الدرس بنجاح");

      setCourse((prevCourse) => {
        if (!prevCourse) return undefined;
        return {
          ...prevCourse,
          videos: [...(prevCourse.videos || []), updatedLesson],
        };
      });
      setEditLessons({
        video: null,
        lessonTitle: "",
      });
      setShowEdit(false);

      await getCourse(id);
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
      setLoadingEditBtn(false);
    }
  };
  const addFile = async (e: FormEvent, courseId: string) => {
    e.preventDefault();
    const fileData = new FormData();

    if (file.file) {
      fileData.append("file", file.file);
    }
    fileData.append("filename", file.filename);
    setLoadingAddFile(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}/files`,
        fileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newFile = res.data.file;
      showToast("success", "تم رفع الملف بنجاح");

      setCourse((prevCourse) => {
        if (!prevCourse) return undefined;
        return {
          ...prevCourse,
          files: [...(prevCourse.files || []), newFile],
        };
      });

      setFile({
        file: null,
        filename: "",
      });

      await getCourse(courseId);
    } catch (error) {
      //@ts-expect-error:fix agin
      showToast("error", error.response.data.message);
    } finally {
      setLoadingAddFile(false);
    }
  };
  const deleteFile = async (fileId: string, courseId: string) => {
    setLoadingDeleteFileBtn(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}/files/${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast("success", "تم حذف الملف بنجاح");

      setCourse((prevCourse) => {
        if (!prevCourse) return undefined;
        return {
          ...prevCourse,
          files: [...prevCourse.files.filter((f) => f._id !== f._id)],
        };
      });
      setShowDeleteFile(false);

      await getCourse(id);
    } catch (error) {
      //@ts-expect-error:fix agin
      showToast("error", error.response.data.message);
    } finally {
      setLoadingDeleteFileBtn(false);
    }
  };
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
          دروس و ملفات الدورة
        </button>
      </div>

      {showComponent ? (
        <div className=" p-6  rounded-xl  min-h-screen">
          <h1 className="text-2xl font-bold mb-4 apply-fonts-normal">
            تعديل تفاصيل الدورة
          </h1>
          <form
            className="space-y-6 bg-white p-6 rounded "
            onSubmit={(e) => {
              handelEditCourse(e, id);
            }}
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
              <label htmlFor="title" className="block font-medium mb-2">
                عنوان الدورة
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || course?.title || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* سعر الدورة */}
            <div>
              <label htmlFor="price" className="block font-medium mb-2">
                سعر الدورة
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price || course?.price || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* وصف الدورة */}
            <div>
              <label htmlFor="description" className="block font-medium mb-2">
                وصف الدورة
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || course?.description || ""}
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
                onChange={handleInputChange}
                className="apply-fonts-normal block w-full border rounded p-2"
              >
                <option className="apply-fonts-normal" value="">
                  {course?.category || "إختر الفئة"}
                </option>
                <option className="apply-fonts-normal" value="علوم">
                  علوم
                </option>
                <option className="apply-fonts-normal" value="فيزياء">
                  فيزياء
                </option>
                <option className="apply-fonts-normal" value="رياضيات">
                  رياضيات
                </option>
                <option className="apply-fonts-normal" value="أدب">
                  أدب عربي
                </option>
                <option className="apply-fonts-normal" value="فلسفة">
                  فلسفة
                </option>
              </select>
            </div>

            {/* زر الإرسال */}
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className={`w-full p-2  text-white font-medium rounded  ${
                loading
                  ? "bg-mainColorHoverLight cursor-not-allowed"
                  : "bg-mainColor hover:bg-mainColorHoverLight"
              } hoverEle`}
            >
              {loading ? "جاري التعديل ..." : "تعديل "}
            </button>
          </form>
        </div>
      ) : (
        <div className=" p-6  ">
          <h1 className="text-2xl font-bold mb-4 apply-fonts-normal">
            تعديل دروس الدورة
          </h1>
          <section className="space-y-6 bg-white p-6 rounded shadow relative">
            {/* قائمة الدروس */}
            <div className=" mx-auto p-4">
              <h1 className="text-2xl apply-fonts-normal mb-6 ">
                قائمة الدروس الحالية
              </h1>
              {/*Edit Toggle*/}
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
                  <form
                    className="w-full  flex-grow"
                    onSubmit={(e) => {
                      handelEditLesson(e, videoId);
                    }}
                  >
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
                        onChange={(e) => {
                          setEditLessons({
                            ...lessons,
                            lessonTitle: e.target.value,
                          });
                        }}
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
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              const video = e.target.files?.[0] || null;
                              if (video) {
                                setEditLessons({
                                  ...lessons,
                                  video: video,
                                });
                              }
                            }}
                            className="hidden"
                          />
                          <label
                            htmlFor="lessonVideo"
                            className="cursor-pointer bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
                          >
                            اختر فيديو
                          </label>
                        </div>
                        {editLessons.video && (
                          <p className="mt-5 text-sm text-white">
                            الفيديو المرفوع: {editLessons.video.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className={`mt-5 flex gap-3 apply-fonts-normal rounded-lg ${
                        loadingEditBtn
                          ? "bg-mainColorHoverLight cursor-not-allowed"
                          : "bg-mainColor hoverEle hover:bg-mainColorHoverLight"
                      }  text-white py-2 px-4`}
                    >
                      <p>{loadingEditBtn ? "جاري التعديل ..." : "تعديل "} </p>
                      <Edit />
                    </button>
                  </form>
                </div>
              )}
              {/* Delete Toggle */}
              {showDelete && (
                <div className=" bg-black/60 absolute top-0 rounded left-0 w-full h-full lg:px-16 xs:px-1 sm:px-7  z-10 flex flex-col items-center justify-center gap-5">
                  {/*  */}
                  <div className=" bg-white rounded-lg w-full ">
                    <div className="relative md:py-5 xs:py-3  w-full flex flex-col gap-6 ">
                      <div className="w-full flex items-center flex-col ">
                        <ErrorOutline fontSize="large" />
                        <h1 className="apply-fonts-normal lg:text-lg sm:text-base xs:text-[14px] text-center">
                          هل أنت متأكد من حذف هذا الدرس ؟
                        </h1>
                      </div>
                      <div className="w-full flex items-center justify-center xs:gap-2 md:gap-5">
                        <button
                          className="flex items-center gap-2 group py-2 lg:px-4  xs:px-2 apply-fonts-normal sm:text-base xs:text-[13px] bg-mainColor hover:bg-mainColorHoverLight hoverEle rounded-lg text-white"
                          onClick={() => {
                            setShowDelete(!showDelete);
                          }}
                        >
                          <Close className="group-hover:text-redColor hoverEle" />
                          <p>إغلاق</p>
                        </button>
                        <button
                          onClick={() => {
                            handelDeleteLesson(videoId);
                          }}
                          className={`${
                            loadingDeleteBtn
                              ? "bg-redColorHoverLight cursor-not-allowed"
                              : "bg-redColor hover:bg-redColorHoverLight"
                          } py-2 lg:px-4 xs:px-2 apply-fonts-normal sm:text-base xs:text-[13px]  hoverEle rounded-lg text-white`}
                        >
                          <p>
                            {loadingDeleteBtn
                              ? "جاري حذف الدرس ...."
                              : "نعم، أنا متأكد"}
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
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
                              setVideoId(video._id);
                            }}
                            className="flex gap-1 apply-fonts-normal text-white bg-mainColor hover:bg-mainColorHoverLight hoverEle px-4 py-2 rounded-md"
                          >
                            <Edit />
                            <p>تعديل</p>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowDelete(!showDelete);
                              setVideoId(video._id);
                            }}
                            className={` bg-redColor hover:bg-redColorHoverLight flex gap-1 apply-fonts-normal text-white  hoverEle px-4 py-2 rounded-md`}
                          >
                            <DeleteOutline />
                            <p>حذف</p>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* add new lesson */}
            <form
              onSubmit={(e) => {
                handelAddLesson(e, id);
              }}
            >
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
                  onChange={(e) =>
                    setLessons({
                      ...lessons,
                      lessonTitle: e.target.value,
                    })
                  }
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
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const video = e.target.files?.[0] || null;
                        if (video) {
                          setLessons({
                            ...lessons,
                            video: video,
                          });
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="lessonVideo"
                      className="cursor-pointer bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
                    >
                      اختر فيديو
                    </label>
                  </div>
                  {lessons.video && (
                    <p className="mt-5 text-sm text-gray-500">
                      الفيديو المرفوع: {lessons.video.name}
                    </p>
                  )}
                </div>
              </div>
              {/* زر إضافة الدرس */}
              <button
                type="submit"
                className={`mt-4 p-2  text-white font-medium rounded  ${
                  loadingAddBtn
                    ? "bg-mainColorHoverLight cursor-not-allowed"
                    : "bg-mainColor hover:bg-mainColorHoverLight"
                } hoverEle`}
              >
                {loadingAddBtn ? "جاري الإضافة ..." : "إضافة "}
              </button>
            </form>

            {/* قائمة الملفات */}
            <div className=" mx-auto p-4">
              <h1 className="text-2xl apply-fonts-normal mb-6 ">
                قائمة الملفات الحالية
              </h1>
              {/* Delete File Toggle */}
              {showDeleteFile && (
                <div className=" bg-black/60 absolute top-0 rounded left-0 w-full h-full lg:px-16 xs:px-1 sm:px-7  z-10 flex flex-col items-center justify-center gap-5">
                  {/*  */}
                  <div className=" bg-white rounded-lg w-full ">
                    <div className="relative md:py-5 xs:py-3  w-full flex flex-col gap-6 ">
                      <div className="w-full flex items-center flex-col ">
                        <ErrorOutline fontSize="large" />
                        <h1 className="apply-fonts-normal lg:text-lg sm:text-base xs:text-[14px] text-center">
                          هل أنت متأكد من حذف هذا الملف ؟
                        </h1>
                      </div>
                      <div className="w-full flex items-center justify-center xs:gap-2 md:gap-5">
                        <button
                          className="flex items-center gap-2 group py-2 lg:px-4  xs:px-2 apply-fonts-normal sm:text-base xs:text-[13px] bg-mainColor hover:bg-mainColorHoverLight hoverEle rounded-lg text-white"
                          onClick={() => {
                            setShowDeleteFile(!showDeleteFile);
                          }}
                        >
                          <Close className="group-hover:text-redColor hoverEle" />
                          <p>إغلاق</p>
                        </button>
                        <button
                          onClick={() => {
                            deleteFile(fileId, id);
                          }}
                          className={`${
                            loadingDeleteFileBtn
                              ? "bg-redColorHoverLight cursor-not-allowed"
                              : "bg-redColor hover:bg-redColorHoverLight"
                          } py-2 lg:px-4 xs:px-2 apply-fonts-normal sm:text-base xs:text-[13px]  hoverEle rounded-lg text-white`}
                        >
                          <p>
                            {loadingDeleteFileBtn
                              ? "جاري حذف الدرس ...."
                              : "نعم، أنا متأكد"}
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="table-auto w-full overflow-x-scroll">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-right text-gray-600">
                        اسم الملف
                      </th>
                      <th className="px-4 py-2 text-right text-gray-600">
                        رابط الملف
                      </th>
                      <th className="px-4 py-2 text-right text-gray-600">
                        حجم الملف
                      </th>
                      <th className="px-4 py-2 text-right text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {course?.files.map((file, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="apply-fonts-normal text-[14px] px-4 py-2 text-gray-800">
                          {file.filename}
                        </td>
                        <td className="px-4 py-2 text-blue-600 underline">
                          <a href={file.url} download target="_blank">
                            الملف
                          </a>
                        </td>
                        <td className="px-4 py-2 text-gray-600 ">
                          <p>{file.size}Kb</p>
                        </td>

                        <td className="px-4 py-2 flex justify-center gap-4  ">
                          <button
                            type="button"
                            onClick={() => {
                              setShowDeleteFile(!showDeleteFile);
                              setFileId(file._id);
                            }}
                            className={` bg-redColor hover:bg-redColorHoverLight flex gap-1 apply-fonts-normal text-white  hoverEle px-4 py-2 rounded-md`}
                          >
                            <DeleteOutline />
                            <p>حذف</p>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* ملفات PDF */}
            <form
              className="flex gap-3 space-x-4 flex-col items-start"
              onSubmit={(e) => {
                addFile(e, id);
              }}
            >
              <h1 className="apply-fonts-normal ">رفع ملفات PDF</h1>
              {/* إسم الملف  */}
              <div className="w-full flex flex-col gap-4">
                <label htmlFor="pdfFiles" className="apply-fonts-normal ">
                  إسم الملف
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={file.filename}
                    onChange={(e) => {
                      setFile({
                        ...file,
                        filename: e.target.value,
                      });
                    }}
                    className="bg-wygColor w-full py-2 px-3 rounded-md "
                    placeholder="أكتب إسم الملف"
                  />
                </div>
              </div>
              {/* الملف */}

              <div className="relative w-full mt-6">
                <input
                  type="file"
                  id="pdfFiles"
                  accept=".docx, .pdf"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile({
                        ...file,
                        file: e.target.files[0],
                      });
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="pdfFiles"
                  className="cursor-pointer bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300"
                >
                  إرفع الملف
                </label>
              </div>

              <button
                className={`py-2 px-3 ${
                  loadingAddFile
                    ? "bg-mainColorHoverLight cursor-not-allowed"
                    : "bg-mainColor hover:bg-mainColorHoverLight"
                } hoverEle rounded-lg text-white apply-fonts-normal`}
              >
                {loadingAddFile ? "جاري الإضافة ..." : "إضافة الملف"}
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
