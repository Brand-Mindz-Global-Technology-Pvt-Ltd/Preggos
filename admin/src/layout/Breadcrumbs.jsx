import { Link, useLocation } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";
import { navItems } from "./navItems";

const labelMap = {};
const parentMap = {};

navItems.forEach(item => {
  if (item.to) {
    labelMap[item.to] = item.label;
  }

  item.children?.forEach(child => {
    labelMap[child.to] = child.label;
    parentMap[child.to] = item.label; 
  });
});

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const crumbs = [];
  if (labelMap[pathname]) {
    const parent = parentMap[pathname];
    if (parent) crumbs.push(parent); 
    crumbs.push(labelMap[pathname]); 
  }

  return (
    <nav className="mb-4 w-full overflow-x-auto">
      <ol className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-gray-700 text-sm whitespace-nowrap">
        <Home size={16} />

        {crumbs.map((label, index) => (
          <li key={label} className="flex items-center gap-1">
            <ChevronRight size={14} />
            {index === crumbs.length - 1 ? (
              <span className="font-semibold">{label}</span>
            ) : (
              <span>{label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
