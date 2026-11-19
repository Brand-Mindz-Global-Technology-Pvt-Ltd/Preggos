import { useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FolderTree,
  RefreshCw,
} from "lucide-react";
import { useCategoryContext } from "../../../context/CategoryContext";
import CategoryTreeItem from "./CategoryTreeItem";

const CategoryTreeView = ({
  onSelectCategory,
  selectedCategory,
  itemsPerPage = 8,
}) => {
  const {
    categories,
    deleteCategory,
    loading,
    fetchCategories,
  } = useCategoryContext();

  const [expandedParents, setExpandedParents] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // ==============================
  // Pagination
  // ==============================
  const totalCategories = categories.length;
  const totalPages = Math.max(1, Math.ceil(totalCategories / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCategories = categories.slice(startIndex, endIndex);

  // ==============================
  // Handlers
  // ==============================
  const toggleParent = useCallback((id) => {
    setExpandedParents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const handleDelete = useCallback(
    async (cat, e) => {
      e?.stopPropagation();

      const confirmDelete = window.confirm(
        `Are you sure you want to delete "${cat.name}"?`
      );
      if (!confirmDelete) return;

      const success = await deleteCategory(cat._id || cat.id);

      if (success) {
        const remaining = totalCategories - 1;
        const newTotalPages = Math.ceil(remaining / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      }
    },
    [deleteCategory, totalCategories, currentPage, itemsPerPage]
  );

  const handleRefresh = useCallback(() => {
    if (refreshing || loading) return;

    setRefreshing(true);

    setTimeout(async () => {
      await fetchCategories();
      setRefreshing(false);
    }, 2000);
  }, [fetchCategories, loading, refreshing]);
  

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // ==============================
  // Render
  // ==============================
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="bg-white z-10 p-5 border-b border-slate-200 rounded-t-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FolderTree className="text-blue-600 w-5 h-5" />
            <h2 className="font-semibold text-lg">Category Tree View</h2>
          </div>
{/* 
          {totalCategories > 0 && (
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {totalCategories}{" "}
              {totalCategories === 1 ? "Category" : "Categories"}
            </span>
          )} */}
        </div>

        {/* Top Bar */}
        <div className="bg-slate-50 rounded-lg px-3 py-2.5 flex justify-between items-center">
          <span className="text-sm font-medium text-slate-700">
            All Categories
          </span>

          <div className="flex items-center gap-3">
            {totalPages > 1 && (
              <span className="text-xs text-slate-500">
                Page {currentPage} of {totalPages}
              </span>
            )}

            <button
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-200 transition disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={`transition ${
                  refreshing || loading
                    ? "animate-spin text-blue-600"
                    : "text-slate-500"
                }`}
              />
              <span className="text-sm text-slate-700">
                {refreshing ? "Refreshing ..." : "Refresh"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-[450px] overflow-y-auto px-5 py-3">
        {refreshing ? (
          <div className="text-center py-12 text-slate-500">
            <RefreshCw
              size={28}
              className="mx-auto mb-3 animate-spin text-blue-600"
            />
            <p className="font-medium">Refreshing categories...</p>
            <p className="text-sm mt-1">Please wait  seconds</p>
          </div>
        ) : totalCategories === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <FolderTree
              size={32}
              className="mx-auto mb-3 text-slate-400"
            />
            <p className="font-medium">No categories found</p>
            <p className="text-sm mt-1">Create your first category!</p>
          </div>
        ) : (
          <ul className="space-y-1">
            {paginatedCategories.map((cat) => (
              <CategoryTreeItem
                key={cat._id || cat.id}
                cat={cat}
                expandedParents={expandedParents}
                toggleParent={toggleParent}
                onSelect={onSelectCategory}
                onDelete={handleDelete}
                selectedCategory={selectedCategory}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && !refreshing && (
        <div className="sticky bottom-0 bg-white z-10 p-5 pt-4 border-t border-slate-200 rounded-b-xl flex justify-between items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm disabled:opacity-40"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
};

export default CategoryTreeView;