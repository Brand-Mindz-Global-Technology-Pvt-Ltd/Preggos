import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const fetchBanners = async () => {
  const { data } = await axios.get(`${API}/banner/getbannerimage`, {
    headers: authHeaders(),
  });
  return data;
};

export const uploadBanner = async (formData) => {
  await axios.post(`${API}/banner/upload/bannerimage`, formData, {
    headers: {
      ...authHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteBanner = async (id) => {
  await axios.delete(`${API}/banner/bannerimage/${id}`, {
    headers: authHeaders(),
  });
};
