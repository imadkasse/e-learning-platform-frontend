"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import { colors } from "@/constants/colors";
import { TeacherData } from "@/types/dashboard";

interface TeacherChartsProps {
  data: TeacherData;
}

export const TeacherCharts: React.FC<TeacherChartsProps> = ({ data }) => {
  // بيانات الأداء الشهري
  const monthlyPerformance = [
    { month: "يناير", students: 45, revenue: 15000, courses: 8 },
    { month: "فبراير", students: 67, revenue: 18500, courses: 9 },
    { month: "مارس", students: 89, revenue: 22000, courses: 10 },
    { month: "أبريل", students: 156, revenue: 25500, courses: 11 },
    { month: "مايو", students: 234, revenue: 28000, courses: 12 },
  ];

  // بيانات التقييمات
  const ratingsData = [
    { name: "ممتاز", value: 85, fill: colors.successColor },
    { name: "جيد جداً", value: 65, fill: colors.courseStarColor },
    { name: "جيد", value: 45, fill: colors.startTextColor },
    { name: "مقبول", value: 25, fill: colors.courseTextSection },
  ];

  // بيانات معدل الإكمال
  const completionData = [
    { subject: "البرمجة", completion: 92 },
    { subject: "التصميم", completion: 88 },
    { subject: "التسويق", completion: 85 },
    { subject: "الإدارة", completion: 78 },
  ];

  return (
    <div className="space-y-6 mt-6">
      {/* الأداء الشهري */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3
          className="text-lg font-bold mb-4"
          style={{ color: colors.darkGray }}
        >
          الأداء الشهري
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyPerformance}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.mediumGray}
              opacity={0.3}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: colors.courseTextSection }}
            />
            <YAxis tick={{ fontSize: 12, fill: colors.courseTextSection }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: `1px solid ${colors.mediumGray}`,
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="students"
              stroke={colors.mainColor}
              strokeWidth={3}
              dot={{ fill: colors.mainColor, r: 6 }}
              name="الطلاب"
            />
            <Line
              type="monotone"
              dataKey="courses"
              stroke={colors.courseIconsSection}
              strokeWidth={3}
              dot={{ fill: colors.courseIconsSection, r: 6 }}
              name="الدورات"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* التقييمات */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3
            className="text-lg font-bold mb-4"
            style={{ color: colors.darkGray }}
          >
            التقييمات
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="10%"
              outerRadius="90%"
              data={ratingsData}
            >
              <RadialBar dataKey="value" cornerRadius={10} />
              <Legend
                iconSize={10}
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* معدل الإكمال */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3
            className="text-lg font-bold mb-4"
            style={{ color: colors.darkGray }}
          >
            معدل إكمال الدورات
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={completionData} layout="horizontal">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors.mediumGray}
                opacity={0.3}
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: colors.courseTextSection }}
              />
              <YAxis
                type="category"
                dataKey="subject"
                tick={{ fontSize: 12, fill: colors.courseTextSection }}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, "معدل الإكمال"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: `1px solid ${colors.mediumGray}`,
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="completion"
                fill={colors.progressBarCourseColor}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
