
import { useState, useEffect, useRef } from "react";
import { Plus, Upload } from "lucide-react";
import { useCategoryContext } from "../../../context/CategoryContext";
import CategoryBulkUploadModal from "./CategoryBulkUploadModal";

const CategoryForm = ({ selectedCategory, onSuccess, onCancel }) => {
  const { categories, loading, createCategory, updateCategory } = useCategoryContext();
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const isInitialMount = useRef(true);

  const generateSlug = (value) =>
    value.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const capitalizeFirstLetter = (value = "") => {
    if (!value) return "";
    return value[0].toUpperCase() + value.slice(1);
  };

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parentId: "",
    status: "active",
    metaTitle: "",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    if (selectedCategory) {
      setFormData({
        name: selectedCategory.name,
        slug: selectedCategory.slug || generateSlug(selectedCategory.name),
        parentId: selectedCategory.parentId || "",
        status: selectedCategory.status || "active",
        metaTitle: selectedCategory.metaTitle || "",
        image: null,
        imagePreview: selectedCategory.image?.url || "",
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        parentId: "",
        status: "active",
        metaTitle: "",
        image: null,
        imagePreview: "",
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (formData.name && !selectedCategory) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(formData.name),
      }));
    }
  }, [formData.name, selectedCategory]);

  // Flatten categories for dropdown
  const flattenCategories = (cats, level = 0) => {
    let result = [];
    cats.forEach((cat) => {
      result.push({ ...cat, level });
      if (cat.children?.length) {
        result = [...result, ...flattenCategories(cat.children, level + 1)];
      }
    });
    return result;
  };

  const flatCategories = flattenCategories(categories);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Category name is required");
      return;
    }

    const categoryData = {
      name: formData.name,
      slug: formData.slug,
      parentId: formData.parentId || null,
      status: formData.status,
      metaTitle: formData.metaTitle,
      image: formData.image,
    };

    let success;
    if (selectedCategory) {
      success = await updateCategory(
        selectedCategory._id || selectedCategory.id,
        categoryData
      );
    } else {
      success = await createCategory(categoryData);
    }

    if (success) {
      setFormData({
        name: "",
        slug: "",
        parentId: "",
        status: "active",
        metaTitle: "",
        image: null,
        imagePreview: "",
      });
      onSuccess();
    }
  };

  const handleBulkUploadClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Bulk Upload button clicked");
    setIsBulkOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setIsBulkOpen(false);
  };

  const handleBulkSuccess = () => {
    console.log("Bulk upload success");
    setIsBulkOpen(false);
    onSuccess();
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            {selectedCategory ? "Edit Category" : "Create Category"}
          </h2>
          {!selectedCategory && (
            <button
              type="button"
              onClick={handleBulkUploadClick}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload size={18} />
              Bulk Upload
            </button>
          )}
        </div>

        <div className="space-y-5">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  name: capitalizeFirstLetter(value),
                }));
              }}
              placeholder="e.g., Electronics"
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="auto-generated-slug"
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Parent Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Parent Category
            </label>
            <select
              name="parentId"
              value={formData.parentId}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Create New Category</option>
              {flatCategories
                .filter((c) => c.level === 0)
                .map((c) => (
                  <option key={c._id || c.id} value={c._id || c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Image Upload
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
                accept="image/*"
                className="hidden"
              />
              <label htmlFor="image" className="cursor-pointer">
                <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                <p className="text-sm text-slate-600">
                  Upload here or{" "}
                  <span className="text-blue-600 hover:text-blue-700">
                    browse
                  </span>
                </p>
              </label>
              {formData.imagePreview && (
                <div className="mt-3">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="max-h-32 mx-auto rounded"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        image: null,
                        imagePreview: "",
                      }))
                    }
                    className="text-xs text-red-500 hover:text-red-600 mt-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Status
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-slate-700">Active</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-slate-700">Inactive</span>
              </label>
            </div>
          </div>

          {/* Meta Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              placeholder="SEO Meta Title"
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading
                ? "Processing..."
                : selectedCategory
                ? "Update"
                : "Save"}{" "}
              Category
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 border border-slate-300 text-slate-700 py-2.5 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Upload Modal */}
      <CategoryBulkUploadModal
        isOpen={isBulkOpen}
        onClose={handleCloseModal}
        onSuccess={handleBulkSuccess}
      />
    </>
  );
};

export default CategoryForm;