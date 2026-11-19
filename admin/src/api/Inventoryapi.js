import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const inventoryApi = {
  getProducts: (params) => axios.get(`${API}/inventory/products`, { params }),

  getCategories: () => axios.get(`${API}/inventory/getcategory`),

  exportInventory: (params) =>
    axios.get(`${API}/inventory/export`, {
      params,
      responseType: "blob",
    }),
};
