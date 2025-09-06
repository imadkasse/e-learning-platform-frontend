import React from "react";
import AdminCardPage from "./AdminCardPage";
import { User } from "@/types/user";
import AddUser from "./AddUser";
import SearchAdmin from "./SearchAdmin";
import { cookies } from "next/headers";
import { Users } from "lucide-react";

interface AdminProps {
  searchParams: {
    filter?: string;
  };
}

const AdminHomePage = async ({ searchParams }: AdminProps) => {
  const { filter } = searchParams;
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  const fetchUsers = async () => {
    try {
      if (filter) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/searchUsers?query=${filter}`,
          {
            credentials: "include",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        const data = await res.json();
        return (
          data.users.filter(
            (user: User) => user.role === "admin" || user.role === "teacher"
          ) || []
        );
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users?role=admin&role=teacher`,
        {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const data = await res.json();
      return data.users;
    } catch (error) {
      console.error(error);
    }
  };

  const users: User[] = await fetchUsers();
  const admins = users?.filter((user) => user.role === "admin") || [];
  const teachers = users?.filter((user) => user.role === "teacher") || [];

  return (
    <div className="  rounded-xl px-4 py-5 h-[94vh] overflow-y-scroll  ">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-mainColor rounded-xl p-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="apply-fonts-normal text-3xl font-bold text-gray-800">
                إدارة الحسابات
              </h1>
              <p className="text-gray-600 mt-1">
                إجمالي المستخدمين:{" "}
                <span className="font-semibold text-blue-600">
                  {users?.length || 0}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            <div className="flex-grow lg:w-96">
              <SearchAdmin />
            </div>
            <AddUser />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className=" px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  إجمالي المستخدمين
                </p>
                <p className="text-3xl font-bold mt-2">{users?.length || 0}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">المديرين</p>
                <p className="text-3xl font-bold mt-2">{admins.length}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">المعلمين</p>
                <p className="text-3xl font-bold mt-2">{teachers.length}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        {users && users.length > 0 ? (
          <div className="space-y-8">
            {/* Admins Section */}
            {admins.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h2 className="apply-fonts-normal text-2xl font-bold text-gray-800">
                    المديرين ({admins.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {admins.map((user) => (
                    <div
                      key={user._id}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 group"
                    >
                      <AdminCardPage
                        userName={user.username}
                        userJoinDate={user.createdAt?.split("T")[0]}
                        userEmail={user.email}
                        userImg={user.thumbnail || "/imgs/logoImg.png"}
                        userRole="أدمن"
                        userId={user._id}
                        userStatus={user.active}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teachers Section */}
            {teachers.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h2 className="apply-fonts-normal text-2xl font-bold text-gray-800">
                    المعلمين ({teachers.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {teachers.map((user) => (
                    <div
                      key={user._id}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 group"
                    >
                      <AdminCardPage
                        userName={user.username}
                        userJoinDate={user.createdAt?.split("T")[0]}
                        userEmail={user.email}
                        userImg={user.thumbnail || "/imgs/logoImg.png"}
                        userRole="أستاذ"
                        userId={user._id}
                        userStatus={user.active}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="apply-fonts-normal text-xl font-semibold text-gray-600 mb-2">
              لا يوجد مستخدمين
            </h3>
            <p className="text-gray-500 mb-6">
              لم يتم العثور على أي مستخدمين في النظام
            </p>
            <AddUser />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;
