import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API = `${BASE_URL}/dashboard`;

const SECTIONS = ["sales", "satisfaction", "volume", "revenue", "products"];

const ENDPOINTS = {
  sales:        { endpoint: "sales-summary",         delay: 800  },
  satisfaction: { endpoint: "customer-satisfaction", delay: 1200 },
  volume:       { endpoint: "volume-service",        delay: 1600 },
  revenue:      { endpoint: "revenue",               delay: 2000 },
  products:     { endpoint: "top-products",          delay: 2400 },
};

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [loading, setLoading] = useState(
    Object.fromEntries(SECTIONS.map((k) => [k, true]))
  );
  const [data, setData] = useState(
    Object.fromEntries(SECTIONS.map((k) => [k, null]))
  );

  useEffect(() => {
    const fetchSection = async (key) => {
      const { endpoint, delay } = ENDPOINTS[key];
      try {
        const { data: json } = await axios.get(`${API}/${endpoint}`);
        setTimeout(() => {
          setData((d) => ({ ...d, [key]: json }));
          setLoading((l) => ({ ...l, [key]: false }));
        }, delay);
      } catch (err) {
        console.error(`[${key}] axios error:`, err.response?.data?.message || err.message);
        setTimeout(() => setLoading((l) => ({ ...l, [key]: false })), delay);
      }
    };

    SECTIONS.forEach(fetchSection);
  }, []);

  return (
    <DashboardContext.Provider value={{ loading, data }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside <DashboardProvider>");
  return ctx;
};