export const Skeleton = ({ className = "", style = {} }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`} style={style} />
);

export const StatCardSkeleton = () => (
  <div className="rounded-2xl p-4 bg-slate-100 animate-pulse">
    <div className="w-10 h-10 rounded-full bg-slate-200 mb-3" />
    <div className="h-4 w-24 bg-slate-200 rounded mb-2" />
    <div className="h-7 w-28 bg-slate-200 rounded mb-2" />
    <div className="h-3 w-36 bg-slate-200 rounded" />
  </div>
);

export const MonthCardSkeleton = () => (
  <div className="rounded-2xl bg-slate-100 p-4 animate-pulse flex items-center justify-between">
    <div>
      <div className="h-3 w-28 bg-slate-200 rounded mb-2" />
      <div className="h-8 w-36 bg-slate-200 rounded mb-2" />
      <div className="h-3 w-20 bg-slate-200 rounded" />
    </div>
    <div className="w-12 h-12 rounded-full bg-slate-200" />
  </div>
);

export const ChartSkeleton = ({ height = "220px" }) => (
  <div className="space-y-3">
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="w-full" style={{ height: `${Math.random() * 60 + 40}%` }} />
      ))}
    </div>
    <div className="flex gap-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
);

export const StockSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
    <div className="h-5 w-40 bg-slate-200 rounded mb-6" />
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-2xl p-4 bg-slate-100">
          <div className="w-9 h-9 rounded-full bg-slate-200 mb-3" />
          <div className="h-3 w-20 bg-slate-200 rounded mb-2" />
          <div className="h-7 w-14 bg-slate-200 rounded" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="rounded-xl bg-slate-100 p-4">
          <div className="h-4 w-32 bg-slate-200 rounded mb-3" />
          {[...Array(5)].map((_, j) => (
            <div key={j} className="flex justify-between mb-2">
              <div className="h-3 w-32 bg-slate-200 rounded" />
              <div className="h-3 w-10 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);