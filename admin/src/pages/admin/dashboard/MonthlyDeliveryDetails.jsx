import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";
import { useDashboard } from "../../../context/Dashboardcontext.jsx";
import { Skeleton, ChartSkeleton } from "./Skeletons.jsx";
import * as XLSX from "xlsx";

const VolumeService = () => {
  const { loading, data } = useDashboard();
  const isLoading  = loading.volume;
  const volumeData = data.volume;

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-lg" style={{ border: "1px solid #f1f5f9" }}>
        <Skeleton className="h-5 w-48 mb-4" />
        <ChartSkeleton height="220px" />
      </div>
    );
  }

  const chartData     = volumeData?.chartData ?? [];
  const totals        = volumeData?.totals ?? { totalOrders: 0, deliveredOrders: 0 };
  const deliveryRate  = totals.totalOrders > 0
    ? ((totals.deliveredOrders / totals.totalOrders) * 100).toFixed(1)
    : 0;
  const pendingOrders = totals.totalOrders - totals.deliveredOrders;

  const handleExport = () => {
    const monthlySheet = XLSX.utils.json_to_sheet(
      chartData.map((d) => ({
        Month:              d.name,
        "Total Orders":     d.totalOrders,
        "Delivered Orders": d.deliveredOrders,
        "Pending Orders":   d.totalOrders - d.deliveredOrders,
        "Delivery Rate %":  d.totalOrders > 0
          ? ((d.deliveredOrders / d.totalOrders) * 100).toFixed(1)
          : "0.0",
      }))
    );
    const summarySheet = XLSX.utils.json_to_sheet([
      { Metric: "Total Orders (6 Months)",     Value: totals.totalOrders },
      { Metric: "Delivered Orders (6 Months)", Value: totals.deliveredOrders },
      { Metric: "Pending Orders",              Value: pendingOrders },
      { Metric: "Overall Delivery Rate %",     Value: `${deliveryRate}%` },
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, monthlySheet, "Monthly Breakdown");
    XLSX.utils.book_append_sheet(wb, summarySheet, "Summary");
    XLSX.writeFile(wb, "volume_service_report.xlsx");
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const total     = payload.find(p => p.dataKey === "totalOrders")?.value     ?? 0;
    const delivered = payload.find(p => p.dataKey === "deliveredOrders")?.value ?? 0;
    const rate      = total > 0 ? ((delivered / total) * 100).toFixed(1) : 0;
    return (
      <div style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "10px",
        padding: "10px 14px",
        fontSize: "12px",
        color: "#f8fafc",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        minWidth: "150px",
      }}>
        <p style={{ color: "#94a3b8", marginBottom: 8, fontWeight: 600 }}>{label}</p>
        <p style={{ color: "#0dd99a", margin: "3px 0" }}>Total: <strong>{total.toLocaleString("en-IN")}</strong></p>
        <p style={{ color: "#60a5fa", margin: "3px 0" }}>Delivered: <strong>{delivered.toLocaleString("en-IN")}</strong></p>
        <div style={{ borderTop: "1px solid #1e293b", marginTop: 8, paddingTop: 6 }}>
          <p style={{ color: "#94a3b8", margin: 0 }}>Rate: <strong style={{ color: "#f8fafc" }}>{rate}%</strong></p>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-lg w-full" style={{ border: "1px solid #f1f5f9" }}>

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-2 mb-4 sm:mb-5">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-1">
            6-Month Overview
          </p>
          <h2 className="text-sm sm:text-base font-bold text-slate-800 leading-tight">
            Monthly Delivery Details
          </h2>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "#fff",
            boxShadow: "0 2px 12px rgba(16,185,129,0.35)",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
          </svg>
          <span className="hidden xs:inline sm:inline">Export Excel</span>
          <span className="xs:hidden sm:hidden">Export</span>
        </button>
      </div>

      {/* ── Summary Cards — 2x2 ── */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">

        {/* Total Orders */}
        <div
          className="rounded-xl p-2.5 sm:p-3.5"
          style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
        >
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
            <p className="text-xs text-slate-500 font-medium">Total Orders</p>
          </div>
          <p className="text-lg sm:text-xl font-bold text-emerald-600">
            {totals.totalOrders.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">Last 6 months</p>
        </div>

        {/* Delivered */}
        <div
          className="rounded-xl p-2.5 sm:p-3.5"
          style={{ background: "#eff6ff", border: "1px solid #dbeafe" }}
        >
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
            <p className="text-xs text-slate-500 font-medium">Delivered</p>
          </div>
          <p className="text-lg sm:text-xl font-bold text-blue-600">
            {totals.deliveredOrders.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">Successfully done</p>
        </div>

        {/* Pending */}
        <div
          className="rounded-xl p-2.5 sm:p-3.5"
          style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}
        >
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
            <p className="text-xs text-slate-500 font-medium">Pending</p>
          </div>
          <p className="text-lg sm:text-xl font-bold text-orange-500">
            {pendingOrders.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">Not yet delivered</p>
        </div>

        {/* Delivery Rate */}
        <div
          className="rounded-xl p-2.5 sm:p-3.5"
          style={{ background: "#fafafa", border: "1px solid #e2e8f0" }}
        >
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <div className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0" />
            <p className="text-xs text-slate-500 font-medium">Delivery Rate</p>
          </div>
          <p className="text-lg sm:text-xl font-bold text-slate-700">{deliveryRate}%</p>
          <div className="mt-1.5 w-full rounded-full h-1" style={{ background: "#e2e8f0" }}>
            <div
              className="h-1 rounded-full"
              style={{
                width: `${deliveryRate}%`,
                background: "linear-gradient(90deg, #10b981, #2563eb)",
              }}
            />
          </div>
        </div>

      </div>

      {/* ── Chart ── */}
      <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "12px 4px 8px" }}>
        <ResponsiveContainer width="100%" height={175}>
          <BarChart
            data={chartData}
            barCategoryGap="28%"
            barGap={4}
            margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
          >
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              width={28}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(2,6,23,0.04)" }} />
            <Bar dataKey="totalOrders" radius={[5, 5, 3, 3]}>
              {chartData.map((_, i) => (
                <Cell key={`total-${i}`} fill="#0dd99a" fillOpacity={0.85} />
              ))}
            </Bar>
            <Bar dataKey="deliveredOrders" radius={[5, 5, 3, 3]}>
              {chartData.map((_, i) => (
                <Cell key={`delivered-${i}`} fill="#2563eb" fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Legend ── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 sm:mt-4 px-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded flex-shrink-0" style={{ background: "#0dd99a" }} />
          <span className="text-xs text-slate-500 font-medium">Total</span>
          <span className="text-xs font-bold text-slate-700">
            {totals.totalOrders.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded flex-shrink-0" style={{ background: "#2563eb" }} />
          <span className="text-xs text-slate-500 font-medium">Delivered</span>
          <span className="text-xs font-bold text-slate-700">
            {totals.deliveredOrders.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded flex-shrink-0" style={{ background: "#fb923c" }} />
          <span className="text-xs text-slate-500 font-medium">Pending</span>
          <span className="text-xs font-bold text-slate-700">
            {pendingOrders.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

    </div>
  );
};

export default VolumeService;