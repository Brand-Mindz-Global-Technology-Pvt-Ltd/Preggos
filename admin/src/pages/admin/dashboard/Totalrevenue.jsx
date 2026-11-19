// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
// } from "recharts";
// import { useDashboard } from "../../../context/Dashboardcontext.jsx";
// import { Skeleton, ChartSkeleton } from "./Skeletons.jsx";

// const TotalRevenue = () => {
//   const { loading, data } = useDashboard();
//   const isLoading   = loading.revenue;
//   const revenueData = data.revenue;

//   if (isLoading) {
//     return (
//       <div className="bg-white rounded-2xl p-5 shadow-lg" style={{ border: "1px solid #f1f5f9" }}>
//         <Skeleton className="h-5 w-32 mb-4" />
//         <ChartSkeleton height="260px" />
//       </div>
//     );
//   }

//   const chartData      = revenueData?.chartData ?? [];
//   const totalOnline    = chartData.reduce((sum, d) => sum + (d.onlineRevenue ?? 0), 0);
//   const totalCOD       = chartData.reduce((sum, d) => sum + (d.codRevenue    ?? 0), 0);
//   const totalRevenue   = totalOnline + totalCOD;

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (!active || !payload?.length) return null;
//     return (
//       <div style={{
//         background: "#0f172a",
//         border: "1px solid #1e293b",
//         borderRadius: "10px",
//         padding: "10px 14px",
//         fontSize: "12px",
//         color: "#f8fafc",
//         boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
//         minWidth: "170px",
//       }}>
//         <p style={{ color: "#94a3b8", marginBottom: 8, fontWeight: 600 }}>{label}</p>
//         {payload.map((p, i) => (
//           <p key={i} style={{ color: p.fill, margin: "3px 0" }}>
//             {p.dataKey === "onlineRevenue" ? "Online (Razorpay)" : "Offline (COD)"}:{" "}
//             <strong style={{ color: "#f8fafc" }}>₹{p.value?.toLocaleString("en-IN")}</strong>
//           </p>
//         ))}
//         <div style={{ borderTop: "1px solid #1e293b", marginTop: 8, paddingTop: 6 }}>
//           <p style={{ color: "#94a3b8", margin: 0 }}>
//             Total:{" "}
//             <strong style={{ color: "#f8fafc" }}>
//               ₹{payload.reduce((s, p) => s + (p.value ?? 0), 0).toLocaleString("en-IN")}
//             </strong>
//           </p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white rounded-2xl p-5 shadow-lg" style={{ border: "1px solid #f1f5f9" }}>

//       {/* ── Header ── */}
//       <div className="flex items-start justify-between mb-4">
//         <div>
//           <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-1">Earnings</p>
//           <h2 className="text-base font-bold text-slate-800">Total Revenue</h2>
//         </div>
//         <span
//           className="text-xs font-bold px-2.5 py-1 rounded-full"
//           style={{ background: "#eff6ff", color: "#1d4ed8" }}
//         >
//           ₹{totalRevenue.toLocaleString("en-IN")}
//         </span>
//       </div>

//       {/* ── Summary Cards ── */}
//       <div className="grid grid-cols-2 gap-3 mb-4">
//         <div className="rounded-xl p-3.5" style={{ background: "#eff6ff", border: "1px solid #dbeafe" }}>
//           <div className="flex items-center gap-1.5 mb-2">
//             <div className="w-2 h-2 rounded-full bg-blue-500" />
//             <p className="text-xs text-slate-500 font-medium">Online (Razorpay)</p>
//           </div>
//           <p className="text-lg font-bold text-blue-600">₹{totalOnline.toLocaleString("en-IN")}</p>
//           <p className="text-xs text-slate-400 mt-0.5">
//             {totalRevenue > 0 ? ((totalOnline / totalRevenue) * 100).toFixed(1) : 0}% of total
//           </p>
//         </div>
//         <div className="rounded-xl p-3.5" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
//           <div className="flex items-center gap-1.5 mb-2">
//             <div className="w-2 h-2 rounded-full bg-green-500" />
//             <p className="text-xs text-slate-500 font-medium">Offline (COD)</p>
//           </div>
//           <p className="text-lg font-bold text-green-600">₹{totalCOD.toLocaleString("en-IN")}</p>
//           <p className="text-xs text-slate-400 mt-0.5">
//             {totalRevenue > 0 ? ((totalCOD / totalRevenue) * 100).toFixed(1) : 0}% of total
//           </p>
//         </div>
//       </div>

//       {/* ── Chart ── */}
//       <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "16px 8px 8px" }}>
//         <ResponsiveContainer width="100%" height={220}>
//           <BarChart
//             data={chartData}
//             barCategoryGap="28%"
//             barGap={4}
//             margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
//           >
//             <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
//             <XAxis
//               dataKey="name"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
//             />
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#94a3b8", fontSize: 11 }}
//               tickFormatter={(v) => `₹${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v}`}
//             />
//             <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(2,6,23,0.04)" }} />
//             <Bar dataKey="onlineRevenue" radius={[6, 6, 4, 4]}>
//               {chartData.map((_, i) => (
//                 <Cell key={`online-${i}`} fill="#2563eb" fillOpacity={0.85} />
//               ))}
//             </Bar>
//             <Bar dataKey="codRevenue" radius={[6, 6, 4, 4]}>
//               {chartData.map((_, i) => (
//                 <Cell key={`cod-${i}`} fill="#22c55e" fillOpacity={0.85} />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* ── Legend ── */}
//       <div className="flex items-center gap-6 mt-4 px-1">
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded" style={{ background: "#2563eb" }} />
//           <span className="text-xs text-slate-500 font-medium">Online (Razorpay)</span>
//           <span className="text-xs font-bold text-slate-700">₹{totalOnline.toLocaleString("en-IN")}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded" style={{ background: "#22c55e" }} />
//           <span className="text-xs text-slate-500 font-medium">Offline (COD)</span>
//           <span className="text-xs font-bold text-slate-700">₹{totalCOD.toLocaleString("en-IN")}</span>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default TotalRevenue;


import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";
import { useDashboard } from "../../../context/Dashboardcontext.jsx";
import { Skeleton, ChartSkeleton } from "./Skeletons.jsx";
import * as XLSX from "xlsx";

const TABS = [
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "yearly", label: "Yearly" },
];

const TotalRevenue = () => {
  const { loading, data } = useDashboard();
  const isLoading = loading.revenue;
  const revenueData = data.revenue;

  const [activeTab, setActiveTab] = useState("weekly");

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-lg" style={{ border: "1px solid #f1f5f9" }}>
        <Skeleton className="h-5 w-32 mb-4" />
        <ChartSkeleton height="260px" />
      </div>
    );
  }

  const chartData = (() => {
    if (!revenueData) return [];
    if (activeTab === "weekly") return revenueData.weeklyChartData ?? [];
    if (activeTab === "yearly") return revenueData.yearlyChartData ?? [];
    return revenueData.chartData ?? [];
  })();

  const totalOnline = chartData.reduce((sum, d) => sum + (d.onlineRevenue ?? 0), 0);
  const totalCOD = chartData.reduce((sum, d) => sum + (d.codRevenue ?? 0), 0);
  const totalRevenue = totalOnline + totalCOD;

  const summary = revenueData?.summary ?? {};
  const lastWeek = summary.lastWeek ?? { onlineRevenue: 0, codRevenue: 0, total: 0 };
  const lastMonth = summary.lastMonth ?? { onlineRevenue: 0, codRevenue: 0, total: 0 };

  const periodLabel = activeTab === "weekly"
    ? "Last 6 Days"
    : activeTab === "yearly"
      ? "Last 6 Years"
      : "Last 6 Months";

  const handleExport = () => {
    // Sheet 1 — Active tab chart data
    const chartSheet = XLSX.utils.json_to_sheet(
      chartData.map((d) => ({
        Period: d.name,
        "Online Revenue (₹)": d.onlineRevenue ?? 0,
        "COD Revenue (₹)": d.codRevenue ?? 0,
        "Total Revenue (₹)": (d.onlineRevenue ?? 0) + (d.codRevenue ?? 0),
      }))
    );

    // Sheet 2 — Summary (last week + last month)
    const summarySheet = XLSX.utils.json_to_sheet([
      { Metric: "Last Week — Online (₹)", Value: lastWeek.onlineRevenue },
      { Metric: "Last Week — COD (₹)", Value: lastWeek.codRevenue },
      { Metric: "Last Week — Total (₹)", Value: lastWeek.total },
      { Metric: "Last Month — Online (₹)", Value: lastMonth.onlineRevenue },
      { Metric: "Last Month — COD (₹)", Value: lastMonth.codRevenue },
      { Metric: "Last Month — Total (₹)", Value: lastMonth.total },
    ]);

    // Sheet 3 — All periods combined
    const allSheet = XLSX.utils.json_to_sheet([
      ...(revenueData?.weeklyChartData ?? []).map(d => ({
        Period: `Weekly — ${d.name}`,
        "Online (₹)": d.onlineRevenue ?? 0,
        "COD (₹)": d.codRevenue ?? 0,
        "Total (₹)": (d.onlineRevenue ?? 0) + (d.codRevenue ?? 0),
      })),
      ...(revenueData?.chartData ?? []).map(d => ({
        Period: `Monthly — ${d.name}`,
        "Online (₹)": d.onlineRevenue ?? 0,
        "COD (₹)": d.codRevenue ?? 0,
        "Total (₹)": (d.onlineRevenue ?? 0) + (d.codRevenue ?? 0),
      })),
      ...(revenueData?.yearlyChartData ?? []).map(d => ({
        Period: `Yearly — ${d.name}`,
        "Online (₹)": d.onlineRevenue ?? 0,
        "COD (₹)": d.codRevenue ?? 0,
        "Total (₹)": (d.onlineRevenue ?? 0) + (d.codRevenue ?? 0),
      })),
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, chartSheet, `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report`);
    XLSX.utils.book_append_sheet(wb, summarySheet, "Summary");
    XLSX.utils.book_append_sheet(wb, allSheet, "All Periods");
    XLSX.writeFile(wb, `revenue_${activeTab}_report.xlsx`);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "10px",
        padding: "10px 14px",
        fontSize: "12px",
        color: "#f8fafc",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        minWidth: "170px",
      }}>
        <p style={{ color: "#94a3b8", marginBottom: 8, fontWeight: 600 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.fill, margin: "3px 0" }}>
            {p.dataKey === "onlineRevenue" ? "Online (Razorpay)" : "Offline (COD)"}:{" "}
            <strong style={{ color: "#f8fafc" }}>₹{p.value?.toLocaleString("en-IN")}</strong>
          </p>
        ))}
        <div style={{ borderTop: "1px solid #1e293b", marginTop: 8, paddingTop: 6 }}>
          <p style={{ color: "#94a3b8", margin: 0 }}>
            Total:{" "}
            <strong style={{ color: "#f8fafc" }}>
              ₹{payload.reduce((s, p) => s + (p.value ?? 0), 0).toLocaleString("en-IN")}
            </strong>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg" style={{ border: "1px solid #f1f5f9" }}>

      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-1">Earnings</p>
          <h2 className="text-base font-bold text-slate-800">Total Revenue</h2>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-bold px-3 py-1.5 rounded-xl whitespace-nowrap"
            style={{ background: "#eff6ff", color: "#1d4ed8", border: "1px solid #dbeafe" }}
          >
            Total: ₹{totalRevenue.toLocaleString("en-IN")}
          </span>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff",
              boxShadow: "0 2px 10px rgba(16,185,129,0.3)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div
        className="flex items-center gap-1 p-1 rounded-xl mb-4"
        style={{ background: "#f1f5f9" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-1 text-xs font-semibold py-1.5 rounded-lg transition-all"
            style={
              activeTab === tab.key
                ? { background: "#ffffff", color: "#1d4ed8", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }
                : { color: "#94a3b8" }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div
          className="rounded-xl p-3.5"
          style={{ background: "#eff6ff", border: "1px solid #dbeafe" }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
            <p className="text-xs text-slate-500 font-medium">Online (Razorpay)</p>
          </div>
          <p className="text-lg font-bold text-blue-600 truncate">
            ₹{totalOnline.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {totalRevenue > 0 ? ((totalOnline / totalRevenue) * 100).toFixed(1) : 0}% of total
          </p>
        </div>

        <div
          className="rounded-xl p-3.5"
          style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
            <p className="text-xs text-slate-500 font-medium">Offline (COD)</p>
          </div>
          <p className="text-lg font-bold text-green-600 truncate">
            ₹{totalCOD.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {totalRevenue > 0 ? ((totalCOD / totalRevenue) * 100).toFixed(1) : 0}% of total
          </p>
        </div>
      </div>



      {/* ── Chart ── */}
      <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "16px 8px 8px" }}>
        <div className="flex items-center justify-between px-2 mb-3">
          <p className="text-xs font-semibold text-slate-500">{periodLabel}</p>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={chartData}
            barCategoryGap="28%"
            barGap={4}
            margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
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
              width={48}
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              tickFormatter={(v) =>
                v >= 100000 ? `₹${(v / 100000).toFixed(0)}L`
                  : v >= 1000 ? `₹${(v / 1000).toFixed(0)}k`
                    : `₹${v}`
              }
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(2,6,23,0.04)" }} />
            <Bar dataKey="onlineRevenue" radius={[6, 6, 4, 4]}>
              {chartData.map((_, i) => (
                <Cell key={`online-${i}`} fill="#2563eb" fillOpacity={0.85} />
              ))}
            </Bar>
            <Bar dataKey="codRevenue" radius={[6, 6, 4, 4]}>
              {chartData.map((_, i) => (
                <Cell key={`cod-${i}`} fill="#22c55e" fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Legend ── */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 px-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded flex-shrink-0" style={{ background: "#2563eb" }} />
          <span className="text-xs text-slate-500 font-medium">Online (Razorpay)</span>
          <span className="text-xs font-bold text-slate-700">₹{totalOnline.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded flex-shrink-0" style={{ background: "#22c55e" }} />
          <span className="text-xs text-slate-500 font-medium">Offline (COD)</span>
          <span className="text-xs font-bold text-slate-700">₹{totalCOD.toLocaleString("en-IN")}</span>
        </div>
      </div>

    </div>
  );
};

export default TotalRevenue;