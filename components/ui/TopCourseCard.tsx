"use client";

import React from "react";
import { Trophy, Users } from "lucide-react";
import { colors } from "@/constants/colors";

interface TopCourseCardProps {
  course: {
    _id: string;
    title: string;
    price: number;
    studentsCount: number;
  };
  isAdmin?: boolean;
}

export const TopCourseCard: React.FC<TopCourseCardProps> = ({
  course,
  isAdmin = false,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: colors.starColor }}
        >
          <Trophy size={24} style={{ color: colors.starIconColor }} />
        </div>
        <div>
          <h3 className="font-bold text-lg" style={{ color: colors.darkGray }}>
            {isAdmin ? "الدورة الأكثر مبيعاً" : "دورتك الأفضل"}
          </h3>
          <p className="text-sm" style={{ color: colors.courseTextSection }}>
            الأداء الأفضل هذا الشهر
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4
            className="font-semibold text-lg mb-2"
            style={{ color: colors.mainColor }}
          >
            {course.title}
          </h4>
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: colors.courseTextSection }}>السعر:</span>
            <span className="font-bold" style={{ color: colors.successColor }}>
              {course.price.toLocaleString()} DZD
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span style={{ color: colors.courseTextSection }}>عدد الطلاب:</span>
            <div className="flex items-center gap-1">
              <Users size={16} style={{ color: colors.mainColor }} />
              <span className="font-bold" style={{ color: colors.mainColor }}>
                {course.studentsCount}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span
              className="text-sm"
              style={{ color: colors.courseTextSection }}
            >
              إجمالي الإيرادات
            </span>
            <span
              className="font-bold text-lg"
              style={{ color: colors.successColor }}
            >
              {course.price * course.studentsCount} DZD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
