import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <p>مرحبًا بك في إضافة الكورس. ابدأ الآن!</p>
      <Link href="/add-course/details">
        <button className="bg-blue-500 text-white px-4 py-2">ابدأ</button>
      </Link>
    </div>
  );
};

export default page;
