import React from "react";
import AdminCardPage from "./AdminCardPage";
import { User } from "@/types/user";
import AddUser from "./AddUser";
import SearchAdmin from "./SearchAdmin";
interface AdminProps {
  searchParams: {
    filter?: string;
  };
}
const AdminHomePage = async ({ searchParams }: AdminProps) => {
  const { filter } = searchParams;

  const fetchUsers = async () => {
    try {
      if (filter) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/searchUsers?query=${filter}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        return (
          data.users.filter(
            (user: User) => user.role === "admin" || user.role === "teacher"
          ) || []
        );
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/users`, {
        credentials: "include",
      });
      const data = await res.json();
      return data.users.filter(
        (user: User) => user.role === "admin" || user.role === "teacher"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const users: User[] = await fetchUsers();
  return (
    <div className="lg:custom-width rounded-xl px-4 py-5 h-[94vh] overflow-y-scroll  ">
      <div className="mb-5 flex items-center lg:gap-6 ">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الإدارة </h1>

        <SearchAdmin />
        <AddUser />
      </div>

      <div>
        <table className="table-auto w-full">
          <thead className="bg-mainColor text-white ">
            <tr className="text-center ">
              <th className="apply-fonts-normal py-2 ">الدور</th>
              <th className="apply-fonts-normal py-2 ">الحساب</th>
              <th className="apply-fonts-normal py-2">تاريخ</th>
              <th className="apply-fonts-normal py-2">العمليات</th>
            </tr>
          </thead>
          <tbody className="">
            {
              <>
                {users?.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="">
                      <td colSpan={4} className="">
                        <AdminCardPage
                          userName={user.username}
                          userJoinDate={user.createdAt?.split("T")[0]}
                          userEmail={user.email}
                          userImg={user.thumbnail || "/imgs/logoImg.png"}
                          userRole={user.role === "admin" ? "أدمن" : "أستاذ"}
                          userId={user._id}
                          userStatus={user.active}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="apply-fonts-normal text-lg text-center py-4"
                    >
                      لا يوجد أي مستخدمين
                    </td>
                  </tr>
                )}
              </>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomePage;
