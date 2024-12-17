"use client";
import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import { User } from "@/types/user";
import Cookies from "js-cookie";
import Spinner from "@/components/spinner/Spinner";

const Students = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(6);
  const [totalPageArr, setTotalPageArr] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);

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
  }, [token, currentPage]);

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 min-h-[100vh]">
      <div className="mb-5 flex items-center gap-6">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الطلاب</h1>
        <form className="flex items-center flex-grow">
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute  inset-y-0 start-0 flex items-center ps-3 pointer-events-none  ">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="apply-fonts-normal  block w-full ps-10 p-2.5  rounded-3xl   focus:border-red-400 "
              placeholder="البحث..."
              required
            />
          </div>
          <button className="apply-fonts-normal py-2.5 mx-3 rounded-lg text-white px-4 bg-mainColor hover:bg-mainColorHoverLight hoverEle">
            إبحث
          </button>
        </form>
      </div>
      <div className="">
        <div className="w-full rounded-lg  py-4 px-8 mb-4">
          <table className="table-auto w-full">
            <thead className="bg-mainColor text-white ">
              <tr className="text-center">
                <th className="apply-fonts-normal py-2 ">التلميذ</th>
                <th className="apply-fonts-normal py-2">تاريخ</th>
                <th className="apply-fonts-normal py-2">العمليات</th>
              </tr>
            </thead>
            <tbody className="">
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    <Spinner />
                  </td>
                </tr>
              ) : (
                <>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="">
                        <td colSpan={4} className="">
                          <StudentCard
                            studentImg={user.thumbnail || "/imgs/logoImg.png"}
                            studentName={user.username}
                            studentEmail={user.email}
                            studentJoinDate={user.createdAt?.split("T")[0]}
                            studentUrl={user._id}
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
                </>
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
                    console.log("first");
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
