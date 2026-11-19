import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_BASE = `${BASE_URL}/admin/orders`;

const OrderContext = createContext(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

async function apiFetchOrders({ status, search, sort, page, limit }) {
  const params = {};
  if (status && status !== "All") params.status = status;
  if (search) params.search = search;
  if (sort) params.sort = sort;
  params.page = page;
  params.limit = limit;

  const { data } = await axios.get(API_BASE, {
    params,
    headers: getAuthHeaders(),
  });
  return data;
}

async function apiFetchOrderById(orderId) {
  const { data } = await axios.get(`${API_BASE}/${orderId}`, {
    headers: getAuthHeaders(),
  });
  return data.order;
}

async function apiUpdateStatus(orderId, orderStatus) {
  const { data } = await axios.patch(
    `${API_BASE}/${orderId}/status`,
    { orderStatus },
    { headers: getAuthHeaders() }
  );
  return data;
}

async function apiCancelOrder(orderId, cancelReason = "") {
  const { data } = await axios.post(
    `${API_BASE}/${orderId}/cancel`,
    { cancelReason },
    { headers: getAuthHeaders() }
  );
  return data;
}

async function apiExportOrders() {
  const response = await axios.get(`${API_BASE}/export`, {
    headers: getAuthHeaders(),
    responseType: "blob",
  });

  const url = URL.createObjectURL(new Blob([response.data]));
  const a = document.createElement("a");
  a.href = url;
  a.download = `orders-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [openOrder, setOpenOrder] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [toast, setToast] = useState(null);
  const searchTimer = useRef(null);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetchOrders({ 
        status: activeTab, 
        search, 
        sort, 
        page, 
        limit: 10 
      });
      setOrders(data.orders || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, [activeTab, search, sort, page]);

  const patchLocal = useCallback((orderId, patch) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, ...patch } : o))
    );
    if (openOrder?.orderId === orderId) {
      setOpenOrder((prev) => ({ ...prev, ...patch }));
    }
  }, [openOrder]);

  const handleStatusChange = useCallback(async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await apiUpdateStatus(orderId, newStatus);
      patchLocal(orderId, { orderStatus: res.orderStatus });
      showToast(`Status updated to "${newStatus}"`);
      return res;
    } catch (err) {
      showToast(
        err.response?.data?.message || err.message || "Failed to update status.",
        "error"
      );
      throw err;
    } finally {
      setUpdatingId(null);
    }
  }, [patchLocal, showToast]);

  const handleCancelOrder = useCallback(async (orderId, reason) => {
    setUpdatingId(orderId);
    try {
      const res = await apiCancelOrder(orderId, reason);
      patchLocal(orderId, { 
        orderStatus: res.orderStatus, 
        cancelReason: res.cancelReason 
      });
      showToast("Order cancelled successfully.");
      return res;
    } catch (err) {
      showToast(
        err.response?.data?.message || err.message || "Failed to cancel order.",
        "error"
      );
      throw err;
    } finally {
      setUpdatingId(null);
    }
  }, [patchLocal, showToast]);

  const fetchOrderDetails = useCallback(async (order) => {
    setOpenOrder(order);
    try {
      const fresh = await apiFetchOrderById(order.orderId);
      setOpenOrder(fresh);
      return fresh;
    } catch (err) {
      showToast(
        err.response?.data?.message || err.message || "Failed to fetch order details.",
        "error"
      );
      throw err;
    }
  }, [showToast]);

  const exportOrders = useCallback(async () => {
    try {
      await apiExportOrders();
      showToast("CSV downloaded successfully.");
    } catch (err) {
      showToast("Export failed. Please try again.", "error");
      throw err;
    }
  }, [showToast]);

  const handleSearchChange = useCallback((val) => {
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setPage(1), 400);
  }, []);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((sortValue) => {
    setSort(sortValue);
    setPage(1);
  }, []);

  const value = {
    // State
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
    
    // Setters
    setPage,
    setOpenOrder,
    setCancelTarget,
    
    // Actions
    loadOrders,
    handleStatusChange,
    handleCancelOrder,
    fetchOrderDetails,
    exportOrders,
    handleSearchChange,
    handleTabChange,
    handleSortChange,
    showToast,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};