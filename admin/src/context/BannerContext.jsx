import { createContext, useContext, useEffect, useState } from "react";
import {
    fetchBanners,
    uploadBanner,
    deleteBanner,
} from "../api/bannerapi.js";

const BannerContext = createContext(null);

export const BannerProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadBanners = async () => {
        try {
            setLoading(true);
            const data = await fetchBanners();
            setImages(data);
        } finally {
            setLoading(false);
        }
    };

    const addBanner = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        await uploadBanner(formData);
        await loadBanners();
    };

    const removeBanner = async (id) => {
        await deleteBanner(id);
        setImages((prev) => prev.filter((x) => x._id !== id));
    };

    useEffect(() => {
        loadBanners();
    }, []);

    return (
        <BannerContext.Provider
            value={{ images, loading, addBanner, removeBanner }}
        >
            {children}
        </BannerContext.Provider>
    );
};

export const useBanner = () => {
    const ctx = useContext(BannerContext);
    if (!ctx) {
        throw new Error("useBanner must be used inside BannerProvider");
    }
    return ctx;
};
