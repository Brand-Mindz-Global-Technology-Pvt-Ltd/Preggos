import api from "./axios.js";

export const loginUser = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const registerUser = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};
export const forgotPasswordRequest = (email) => {
  return api.post("/auth/forgot-password", { email });
};

export const resetPasswordRequest = (token, password) => {
  return api.post(`/auth/reset-password/${token}`, { password });
};

export const getAdminProfile = (adminId) =>
  api.get(`/admin/${adminId}/profile`);

export const logoutUser = () => {
  localStorage.clear();
};
