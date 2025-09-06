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
  Cell,
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
    </div>
  );
};
