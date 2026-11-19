// src/context/CategoryContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const adminId = JSON.parse(localStorage.getItem("admin"))?.id;

    const getAuthToken = () => {
        return localStorage.getItem("token");
    };

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all categories
    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = getAuthToken();
            const response = await fetch(`${API_BASE_URL}/category/${adminId}/get-category`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch categories");
            const result = await response.json();
            setCategories(result.data || result);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching categories:", err);
        } finally {
            setLoading(false);
        }
    };

    // Create category
    const createCategory = async (categoryData) => {
        setLoading(true);
        setError(null);
        try {
            const token = getAuthToken();
            const formDataToSend = new FormData();
            formDataToSend.append("name", categoryData.name);
            formDataToSend.append("slug", categoryData.slug);
            formDataToSend.append("status", categoryData.status);
            formDataToSend.append("metaTitle", categoryData.metaTitle || "");

            if (categoryData.parentId) {
                formDataToSend.append("parentId", categoryData.parentId);
            }
            if (categoryData.image) {
                formDataToSend.append("image", categoryData.image);
            }

            const response = await fetch(`${API_BASE_URL}/category/${adminId}/create-category`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formDataToSend,
            });

            if (!response.ok) throw new Error("Already Store Category Name");
            await fetchCategories(true);
            return true;
        } catch (err) {
            setError(err.message);
            console.error("Error creating category:", err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Update category
    const updateCategory = async (id, categoryData) => {
        setLoading(true);
        setError(null);
        try {
            const token = getAuthToken();
            const formDataToSend = new FormData();
            formDataToSend.append("name", categoryData.name);
            formDataToSend.append("slug", categoryData.slug);
            formDataToSend.append("status", categoryData.status);
            formDataToSend.append("metaTitle", categoryData.metaTitle || "");

            if (categoryData.parentId) {
                formDataToSend.append("parentId", categoryData.parentId);
            }
            if (categoryData.image) {
                formDataToSend.append("image", categoryData.image);
            }

            const response = await fetch(`${API_BASE_URL}/category/${adminId}/update/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formDataToSend,
            });

            if (!response.ok) throw new Error("Failed to update category");
            await fetchCategories(true);
            return true;
        } catch (err) {
            setError(err.message);
            console.error("Error updating category:", err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Delete category
    const deleteCategory = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const token = getAuthToken();
            const response = await fetch(`${API_BASE_URL}/category/${adminId}/delete/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Failed to delete category");
            await fetchCategories(true);
            return true;
        } catch (err) {
            setError(err.message);
            console.error("Error deleting category:", err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider
            value={{
                categories,
                loading,
                error,
                fetchCategories,
                createCategory,
                updateCategory,
                deleteCategory,
             
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategoryContext must be used within CategoryProvider");
    }
    return context;
};