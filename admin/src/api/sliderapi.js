import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchSliders = async () => {
  const { data } = await axios.get(`${API}/slider`, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const uploadSlider = async (formData) => {
  await axios.post(`${API}/slider/upload`, formData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteSlider = async (id) => {
  await axios.delete(`${API}/slider/${id}`, {
    headers: getAuthHeaders(),
  });
};
