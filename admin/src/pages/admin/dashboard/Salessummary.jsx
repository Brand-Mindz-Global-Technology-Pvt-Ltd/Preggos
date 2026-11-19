import {
  IndianRupee, ShoppingCart, UserPlus, Users,
  TrendingUp, CalendarDays,
} from "lucide-react";
import { useDashboard } from "../../../context/Dashboardcontext.jsx";
import { Skeleton, StatCardSkeleton, MonthCardSkeleton } from "./Skeletons.jsx";
import ExportButton from "./Exportbutton.jsx";
import { colorMap } from "./Chartutils.jsx";

const buildStatCards = (data) => {
  if (!data) return [];
  const { sales, orders, customers } = data;
  return [
    {
      key: "totalSales",
      title: "Total Sales",
      icon: IndianRupee,
      bg: "bg-blue-200", hoverBg: "hover:bg-blue-300", color: "blue",
      value: `₹${(sales?.total ?? 0).toLocaleString("en-IN")}`,
      sub: "All-time revenue",
    },
    {
      key: "todaySales",
      title: "Today's Sales",
      icon: TrendingUp,
      bg: "bg-cyan-200", hoverBg: "hover:bg-cyan-300", color: "cyan",
      value: `₹${(sales?.today ?? 0).toLocaleString("en-IN")}`,
      sub: `${sales?.percentage >= 0 ? "+" : ""}${sales?.percentage ?? 0}% vs yesterday`,
    },
    {
      key: "totalOrders",
      title: "Total Orders",
      icon: ShoppingCart,
      bg: "bg-emerald-200", hoverBg: "hover:bg-emerald-300", color: "emerald",
      value: (orders?.total ?? 0).toLocaleString("en-IN"),
      sub: "All-time orders",
    },
    {
      key: "todayOrders",
      title: "Today's Orders",
      icon: CalendarDays,
      bg: "bg-teal-200", hoverBg: "hover:bg-teal-300", color: "teal",
      value: (orders?.today ?? 0).toLocaleString("en-IN"),
      sub: `${orders?.percentage >= 0 ? "+" : ""}${orders?.percentage ?? 0}% vs yesterday`,
    },
    {
      key: "newCustomers",
      title: "New Customers",
      icon: UserPlus,
      bg: "bg-purple-200", hoverBg: "hover:bg-purple-300", color: "purple",
      value: (customers?.newToday ?? 0).toLocaleString("en-IN"),
      sub: `${customers?.percentage >= 0 ? "+" : ""}${customers?.percentage ?? 0}% vs yesterday`,
    },
    {
      key: "totalCustomers",
      title: "Total Customers",
      icon: Users,
      bg: "bg-orange-200", hoverBg: "hover:bg-orange-300", color: "orange",
      value: (customers?.total ?? 0).toLocaleString("en-IN"),
      sub: "All-time registered",
    },
  ];
};

const SalesSummary = () => {
  const { loading, data } = useDashboard();
  const isLoading = loading.sales;
  const salesData = data.sales?.data;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {[...Array(6)].map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MonthCardSkeleton />
          <MonthCardSkeleton />
        </div>
      </div>
    );
  }

  const cards = buildStatCards(salesData);
  const { sales, orders } = salesData || {};

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-md font-semibold text-slate-900">Sales Overview</h3>
          <p className="text-sm text-slate-400">Sales Summary</p>
        </div>
        <ExportButton data={salesData} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {cards.map(({ key, title, icon: Icon, bg, hoverBg, color, value, sub }) => {
          const theme = colorMap[color];
          return (
            <div
              key={key}
              className={`rounded-2xl p-4 ${bg} ${hoverBg} transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer`}
            >
              <div className={`w-10 h-10 rounded-full bg-white border ${theme.border} flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${theme.text}`} />
              </div>
              <p className="text-xs font-medium text-slate-700">{title}</p>
              <h4 className={`text-xl font-bold mt-1 ${theme.text}`}>{value}</h4>
              <p className="text-xs text-slate-600 mt-1">{sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1">This Month</p>
            <h4 className="text-2xl font-bold text-blue-700">
              ₹{(sales?.thisMonth ?? 0).toLocaleString("en-IN")}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {(orders?.thisMonth ?? 0).toLocaleString("en-IN")} orders
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Last Month</p>
            <h4 className="text-2xl font-bold text-slate-700">
              ₹{(sales?.lastMonth ?? 0).toLocaleString("en-IN")}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {(orders?.lastMonth ?? 0).toLocaleString("en-IN")} orders
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
            <CalendarDays className="w-6 h-6 text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesSummary;