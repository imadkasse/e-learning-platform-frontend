"use client";
import React from "react";
import {
  BookOpen,
  Users,
  DollarSign,
  Star,
  Eye,
  Calendar,
  Award,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { TopCourseCard } from "@/components/ui/TopCourseCard";
import { TeacherCharts } from "@/components/charts/TeacherCharts";
import { colors } from "@/constants/colors";
import { TeacherData } from "@/types/dashboard";

const HomePage =  ({ data }: { data: TeacherData }) => {
  return (
    <div className="lg:custom-width rounded-xl px-4 py-5 h-[94vh] overflow-y-scroll space-y-6">
      {/* العنوان والترحيب */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">مرحباً أستاذ </h1>
        <p className="opacity-90">إليك نظرة على أداء دوراتك التعليمية</p>
      </div>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={BookOpen}
          title="دوراتي"
          value={data.courses}
          bgColor={colors.lightOrange}
          iconColor={colors.courseIconsSection}
          // trend={25}
        />
        <StatCard
          icon={Users}
          title="طلابي"
          value={data.totalEnrollments}
          bgColor={colors.lightBlue}
          iconColor={colors.mainColor}
          // trend={10}
        />
        <StatCard
          icon={DollarSign}
          title="إيراداتي"
          value={`${data.totalRevenue} DZD`}
          bgColor={colors.lightGreen}
          iconColor={colors.successColor}
          // trend={20}
        />
      </div>

      {/* الدورة الأفضل والإنجازات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopCourseCard course={data.topCourse} isAdmin={false} />

        {/* بطاقة الإنجازات */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="p-3 rounded-xl"
              style={{ backgroundColor: colors.lightYellow }}
            >
              <Award size={24} style={{ color: colors.startTextColor }} />
            </div>
            <div>
              <h3
                className="font-bold text-lg"
                style={{ color: colors.darkGray }}
              >
                إنجازاتك هذا الشهر
              </h3>
              <p
                className="text-sm"
                style={{ color: colors.courseTextSection }}
              >
                احتفل بنجاحاتك
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: colors.lightGreen }}
            >
              <Star size={20} style={{ color: colors.successColor }} />
              <span className="font-medium" style={{ color: colors.darkGray }}>
                أفضل معلم هذا الشهر
              </span>
            </div>

            <div
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: colors.lightBlue }}
            >
              <Eye size={20} style={{ color: colors.mainColor }} />
              <span className="font-medium" style={{ color: colors.darkGray }}>
                +500 مشاهدة جديدة
              </span>
            </div>

            <div
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: colors.starColor }}
            >
              <Calendar size={20} style={{ color: colors.startTextColor }} />
              <span className="font-medium" style={{ color: colors.darkGray }}>
                3 دورات تم إكمالها
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* المخططات */}
      <TeacherCharts data={data} />
    </div>
  );
};

export default HomePage;
