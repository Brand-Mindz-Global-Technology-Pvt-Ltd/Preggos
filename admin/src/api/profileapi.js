import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// Profile API methods
export const profileAPI = {
  getProfile: async (adminId) => {
    const response = await api.get(`/admin/${adminId}/profile`);
    return response.data?.data || response.data?.admin || response.data || {};
  },
  // Update admin profile
  updateProfile: async (adminId, formData) => {
    const response = await api.put(`/admin/${adminId}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data?.data || response.data?.admin || response.data || {};
  },
  // Change password
  changePassword: async (adminId, passwordData) => {
    const response = await api.put(
      `/admin/${adminId}/change-password`,
      passwordData
    );
    return response.data;
  },
  
};

export default api;
