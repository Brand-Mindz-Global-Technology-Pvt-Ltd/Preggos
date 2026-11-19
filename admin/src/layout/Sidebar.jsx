
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut, X, ChevronDown, ChevronRight } from "lucide-react";
import axios from "axios";
import defaultLogo from "../assets/Imgaes/full.png";
import { navItems } from "./navItems";

export default function Sidebar({ onClose, onLogout }) {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const [logo, setLogo] = useState(defaultLogo);
  const [logoLoading, setLogoLoading] = useState(true);

  const admin = JSON.parse(localStorage.getItem("admin"));
  const adminId = admin?.id;
  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_BASE_URL = `${BASE_URL}/settings`;

  const withAdminId = (path) =>
    adminId ? `${path}?id=${adminId}` : path;

  // Fetch company logo
  useEffect(() => {
    const fetchCompanyLogo = async () => {
      if (!adminId) {
        setLogoLoading(false);
        return;
      }
      try {
        setLogoLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/getcompany/${adminId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        if (response.data.success && response.data.data?.logo) {
          setLogo(response.data.data.logo);
        }
      } catch (err) {
        console.error('Error fetching company logo:', err);
      } finally {
        setLogoLoading(false);
      }
    };
    fetchCompanyLogo();
  }, [adminId, token]);

  useEffect(() => {
    const activeParent = navItems.find(item =>
      item.children?.some(child => location.pathname === child.to)
    );
    if (activeParent) setOpenMenu(activeParent.label);
  }, [location.pathname]);

  const toggleMenu = (label) => {
    setOpenMenu(prev => (prev === label ? null : label));
  };

  return (
    <aside className="h-screen w-64 sm:w-72 lg:w-64 xl:w-72 bg-white border-r border-slate-200 flex flex-col">

      {/* ================= LOGO HEADER ================= */}
      <header className="h-16 sm:h-18 lg:h-20 flex items-center justify-center relative border-b border-slate-200">
        {logoLoading ? (
          <div className="h-16 sm:h-15 lg:h-16 w-40 bg-slate-200 animate-pulse rounded-md" />
        ) : (
          <div className="h-16 flex items-center">
            <img
              src={logo || defaultLogo}
              alt="Company Logo"
              className="max-h-full w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = defaultLogo;
              }}
            />
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute right-3 sm:right-4 lg:hidden text-slate-500 hover:text-slate-700 
                     p-1 hover:bg-slate-100 rounded-md transition-colors"
          aria-label="Close sidebar"
        >
          <X size={20} className="sm:w-6 sm:h-6 text-red-600" />
        </button>
      </header>

      {/* ================= NAVIGATION ITEMS ================= */}
      <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div className="space-y-1.5 sm:space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isOpen = openMenu === item.label;
            const hasActiveChild = item.children?.some(
              c => c.to === location.pathname
            );

            if (!item.children) {
              return (
                <NavLink
                  key={item.label}
                  to={withAdminId(item.to)}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center justify-between gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 
                    rounded-lg text-sm sm:text-base lg:text-base font-medium transition-all duration-200
                    transform hover:translate-x-1
                    ${isActive
                      ? "bg-[#162A78] text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`
                  }
                >
                  <span className="flex items-center gap-3 sm:gap-4">
                    <Icon size={18} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  <ChevronRight
                    size={16}
                    className="sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                  />
                </NavLink>
              );
            }

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`group w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 
                    rounded-lg text-sm sm:text-base lg:text-base font-medium transition-all duration-200
                    transform hover:translate-x-1
                    ${hasActiveChild
                      ? "bg-[#162A78] text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`}
                >
                  <span className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <Icon size={18} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`sm:w-5 sm:h-5 transition-all duration-300 flex-shrink-0 ml-2
                      ${isOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </button>

                {/* Animated Submenu with smooth height transition */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="ml-8 sm:ml-10 lg:ml-11 mt-1.5 sm:mt-2 space-y-1">
                    {item.children.map((child, index) => (
                      <NavLink
                        key={child.label}
                        to={withAdminId(child.to)}
                        onClick={onClose}
                        style={{
                          transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                        }}
                        className={({ isActive }) =>
                          `group flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-md 
                          text-sm sm:text-base transition-all duration-200
                          transform hover:translate-x-1 hover:scale-[1.02]
                          ${isActive
                            ? "bg-slate-100 text-[#162A78] font-medium"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`
                        }
                      >
                        <span className="truncate block">{child.label}</span>
                        <ChevronRight
                          size={14}
                          className="sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                        />
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* ================= SIGN OUT BUTTON (BOTTOM) ================= */}
      <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50/50">
        <button
          onClick={onLogout}
          className="group w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3
                     text-sm sm:text-base lg:text-base font-medium text-white bg-red-500
                     hover:bg-red-600 rounded-lg 
                     transition-all duration-200 border border-transparent hover:border-red-200
                     transform hover:scale-[1.02] active:scale-95"
        >
          <LogOut size={18} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5 flex-shrink-0 transition-transform duration-200 " />
          <span className="truncate">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}