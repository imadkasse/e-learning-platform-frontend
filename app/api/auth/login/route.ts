import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // نبعث الطلب للـ backend الحقيقي
    const res = await fetch(
      `${process.env.BACK_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    // ناخذ الـ headers و الـ body من backend
    const data = await res.json();

    // نجيب الكوكي من الـ backend
    const setCookie = res.headers.get("set-cookie");

    const response = NextResponse.json(data, { status: res.status });

    // لو في كوكي نبعته مع الرد
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  } catch (error) {
    console.error("Login Proxy Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
