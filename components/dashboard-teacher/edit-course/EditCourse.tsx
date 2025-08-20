// /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import Image from "next/image";
// import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Course } from "@/types/course";
// import Link from "next/link";

// import { Close, DeleteOutline, Edit, ErrorOutline } from "@mui/icons-material";
// import { useUserStore } from "@/store/userStore";
// import Spinner from "@/components/spinner/Spinner";

// type Props = {
//   id: string;
// };

// const showToast = (type: "success" | "error", message: string) => {
//   toast[type](message, {
//     position: "top-center",
//     autoClose: 3000,
//     hideProgressBar: true,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     className: "bg-white text-black dark:bg-gray-800 dark:text-white",
//   });
// };

// const EditCourse = ({ id }: Props) => {
//   // add protected
//   const token = Cookies.get("token");

//   const loadingUser = useUserStore((state) => state.loading);

//   const [course, setCourse] = useState<Course>();

//   const getCourse = async (id: string) => {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${id}`,
//       {
//         cache: "no-store",
//       }
//     );

//     const data = await res.json();
//     setCourse(data.course);
//     setImageCoverPreview(data.course.imageCover);
//   };

//   const [formData, setFormData] = useState<CourseDetails>({
//     imageCover: null,
//     title: "",
//     price: 0,
//     description: "",
//     category: "",
//   });

//   const [lessons, setLessons] = useState<Lesson>({
//     lessonTitle: "",
//     video: null,
//   });
//   const [editLessons, setEditLessons] = useState<Lesson>({
//     lessonTitle: "",
//     video: null,
//   });
//   const [file, setFile] = useState<file>({
//     filename: "",
//     file: null,
//   });

//   const [showComponent, setShowComponent] = useState<boolean>(true);
//   const [showEdit, setShowEdit] = useState<boolean>(false);
//   const [showDelete, setShowDelete] = useState<boolean>(false);
//   const [showDeleteFile, setShowDeleteFile] = useState<boolean>(false);

//   const [videoId, setVideoId] = useState<string>("");
//   const [fileId, setFileId] = useState<string>("");

//   const [imageCoverPreview, setImageCoverPreview] = useState<string | null>(
//     null
//   );

//   //loadings
//   const [loading, setLoading] = useState<boolean>(false);
//   const [loadingDeleteBtn, setLoadingDeleteBtn] = useState<boolean>(false);
//   const [loadingEditBtn, setLoadingEditBtn] = useState<boolean>(false);
//   const [loadingAddBtn, setLoadingAddBtn] = useState<boolean>(false);
//   const [loadingAddFile, setLoadingAddFile] = useState<boolean>(false);
//   const [loadingDeleteFileBtn, setLoadingDeleteFileBtn] =
//     useState<boolean>(false);

//   useEffect(() => {
//     getCourse(id);
//   }, [id]);

//   if (loadingUser) {
//     return <Spinner />;
//   }

//   const handleImageCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     if (file) {
//       setFormData((prev) => ({ ...prev, imageCover: file }));
//       setImageCoverPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handelEditCourse = async (e: FormEvent, courseId: string) => {
//     e.preventDefault();

//     const courseData = new FormData();

//     if (formData.imageCover)
//       courseData.append("imageCover", formData.imageCover);

//     if (formData.title) courseData.append("title", formData.title);
//     if (formData.price) courseData.append("price", formData.price.toString());
//     if (formData.description) {
//       courseData.append("description", formData.description);
//     }
//     if (formData.category) courseData.append("category", formData.category);

//     setLoading(true);
//     try {
//       await axios.patch(
//         `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}`,
//         courseData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       showToast("success", "تم تعديل الدورة بنجاح");
//       setFormData({
//         imageCover: course?.imageCover,
//         title: "",
//         price: 0,
//         description: "",
//         category: "",
//       });

//       await getCourse(courseId);
//     } catch (error) {
//       //@ts-expect-error:fix
//       showToast("error", error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handelAddLesson = async (e: FormEvent, id: string) => {
//     e.preventDefault();

//     const lessonData = new FormData();
//     if (lessons.video) {
//       lessonData.append("video", lessons.video);
//     }
//     lessonData.append("lessonTitle", lessons.lessonTitle);

//     setLoadingAddBtn(true);
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${id}`,
//         lessonData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const newLesson = res.data.newLesson;
//       showToast("success", "تم إضافة الدرس بنجاح");

//       setCourse((prevCourse) => {
//         if (!prevCourse) return undefined;
//         return {
//           ...prevCourse,
//           videos: [...(prevCourse.sections[0].videos || []), newLesson],
//         };
//       });
//       setLessons({
//         video: null,
//         lessonTitle: "",
//       });

//       await getCourse(id);

//       setShowEdit(false);
//     } catch (error) {
//       //@ts-expect-error:fix agin
//       showToast("error", error.response.data.message);
//     } finally {
//       setLoadingAddBtn(false);
//     }
//   };

//   const handelDeleteLesson = async (videoId: string) => {
//     setLoadingDeleteBtn(true);
//     try {
//       await axios.delete(
//         `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${id}/videos/${videoId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       showToast("success", "تم حذف الفيديو بنجاح");

//       setCourse((prevCourse) => {
//         if (!prevCourse) return undefined;
//         return {
//           ...prevCourse,
//           videos: [...prevCourse.sections[0].videos.filter((v) => v._id !== v._id)],
//         };
//       });
//       setShowDelete(false);

//       await getCourse(id);
//     } catch (error) {
//       //@ts-expect-error:fix agin
//       showToast("error", error.response.data.message);
//     } finally {
//       setLoadingDeleteBtn(false);
//     }
//   };

//   const handelEditLesson = async (e: FormEvent, videoId: string) => {
//     e.preventDefault();
//     setLoadingEditBtn(true);
//     const lessonData = new FormData();
//     if (editLessons.video) {
//       lessonData.append("video", editLessons.video);
//     }
//     lessonData.append("lessonTitle", editLessons.lessonTitle);

//     try {
//       const res = await axios.patch(
//         `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${id}/videos/${videoId}`,
//         lessonData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const updatedLesson = res.data.updatedLesson;

//       showToast("success", "تم تعديل الدرس بنجاح");

//       setCourse((prevCourse) => {
//         if (!prevCourse) return undefined;
//         return {
//           ...prevCourse,
//           videos: [...(prevCourse.sections[0].videos || []), updatedLesson],
//         };
//       });
//       setEditLessons({
//         video: null,
//         lessonTitle: "",
//       });
//       setShowEdit(false);

//       await getCourse(id);
//     } catch (error) {
//       //@ts-expect-error:fix agin
//       toast.error(error.response.data.message, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         className: "bg-white text-black dark:bg-gray-800 dark:text-white",
//       });
//     } finally {
//       setLoadingEditBtn(false);
//     }
//   };
//   const addFile = async (e: FormEvent, courseId: string) => {
//     e.preventDefault();
//     const fileData = new FormData();

//     if (file.file) {
//       fileData.append("file", file.file);
//     }
//     fileData.append("filename", file.filename);
//     setLoadingAddFile(true);
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}/files`,
//         fileData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const newFile = res.data.file;
//       showToast("success", "تم رفع الملف بنجاح");

//       setCourse((prevCourse) => {
//         if (!prevCourse) return undefined;
//         return {
//           ...prevCourse,
//           files: [...(prevCourse.files || []), newFile],
//         };
//       });

//       setFile({
//         file: null,
//         filename: "",
//       });

//       await getCourse(courseId);
//     } catch (error) {
//       //@ts-expect-error:fix agin
//       showToast("error", error.response.data.message);
//     } finally {
//       setLoadingAddFile(false);
//     }
//   };
//   const deleteFile = async (fileId: string, courseId: string) => {
//     setLoadingDeleteFileBtn(true);
//     try {
//       await axios.delete(
//         `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}/files/${fileId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       showToast("success", "تم حذف الملف بنجاح");

//       setCourse((prevCourse) => {
//         if (!prevCourse) return undefined;
//         return {
//           ...prevCourse,
//           files: [...prevCourse.files.filter((f) => f._id !== f._id)],
//         };
//       });
//       setShowDeleteFile(false);

//       await getCourse(id);
//     } catch (error) {
//       //@ts-expect-error:fix agin
//       showToast("error", error.response.data.message);
//     } finally {
//       setLoadingDeleteFileBtn(false);
//     }
//   };
//   return (
//     <div className="p-6 bg-wygColor shadow-xl rounded-xl shadow-mainColorHoverLight min-h-screen ">
//       {/* Btns */}
//       <div className="w-full flex justify-between">
//         <button
//           onClick={() => {
//             setShowComponent(!showComponent);
//           }}
//           className={`${
//             showComponent ? "border-b-2 border-mainColor" : ""
//           } apply-fonts-normal  w-full py-2 px-4`}
//         >
//           تفاصيل الدورة
//         </button>

//         <button
//           onClick={() => {
//             setShowComponent(!showComponent);
//           }}
//           className={`${
//             showComponent ? "" : "border-b-2 border-mainColor"
//           } apply-fonts-normal  w-full py-2 px-4`}
//         >
//           دروس و ملفات الدورة
//         </button>
//       </div>

//       {showComponent ? (
//         <div className=" p-6  rounded-xl  min-h-screen">
//           <h1 className="text-2xl font-bold mb-4 apply-fonts-normal">
//             تعديل تفاصيل الدورة
//           </h1>
//           <form
//             className="space-y-6 bg-white p-6 rounded "
//             onSubmit={(e) => {
//               handelEditCourse(e, id);
//             }}
//           >
//             {/* صورة الغلاف */}
//             <div className="flex items-center space-x-4">
//               <div className="w-full">
//                 <label
//                   htmlFor="imageCover"
//                   className="block font-medium mb-2 text-gray-700"
//                 >
//                   صورة الغلاف
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="file"
//                     id="imageCover"
//                     accept="image/*"
//                     onChange={handleImageCoverChange}
//                     className="hidden"
//                   />
//                   <label
//                     htmlFor="imageCover"
//                     className="apply-fonts-normal cursor-pointer bg-mainColor text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-mainColorHoverLight transition-colors duration-300"
//                   >
//                     اختر صورة
//                   </label>
//                 </div>
//                 {imageCoverPreview && (
//                   <div className="mt-4">
//                     <p className="text-gray-600 text-sm mb-2 apply-fonts-normal">
//                       معاينة الصورة:
//                     </p>
//                     <Image
//                       src={imageCoverPreview}
//                       alt="صورة الغلاف"
//                       className="w-[500px] h-[322px]   rounded-2xl border-2 "
//                       width={550}
//                       height={550}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* عنوان الدورة */}
//             <div>
//               <label htmlFor="title" className="block font-medium mb-2">
//                 عنوان الدورة
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title || course?.title || ""}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             {/* سعر الدورة */}
//             <div>
//               <label htmlFor="price" className="block font-medium mb-2">
//                 سعر الدورة
//               </label>
//               <input
//                 type="number"
//                 id="price"
//                 name="price"
//                 value={formData.price || course?.price || ""}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             {/* وصف الدورة */}
//             <div>
//               <label htmlFor="description" className="block font-medium mb-2">
//                 وصف الدورة
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description || course?.description || ""}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//                 rows={4}
//               ></textarea>
//             </div>
//             {/* الفئات */}
//             <div>
//               <label htmlFor="category" className="block font-medium mb-2">
//                 الفئة
//               </label>
//               <select
//                 id="category"
//                 name="category"
//                 onChange={handleInputChange}
//                 className="apply-fonts-normal block w-full border rounded p-2"
//               >
//                 <option className="apply-fonts-normal" value="">
//                   {course?.category || "إختر الفئة"}
//                 </option>
//                 <option className="apply-fonts-normal" value="علوم">
//                   علوم
//                 </option>
//                 <option className="apply-fonts-normal" value="فيزياء">
//                   فيزياء
//                 </option>
//                 <option className="apply-fonts-normal" value="رياضيات">
//                   رياضيات
//                 </option>
//                 <option className="apply-fonts-normal" value="أدب">
//                   أدب عربي
//                 </option>
//                 <option className="apply-fonts-normal" value="فلسفة">
//                   فلسفة
//                 </option>
//               </select>
//             </div>

//             {/* زر الإرسال */}
//             <button
//               type="submit"
//               disabled={loading}
//               aria-busy={loading}
//               className={`w-full p-2  text-white font-medium rounded  ${
//                 loading
//                   ? "bg-mainColorHoverLight cursor-not-allowed"
//                   : "bg-mainColor hover:bg-mainColorHoverLight"
//               } hoverEle`}
//             >
//               {loading ? "جاري التعديل ..." : "تعديل "}
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div className=" p-6  ">
//           <h1 className="text-2xl font-bold mb-4 apply-fonts-normal">
//             تعديل دروس الدورة
//           </h1>
//           <section className="space-y-6 bg-white p-6 rounded shadow relative">
//             {/* قائمة الدروس */}
//             <div className=" mx-auto p-4">
//               <h1 className="text-2xl apply-fonts-normal mb-6 ">
//                 قائمة الدروس الحالية
//               </h1>
//               {/*Edit Toggle*/}
//               {showEdit && (
//                 <div className=" bg-black/60 absolute top-0 rounded left-0 w-full h-full px-6 z-10 flex flex-col items-start gap-5">
//                   <button
//                     className="p-3 focus:animate-ping"
//                     onClick={() => {
//                       setShowEdit(!showEdit);
//                     }}
//                   >
//                     <Close className="text-redColor hoverEle hover:text-redColorHoverLight hover:rotate-180 " />
//                   </button>
//                   <form
//                     className="w-full  flex-grow"
//                     onSubmit={(e) => {
//                       handelEditLesson(e, videoId);
//                     }}
//                   >
//                     {/* إسم الدرس */}
//                     <div>
//                       <label
//                         htmlFor="lessonName"
//                         className="apply-fonts-normal block font-medium mb-2 text-white"
//                       >
//                         إسم الدرس الجديد
//                       </label>
//                       <input
//                         type="text"
//                         id="lessonName"
//                         name="lessonName"
//                         onChange={(e) => {
//                           setEditLessons({
//                             ...lessons,
//                             lessonTitle: e.target.value,
//                           });
//                         }}
//                         className="w-full p-2 border rounded"
//                       />
//                     </div>
//                     {/* فيديو الدرس */}
//                     <div className="flex items-center space-x-4">
//                       <div className="w-full">
//                         <label
//                           htmlFor="lessonVideo"
//                           className="block font-medium mb-2 text-white"
//                         >
//                           فيديو الدرس
//                         </label>
//                         <div className="relative">
//                           <input
//                             type="file"
//                             id="lessonVideo"
//                             accept="video/*"
//                             onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                               const video = e.target.files?.[0] || null;
//                               if (video) {
//                                 setEditLessons({
//                                   ...lessons,
//                                   video: video,
//                                 });
//                               }
//                             }}
//                             className="hidden"
//                           />
//                           <label
//                             htmlFor="lessonVideo"
//                             className="cursor-pointer bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
//                           >
//                             اختر فيديو
//                           </label>
//                         </div>
//                         {editLessons.video && (
//                           <p className="mt-5 text-sm text-white">
//                             الفيديو المرفوع: {editLessons.video.name}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                     <button
//                       type="submit"
//                       className={`mt-5 flex gap-3 apply-fonts-normal rounded-lg ${
//                         loadingEditBtn
//                           ? "bg-mainColorHoverLight cursor-not-allowed"
//                           : "bg-mainColor hoverEle hover:bg-mainColorHoverLight"
//                       }  text-white py-2 px-4`}
//                     >
//                       <p>{loadingEditBtn ? "جاري التعديل ..." : "تعديل "} </p>
//                       <Edit />
//                     </button>
//                   </form>
//                 </div>
//               )}
//               {/* Delete Toggle */}
//               {showDelete && (
//                 <div className=" bg-black/60 absolute top-0 rounded left-0 w-full h-full lg:px-16 xs:px-1 sm:px-7  z-10 flex flex-col items-center justify-center gap-5">
//                   {/*  */}
//                   <div className=" bg-white rounded-lg w-full ">
//                     <div className="relative md:py-5 xs:py-3  w-full flex flex-col gap-6 ">
//                       <div className="w-full flex items-center flex-col ">
//                         <ErrorOutline fontSize="large" />
//                         <h1 className="apply-fonts-normal lg:text-lg sm:text-base xs:text-[14px] text-center">
//                           هل أنت متأكد من حذف هذا الدرس ؟
//                         </h1>
//                       </div>
//                       <div className="w-full flex items-center justify-center xs:gap-2 md:gap-5">
//                         <button
//                           className="flex items-center gap-2 group py-2 lg:px-4  xs:px-2 apply-fonts-normal sm:text-base xs:text-[13px] bg-mainColor hover:bg-mainColorHoverLight hoverEle rounded-lg text-white"
//                           onClick={() => {
//                             setShowDelete(!showDelete);
//                           }}
//                         >
//                           <Close className="group-hover:text-redColor hoverEle" />
//                           <p>إغلاق</p>
//                         </button>
//                         <button
//                           onClick={() => {
//                             handelDeleteLesson(videoId);
//                           }}
//                           className={`${
//                             loadingDeleteBtn
//                               ? "bg-redColorHoverLight cursor-not-allowed"
//                               : "bg-redColor hover:bg-redColorHoverLight"
//                           } py-2 lg:px-4 xs:px-2 apply-fonts-normal sm:text-base xs:text-[13px]  hoverEle rounded-lg text-white`}
//                         >
//                           <p>
//                             {loadingDeleteBtn
//                               ? "جاري حذف الدرس ...."
//                               : "نعم، أنا متأكد"}
//                           </p>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="bg-white shadow-md rounded-lg overflow-hidden">
//                 <table className="table-auto w-full overflow-x-scroll">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-2 text-right text-gray-600">
//                         اسم الدرس
//                       </th>
//                       <th className="px-4 py-2 text-right text-gray-600">
//                         رابط الفيديو
//                       </th>
//                       <th className="px-4 py-2 text-right text-gray-600">
//                         المدة
//                       </th>
//                       <th className="px-4 py-2 text-right text-gray-600"></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {course?.sections[0].videos.map((video, index) => (
//                       <tr
//                         key={index}
//                         className={`border-b ${
//                           index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                         }`}
//                       >
//                         <td className="apply-fonts-normal text-[14px] px-4 py-2 text-gray-800">
//                           {video.lessonTitle}
//                         </td>
//                         <td className="px-4 py-2 text-blue-600 underline">
//                           <Link
//                             href={video.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             مشاهدة الفيديو
//                           </Link>
//                         </td>
//                         <td className="px-4 py-2 text-gray-800">
//                           {Math.floor(Number(video.duration) / 60)} دقيقة
//                           {Number(video.duration) % 60} ثانية
//                         </td>

//                         <td className="px-4 py-2 flex justify-center gap-4  ">
//                           <button
//                             onClick={() => {
//                               setShowEdit(!showEdit);
//                               setVideoId(video._id);
//                             }}
//                             className="flex gap-1 apply-fonts-normal text-white bg-mainColor hover:bg-mainColorHoverLight hoverEle px-4 py-2 rounded-md"
//                           >
//                             <Edit />
//                             <p>تعديل</p>
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setShowDelete(!showDelete);
//                               setVideoId(video._id);
//                             }}
//                             className={` bg-redColor hover:bg-redColorHoverLight flex gap-1 apply-fonts-normal text-white  hoverEle px-4 py-2 rounded-md`}
//                           >
//                             <DeleteOutline />
//                             <p>حذف</p>
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* add new lesson */}
//             <form
//               onSubmit={(e) => {
//                 handelAddLesson(e, id);
//               }}
//             >
//               {/* اسم الدرس */}
//               <div>
//                 <label
//                   htmlFor="lessonName"
//                   className="apply-fonts-normal block font-medium mb-2"
//                 >
//                   اسم الدرس
//                 </label>
//                 <input
//                   type="text"
//                   id="lessonName"
//                   name="lessonName"
//                   onChange={(e) =>
//                     setLessons({
//                       ...lessons,
//                       lessonTitle: e.target.value,
//                     })
//                   }
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               {/* فيديو الدرس */}
//               <div className="flex items-center space-x-4">
//                 <div className="w-full">
//                   <label
//                     htmlFor="lessonVideo"
//                     className="block font-medium mb-2 text-gray-700"
//                   >
//                     فيديو الدرس
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="file"
//                       id="lessonVideo"
//                       accept="video/*"
//                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                         const video = e.target.files?.[0] || null;
//                         if (video) {
//                           setLessons({
//                             ...lessons,
//                             video: video,
//                           });
//                         }
//                       }}
//                       className="hidden"
//                     />
//                     <label
//                       htmlFor="lessonVideo"
//                       className="cursor-pointer bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
//                     >
//                       اختر فيديو
//                     </label>
//                   </div>
//                   {lessons.video && (
//                     <p className="mt-5 text-sm text-gray-500">
//                       الفيديو المرفوع: {lessons.video.name}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               {/* زر إضافة الدرس */}
//               <button
//                 type="submit"
//                 className={`mt-4 p-2  text-white font-medium rounded  ${
//                   loadingAddBtn
//                     ? "bg-mainColorHoverLight cursor-not-allowed"
//                     : "bg-mainColor hover:bg-mainColorHoverLight"
//                 } hoverEle`}
//               >
//                 {loadingAddBtn ? "جاري الإضافة ..." : "إضافة "}
//               </button>
//             </form>

//             {/* قائمة الملفات */}
//             <div className=" mx-auto p-4">
//               <h1 className="text-2xl apply-fonts-normal mb-6 ">
//                 قائمة الملفات الحالية
//               </h1>
//               {/* Delete File Toggle */}
//               {showDeleteFile && (
//                 <div className=" bg-black/60 absolute top-0 rounded left-0 w-full h-full lg:px-16 xs:px-1 sm:px-7  z-10 flex flex-col items-center justify-center gap-5">
//                   {/*  */}
//                   <div className=" bg-white rounded-lg w-full ">
//                     <div className="relative md:py-5 xs:py-3  w-full flex flex-col gap-6 ">
//                       <div className="w-full flex items-center flex-col ">
//                         <ErrorOutline fontSize="large" />
//                         <h1 className="apply-fonts-normal lg:text-lg sm:text-base xs:text-[14px] text-center">
//                           هل أنت متأكد من حذف هذا الملف ؟
//                         </h1>
//                       </div>
//                       <div className="w-full flex items-center justify-center xs:gap-2 md:gap-5">
//                         <button
//                           className="flex items-center gap-2 group py-2 lg:px-4  xs:px-2 apply-fonts-normal sm:text-base xs:text-[13px] bg-mainColor hover:bg-mainColorHoverLight hoverEle rounded-lg text-white"
//                           onClick={() => {
//                             setShowDeleteFile(!showDeleteFile);
//                           }}
//                         >
//                           <Close className="group-hover:text-redColor hoverEle" />
//                           <p>إغلاق</p>
//                         </button>
//                         <button
//                           onClick={() => {
//                             deleteFile(fileId, id);
//                           }}
//                           className={`${
//                             loadingDeleteFileBtn
//                               ? "bg-redColorHoverLight cursor-not-allowed"
//                               : "bg-redColor hover:bg-redColorHoverLight"
//                           } py-2 lg:px-4 xs:px-2 apply-fonts-normal sm:text-base xs:text-[13px]  hoverEle rounded-lg text-white`}
//                         >
//                           <p>
//                             {loadingDeleteFileBtn
//                               ? "جاري حذف الدرس ...."
//                               : "نعم، أنا متأكد"}
//                           </p>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="bg-white shadow-md rounded-lg overflow-hidden">
//                 <table className="table-auto w-full overflow-x-scroll">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-2 text-right text-gray-600">
//                         اسم الملف
//                       </th>
//                       <th className="px-4 py-2 text-right text-gray-600">
//                         رابط الملف
//                       </th>
//                       <th className="px-4 py-2 text-right text-gray-600">
//                         حجم الملف
//                       </th>
//                       <th className="px-4 py-2 text-right text-gray-600"></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {course?.files.map((file, index) => (
//                       <tr
//                         key={index}
//                         className={`border-b ${
//                           index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                         }`}
//                       >
//                         <td className="apply-fonts-normal text-[14px] px-4 py-2 text-gray-800">
//                           {file.filename}
//                         </td>
//                         <td className="px-4 py-2 text-blue-600 underline">
//                           <a href={file.url} download target="_blank">
//                             الملف
//                           </a>
//                         </td>
//                         <td className="px-4 py-2 text-gray-600 ">
//                           <p>{file.size}Kb</p>
//                         </td>

//                         <td className="px-4 py-2 flex justify-center gap-4  ">
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setShowDeleteFile(!showDeleteFile);
//                               setFileId(file._id);
//                             }}
//                             className={` bg-redColor hover:bg-redColorHoverLight flex gap-1 apply-fonts-normal text-white  hoverEle px-4 py-2 rounded-md`}
//                           >
//                             <DeleteOutline />
//                             <p>حذف</p>
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             {/* ملفات PDF */}
//             <form
//               className="flex gap-3 space-x-4 flex-col items-start"
//               onSubmit={(e) => {
//                 addFile(e, id);
//               }}
//             >
//               <h1 className="apply-fonts-normal ">رفع ملفات PDF</h1>
//               {/* إسم الملف  */}
//               <div className="w-full flex flex-col gap-4">
//                 <label htmlFor="pdfFiles" className="apply-fonts-normal ">
//                   إسم الملف
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={file.filename}
//                     onChange={(e) => {
//                       setFile({
//                         ...file,
//                         filename: e.target.value,
//                       });
//                     }}
//                     className="bg-wygColor w-full py-2 px-3 rounded-md "
//                     placeholder="أكتب إسم الملف"
//                   />
//                 </div>
//               </div>
//               {/* الملف */}

//               <div className="relative w-full mt-6">
//                 <input
//                   type="file"
//                   id="pdfFiles"
//                   accept=".docx, .pdf"
//                   multiple
//                   onChange={(e) => {
//                     if (e.target.files) {
//                       setFile({
//                         ...file,
//                         file: e.target.files[0],
//                       });
//                     }
//                   }}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="pdfFiles"
//                   className="cursor-pointer bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300"
//                 >
//                   إرفع الملف
//                 </label>
//               </div>

//               <button
//                 className={`py-2 px-3 ${
//                   loadingAddFile
//                     ? "bg-mainColorHoverLight cursor-not-allowed"
//                     : "bg-mainColor hover:bg-mainColorHoverLight"
//                 } hoverEle rounded-lg text-white apply-fonts-normal`}
//               >
//                 {loadingAddFile ? "جاري الإضافة ..." : "إضافة الملف"}
//               </button>
//             </form>
//           </section>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditCourse;
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  BookOpen,
  ImageIcon,
  DollarSign,
  Tag,
  FileText,
  Plus,
  Trash2,
  Edit3,
  Video,
  File,
  Link,
  Save,
  Eye,
  Upload,
  Settings,
  PlayCircle,
  FolderOpen,
  X,
  Loader2,
} from "lucide-react";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/userStore";
import { Course, File as FileType, Section } from "@/types/course";
import Image from "next/image";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import showToast from "@/utils/showToast";
interface CourseDetails {
  imageCover: any;
  title: string;
  price: number;
  description: string;
  category: string;
  concepts: string[];
}
type Lesson = {
  lessonTitle: string;
  video: File | null;
};
type file = {
  filename: string;
  file: File | null;
};
const CourseEditPage = ({ id }: { id: string }) => {
  const token = Cookies.get("token");
  const loadingUser = useUserStore((state) => state.loading);

  const [course, setCourse] = useState<Course>();
  const [sections, setSections] = useState<Section[]>([]);
  const [concepts, setConcepts] = useState<string[]>([]);
  const [files, setFiles] = useState<FileType[]>([]);
  const [editeCourseLoading, setEditeCourseLoading] = useState<boolean>(false);
  // Section
  const [addSectionLoading, setAddSectionLoading] = useState<boolean>(false);
  const [showSectionModal, setShowSectionModal] = useState<boolean>(false);
  const [newSectionTitle, setNewSectionTitle] = useState<string>("");
  // Videos
  const [addVideoLoading, setAddVideoLoading] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [newVideoTitle, setNewVideoTitle] = useState<string>("");
  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
  const [currentSectionId, setCurrentSectionId] = useState<string>("");
  // for showing the image cover of course
  const [imageCoverPreview, setImageCoverPreview] = useState<string | null>(
    null
  );
  const handleImageCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setCourseData((prev) => ({ ...prev, imageCover: file }));
      setImageCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const getCourse = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${id}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();
    setCourse(data.course);
    setCourseData(data.course);
    setSections(data.course.sections);
    setConcepts(data.course.concepts);
    setFiles(data.course.files);

    setImageCoverPreview(data.course.imageCover);
  };
  const [activeTab, setActiveTab] = useState("details");
  const [courseData, setCourseData] = useState<CourseDetails>({
    title: "",
    description: "",
    price: 0,
    category: "",
    imageCover: "",
    concepts: [],
  });

  const [newConcept, setNewConcept] = useState("");

  const tabs = [
    { id: "details", label: "تفاصيل الكورس", icon: BookOpen },
    { id: "sections", label: "الأقسام والفيديوهات", icon: Video },
    { id: "files", label: "الملفات", icon: File },
  ];

  const categories = [
    { value: "programming", label: "البرمجة" },
    { value: "design", label: "التصميم" },
    { value: "marketing", label: "التسويق" },
    { value: "business", label: "الأعمال" },
  ];

  const addConcept = () => {
    if (newConcept.trim()) {
      setConcepts([...concepts, newConcept.trim()]);
      setNewConcept("");
    }
  };

  const removeConcept = (index: number) => {
    setConcepts(concepts.filter((_, i) => i !== index));
  };
  // I can Replace this two functions to one fuc => !showSectionModal
  const openSectionModal = () => {
    setShowSectionModal(true);
  };
  const closeSectionModal = () => {
    setShowSectionModal(false);
  };
  const addSection = async () => {
    setAddSectionLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${course?._id}`,
        {
          sectionTitle: newSectionTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // تحديث قائمة الأقسام بالقسم الجديد
      setSections(
        response.data.sections || [...sections, response.data.section]
      );
      setNewSectionTitle("");
      closeSectionModal();
      showToast("success", "تم إضافة القسم بنجاح");
    } catch (error) {
      console.error("خطأ في إضافة القسم:", error);
      showToast("error", "حدث خطأ في إضافة القسم");
    } finally {
      setAddSectionLoading(false);
    }
  };
  // videos
  const openVideoModal = () => {
    setShowVideoModal(true);
  };
  const closeVideoModal = () => {
    setShowVideoModal(false);
  };
  const handleVideoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewVideoFile(file);
  };
  const addVideo = async () => {
    if (!newVideoTitle.trim()) {
      showToast("error", "يرجى إدخال عنوان للفيديو");
      return;
    }

    if (!newVideoFile) {
      showToast("error", "يرجى اختيار ملف الفيديو");
      return;
    }

    setAddVideoLoading(true);
    try {
      const formData = new FormData();
      formData.append("lessonTitle", newVideoTitle.trim());
      formData.append("video", newVideoFile);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${course?._id}/sections/${currentSectionId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // تحديث قائمة الأقسام بالفيديو الجديد
      setSections(
        response.data.sections ||
          sections.map((section) =>
            section._id === currentSectionId
              ? { ...section, videos: [...section.videos, response.data.video] }
              : section
          )
      );

      showToast("success", "تم إضافة الفيديو بنجاح");
      closeVideoModal();
    } catch (error) {
      console.error("خطأ في إضافة الفيديو:", error);
      showToast("error", "حدث خطأ في إضافة الفيديو");
    } finally {
      setAddVideoLoading(false);
    }
  };

  const addFile = () => {
    setFiles([
      ...files,
      {
        id: Date.now(),
        title: "ملف جديد",
        url: "",
      },
    ]);
  };
  const handleEditCourse = async () => {
    setEditeCourseLoading(true);
    const formData = new FormData();
    formData.append("title", courseData?.title);
    formData.append("description", courseData?.description);
    formData.append("price", courseData?.price.toString());
    formData.append("category", courseData?.category);
    if (courseData?.imageCover) {
      formData.append("imageCover", courseData?.imageCover);
    }
    concepts.map((concept, index) => {
      formData.append(`concepts[${index}]`, concept);
    });

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${course?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourse(res.data.course);
      setCourseData(res.data.course);
      showToast("success", res.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setEditeCourseLoading(false);
    }
  };
  useEffect(() => {
    getCourse(id);
  }, [id]);

  //   if (loadingUser) {
  //     return <Spinner />;
  //   }
  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                تعديل الكورس
              </h1>
              <p className="text-gray-600">إدارة وتعديل محتوى الكورس بسهولة</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className={`flex items-center gap-2  text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg
                  ${
                    editeCourseLoading
                      ? "bg-mainColorHoverLight cursor-not-allowed"
                      : "bg-mainColor hover:bg-mainColorHoverLight cursor-pointer"
                  }
                  `}
                onClick={handleEditCourse}
              >
                {editeCourseLoading ? (
                  <Loader2
                    className="animate-spin text-center w-full"
                    size={22}
                  />
                ) : (
                  <>
                    <Save size={22} />
                    <p>حفظ الغييرات</p>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="flex border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-medium transition-all duration-300 border-b-2 ${
                    activeTab === tab.id
                      ? "border-[#3D45EE] text-[#3D45EE] bg-[#B9BCFF]/20"
                      : "border-transparent text-[#6E7485] hover:text-[#3D45EE] hover:bg-[#F3F3F3]"
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-lg shadow-sm border">
          {/* تفاصيل الكورس */}
          {activeTab === "details" && (
            <div className="p-8 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#B9BCFF]/30 rounded-lg">
                  <BookOpen className="text-[#3D45EE]" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  تفاصيل الكورس
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* العمود الأيسر */}
                <div className="space-y-6">
                  {/* العنوان */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Edit3 size={16} />
                      عنوان الكورس
                    </label>
                    <input
                      type="text"
                      value={courseData.title || course?.title || ""}
                      onChange={handleInputChange}
                      name="title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D45EE] focus:border-transparent transition-all duration-300"
                      placeholder="أدخل عنوان الكورس"
                    />
                  </div>

                  {/* الوصف */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <FileText size={16} />
                      وصف الكورس
                    </label>
                    <textarea
                      value={
                        courseData.description || course?.description || ""
                      }
                      onChange={handleInputChange}
                      name="description"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D45EE] focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="أدخل وصف مفصل للكورس"
                    />
                  </div>

                  {/* السعر والفئة */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <DollarSign size={16} />
                        السعر (DZD)
                      </label>
                      <input
                        type="number"
                        value={courseData.price || course?.price || ""}
                        onChange={handleInputChange}
                        name="price"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D45EE] focus:border-transparent transition-all duration-300"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Tag size={16} />
                        الفئة
                      </label>
                      <select
                        value={courseData.category || course?.category || ""}
                        onChange={handleInputChange}
                        name="category"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D45EE] focus:border-transparent transition-all duration-300"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* العمود الأيمن */}
                <div className="space-y-6">
                  {/* صورة الكورس */}
                  <div>
                    <label className="flex flex-col border-2 border-dashed cursor-pointer border-gray-300 rounded-lg p-8 text-center hover:border-[#3D45EE] transition-colors duration-300">
                      <Upload
                        className="mx-auto mb-4 text-gray-400"
                        size={48}
                      />
                      <p className="text-gray-600 mb-2">
                        اسحب الصورة هنا أو انقر للاختيار
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageCoverChange}
                      />
                      {/* <button className="bg-[#3D45EE] text-white px-4 py-2 rounded-lg hover:bg-[#2E36C0] transition-colors duration-300">
                        اختيار صورة
                      </button> */}
                    </label>
                  </div>
                  {/* معاينة الصورة */}
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
                  {/* المفاهيم */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Settings size={16} />
                      مفاهيم الكورس
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newConcept}
                        onChange={(e) => setNewConcept(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D45EE] focus:border-transparent transition-all duration-300"
                        placeholder="أضف مفهوم جديد"
                      />
                      <button
                        onClick={addConcept}
                        className="bg-[#45DA10] text-white px-4 py-2 rounded-lg hover:bg-[#3BC50C] transition-colors duration-300"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {concepts.length > 0 ? (
                        concepts.map((concept, index) => (
                          <span
                            key={index}
                            className="bg-[#B9BCFF]/30 text-[#3D45EE] px-3 py-1 rounded-full text-sm flex items-center gap-2 group hover:bg-[#B9BCFF]/50 transition-colors duration-300"
                          >
                            {concept}
                            <button
                              onClick={() => removeConcept(index)}
                              className="text-[#3D45EE] hover:text-[#EE3D45] transition-colors duration-300"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))
                      ) : (
                        <>
                          <h1>لا توجد أي مفاهيم</h1>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* الأقسام والفيديوهات */}
          {activeTab === "sections" && (
            <div className="p-8 animate-fadeIn">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FF6636]/10 rounded-lg">
                    <Video className="text-[#FF6636]" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    الأقسام والفيديوهات
                  </h2>
                </div>
                <button
                  onClick={openSectionModal}
                  // disabled={addSectionLoading}
                  className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    addSectionLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#FF6636] hover:bg-[#E55529]"
                  }`}
                >
                  {addSectionLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                  {addSectionLoading ? "جاري الإضافة..." : "إضافة قسم"}
                </button>
              </div>

              <div className="space-y-6">
                {sections.map((section) => (
                  <div
                    key={section._id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 px-6 py-4 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FolderOpen className="text-[#FF6636]" size={20} />
                          <input
                            type="text"
                            value={section.title}
                            className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#3D45EE] rounded px-2 py-1"
                            placeholder="عنوان القسم"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={()=>{
                              openVideoModal()
                              setCurrentSectionId(section._id)
                            }}
                            className="flex items-center gap-2 bg-[#45DA10] hover:bg-[#3BC50C] text-white px-3 py-2 rounded-lg transition-colors duration-300"
                          >
                            <Plus size={16} />
                            إضافة فيديو
                          </button>
                          <button className="text-[#EE3D45] hover:text-[#FF5F68] p-2 rounded-lg hover:bg-red-50 transition-colors duration-300">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="space-y-3">
                        {section.videos.map((video) => (
                          <div
                            key={video._id}
                            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
                          >
                            <PlayCircle
                              className="text-[#3D45EE] flex-shrink-0"
                              size={20}
                            />
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                type="text"
                                value={video.lessonTitle}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D45EE] focus:border-transparent transition-all duration-300"
                                placeholder="عنوان الدرس"
                              />
                              <a
                                href={video.url}
                                target="_blank"
                                className="flex gap-2"
                              >
                                <button className="bg-[#0DC7B1] hover:bg-[#0BB5A0] text-white px-4 py-3 rounded-lg transition-colors duration-300">
                                  <Link size={16} />
                                </button>
                              </a>
                            </div>
                            <button className="text-[#EE3D45] hover:text-[#FF5F68] p-2 rounded-lg hover:bg-red-50 transition-colors duration-300">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        {section.videos.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <Video className="mx-auto mb-2" size={32} />
                            <p>لا توجد فيديوهات في هذا القسم</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {sections.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <FolderOpen className="mx-auto mb-4" size={48} />
                    <p className="text-lg mb-2">لا توجد أقسام بعد</p>
                    <p className="text-sm">
                      انقر على "إضافة قسم" لبدء إنشاء محتوى الكورس
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* الملفات */}
          {activeTab === "files" && (
            <div className="p-8 animate-fadeIn">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#0DC7B1]/10 rounded-lg">
                    <File className="text-[#0DC7B1]" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    ملفات الكورس
                  </h2>
                </div>
                <button
                  onClick={addFile}
                  className="flex items-center gap-2 bg-[#0DC7B1] hover:bg-[#0BB5A0] text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Plus size={20} />
                  إضافة ملف
                </button>
              </div>

              <div className="space-y-4">
                {files?.map((file) => (
                  <div
                    key={file._id}
                    className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="p-2 bg-[#0DC7B1]/10 rounded-lg group-hover:bg-[#0DC7B1]/20 transition-colors duration-300">
                      <File className="text-[#0DC7B1]" size={20} />
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={file.filename}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0DC7B1] focus:border-transparent transition-all duration-300"
                        placeholder="عنوان الملف"
                      />
                      <a href={file.url} target="_blank" className="flex gap-2">
                        <button className="bg-[#0DC7B1] hover:bg-[#0BB5A0] text-white px-4 py-3 rounded-lg transition-colors duration-300">
                          <Link size={16} />
                        </button>
                      </a>
                    </div>
                    <button className="text-[#EE3D45] hover:text-[#FF5F68] p-2 rounded-lg hover:bg-red-50 transition-colors duration-300 opacity-0 group-hover:opacity-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {files.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <File className="mx-auto mb-4" size={48} />
                    <p className="text-lg mb-2">لا توجد ملفات بعد</p>
                    <p className="text-sm">
                      انقر على "إضافة ملف" لإضافة ملفات مساعدة للكورس
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Section Modal */}
        {showSectionModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md transform animate-modal">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FF6636]/10 rounded-lg">
                    <FolderOpen className="text-[#FF6636]" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    إضافة قسم جديد
                  </h3>
                </div>
                <button
                  onClick={closeSectionModal}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <Edit3 size={16} />
                    عنوان القسم
                  </label>
                  <input
                    type="text"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6636] focus:border-transparent transition-all duration-300"
                    placeholder="أدخل عنوان القسم"
                    autoFocus
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !addSectionLoading) {
                        addSection();
                      }
                    }}
                  />
                  <p className="text-gray-500 text-xs mt-2">
                    سيتم إضافة هذا القسم إلى الكورس ويمكنك إضافة الفيديوهات إليه
                    لاحقاً
                  </p>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center gap-3 justify-end">
                  <button
                    onClick={closeSectionModal}
                    disabled={addSectionLoading}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={addSection}
                    disabled={addSectionLoading || !newSectionTitle.trim()}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      addSectionLoading || !newSectionTitle.trim()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#FF6636] hover:bg-[#E55529] text-white shadow-lg"
                    }`}
                  >
                    {addSectionLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        جاري الإضافة...
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        إضافة القسم
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showVideoModal && (
          <div className="border fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex  items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md transform animate-modal p-4">
              {/* Video Title Input */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <Edit3 size={16} />
                  عنوان الفيديو
                </label>
                <input
                  type="text"
                  value={newVideoTitle}
                  onChange={(e) => {
                    setNewVideoTitle(e.target.value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6636] focus:border-transparent transition-all duration-300"
                  placeholder="أدخل عنوان الفيديو"
                  autoFocus
                />
              </div>

              {/* Video File Upload */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <Upload size={16} />
                  ملف الفيديو
                </label>
                <label
                  className={`
                flex flex-col items-center justify-center w-full h-32 
                border-2 border-dashed rounded-lg 
                cursor-pointer transition-all duration-300
                ${
                  addVideoLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-[#FF6636] hover:bg-[#FF6636]/5"
                }
                ${
                  newVideoFile?.name
                    ? "border-[#FF6636] bg-[#FF6636]/5"
                    : "border-gray-300 bg-gray-50"
                }
              `}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload
                      className={`mb-3 ${
                        newVideoFile?.name ? "text-[#FF6636]" : "text-gray-400"
                      }`}
                      size={24}
                    />
                    {newVideoFile?.name ? (
                      <p className="text-sm text-gray-600">
                        {newVideoFile?.name}
                      </p>
                    ) : (
                      <>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">اضغط للرفع</span> أو
                          اسحب وأفلت
                        </p>
                        <p className="text-xs text-gray-500">
                          MP4, WebM أو AVI
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleVideoFileChange}
                    accept="video/*"
                    disabled={addVideoLoading}
                  />
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={closeVideoModal}
                  disabled={addVideoLoading}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  إلغاء
                </button>
                <button
                  onClick={addVideo}
                  disabled={addVideoLoading}
                  className={`
                flex items-center gap-2 px-6 py-2 rounded-lg 
                transition-all duration-300 transform hover:scale-105
                ${
                  !newVideoTitle.trim() || !newVideoFile
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#FF6636] hover:bg-[#E55529] text-white shadow-lg"
                }
              `}
                >
                  {addVideoLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      جاري الإضافة...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      إضافة الفيديو
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modal {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-modal {
          animation: modal 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CourseEditPage;
