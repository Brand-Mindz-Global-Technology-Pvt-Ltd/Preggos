// Customers.jsx
import React, { useEffect } from 'react';
import {
  Search,
  Download,
  Edit2,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  XCircle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { useCustomers, STATUS, FILTERS, SEARCH_FIELDS } from '../../context/CustomerContext';

// ─── Shimmer pulse line ───────────────────────────────────────────────────────
const Shimmer = ({ w = 'w-full', h = 'h-3', rounded = 'rounded' }) => (
  <div
    className={`${w} ${h} ${rounded} bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] animate-shimmer`}
  />
);

// ─── Skeleton row (desktop) ───────────────────────────────────────────────────
const SkeletonRow = ({ opacity = 1 }) => (
  <tr style={{ opacity }} className="transition-opacity duration-300">
    <td className="px-4 py-3">
      <Shimmer w="w-20" />
    </td>
    <td className="px-4 py-3">
      <Shimmer w="w-32" />
    </td>
    <td className="px-4 py-3">
      <Shimmer w="w-40" />
    </td>
    <td className="px-4 py-3">
      <Shimmer w="w-16" h="h-5" rounded="rounded-full" />
    </td>
    <td className="px-4 py-3 flex justify-end">
      <Shimmer w="w-6" h="h-6" rounded="rounded" />
    </td>
  </tr>
);

// ─── Skeleton card (mobile) ───────────────────────────────────────────────────
const SkeletonCard = ({ opacity = 1 }) => (
  <div className="p-4 border-b" style={{ opacity, transition: 'opacity 0.3s' }}>
    <div className="flex justify-between mb-3">
      <div className="space-y-2">
        <Shimmer w="w-28" h="h-3.5" />
        <Shimmer w="w-20" h="h-2.5" />
      </div>
      <Shimmer w="w-14" h="h-5" rounded="rounded-full" />
    </div>
    <Shimmer w="w-48" h="h-3" />
    <div className="mt-3">
      <Shimmer w="w-full" h="h-8" rounded="rounded-lg" />
    </div>
  </div>
);

// ─── Sort icon ────────────────────────────────────────────────────────────────
const SortIcon = ({ field, sort }) => {
  if (sort.field !== field)
    return <ArrowUpDown size={13} className="text-gray-400 ml-1 inline-block" />;
  return sort.order === 'asc' ? (
    <ArrowUp size={13} className="text-blue-600 ml-1 inline-block" />
  ) : (
    <ArrowDown size={13} className="text-blue-600 ml-1 inline-block" />
  );
};

// ─── Status badge ─────────────────────────────────────────────────────────────
const statusBadge = (s) =>
  s === 'Active'
    ? 'bg-green-100 text-green-700'
    : s === 'Blocked'
    ? 'bg-red-100 text-red-700'
    : 'bg-yellow-100 text-yellow-700';

// ─── inject shimmer keyframe once ────────────────────────────────────────────
if (typeof document !== 'undefined' && !document.getElementById('shimmer-style')) {
  const style = document.createElement('style');
  style.id = 'shimmer-style';
  style.textContent = `
    @keyframes shimmer {
      0%   { background-position: 100% 0; }
      100% { background-position: -100% 0; }
    }
    .animate-shimmer {
      animation: shimmer 3.4s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}

export default function Customers() {
  const {
    customers,
    loading,
    isFirstLoad,
    error,
    refreshing,
    currentPage,
    totalPages,
    totalCount,
    searchInput,
    committedSearch,
    searchField,
    filter,
    drawerOpen,
    currentCustomer,
    form,
    submitting,
    submitError,
    exportLoading,
    sort,
    currentFieldMeta,
    pageNumbers,
    startRow,
    endRow,
    skeletonCount,
    setSearchInput,
    setForm,
    setCurrentPage,
    fetchCustomers,
    handleRefresh,
    handleSort,
    clearSort,
    commitSearch,
    handleSearchKey,
    clearSearch,
    handleFieldChange,
    handleFilterChange,
    handlePageChange,
    openEditDrawer,
    closeDrawer,
    submitForm,
    triggerExport,
  } = useCustomers();

  // Initial load and filter/search changes
  useEffect(() => {
    setCurrentPage(1);
    fetchCustomers(1);
  }, [filter, committedSearch, searchField, sort]);

  // ─── Sortable TH ─────────────────────────────────────────────────────────
  const SortableTh = ({ field, label }) => (
    <th
      className="px-4 py-3 cursor-pointer select-none group whitespace-nowrap"
      onClick={() => handleSort(field)}
    >
      <span className="inline-flex items-center gap-0.5 group-hover:text-blue-600 transition-colors">
        {label}
        <SortIcon field={field} sort={sort} />
      </span>
    </th>
  );

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-6 sm:py-8 rounded-md">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* ── HEADER ── */}
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">Customers</h1>
            <p className="text-xs sm:text-sm text-gray-500 transition-all duration-300">
              {loading ? (
                <span className="inline-block w-28 h-3 rounded bg-gray-200 animate-shimmer align-middle" />
              ) : (
                `${totalCount} total customers`
              )}
            </p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="flex w-full sm:w-auto">
              <button
                onClick={() => triggerExport('csv')}
                disabled={exportLoading.csv}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-l-lg border border-r-0
                           bg-white px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100
                           transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {exportLoading.csv ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <Download size={14} />
                )}
                CSV
              </button>
              <button
                onClick={() => triggerExport('excel')}
                disabled={exportLoading.excel}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-r-lg border
                           bg-white px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100
                           transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {exportLoading.excel ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <Download size={14} />
                )}
                Excel
              </button>
            </div>
          </div>
        </header>

        {/* ── SEARCH + FILTERS ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 min-w-0">
            <select
              value={searchField}
              onChange={(e) => handleFieldChange(e.target.value)}
              className="shrink-0 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50
                         px-2 py-1.5 text-xs sm:text-sm text-gray-600 outline-none
                         hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {SEARCH_FIELDS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>

            <div className="relative flex-1 min-w-0">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder={currentFieldMeta?.placeholder ?? 'Search…'}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchKey}
                className="h-10 w-full border border-gray-300 pl-9 pr-9 text-sm rounded-none
                           focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none"
              />
              {searchInput && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={15} />
                </button>
              )}
            </div>

            <button
              onClick={commitSearch}
              className="h-10 px-4 shrink-0 rounded-r-lg border border-l-0 border-gray-300
                         bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>

          <div className="flex gap-2 shrink-0">
            <select
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none bg-white"
            >
              <option>{FILTERS.ALL}</option>
              <option>{STATUS.ACTIVE}</option>
              <option>{STATUS.INACTIVE}</option>
              <option>{STATUS.BLOCKED}</option>
            </select>

            <button
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="flex items-center gap-2 px-3 h-10 rounded-lg border border-gray-300
                         bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={refreshing || loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* ── Active search chip ── */}
        {committedSearch && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-gray-400">Searching</span>
            <span className="font-medium text-gray-800">{currentFieldMeta?.label}</span>
            <span className="text-gray-400">for</span>
            <span
              className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200
                             text-blue-700 rounded-full px-3 py-0.5 text-xs font-medium"
            >
              "{committedSearch}"
              <button onClick={clearSearch} className="hover:text-blue-900">
                <X size={12} />
              </button>
            </span>
            <span className="text-gray-400 text-xs">
              — {totalCount} result{totalCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* ── Active sort chip ── */}
        {sort.field && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-gray-400">Sorted by</span>
            <span
              className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200
                             text-blue-700 rounded-full px-3 py-0.5 text-xs font-medium"
            >
              {sort.field === 'customerId' ? 'Customer ID' : 'Name'}
              {sort.order === 'asc' ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
              {sort.order === 'asc' ? 'A → Z' : 'Z → A'}
              <button onClick={clearSort} className="hover:text-blue-900">
                <X size={12} />
              </button>
            </span>
          </div>
        )}

        {/* ── ERROR BANNER ── */}
        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm
                          flex items-center justify-between"
          >
            <div>
              <span className="font-semibold">Failed to load customers: </span>
              {error}
            </div>
            <button
              onClick={() => fetchCustomers(currentPage)}
              className="ml-4 px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700
                         rounded-md transition-colors whitespace-nowrap"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── TABLE ── */}
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          {/* ── Desktop ── */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b text-gray-600 font-medium">
                <tr>
                  <SortableTh field="customerId" label="Customer ID" />
                  <SortableTh field="name" label="Name" />
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading
                  ? Array.from({ length: skeletonCount }).map((_, i) => (
                      <SkeletonRow key={`sk-${i}`} opacity={isFirstLoad ? 1 : 1 - i * 0.06} />
                    ))
                  : customers.length > 0
                  ? customers.map((c, i) => (
                      <tr
                        key={c._id}
                        className="hover:bg-gray-50 transition-all duration-200"
                        style={{
                          animation: `fadeSlideIn 0.25s ease both`,
                          animationDelay: `${i * 30}ms`,
                        }}
                      >
                        <td className="px-4 py-3 text-gray-600 font-medium text-xs font-mono">
                          {c.customerId}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                        <td className="px-4 py-3 text-gray-600">{c.email}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(
                              c.status
                            )}`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => openEditDrawer(c)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit Status"
                          >
                            <Edit2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  : null}
                {!loading && customers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-400">
                      {committedSearch
                        ? `No customers found matching "${committedSearch}"`
                        : 'No customers found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Mobile ── */}
          <div className="md:hidden">
            {/* Sort pills */}
            <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b bg-gray-50">
              <span className="text-xs text-gray-500 shrink-0">Sort by:</span>
              {[
                { field: 'customerId', label: 'ID' },
                { field: 'name', label: 'Name' },
              ].map(({ field, label }) => (
                <button
                  key={field}
                  onClick={() => handleSort(field)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                              text-xs font-medium border transition-colors
                              ${
                                sort.field === field
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                              }`}
                >
                  {label}
                  {sort.field === field ? (
                    sort.order === 'asc' ? (
                      <ArrowUp size={11} />
                    ) : (
                      <ArrowDown size={11} />
                    )
                  ) : (
                    <ArrowUpDown size={11} className="text-gray-400" />
                  )}
                </button>
              ))}
              {sort.field && (
                <button
                  onClick={clearSort}
                  className="ml-auto text-xs text-gray-400 hover:text-gray-600 underline"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="divide-y">
              {loading
                ? Array.from({ length: skeletonCount }).map((_, i) => (
                    <SkeletonCard key={`msk-${i}`} opacity={isFirstLoad ? 1 : 1 - i * 0.06} />
                  ))
                : customers.length > 0
                ? customers.map((c, i) => (
                    <div
                      key={c._id}
                      className="p-4 hover:bg-gray-50 transition-colors"
                      style={{
                        animation: 'fadeSlideIn 0.25s ease both',
                        animationDelay: `${i * 30}ms`,
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm truncate">{c.name}</div>
                          <div className="text-xs text-gray-400 font-mono mt-0.5">
                            {c.customerId}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${statusBadge(
                            c.status
                          )}`}
                        >
                          {c.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center mb-3">
                        <span className="text-xs text-gray-400 w-14 shrink-0">Email:</span>
                        <span className="truncate">{c.email}</span>
                      </div>
                      <button
                        onClick={() => openEditDrawer(c)}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm
                                 font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Edit2 size={14} /> Edit Status
                      </button>
                    </div>
                  ))
                : null}
              {!loading && customers.length === 0 && (
                <div className="py-20 text-center text-gray-400">
                  {committedSearch
                    ? `No results for "${committedSearch}"`
                    : 'No customers found.'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── PAGINATION ── */}
        {!loading && (
          <div
            className="border rounded-xl px-3 sm:px-6 py-3 sm:py-4 bg-white shadow-sm"
            style={{ animation: 'fadeSlideIn 0.3s ease both' }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left order-2 sm:order-1">
                {totalCount === 0 ? (
                  <span className="text-gray-400">No results</span>
                ) : (
                  <>
                    <span className="font-medium text-gray-900">Page {currentPage}</span>
                    <span className="mx-1.5 text-gray-300">•</span>
                    Showing <span className="font-medium text-gray-900">{startRow}</span>
                    {' – '}
                    <span className="font-medium text-gray-900">{endRow}</span>
                    {' of '}
                    <span className="font-medium text-gray-900">{totalCount}</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1.5 order-1 sm:order-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="hidden sm:flex items-center justify-center w-8 h-8 rounded-md border text-sm
                             font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  title="First page"
                >
                  «
                </button>

                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md border text-xs sm:text-sm font-medium
                             disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>

                <div className="hidden md:flex items-center gap-1">
                  {pageNumbers.map((n) => (
                    <button
                      key={n}
                      onClick={() => handlePageChange(n)}
                      className={`w-8 h-8 rounded-md border text-sm font-medium transition-colors ${
                        currentPage === n
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <div className="md:hidden px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 rounded-md border">
                  {currentPage} / {totalPages}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md border text-xs sm:text-sm font-medium
                             disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>

                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="hidden sm:flex items-center justify-center w-8 h-8 rounded-md border text-sm
                             font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  title="Last page"
                >
                  »
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── EDIT DRAWER ── */}
      {drawerOpen && currentCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeDrawer}
          />
          <div
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
            style={{ animation: 'slideInRight 0.25s ease both' }}
          >
            <div className="p-4 sm:p-6 border-b flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold">Edit Customer Status</h2>
              <button
                onClick={closeDrawer}
                className="p-1 bg-red-500 rounded hover:bg-red-600 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            <form className="flex-1 flex flex-col overflow-hidden" onSubmit={submitForm}>
              <div className="p-4 sm:p-6 flex-1 space-y-4 overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Customer ID
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentCustomer.customerId}
                    className="w-full border rounded-lg p-2.5 text-sm bg-gray-50 text-gray-600 cursor-not-allowed font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentCustomer.name}
                    className="w-full border rounded-lg p-2.5 text-sm bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    disabled
                    value={currentCustomer.email}
                    className="w-full border rounded-lg p-2.5 text-sm bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-black mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    required
                    className="w-full border-2 border-blue-300 rounded-lg p-2.5 text-sm bg-white outline-none
                               focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Only the status can be modified</p>
                </div>
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2 text-xs">
                    {submitError}
                  </div>
                )}
                <div className="pt-2 border-t text-xs text-gray-500 space-y-1">
                  <div>
                    <span className="font-semibold">Created: </span>
                    {new Date(currentCustomer.createdAt).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-semibold">Updated: </span>
                    {new Date(currentCustomer.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t flex gap-3">
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="flex-1 py-2.5 text-sm border rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || form.status === currentCustomer.status}
                  className="flex-1 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700
                             disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? 'Updating…' : 'Update Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
          background-size: 400% 100%;
          animation: shimmer 3.4s ease-in-out infinite;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0);    }
        }
      `}</style>
    </div>
  );
}