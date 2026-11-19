import { ChevronDown, FolderTree, Pencil, Trash2 } from "lucide-react";

const CategoryTreeItem = ({ 
  cat, 
  expandedParents, 
  toggleParent, 
  onSelect, 
  onDelete, 
  selectedCategory 
}) => {
  const isExpanded = expandedParents[cat._id || cat.id];

  return (
    <li>
      {/* Parent Category */}
      <div className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
        <div
          className="flex items-center gap-2.5 cursor-pointer flex-1"
          onClick={() => toggleParent(cat._id || cat.id)}
        >
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
          {cat.image?.url ? (
            <img
              src={cat.image.url}
              alt={cat.name}
              className="w-8 h-8 rounded-full object-contain "
              loading="lazy"
            />
          ) : (
            <div className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center">
              <FolderTree size={14} className="text-slate-400" />
            </div>
          )}
          <span className="text-sm font-medium text-slate-800">{cat.name}</span>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(cat);
            }}
            className="p-1.5 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Pencil size={15} className="text-blue-600" />
          </button>
          <button
            onClick={(e) => onDelete(cat, e)}
            className="p-1.5 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 size={15} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Children */}
      {isExpanded && cat.children?.length > 0 && (
        <ul className="ml-8 mt-1 space-y-1">
          {cat.children.map((child) => (
            <li
              key={child._id || child.id}
              className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                selectedCategory?._id === child._id
                  ? "bg-blue-50 border border-blue-200"
                  : "hover:bg-slate-50"
              }`}
              onClick={() => onSelect(child)}
            >
              <div className="flex items-center gap-2.5 flex-1">
                {child.image?.url ? (
                  <img
                    src={child.image.url}
                    alt={child.name}
                    className="w-8 h-8 object-contain rounded-full"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-5 h-5 bg-slate-200 rounded flex items-center justify-center">
                    <FolderTree size={12} className="text-blue-600" />
                  </div>
                )}
                <span
                  className={`text-sm ${
                    selectedCategory?._id === child._id
                      ? "text-blue-600 font-medium"
                      : "text-blue-700"
                  }`}
                >
                  {child.name}
                </span>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(child);
                  }}
                  className="p-1.5 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Pencil size={14} className="text-blue-600" />
                </button>
                <button
                  onClick={(e) => onDelete(child, e)}
                  className="p-1.5 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 size={14} className="text-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryTreeItem;