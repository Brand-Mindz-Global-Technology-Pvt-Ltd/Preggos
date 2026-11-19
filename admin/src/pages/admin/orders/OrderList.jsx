import React, { useEffect } from "react";
import { useOrders } from "../../../context/OrderContext";
import {
  Search,
  Download,
  ChevronDown,
  RefreshCw,
  Package,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ORDER_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const STATUS_LABEL = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_STYLE = {
  pending: "bg-orange-100 text-orange-600",
  confirmed: "bg-blue-100 text-blue-600",
  shipped: "bg-yellow-100 text-yellow-700",
  delivered: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
};

const PAYMENT_STATUS_STYLE = {
  pending: "text-orange-500",
  captured: "text-green-600",
  failed: "text-red-500",
  refunded: "text-purple-500",
};

const TAB_FILTERS = ["All", ...ORDER_STATUSES];

const fmt = {
  date: (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      : "—",

  currency: (n) =>
    n != null
      ? `₹ ${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
      : "—",

  payment: (m) =>
    m === "cod" ? "Cash on Delivery" : m === "razorpay" ? "Razorpay" : m || "—",

  address: (a) => {
    if (!a || typeof a === "string") return a || "—";
    return [a.line1, a.city, a.state, a.pincode].filter(Boolean).join(", ");
  },
};

function CancelModal({ orderId, onConfirm, onClose }) {
  const [reason, setReason] = React.useState("");
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-bold text-gray-800">Cancel Order</h3>
        <p className="text-sm text-gray-500">
          Order <span className="font-semibold text-gray-700">#{orderId}</span> will be
          permanently cancelled.
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for cancellation (optional)"
          rows={3}
          className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-200"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Go Back
          </button>
          <button
            onClick={() => onConfirm(reason)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrderList() {
  const {
    orders,
    loading,
    error,
    activeTab,
    search,
    sort,
    page,
    totalPages,
    total,
    openOrder,
    cancelTarget,
    updatingId,
    toast,
    setPage,
    setOpenOrder,
    setCancelTarget,
    loadOrders,
    handleStatusChange,
    handleCancelOrder,
    fetchOrderDetails,
    exportOrders,
    handleSearchChange,
    handleTabChange,
    handleSortChange,
  } = useOrders();

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    document.body.style.overflow = openOrder || cancelTarget ? "hidden" : "auto";
  }, [openOrder, cancelTarget]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setCancelTarget(null);
        setOpenOrder(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setCancelTarget, setOpenOrder]);

  const handleCancelConfirm = async (reason) => {
    const orderId = cancelTarget;
    setCancelTarget(null);
    await handleCancelOrder(orderId, reason);
  };

  return (
    <div className="p-3 sm:p-6 bg-white min-h-screen rounded-lg relative">
      {/* TOAST */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-[70] px-4 py-3 rounded-lg shadow-lg text-sm font-medium max-w-[calc(100vw-2.5rem)] ${toast.type === "error" ? "bg-red-600 text-white" : "bg-green-600 text-white"
            }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-4">
        {/* PAGE HEADER */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">Order Management</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {loading ? "Loading…" : `${total} order${total !== 1 ? "s" : ""} total`}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadOrders}
              disabled={loading}
              className="flex items-center gap-1.5 border px-3 py-2 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span className="hidden xs:inline">Refresh</span>
            </button>
            <button
              onClick={exportOrders}
              className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* TABS — horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-3 sm:mx-0 pb-1">
          <div className="flex gap-1.5 text-sm border-b pb-2 px-3 sm:px-0 min-w-max sm:min-w-0 sm:flex-wrap">
            {TAB_FILTERS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-3 py-1.5 rounded-full capitalize transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === tab
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab === "All" ? "All Orders" : STATUS_LABEL[tab]}
              </button>
            ))}
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative flex-1 min-w-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by Order ID…"
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="amount_high">Sort: Amount ↑ High</option>
            <option value="amount_low">Sort: Amount ↓ Low</option>
          </select>
        </div>

        {/* ERROR */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
            <AlertCircle size={17} className="shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={loadOrders} className="ml-auto underline text-xs whitespace-nowrap">
              Retry
            </button>
          </div>
        )}

        {/* SKELETON */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-2 border-dashed border-gray-200 rounded-lg p-4 animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-md shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Package size={52} className="mb-3 opacity-30" />
            <p className="text-base font-medium">No orders found</p>
            <p className="text-sm">Try adjusting your filters or search term</p>
          </div>
        )}

        {/* ORDER CARDS */}
        {!loading && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => {
              const isBusy = updatingId === order.orderId;
              const isCancelled = order.orderStatus === "cancelled";
              const isDelivered = order.orderStatus === "delivered";

              return (
                <div
                  key={order.orderId}
                  className={`bg-white border-2 border-dashed rounded-lg transition-opacity ${isBusy ? "opacity-60 pointer-events-none" : "border-gray-300"
                    }`}
                >
                  {/* CARD HEADER */}
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center px-4 py-3 border-b bg-gray-50 rounded-t-lg text-sm">
                    <div className="text-gray-600 text-xs sm:text-sm">
                      Customer{" "}
                      <span className="font-semibold text-gray-800">
                        {order.customerId?.name || "—"}
                      </span>
                      {order.customerId?.email && (
                        <span className="text-gray-400 ml-1 text-xs">
                          ({order.customerId.email})
                        </span>
                      )}
                      {" "}• {fmt.date(order.createdAt)}
                    </div>
                    <div className="text-black font-bold text-xs">#{order.orderId}</div>
                  </div>

                  {/* ITEMS */}
                  {(order.items || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="border-b last:border-b-0"
                    >
                      {/* DESKTOP: original 6-col grid */}
                      <div className="hidden md:grid md:grid-cols-6 gap-4 px-4 py-3 items-center">
                        {/* Col 1-2: image + name */}
                        <div className="flex gap-3 md:col-span-2">
                          <img
                            src={item.image || "https://placehold.co/56x56?text=IMG"}
                            alt={item.name}
                            className="w-14 h-14 rounded-md object-cover border shrink-0"
                            onError={(e) => { e.target.src = "https://placehold.co/56x56?text=IMG"; }}
                          />
                          <div>
                            <p className="font-medium text-sm leading-snug">{item.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {[item.color && `Color: ${item.color}`, item.size && `Size: ${item.size}`].filter(Boolean).join(" • ")}
                            </p>
                            <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                          </div>
                        </div>

                        {/* Col 3: price */}
                        <div className="text-sm font-semibold">
                          {fmt.currency(item.price * item.qty)}
                        </div>

                        {/* Col 4: payment */}
                        <div className="text-sm">
                          <p className="text-gray-700">{fmt.payment(order.payment?.method)}</p>
                          <p className={`text-xs capitalize mt-0.5 ${PAYMENT_STATUS_STYLE[order.payment?.status] || "text-gray-400"}`}>
                            {order.payment?.status || "—"}
                          </p>
                        </div>

                        {/* Col 5-6: status + cancel — only on last item */}
                        {idx === (order.items?.length || 1) - 1 ? (
                          <>
                            <div className="flex flex-col gap-1">
                              <div className="relative inline-block w-fit">
                                <select
                                  value={order.orderStatus}
                                  disabled={isCancelled || isBusy}
                                  onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                  className={`pl-3 pr-7 py-1 rounded-full text-xs font-medium border appearance-none cursor-pointer capitalize focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed ${STATUS_STYLE[order.orderStatus] || "bg-gray-100 text-gray-600"}`}
                                >
                                  {ORDER_STATUSES.map((s) => (
                                    <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                                  ))}
                                </select>
                                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                              <p className="text-xs text-gray-400">Total: {fmt.currency(order.totalAmount)}</p>
                              {order.cancelReason && (
                                <p className="text-xs text-red-400 max-w-[160px] truncate" title={order.cancelReason}>
                                  ✕ {order.cancelReason}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              {!isCancelled && !isDelivered && (
                                <button
                                  onClick={() => setCancelTarget(order.orderId)}
                                  className="border border-red-300 text-red-600 px-3 py-1.5 rounded-md text-xs hover:bg-red-50"
                                >
                                  Cancel Order
                                </button>
                              )}
                            </div>
                          </>
                        ) : (
                          <><div /><div /></>
                        )}
                      </div>

                      {/* MOBILE: stacked layout */}
                      <div className="flex md:hidden gap-3 items-start px-4 py-3">
                        <img
                          src={item.image || "https://placehold.co/56x56?text=IMG"}
                          alt={item.name}
                          className="w-14 h-14 rounded-md object-cover border shrink-0"
                          onError={(e) => { e.target.src = "https://placehold.co/56x56?text=IMG"; }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm leading-snug">{item.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {[item.color && `Color: ${item.color}`, item.size && `Size: ${item.size}`].filter(Boolean).join(" • ")}
                          </p>
                          <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                          <p className="text-sm font-semibold mt-1">{fmt.currency(item.price * item.qty)}</p>
                          <p className="text-sm text-gray-700 mt-1">{fmt.payment(order.payment?.method)}</p>
                          <p className={`text-xs capitalize ${PAYMENT_STATUS_STYLE[order.payment?.status] || "text-gray-400"}`}>
                            {order.payment?.status || "—"}
                          </p>

                          {idx === (order.items?.length || 1) - 1 && (
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <div className="relative inline-block">
                                <select
                                  value={order.orderStatus}
                                  disabled={isCancelled || isBusy}
                                  onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                  className={`pl-3 pr-7 py-1 rounded-full text-xs font-medium border appearance-none cursor-pointer capitalize focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed ${STATUS_STYLE[order.orderStatus] || "bg-gray-100 text-gray-600"}`}
                                >
                                  {ORDER_STATUSES.map((s) => (
                                    <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                                  ))}
                                </select>
                                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                              <p className="text-xs text-gray-400">Total: {fmt.currency(order.totalAmount)}</p>
                              {!isCancelled && !isDelivered && (
                                <button
                                  onClick={() => setCancelTarget(order.orderId)}
                                  className="border border-red-300 text-red-600 px-3 py-1 rounded-md text-xs hover:bg-red-50 whitespace-nowrap"
                                >
                                  Cancel Order
                                </button>
                              )}
                              {order.cancelReason && (
                                <p className="text-xs text-red-400 w-full truncate" title={order.cancelReason}>
                                  ✕ {order.cancelReason}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="px-4 py-2.5">
                    <button
                      onClick={() => fetchOrderDetails(order)}
                      className="text-blue-600 hover:underline text-xs font-medium"
                    >
                      Show full details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 pt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50"
            >
              <ChevronLeft size={15} /> Prev
            </button>
            <span className="text-sm text-gray-600">
              Page <span className="font-semibold">{page}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* ORDER DETAILS MODAL */}
      {openOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpenOrder(null)}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
              <div>
                <h2 className="text-base font-bold text-gray-800">Order Details</h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5">#{openOrder.orderId}</p>
              </div>
              <button
                onClick={() => setOpenOrder(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-100 hover:text-red-600 text-gray-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Customer</p>
                  <p className="font-semibold text-gray-800">
                    {openOrder.customerId?.name || "—"}
                  </p>
                  {openOrder.customerId?.email && (
                    <p className="text-xs text-gray-400">{openOrder.customerId.email}</p>
                  )}
                  {openOrder.customerId?.phone && (
                    <p className="text-xs text-gray-400">{openOrder.customerId.phone}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Order Date</p>
                  <p className="font-semibold text-gray-800">{fmt.date(openOrder.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Payment</p>
                  <p className="font-semibold text-gray-800">
                    {fmt.payment(openOrder.payment?.method)}
                  </p>
                  <p
                    className={`text-xs capitalize mt-0.5 ${PAYMENT_STATUS_STYLE[openOrder.payment?.status] || "text-gray-400"
                      }`}
                  >
                    {openOrder.payment?.status || "—"}
                  </p>
                  {openOrder.payment?.paidAt && (
                    <p className="text-xs text-gray-400">
                      Paid: {fmt.date(openOrder.payment.paidAt)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Shipping Address
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {fmt.address(openOrder.shippingAddress)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLE[openOrder.orderStatus] || "bg-gray-100 text-gray-600"
                    }`}
                >
                  {STATUS_LABEL[openOrder.orderStatus] || openOrder.orderStatus}
                </span>
                {openOrder.cancelReason && (
                  <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    Reason: {openOrder.cancelReason}
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                  Items ({openOrder.items?.length || 0})
                </p>
                <div className="space-y-2">
                  {(openOrder.items || []).map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center border rounded-lg p-3">
                      <img
                        src={item.image || "https://placehold.co/60x60?text=IMG"}
                        alt={item.name}
                        className="w-14 h-14 rounded-md object-cover border shrink-0"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/60x60?text=IMG";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">
                          {[
                            item.color && `Color: ${item.color}`,
                            item.size && `Size: ${item.size}`,
                          ]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                        <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                      </div>
                      <div className="text-sm font-semibold shrink-0">
                        {fmt.currency(item.price * item.qty)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{fmt.currency(openOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {openOrder.shipping === 0 ? "Free" : fmt.currency(openOrder.shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 border-t pt-2">
                  <span>Total</span>
                  <span>{fmt.currency(openOrder.totalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
              <div>
                {openOrder.orderStatus !== "cancelled" && openOrder.orderStatus !== "delivered" && (
                  <button
                    onClick={() => {
                      setOpenOrder(null);
                      setCancelTarget(openOrder.orderId);
                    }}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setOpenOrder(null)}
                  className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL MODAL */}
      {cancelTarget && (
        <CancelModal
          orderId={cancelTarget}
          onConfirm={handleCancelConfirm}
          onClose={() => setCancelTarget(null)}
        />
      )}
    </div>
  );
}