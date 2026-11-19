export const exportCSV = (data) => {
  const date = new Date().toLocaleDateString("en-IN");
  const { sales, orders, customers } = data || {};
  const rows = [
    ["Metric", "All Time", "This Month", "Last Month", "Today", "Yesterday", "Change %"],
    ["Total Sales (₹)", sales?.total ?? "-", sales?.thisMonth ?? "-", sales?.lastMonth ?? "-", sales?.today ?? "-", sales?.yesterday ?? "-", `${sales?.percentage ?? 0}%`],
    ["Total Orders",    orders?.total ?? "-", orders?.thisMonth ?? "-", orders?.lastMonth ?? "-", orders?.today ?? "-", orders?.yesterday ?? "-", `${orders?.percentage ?? 0}%`],
    ["New Customers",   "-", "-", "-", customers?.newToday ?? "-", customers?.yesterday ?? "-", `${customers?.percentage ?? 0}%`],
    ["All-Time Customers", customers?.total ?? "-", "", "", "", "", ""],
    ["Export Date", date, "", "", "", "", ""],
  ];
  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `sales-summary-${date}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportJSON = (data) => {
  const date = new Date().toLocaleDateString("en-IN");
  const payload = { exportDate: date, ...data };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `sales-summary-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
};