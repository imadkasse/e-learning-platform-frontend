import React from "react";
import StudentCard from "./StudentCard";
import SearchUsers from "./SearchUsers";
import { User } from "@/types/user";
interface StudentsProps {
  searchParams: {
    filter?: string;
  };
}
const Students = async ({ searchParams }: StudentsProps) => {
  const { filter } = searchParams;

  const fetchAllUsers = async () => {
    try {
      if (filter) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/searchUsers?query=${filter}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        return data.users.filter((user: User) => user.role === "student");
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/users`, {
        credentials: "include",
      });
      const data = await res.json();
      return data.users.filter((user: User) => user.role === "student");
    } catch (error) {
      console.error(error);
    }
  };

  const users: User[] = await fetchAllUsers();

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
              {users?.length > 0 ? (
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
        {/* Pagenation */}
        {/* <nav className="flex justify-center">
          <ul className="flex items-center -space-x-px h-16 text-md">
           
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
        </nav> */}
      </div>
    </div>
  );
};

export default Students;
