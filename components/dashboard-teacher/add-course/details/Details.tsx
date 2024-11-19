"use client";
import { useCourseFormStore } from "@/store/courseFormStore";
import { SaveOutlined } from "@mui/icons-material";
import Link from "next/link";
import React, { useEffect } from "react";

const Details = () => {
  const { title, description, price, setFormData } = useCourseFormStore();
  useEffect(() => {
    console.log(price);
  }, [title, description, price]);
  return (
    <div className="bg-wygColor rounded-lg shadow-lg shadow-mainColor py-5 px-4">
      <div>
        <h1 className="apply-fonts-medium text-lg">معلومات الدورة الأساسية </h1>
      </div>
      <section
        className="my-6 flex flex-col sm:items-end xs:items-center"
        dir="ltr"
      >
        <div className="grid gap-4 mb-4 sm:grid-cols-2 w-full">
          <div>
            <label
              className="block mb-2 text-sm font-medium apply-fonts-normal "
              dir="rtl"
            >
              العنوان
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => {
                setFormData("title", e.target.value);
              }}
              className="   text-sm rounded-lg  block w-full p-2.5   "
              dir="rtl"
              placeholder="أكتب عنوان الدورة"
              required
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium  apply-fonts-normal"
              dir="rtl"
            >
              السعر
            </label>
            <input
              type="text"
              name="price"
              id="price"
              onChange={(e) => {
                setFormData("price", e.target.value);
              }}
              className=" 0  text-sm rounded-lg  block w-full p-2.5   "
              placeholder="2999DA"
              dir="rtl"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label
              className="block mb-2 text-sm font-medium apply-fonts-normal "
              dir="rtl"
            >
              الوصف
            </label>
            <textarea
              className="block p-2.5 w-full text-sm   rounded-lg border    "
              placeholder="أكتب وصف الدورة ولا تتجاوز 300 كلمة"
              onChange={(e) => {
                setFormData("description", e.target.value);
              }}
              dir="rtl"
            ></textarea>
          </div>
        </div>
        <Link
          href="/add-course/videos-files"
          className="bg-mainColor text-center text-white flex gap-2 hover:bg-mainColorHoverLight hoverEle items-center     font-medium rounded-lg text-sm px-5 py-2.5  "
        >
          <SaveOutlined />
          <p className="apply-fonts-normal"> حفظ و متابعة</p>
        </Link>
      </section>
    </div>
  );
};

export default Details;
