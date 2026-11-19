
import SalesSummary from "./dashboard/Salessummary.jsx";
import StockOverview from "./dashboard/Stockoverview.jsx";
import WeeklyDeliveryReport from "./dashboard/WeeklyDeliveryReport.jsx";
import MonthlyDeliveryDetails from "./dashboard/MonthlyDeliveryDetails.jsx";
import TotalRevenue from "./dashboard/Totalrevenue.jsx";
import TopProducts from "./dashboard/Topproducts.jsx";

const DashboardLayout = () => (
  <div className="space-y-6">
    <SalesSummary />
    <StockOverview />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <WeeklyDeliveryReport />
      <MonthlyDeliveryDetails />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <TotalRevenue />
      <TopProducts />
    </div>
  </div>
);

export default function Dashboard() {
  return (<>
    <DashboardLayout />
  </>
  );
}