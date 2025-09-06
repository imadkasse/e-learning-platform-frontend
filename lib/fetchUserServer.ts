// import { cookies } from "next/headers";

// export async function fetchUserServer() {
//   const cookiesStore = await cookies();
//   const token = cookiesStore.get("token")?.value;
//   console.log("token", token);
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
//       {
//         credentials: "include",
//         headers: token
//           ? { Authorization: `Bearer ${token}` } // لو التوكن موجود استعمله
//           : {},
//       }
//     );
//     const data = await res.json();
//     console.log("data:fetching user", data.user);
//     return data.user;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
import { cookies } from "next/headers";

export async function fetchUserServer() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    
    console.log("token في fetchUserServer:", token);
    console.log("جميع الكوكيز:", cookiesStore.getAll());
    
    if (!token) {
      console.log("لا يوجد توكن");
      return null;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
      {
        method: 'GET',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookiesStore.toString(), // إرسال جميع الكوكيز
          ...(token && { Authorization: `Bearer ${token}` })
        },
        cache: 'no-store' // تجنب الكاش
      }
    );

    console.log("استجابة API:", res.status, res.statusText);

    if (!res.ok) {
      console.log("فشل في جلب بيانات المستخدم:", res.status);
      return null;
    }

    const data = await res.json();
    console.log("بيانات المستخدم المستلمة:", data);
    
    return data.user || data; // تعامل مع هياكل مختلفة للاستجابة
    
  } catch (error) {
    console.error("خطأ في fetchUserServer:", error);
    return null;
  }
}