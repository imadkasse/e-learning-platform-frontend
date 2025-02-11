"use client";
import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import Cookies from "js-cookie";
import Spinner from "@/components/spinner/Spinner";
import { useSearchUser } from "@/store/searchUser";
import SearchUsers from "./SearchUsers";

const Students = () => {
  const { users, setUsers, loading, setLoading } = useSearchUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalPageArr, setTotalPageArr] = useState<number[]>([]);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/users?page=${currentPage}&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setUsers(data.users);
        setTotalPage(data.totalPages);
        setTotalPageArr(
          Array.from({ length: data.totalPages }, (_, i) => i + 1)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [token, currentPage, setUsers, setLoading]);

  return (
    <div className=" lg:custom-width rounded-xl px-4 py-5 h-[94vh] overflow-y-scroll relative ">
      <div className="mb-5 flex items-center gap-6">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الطلاب</h1>
        <SearchUsers />
      </div>
      <div className="">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full   rounded-lg">
            <thead className="bg-mainColor text-white">
              <tr className="text-center">
                <th className="py-2 px-4 apply-fonts-normal">التلميذ</th>
                <th className="py-2 px-4 apply-fonts-normal">تاريخ</th>
                <th className="py-2 px-4 apply-fonts-normal">العمليات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    <Spinner />
                  </td>
                </tr>
              ) : users?.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="">
                    <td colSpan={3} className="px-4 py-2">
                      <StudentCard
                        studentImg={user.thumbnail || "/imgs/logoImg.png"}
                        studentName={user.username}
                        studentEmail={user.email}
                        studentJoinDate={user.createdAt?.split("T")[0]}
                        studentId={user._id}
                        studentStatus={user.active}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    لا يوجد أي مستخدمين
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <nav className="flex justify-center">
          <ul className="flex items-center -space-x-px h-16 text-md">
            {/* الزر السابق */}
            <li>
              <button
                onClick={() => {
                  if (currentPage <= totalPage && currentPage != 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-mainColor border border-mainColor hover:bg-mainColorHoverLight hover:text-white rounded-s-lg"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>

            {/* أزرار الأرقام */}
            {totalPageArr.map((num) => (
              <li key={num}>
                <button
                  onClick={() => {
                    setCurrentPage(num);
                  }}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-mainColor  border border-mainColor ${
                    currentPage === num
                      ? "bg-mainColor text-white "
                      : "bg-white hover:bg-mainColorHoverLight hoverEle hover:text-white "
                  }`}
                >
                  {num}
                </button>
              </li>
            ))}

            {/* الزر التالي */}
            <li>
              <button
                onClick={() => {
                  if (currentPage < totalPage) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-mainColor border border-mainColor hover:bg-mainColorHoverLight hover:text-white rounded-e-lg"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Students;
