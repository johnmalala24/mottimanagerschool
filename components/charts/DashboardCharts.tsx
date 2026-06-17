"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_COLORS = ["#006b2c", "#00628d", "#44b649", "#89ceff", "#00873a", "#007cb1"];

type ChartCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export function ChartCard({ title, subtitle, children, className = "" }: ChartCardProps) {
  return (
    <div className={`tonal-card rounded-xl p-lg ${className}`}>
      <div className="mb-md">
        <h3 className="text-title-md font-bold">{title}</h3>
        {subtitle && <p className="text-label-sm text-secondary mt-1">{subtitle}</p>}
      </div>
      <div className="h-64">{children}</div>
    </div>
  );
}

type TrendPoint = { day: string; rate?: number; amount?: number; present?: number; total?: number };

export function AttendanceTrendChart({ data, color = "#006b2c" }: { data: TrendPoint[]; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="attendanceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.35} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#dce9ff" />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#545f73" }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#545f73" }} axisLine={false} tickLine={false} unit="%" />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #dce9ff", fontSize: 13 }}
          formatter={(value) => [`${Number(value ?? 0)}%`, "Attendance"]}
        />
        <Area type="monotone" dataKey="rate" stroke={color} strokeWidth={2.5} fill="url(#attendanceFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function FeesTrendChart({ data, color = "#00628d" }: { data: TrendPoint[]; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#dce9ff" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#545f73" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#545f73" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #dce9ff", fontSize: 13 }}
          formatter={(value) => [`KES ${Number(value ?? 0).toLocaleString()}`, "Collected"]}
        />
        <Bar dataKey="amount" fill={color} radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

type NamedValue = { name?: string; status?: string; students?: number; count?: number; value?: number };

export function StudentsByClassChart({ data }: { data: NamedValue[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#dce9ff" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: "#545f73" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" width={72} tick={{ fontSize: 11, fill: "#545f73" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #dce9ff", fontSize: 13 }} />
        <Bar dataKey="students" fill="#006b2c" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function StatusPieChart({ data }: { data: NamedValue[] }) {
  const chartData = data.map((d) => ({
    name: d.name ?? d.status ?? "Unknown",
    value: d.count ?? d.value ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={56}
          outerRadius={88}
          paddingAngle={3}
          dataKey="value"
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #dce9ff", fontSize: 13 }} />
        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RevenueAreaChart({
  data,
  color = "#006b2c",
}: {
  data: { month: string; revenue: number; schools?: number }[];
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.35} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#dce9ff" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#545f73" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#545f73" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #dce9ff", fontSize: 13 }} />
        <Area type="monotone" dataKey="revenue" stroke={color} strokeWidth={2.5} fill="url(#revenueFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function FinanceComparisonChart({
  data,
}: {
  data: { month: string; collected: number; expenses: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#dce9ff" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#545f73" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#545f73" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #dce9ff", fontSize: 13 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="collected" name="Collected" fill="#006b2c" radius={[6, 6, 0, 0]} />
        <Bar dataKey="expenses" name="Expenses" fill="#00628d" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
