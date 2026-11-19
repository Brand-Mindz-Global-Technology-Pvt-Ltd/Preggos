import { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, FileText } from "lucide-react";
import { exportCSV, exportJSON } from "./Exportutils.jsx";

const ExportButton = ({ data }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm border border-slate-200 px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-50 transition-colors"
      >
        Export
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-50 overflow-hidden">
          {[
            { label: "Export as CSV",  icon: Download, action: () => exportCSV(data)  },
            { label: "Export as JSON", icon: FileText,  action: () => exportJSON(data) },
          ].map(({ label, icon: Icon, action }) => (
            <button
              key={label}
              onClick={() => { action(); setOpen(false); }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Icon className="w-4 h-4 text-slate-400" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExportButton;