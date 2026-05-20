"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { metricSeries } from "@/lib/categent/content";

export function MessageAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={metricSeries}>
        <defs>
          <linearGradient id="messageFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="day" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip />
        <Area type="monotone" dataKey="messages" stroke="#4f46e5" fill="url(#messageFill)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ToolBarChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={metricSeries}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="day" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip />
        <Bar dataKey="tools" fill="#06b6d4" radius={[6, 6, 0, 0]} />
        <Bar dataKey="approvals" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
