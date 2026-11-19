import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchSliders,
  uploadSlider,
  deleteSlider,
} from "../api/sliderapi.js";

const SliderContext = createContext(null);

export const SliderProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await fetchSliders();
      setImages(data);
    } finally {
      setLoading(false);
    }
  };

  const addImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    await uploadSlider(formData);
    await loadImages();
  };

  const removeImage = async (id) => {
    await deleteSlider(id);
    setImages((prev) => prev.filter((x) => x._id !== id));
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <SliderContext.Provider
      value={{ images, loading, addImage, removeImage }}
    >
      {children}
    </SliderContext.Provider>
  );
};

export const useSlider = () => {
  const ctx = useContext(SliderContext);
  if (!ctx) {
    throw new Error("useSlider must be used inside SliderProvider");
  }
  return ctx;
};
