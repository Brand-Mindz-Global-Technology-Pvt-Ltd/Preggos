export const tooltipStyle = {
  contentStyle: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 8,
    fontSize: 12,
  },
};

export const colorMap = {
  blue:    { text: "text-blue-600",    border: "border-blue-300"    },
  cyan:    { text: "text-cyan-600",    border: "border-cyan-300"    },
  emerald: { text: "text-emerald-600", border: "border-emerald-300" },
  teal:    { text: "text-teal-600",    border: "border-teal-300"    },
  purple:  { text: "text-purple-600",  border: "border-purple-300"  },
  orange:  { text: "text-orange-600",  border: "border-orange-300"  },
};

export const LegendDot = ({ color, label, value }) => (
  <div className="flex items-center gap-2">
    <span className={`h-2 w-2 rounded-full ${color}`} />
    <div className="flex flex-col leading-tight">
      <span className="text-xs text-slate-400">{label}</span>
      {value !== undefined && (
        <span className="font-semibold text-slate-800">{value}</span>
      )}
    </div>
  </div>
);