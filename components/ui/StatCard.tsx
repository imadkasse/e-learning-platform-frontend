"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { colors } from "@/constants/colors";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  bgColor: string;
  iconColor: string;
  textColor?: string;
  trend?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  bgColor,
  iconColor,
  textColor = colors.darkGray,
  trend,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl" style={{ backgroundColor: bgColor }}>
          <Icon size={24} style={{ color: iconColor }} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp size={16} style={{ color: colors.successColor }} />
            <span style={{ color: colors.successColor }}>+{trend}%</span>
          </div>
        )}
      </div>
      <h3
        className="text-sm font-medium mb-2"
        style={{ color: colors.courseTextSection }}
      >
        {title}
      </h3>
      <p className="text-2xl font-bold" style={{ color: textColor }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );
};
