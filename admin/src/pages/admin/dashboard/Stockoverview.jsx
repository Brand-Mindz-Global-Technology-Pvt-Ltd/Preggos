import { Package, AlertTriangle, CheckCircle2, Layers } from "lucide-react";
import { useDashboard } from "../../../context/Dashboardcontext.jsx";
import { StockSkeleton } from "./Skeletons.jsx";

const stockCards = (totalProducts, lowStockCount, highStockCount) => [
  {
    key: "total",
    label: "Total Products",
    value: totalProducts,
    icon: Layers,
    bg: "#f8fafc", border: "#e2e8f0",
    iconBg: "#e2e8f0", iconColor: "text-slate-600", valueColor: "text-slate-800",
  },
  {
    key: "low",
    label: "Low Stock",
    value: lowStockCount,
    icon: AlertTriangle,
    bg: "#fff1f2", border: "#fecdd3",
    iconBg: "#ffe4e6", iconColor: "text-rose-500", valueColor: "text-rose-600",
  },
  {
    key: "high",
    label: "Well Stocked",
    value: highStockCount,
    icon: CheckCircle2,
    bg: "#f0fdf4", border: "#bbf7d0",
    iconBg: "#dcfce7", iconColor: "text-emerald-500", valueColor: "text-emerald-600",
  },
];

const StockOverview = () => {
  const { loading, data } = useDashboard();
  const isLoading = loading.sales;
  const stockData = data.sales?.data;

  if (isLoading) return <StockSkeleton />;

  const products       = stockData?.products ?? {};
  const totalProducts  = products.total         ?? 0;
  const lowStockCount  = products.lowStockCount  ?? 0;
  const highStockCount = products.highStockCount ?? 0;
  const lowStockTop5   = products.lowStockTop5   ?? [];
  const highStockTop5  = products.highStockTop5  ?? [];

  const cards = stockCards(totalProducts, lowStockCount, highStockCount);

  return (
    <div
      className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg w-full"
      style={{ border: "1px solid #f1f5f9" }}
    >

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#f1f5f9" }}
          >
            <Package className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-0.5">
              Inventory
            </p>
            <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-tight">
              Stock Overview
            </h3>
          </div>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ background: "#f1f5f9", color: "#64748b" }}
        >
          {totalProducts} total
        </span>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
        {cards.map(({ key, label, value, icon: Icon, bg, border, iconBg, iconColor, valueColor }) => (
          <div
            key={key}
            className="rounded-xl p-2.5 sm:p-3.5 transition-transform duration-200 cursor-default"
            style={{ background: bg, border: `1px solid ${border}` }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-2"
              style={{ background: iconBg }}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${iconColor}`} />
            </div>
            <p className="text-xs text-slate-500 font-medium leading-tight">{label}</p>
            <p className={`text-lg sm:text-2xl font-bold mt-0.5 ${valueColor}`}>
              {value.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      {/* ── Top 5 Lists ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

        {/* Low Stock */}
        <div
          className="rounded-xl p-3 sm:p-4"
          style={{ background: "#fff1f2", border: "1px solid #fecdd3" }}
        >
          <div className="flex items-center gap-1.5 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
            <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide">
              Low Stock — Top 5
            </p>
          </div>
          {lowStockTop5.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No low stock products</p>
          ) : (
            <div className="space-y-2">
              {lowStockTop5.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2"
                >
                  <span
                    className="text-xs sm:text-sm text-slate-700 truncate min-w-0"
                    title={item.name}
                  >
                    {item.name.length > 18 ? item.name.slice(0, 18) + "…" : item.name}
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={
                      item.stock === 0
                        ? { background: "#fee2e2", color: "#dc2626" }
                        : { background: "#ffe4e6", color: "#e11d48" }
                    }
                  >
                    {item.stock === 0 ? "Out" : `${item.stock} left`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* High Stock */}
        <div
          className="rounded-xl p-3 sm:p-4"
          style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
        >
          <div className="flex items-center gap-1.5 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
              High Stock — Top 5
            </p>
          </div>
          {highStockTop5.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No high stock products</p>
          ) : (
            <div className="space-y-2">
              {highStockTop5.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2"
                >
                  <span
                    className="text-xs sm:text-sm text-slate-700 truncate min-w-0"
                    title={item.name}
                  >
                    {item.name.length > 18 ? item.name.slice(0, 18) + "…" : item.name}
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: "#dcfce7", color: "#15803d" }}
                  >
                    {item.stock.toLocaleString("en-IN")} units
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default StockOverview;