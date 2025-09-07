import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // لو مافي حتى توكن → رجّع المستخدم للـ login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // نعمل طلب للـ API الخارجي /users/me
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
      {
        headers: token
          ? { Authorization: `Bearer ${token}` } // لو التوكن موجود استعمله
          : {},
        credentials: "include",
      }
    );

    if (!res.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const data = await res.json();
    const user = data.user;
    // التحقق من الدور
    if (req.nextUrl.pathname.startsWith("/dashboard-teacher")) {
      if (user.role !== "teacher") {
        return NextResponse.redirect(
          new URL(
            `/dashboard-${user.role === "student" ? "user" : user.role}`,
            req.url
          )
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// وين يتطبق الميدلواير
export const config = {
  matcher: [
    "/dashboard-teacher/:path*", // يحمي صفحات الـ teacher dashboard
    "/dashboard-user/:path*", // يحمي صفحات الـ student dashboard
    "/dashboard-admin/:path*", // يحمي صفحات الـ admin dashboard
  ],
};
