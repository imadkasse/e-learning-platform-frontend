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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { colors } from "@/constants/colors";
import { AdminData } from "@/types/dashboard";

interface AdminChartsProps {
  data: AdminData;
}

export const AdminCharts: React.FC<AdminChartsProps> = ({ data }) => {
  // بيانات الرسم البياني العمودي
  const barChartData = [
    { name: "المستخدمين", value: data.users, color: colors.mainColor },
    { name: "الدورات", value: data.courses, color: colors.courseIconsSection },
    {
      name: "التسجيلات",
      value: data.totalEnrollments,
      color: colors.successColor,
    },
    {
      name: "المعلمين",
      value: data.teachers,
      color: colors.mainColorHoverDark,
    },
  ];

  // بيانات الرسم الدائري
  const pieChartData = [
    { name: "الطلاب النشطون", value: 65, color: colors.mainColor },
    { name: "الطلاب المكملون", value: 25, color: colors.successColor },
    { name: "الطلاب الجدد", value: 10, color: colors.courseIconsSection },
  ];

  // بيانات الرسم الخطي (نمو شهري)
  const lineChartData = [
    { month: "يناير", users: 800, revenue: 50000, enrollments: 120 },
    { month: "فبراير", users: 950, revenue: 65000, enrollments: 180 },
    { month: "مارس", users: 1100, revenue: 85000, enrollments: 220 },
    { month: "أبريل", users: 1200, revenue: 110000, enrollments: 280 },
    { month: "مايو", users: 1247, revenue: 125000, enrollments: 320 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* الرسم البياني العمودي */}
      <div className="col-span-1 lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3
          className="text-lg font-bold mb-4"
          style={{ color: colors.darkGray }}
        >
          إحصائيات المنصة
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.mediumGray}
              opacity={0.3}
            />
            <XAxis
              dataKey="name"
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
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {barChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* الرسم الدائري */}
      {/* <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3
          className="text-lg font-bold mb-4"
          style={{ color: colors.darkGray }}
        >
          توزيع الطلاب
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div> */}

      {/* الرسم الخطي للنمو */}
      {/* <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
        <h3
          className="text-lg font-bold mb-4"
          style={{ color: colors.darkGray }}
        >
          نمو المنصة خلال الأشهر الماضية
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={lineChartData}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={colors.mainColor}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={colors.mainColor}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={colors.successColor}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={colors.successColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="users"
              stroke={colors.mainColor}
              fillOpacity={1}
              fill="url(#colorUsers)"
              strokeWidth={3}
              name="المستخدمين"
            />
            <Area
              type="monotone"
              dataKey="enrollments"
              stroke={colors.successColor}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={3}
              name="التسجيلات"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};
