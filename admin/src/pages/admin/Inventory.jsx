



import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useInventory } from "../../context/InventoryContext.jsx";


const statusStyle = {
  Low: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-emerald-100 text-emerald-700",
};

const getStockStatus = (stock) => {
  if (stock <= 10) return "Low";
  if (stock <= 100) return "Medium";
  return "High";
};


const TableSkeleton = ({ rows = 5 }) => {
  return Array.from({ length: rows }).map((_, i) => (
    <tr key={i} className="animate-pulse">
      <td className="p-4">
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-slate-200 rounded w-1/2" />
      </td>

      <td className="p-4 text-center">
        <div className="h-4 bg-slate-200 rounded w-16 mx-auto" />
      </td>

      <td className="p-4 text-center">
        <div className="h-4 bg-slate-200 rounded w-20 mx-auto" />
      </td>

      <td className="p-4 text-center">
        <div className="h-4 bg-slate-200 rounded w-10 mx-auto" />
      </td>

      <td className="p-4 text-center">
        <div className="h-4 bg-slate-200 rounded w-16 mx-auto" />
      </td>
    </tr>
  ));
};

/* -------------------- COMPONENT -------------------- */

export default function Inventory() {
  const {
    data,
    categories,
    loading,
    exporting,
    searchTerm,
    filterCategory,
    filterStatus,
    currentPage,
    totalPages,
    totalProducts,
    setSearchTerm,
    setFilterCategory,
    setFilterStatus,
    setCurrentPage,
    exportInventory,
  } = useInventory();

  return (
    <div className="p-2 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* LEFT */}
          <div>
            <h1 className="text-2xl font-semibold">
              Inventory Management
            </h1>
            <p className="text-sm text-slate-500">
              {totalProducts} products available
            </p>
          </div>

          {/* RIGHT */}
          <button
            onClick={exportInventory}
            disabled={exporting}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition
              ${
                exporting
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
          >
            <Download size={16} />
            {exporting ? "Exporting..." : "Export"}
          </button>
        </div>

        {/* FILTERS */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            className="rounded-lg border px-4 py-2.5"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg border px-4 py-2.5"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* overflow-x-auto enables horizontal scroll on small screens */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-center">Category</th>
                <th className="p-4 text-center">Sub Category</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <TableSkeleton rows={5} />
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-slate-400"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                data.map((item) => {
                  const status = getStockStatus(item.stock);

                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50"
                    >
                      <td className="p-4">
                        <div className="font-medium text-slate-900">
                          {item.name.slice(0, 20)}{item.name.length > 20 ? "..." : ""}
                        </div>
                        <div className="text-xs text-slate-400">
                          {item.productId}
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs">
                          {item.category}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs">
                          {item.subCategory}
                        </span>
                      </td>

                      <td className="p-4 text-center font-medium">
                        {item.stock}
                      </td>

                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[status]}`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-4 bg-slate-50 text-sm">
          <span className="text-slate-500">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setCurrentPage((p) => Math.max(p - 1, 1))
              }
              disabled={currentPage === 1}
              className="p-2 rounded-lg border bg-white disabled:opacity-50"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(p + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border bg-white disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}