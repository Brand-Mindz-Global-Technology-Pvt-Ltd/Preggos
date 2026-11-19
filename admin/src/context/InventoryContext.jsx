import { createContext, useContext, useEffect, useCallback, useState } from "react";
import { inventoryApi } from "../api/Inventoryapi.js";

const InventoryContext = createContext(null);

const LIMIT = 5;

export const InventoryProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  /* ---------------- FETCH PRODUCTS ---------------- */

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await inventoryApi.getProducts({
        page: currentPage,
        limit: LIMIT,
        search: searchTerm,
        category: filterCategory,
        status: filterStatus,
      });

      if (res.success) {
        setData(res.data);
        setTotalPages(res.pagination.totalPages);
        setTotalProducts(res.pagination.totalProducts);
      }
    } catch (err) {
      console.error("Inventory fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterCategory, filterStatus]);

  /* ---------------- FETCH CATEGORIES ---------------- */

  const fetchCategories = useCallback(async () => {
    try {
      const { data: res } = await inventoryApi.getCategories();
      if (res.success) setCategories(res.data);
    } catch (err) {
      console.error("Category fetch error:", err);
    }
  }, []);

  /* ---------------- EXPORT ---------------- */

  const exportInventory = async () => {
    try {
      setExporting(true);
      const res = await inventoryApi.exportInventory({
        search: searchTerm,
        category: filterCategory,
        status: filterStatus,
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "inventory-export.csv";
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return (
    <InventoryContext.Provider
      value={{
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
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used inside InventoryProvider");
  }
  return context;
};
