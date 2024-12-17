"use client";
import React, { useEffect, useState } from "react";
import AdminCardPage from "./AdminCardPage";
import Cookies from "js-cookie";
import { User } from "@/types/user";
import Spinner from "@/components/spinner/Spinner";

const AdminHomePage = () => {
  const token = Cookies.get("token");

  const [users, setusers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setusers(
          data.users.filter(
            (user: User) => user.role === "admin" || user.role === "teacher"
          )
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 min-h-[95vh] ">
      <div className="mb-5 flex items-center lg:gap-6 ">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الإدارة </h1>

        <form className="flex items-center flex-grow">
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 pointer-events-none  ">
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
          <button className="apply-fonts-normal  py-2.5 mx-3 rounded-lg text-white px-4 bg-mainColor hover:bg-mainColorHoverLight hoverEle">
            إبحث
          </button>
        </form>
        <button className="apply-fonts-normal  py-2.5   rounded-lg text-white px-6 bg-mainColor hover:bg-mainColorHoverLight hoverEle">
          إضافة
        </button>
      </div>

      <div>
        <table className="table-auto w-full">
          <thead className="bg-mainColor text-white ">
            <tr className="text-center ">
              <th className="apply-fonts-normal py-2 ">الدور</th>
              <th className="apply-fonts-normal py-2 ">التلميذ</th>
              <th className="apply-fonts-normal py-2">تاريخ</th>
              <th className="apply-fonts-normal py-2">العمليات</th>
            </tr>
          </thead>
          <tbody className="">
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center">
                  <Spinner />
                </td>
              </tr>
            ) : (
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td colSpan={4}>
                      <AdminCardPage
                        userName={user.username}
                        userJoinDate={user.createdAt?.split("T")[0]}
                        userEmail={user.email}
                        userImg={user.thumbnail || "/imgs/logoImg.png"}
                        userRole={user.role === "admin" ? "أدمن" : "أستاذ"}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomePage;
