"use client";
import {
  DescriptionOutlined,

  People,
  Star,
  Download,
  FilePresent,
  Comment,
  Schedule,
} from "@mui/icons-material";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import CourseCardDetails from "./CourseCardDetails";
import { Course } from "@/types/course";
import { useUserStore } from "@/store/userStore";
import Spinner from "../spinner/Spinner";
import { useLesson } from "@/store/lessonStore";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import { Reply } from "./comments and replies/Reply";
import AddComment from "./comments and replies/AddComment";
import AddReply from "./comments and replies/AddReply";
import VideoPlayer from "./VideoPlayer";

type Props = {
  course: Course;
};

const CoursePage = ({ course }: Props) => {
  const { lesson, setLesson } = useLesson();

  const [isEnrolled, setIsEnrolled] = useState<boolean | undefined>(undefined);
  const [isPublichedCourse, setIsPublichedCourse] = useState<
    boolean | undefined
  >(undefined);
  const [showAllFiles, setShowAllFiles] = useState(false);

  const checkIsEnrolledCourse = (
    userId: string,
    course: Course | undefined
  ) => {
    return course?.enrolledStudents.some((s) => s === userId);
  };

  const { user } = useUserStore();

  //set first lesson from first section
  useEffect(() => {
    if (course?.sections && course.sections.length > 0) {
      const firstSection = course.sections[0];
      if (firstSection.videos && firstSection.videos.length > 0) {
        setLesson(
          firstSection.videos[0] || {
            _id: "",
            lessonTitle: "",
            url: "",
            duration: "0",
            isCompleted: false,
            completedBy: [],
            comments: [],
            description: "",
            files: [],
          }
        );
      }
    }
  }, [setLesson, course]);

  useEffect(() => {
    const checkIsPublichedCourse = (
      userId: string,
      course: Course | undefined
    ) => {
      return (
        course?.instructor._id === userId &&
        user.publishedCourses.some((c) => c._id === course?._id)
      );
    };
    if (user._id && course) {
      const enrollmentStatus = checkIsEnrolledCourse(user._id, course);
      setIsEnrolled(enrollmentStatus);
      const publichedStatus = checkIsPublichedCourse(user._id, course);
      setIsPublichedCourse(publichedStatus);
    }
  }, [user, course]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return (
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-xs font-bold">
            PDF
          </div>
        );
      case "doc":
      case "docx":
        return (
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold">
            DOC
          </div>
        );
      case "ppt":
      case "pptx":
        return (
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-xs font-bold">
            PPT
          </div>
        );
      case "zip":
      case "rar":
        return (
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-xs font-bold">
            ZIP
          </div>
        );
      default:
        return <FilePresent className="w-12 h-12 text-gray-400" />;
    }
  };

  //add spinner
  if (isEnrolled === undefined || isPublichedCourse === undefined) {
    return <Spinner />;
  }
  console.log("isEnrolled :", isEnrolled);
  console.log("isPublichedCourse :", isPublichedCourse);

  //check is user logged in
  // if (!user._id) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center p-4">
  //       <div className="max-w-md w-full">
  //         <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-200 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
  //           <div className="text-center mb-6">
  //             <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
  //               <LoginOutlined className="text-white text-3xl" />
  //             </div>
  //             <h2 className="apply-fonts-medium text-2xl text-amber-800 mb-2">
  //               مرحباً بك!
  //             </h2>
  //             <p className="apply-fonts-normal text-amber-700 leading-relaxed">
  //               يرجى تسجيل الدخول للاستمتاع بمحتوى الدورة التدريبية والاستفادة
  //               من جميع المميزات المتاحة.
  //             </p>
  //           </div>
  //           <Link
  //             href={"/login"}
  //             className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
  //           >
  //             <LoginOutlined />
  //             <span>تسجيل الدخول</span>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  //check is user buying course
  if (user.role === "student" && !isEnrolled) {
    redirect(`/course-overview/${course._id}`);
  }

  // check is the course uploaded by teacher
  if (user.role === "teacher" && !isPublichedCourse) {
    redirect(`/dashboard-teacher/courses`);
  }

  return (
    <div className="min-h-screen relative">
      <div className="flex flex-row-reverse justify-between gap-8 p-4 max-w-[2000px] mx-auto">
        {/* Course Details Sidebar */}
        <CourseCardDetails
          courseId={course?._id}
          userId={user._id}
          sections={course?.sections}
        />

        {/* Main Content */}
        <div className="flex-1 lg:max-w-4xl mx-auto space-y-8">
          {/* Video Player Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
            <div className="relative">
              <VideoPlayer videoId={lesson?.url} />
              {/* Video Overlay Info */}
              {/* <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg flex items-center gap-2">
                <PlayCircleFilledWhite className="text-sm" />
                <span className="text-sm font-medium">جاري التشغيل</span>
              </div> */}
            </div>

            {/* Video Title & Meta */}
            <div className="p-6">
              <h1 className="apply-fonts-medium text-2xl lg:text-3xl text-gray-800 mb-4 leading-tight">
                {lesson?.lessonTitle}
              </h1>

              {/* Stats Row */}
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                {/* Students Count */}
                <div className="flex items-center gap-4">
                  {/* <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border-3 border-white bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg"
                      ></div>
                    ))}
                  </div> */}
                  <div className="text-center">
                    <div className="flex items-center gap-2">
                      <People className="text-blue-600" />
                      <span className="font-bold text-xl text-gray-800">
                        {course?.enrolledStudents.length}
                      </span>
                    </div>
                    <span className="apply-fonts-normal text-sm text-gray-600">
                      طالب مسجل
                    </span>
                  </div>
                </div>

                {/* Reviews Count */}
                <div className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <Star className="text-amber-500" />
                    <span className="font-bold text-xl text-gray-800">
                      {course?.reviews.length}
                    </span>
                  </div>
                  <span className="apply-fonts-normal text-sm text-gray-600">
                    تقييم
                  </span>
                </div>

                {/* Duration */}
                <div className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <Schedule className="text-green-500" />
                    <span className="font-bold text-xl text-gray-800">
                      {lesson.duration}
                    </span>
                  </div>
                  <span className="apply-fonts-normal text-sm text-gray-600">
                    دقيقة
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Description */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <DescriptionOutlined className="text-white text-lg" />
              </div>
              <h2 className="apply-fonts-medium text-xl lg:text-2xl text-gray-800">
                وصف الدرس
              </h2>
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl p-6 border-r-4 border-blue-500">
              <p className="apply-fonts-normal text-gray-700 leading-relaxed text-lg">
                {lesson.description || "لا يوجد وصف متاح لهذا الدرس حالياً."}
              </p>
            </div>
          </div>

          {/* Lesson Files */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <FilePresent className="text-white text-lg" />
                </div>
                <h2 className="apply-fonts-medium text-xl lg:text-2xl text-gray-800">
                  ملفات الدرس
                </h2>
              </div>
              {lesson?.files && lesson.files.length > 3 && (
                <button
                  onClick={() => setShowAllFiles(!showAllFiles)}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {showAllFiles
                    ? "إظهار أقل"
                    : `عرض الكل (${lesson.files.length})`}
                </button>
              )}
            </div>

            <div className="space-y-3">
              {lesson?.files && lesson.files.length > 0 ? (
                <>
                  {(showAllFiles ? lesson.files : lesson.files.slice(0, 3)).map(
                    (file, index) => (
                      <div
                        key={file._id}
                        className="group bg-gradient-to-r from-gray-50 to-blue-50/30 hover:from-blue-50 hover:to-purple-50/50 rounded-xl p-4 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              {getFileIcon(file.filename)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-800 truncate group-hover:text-blue-800 transition-colors">
                                {file.filename}
                              </h3>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-sm text-gray-500">
                                  {formatFileSize(Number(file.size))}
                                </span>
                                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                  ملف {index + 1}
                                </span>
                              </div>
                            </div>
                          </div>

                          <a
                            href={file.url}
                            target="_blank"
                            download={true}
                            className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
                          >
                            <Download className="text-sm" />
                            <span className="apply-fonts-normal">تحميل</span>
                          </a>
                        </div>
                      </div>
                    )
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FilePresent className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="apply-fonts-normal text-gray-600 font-medium">
                    لا توجد ملفات متاحة
                  </h3>
                  <p className="apply-fonts-normal text-gray-400 text-sm mt-1">
                    لم يتم رفع أي ملفات لهذا الدرس بعد
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white/80   rounded-2xl shadow-xl p-6 border border-white/50 ">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Comment className="text-white text-lg" />
              </div>
              <h2 className="apply-fonts-medium text-xl lg:text-2xl text-gray-800">
                التعليقات
              </h2>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">
                {lesson?.comments.length}
              </div>
            </div>

            <div className="space-y-6 ">
              {lesson?.comments && lesson.comments.length > 0 ? (
                <>
                  {lesson.comments.map((comment, index) => (
                    <div
                      key={comment._id}
                      id={comment._id}
                      className="group bg-gradient-to-r from-white to-gray-50/50 rounded-2xl border border-gray-200/50 hover:border-purple-300/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden "
                    >
                      {/* Comment Header */}
                      <div className="bg-gradient-to-r from-gray-50 to-purple-50/30 p-4 border-b border-gray-200/50">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-0.5">
                              <Image
                                src={
                                  comment.user.thumbnail || "/imgs/logoImg.png"
                                }
                                alt="user-avatar"
                                width={48}
                                height={48}
                                className="w-full h-full rounded-full object-cover bg-white"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold text-gray-800">
                                {comment.user.username}
                              </h3>
                              <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">
                                طالب
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                تعليق #{index + 1}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>
                                {new Date(comment.createdAt).toLocaleDateString(
                                  "ar-SA"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Comment Content */}
                      <div className="p-4">
                        <div className=" rounded-xl p-4 border-r-4 border-gradient-to-b ">
                          <p
                            className="apply-fonts-normal text-gray-700 leading-relaxed"
                            dir="rtl"
                          >
                            {comment.text}
                          </p>
                        </div>
                      </div>

                      {/* Reply Section */}
                      <div className="px-4 pb-4  ">
                        {user.role !== "student" && (
                          <div className="mb-3 relative">
                            <AddReply commentId={comment._id} />
                          </div>
                        )}

                        {comment.replies && comment.replies.length > 0 && (
                          <div className="bg-gray-50/50 rounded-xl p-3 mt-3">
                            <Reply replys={comment.replies} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Comment className="text-purple-400 text-3xl" />
                  </div>
                  <h3 className="apply-fonts-normal text-gray-600 text-xl font-medium mb-2">
                    لا توجد تعليقات بعد
                  </h3>
                  <p className="apply-fonts-normal text-gray-400">
                    كن أول من يشارك رأيه حول هذا الدرس الرائع
                  </p>
                </div>
              )}
            </div>

            {/* Add Comment Section */}
            {user.role === "student" && (
              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <AddComment courseId={course._id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

// the old component
// "use client";
// import { DescriptionOutlined, LoginOutlined } from "@mui/icons-material";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import CourseCardDetails from "./CourseCardDetails";
// import { Course } from "@/types/course";
// import { useUserStore } from "@/store/userStore";
// import Link from "next/link";
// import Spinner from "../spinner/Spinner";
// import { useLesson } from "@/store/lessonStore";
// import "react-toastify/dist/ReactToastify.css";
// import { redirect, usePathname } from "next/navigation";
// import { Reply } from "./comments and replies/Reply";
// import AddComment from "./comments and replies/AddComment";
// import AddReply from "./comments and replies/AddReply";
// import VideoPlayer from "./VideoPlayer";
// type Props = {
//   course: Course;
// };
// const CoursePage = ({ course }: Props) => {
//   const { lesson, setLesson } = useLesson();

//   const [isEnrolled, setIsEnrolled] = useState<boolean | undefined>(undefined);
//   const [isPublichedCourse, setIsPublichedCourse] = useState<
//     boolean | undefined
//   >(undefined);

//   const checkIsEnrolledCourse = (
//     userId: string,
//     course: Course | undefined
//   ) => {
//     return course?.enrolledStudents.some((s) => s === userId);
//   };

//   const { user } = useUserStore();

//   //set first lesson from first section
//   useEffect(() => {
//     if (course?.sections && course.sections.length > 0) {
//       const firstSection = course.sections[0];
//       if (firstSection.videos && firstSection.videos.length > 0) {
//         setLesson(
//           firstSection.videos[0] || {
//             _id: "",
//             lessonTitle: "",
//             url: "",
//             duration: 0,
//             isCompleted: false,
//             completedBy: [],
//             comments: [],
//           }
//         );
//       }
//     }
//   }, [setLesson, course]);

//   useEffect(() => {
//     const checkIsPublichedCourse = (
//       userId: string,
//       course: Course | undefined
//     ) => {
//       return (
//         course?.instructor._id === userId &&
//         user.publishedCourses.some((c) => c._id === course?._id)
//       );
//     };
//     if (user._id && course) {
//       const enrollmentStatus = checkIsEnrolledCourse(user._id, course);
//       setIsEnrolled(enrollmentStatus);
//       const publichedStatus = checkIsPublichedCourse(user._id, course);
//       setIsPublichedCourse(publichedStatus);
//     }
//   }, [user, course]);

//   //add spinner
//   if (isEnrolled === undefined || isPublichedCourse === undefined) {
//     return <Spinner />;
//   }
//   //check is user logged in
//   if (!user._id) {
//     return (
//       <div className="my-5 flex flex-col items-center justify-center min-h-screen text-center bg-yellow-50 border border-yellow-300 rounded-lg p-6">
//         <h2 className="apply-fonts-medium text-xl text-yellow-600">
//           يرجى تسجيل الدخول للوصول إلى الدورة!
//         </h2>
//         <p className="apply-fonts-normal text-gray-700 mt-2">
//           يجب تسجيل الدخول حتى تتمكن من مشاهدة محتوى الدورة.
//         </p>
//         <Link
//           href={"/login"}
//           className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-lg shadow-md flex items-center gap-2 transition duration-300"
//         >
//           <LoginOutlined />
//           تسجيل الدخول
//         </Link>
//       </div>
//     );
//   }
//   //check is user buying course
//   if (user.role === "student" && !isEnrolled) {
//     redirect(`/course-overview/${course._id}`);
//   }
//   // check is the course uploaded by teacher
//   if (user.role === "teacher" && !isPublichedCourse) {
//     redirect(`/dashboard-teacher/courses`);
//   }

//   //section comments
//   return (
//     <div className="  flex  flex-row-reverse justify-between gap-7 sm:px-3  ">
//       {/* Course Details */}

//       <CourseCardDetails
//         courseId={course?._id}
//         userId={user._id}
//         sections={course?.sections}
//       />

//       {/* Show Course */}
//       <div className="lg:custom-width-Course mx-auto">
//         {/* first  video */}
//         <VideoPlayer videoId={lesson?.url} />
//         {/* Video Title */}
//         <div className="my-4">
//           <h1 className="apply-fonts-medium  xs:text-lg lg:text-2xl mb-2">
//             {lesson?.lessonTitle}
//           </h1>
//         </div>
//         {/* student number and  number of reviews */}
//         <div className="my-4 flex justify-between">
//           <div className="flex items-center gap-3">
//             <div className="flex flex-row-reverse -space-x-4 ">
//               <Image
//                 width={150}
//                 height={150}
//                 className="w-10 h-10 border-2 rounded-full border-white"
//                 src="/imgs/personImg.png"
//                 alt="personImg"
//               />
//               <Image
//                 width={150}
//                 height={150}
//                 className="w-10 h-10 border-2 rounded-full border-white"
//                 src="/imgs/personImg.png"
//                 alt="personImg"
//               />
//               <Image
//                 width={150}
//                 height={150}
//                 className="w-10 h-10 border-2 rounded-full border-white"
//                 src="/imgs/personImg.png"
//                 alt="personImg"
//               />
//               <Image
//                 width={150}
//                 height={150}
//                 className="w-10 h-10 border-2 rounded-full border-white"
//                 src="/imgs/personImg.png"
//                 alt="personImg"
//               />
//             </div>
//             <h2 className="flex flex-col -gap-2">
//               <p className="font-semibold">{course?.enrolledStudents.length}</p>
//               <span className="apply-fonts-normal text-[13px] text-courseTextSection">
//                 تلميذ
//               </span>
//             </h2>
//           </div>
//           <div>
//             <h2 className="flex flex-col -gap-2">
//               <p className="font-semibold">{course?.reviews.length}</p>
//               <span className="apply-fonts-normal text-[13px] text-courseTextSection">
//                 تقييم
//               </span>
//             </h2>
//           </div>
//         </div>
//         {/* description Course */}
//         <div className="my-4">
//           <h1 className="apply-fonts-medium xs:text-lg lg:text-2xl mb-2">
//             وصف الدرس
//           </h1>
//           <p className="apply-fonts-normal text-[14px] text-courseTextSection leading-8 pl-5 xs:line-clamp-4  md:line-clamp-6">
//             {lesson.description}
//           </p>
//         </div>
//         {/* Course Fiels */}
//         <div className="my-4">
//           <h1 className="apply-fonts-medium  xs:text-lg lg:text-2xl mb-2">
//             ملفات الدرس
//           </h1>
//           <div className="flex flex-col gap-3">
//             {lesson?.files.length > 0 ? (
//               lesson?.files.map((file) => {
//                 return (
//                   <div
//                     key={file._id}
//                     className="bg-wygColor py-4 px-3 flex items-center justify-between"
//                   >
//                     <div className="flex items-center gap-4">
//                       <DescriptionOutlined
//                         sx={{ fontSize: "44px" }}
//                         className="text-courseIconsSection"
//                       />
//                       <div>
//                         <h1 className="text-md font-medium line-clamp-2">
//                           {file.filename}
//                         </h1>
//                         <p className="text-courseTextSection" dir="">
//                           {(Number(file.size) / 1024 / 1024).toFixed(2)}MB
//                         </p>
//                       </div>
//                     </div>

//                     <div>
//                       <a
//                         href={file.url}
//                         target="_blank"
//                         download={true}
//                         className="apply-fonts-normal py-2 px-3 bg-mainColor hover:bg-mainColorHoverLight hoverEle text-white xs:text-sm"
//                       >
//                         تحميل
//                       </a>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <h1 className="text-center">لا توجد اي ملفات</h1>
//             )}
//           </div>
//         </div>
//         {/* stduents comments */}
//         <div className="mt-5">
//           <h1 className="mb-8 flex items-center gap-1">
//             <span className="apply-fonts-medium  xs:text-lg lg:text-2xl">
//               التعليقات
//             </span>
//             <p className="font-bold text-courseTextSection">
//               ({lesson?.comments.length})
//             </p>
//           </h1>

//           <div className="flex flex-col gap-5">
//             {lesson?.comments.length > 0 ? (
//               <div className="space-y-6">
//                 {lesson?.comments.map((comment) => {
//                   return (
//                     <div
//                       key={comment._id}
//                       id={comment._id}
//                       className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
//                     >
//                       {/* Comment Header */}
//                       <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
//                         <div className="relative">
//                           <Image
//                             src={comment.user.thumbnail || "/imgs/logoImg.png"}
//                             alt="user-username"
//                             width={48}
//                             height={48}
//                             className="rounded-full ring-2 ring-[#B9BCFF]/20"
//                           />
//                           <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#45DA10] rounded-full border-2 border-white"></div>
//                         </div>

//                         <div className="flex-1">
//                           <div className="flex items-center gap-2">
//                             <h3 className="font-bold text-gray-800 text-sm">
//                               {comment.user.username}
//                             </h3>
//                             <span className="px-2 py-1 bg-[#B9BCFF]/20 text-[#3D45EE] text-xs rounded-full font-medium">
//                               طالب
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-2 mt-1">
//                             <svg
//                               className="w-4 h-4 text-gray-400"
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                             <span className="text-xs text-gray-500 font-medium">
//                               {comment.createdAt.split("T")[0]}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Comment Content */}
//                       <div dir="rtl" className="p-4">
//                         <div className="bg-gray-50 rounded-xl p-4 border-r-4 border-[#3D45EE]">
//                           <p className="apply-fonts-normal text-gray-700 leading-relaxed text-sm">
//                             {comment.text}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Reply Section */}
//                       <div className="px-4 pb-4">
//                         {user.role !== "student" && (
//                           <div className="mb-3">
//                             <AddReply commentId={comment._id} />
//                           </div>
//                         )}

//                         {comment.replies && comment.replies.length > 0 && (
//                           <Reply replys={comment.replies} />
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//                   <svg
//                     className="w-8 h-8 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="apply-fonts-normal text-gray-600 text-lg font-medium">
//                   لا توجد تعليقات بعد
//                 </h3>
//                 <p className="apply-fonts-normal text-gray-400 text-sm mt-1">
//                   كن أول من يشارك رأيه حول هذا الدرس
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* add comment  */}
//           {user.role === "teacher" || user.role === "admin" ? (
//             <></>
//           ) : (
//             <AddComment courseId={course._id} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoursePage;
