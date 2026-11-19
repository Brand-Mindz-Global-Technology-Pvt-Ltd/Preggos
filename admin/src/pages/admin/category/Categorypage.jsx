import { useState, useCallback } from "react";
import { CategoryProvider, useCategoryContext } from "../../../context/CategoryContext";
import CategoryTreeView from "../category/CategoryTreeView";
import CategoryForm from "../category/CategoryForm";

const CategoryListContent = () => {
  const { error } = useCategoryContext();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleFormSuccess = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  return (
    <div className="min-h-screen p-2 lg:p-2">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        <CategoryTreeView
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        <CategoryForm
          selectedCategory={selectedCategory}
          onSuccess={handleFormSuccess}
          onCancel={handleFormSuccess}
        />
      </div>
    </div>
  );
};

const CategoryPage = () => (
  <CategoryProvider>
    <CategoryListContent />
  </CategoryProvider>
);

export default CategoryPage;