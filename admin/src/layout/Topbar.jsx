


import { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Languages,
  Menu,
  LogOut,
  User,
  X
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../layout/navItems";
import { useProfile } from "../context/ProfileContext";

const DEFAULT_AVATAR =
  "https://randomuser.me/api/portraits/men/32.jpg";

function findTitle(pathname) {
  for (const item of navItems) {
    if (item.to && pathname.startsWith(item.to)) {
      return item.label;
    }
    if (item.children) {
      const child = item.children.find(c =>
        pathname.startsWith(c.to)
      );
      if (child) return child.label;
    }
  }
  return "Dashboard";
}

export default function Topbar({ onMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, role, username, loading } = useProfile();
  const [openSearch, setOpenSearch] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [mobileFilteredItems, setMobileFilteredItems] = useState([]);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const title = useMemo(
    () => findTitle(location.pathname),
    [location.pathname]
  );

  /* -------------------- GET ADMIN ID -------------------- */
  const getAdminId = () => {
    try {
      const admin = JSON.parse(localStorage.getItem("admin") || "{}");
      return admin.id || "";
    } catch (err) {
      console.error("Failed to get admin ID:", err);
      return "";
    }
  };

  /* -------------------- FLATTEN NAV ITEMS -------------------- */
  const allNavItems = useMemo(() => {
    const items = [];
    navItems.forEach(item => {
      if (item.to) {
        items.push({ label: item.label, to: item.to });
      }
      if (item.children) {
        item.children.forEach(child => {
          items.push({ label: child.label, to: child.to });
        });
      }
    });
    return items;
  }, []);

  /* -------------------- DESKTOP SEARCH FILTER -------------------- */
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allNavItems.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [searchQuery, allNavItems]);

  /* -------------------- MOBILE SEARCH FILTER -------------------- */
  useEffect(() => {
    if (mobileSearchQuery.trim()) {
      const filtered = allNavItems.filter(item =>
        item.label.toLowerCase().includes(mobileSearchQuery.toLowerCase())
      );
      setMobileFilteredItems(filtered);
    } else {
      setMobileFilteredItems([]);
    }
  }, [mobileSearchQuery, allNavItems]);

  /* -------------------- CLICK OUTSIDE -------------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setFilteredItems([]);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* -------------------- LOGOUT -------------------- */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login", { replace: true });
  };

  const handleProfileNavigate = () => {
    try {
      const admin = JSON.parse(localStorage.getItem("admin") || "{}");
      if (!admin.id) return;
      navigate(`/admin/profile?id=${admin.id}`);
      setOpenProfile(false);
    } catch (err) {
      console.error("Failed to navigate to profile:", err);
    }
  };

  /* -------------------- HANDLE SEARCH NAVIGATION -------------------- */
  const handleSearchNavigation = (path) => {
    const adminId = getAdminId();
    if (adminId) {
      navigate(`${path}?id=${adminId}`);
    } else {
      navigate(path);
    }
    setSearchQuery("");
    setFilteredItems([]);
  };

  /* -------------------- HANDLE MOBILE SEARCH NAVIGATION -------------------- */
  const handleMobileSearchNavigation = (path) => {
    const adminId = getAdminId();
    if (adminId) {
      navigate(`${path}?id=${adminId}`);
    } else {
      navigate(path);
    }
    setMobileSearchQuery("");
    setMobileFilteredItems([]);
    setOpenSearch(false);
  };

  /* -------------------- CLOSE MOBILE SEARCH -------------------- */
  const closeMobileSearch = () => {
    setOpenSearch(false);
    setMobileSearchQuery("");
    setMobileFilteredItems([]);
  };

  /* -------------------- SAFE DATA EXTRACTION -------------------- */
  const profileImage =
    profile?.profileImage?.url || DEFAULT_AVATAR;

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 rounded-lg flex items-center px-2 sticky top-0 z-30">
        {/* ===== Left ===== */}
        <div className="flex items-center gap-2 min-w-0 p-4">
          {onMenu && (
            <button
              onClick={onMenu}
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-xl hover:bg-slate-100"
            >
              <Menu size={20} />
            </button>
          )}
          <h1
            className="
    text-sm
    sm:text-base
    md:text-lg
    font-semibold
    text-slate-800
    max-w-[180px]
    sm:max-w-none
    overflow-hidden
    text-ellipsis
    whitespace-nowrap
  "
          >
            {title}
          </h1>


        </div>

        {/* ===== Center Search (Desktop) ===== */}
        <div className="hidden md:flex flex-1 justify-center p-4" ref={searchRef}>
          <div className="relative w-full max-w-md">
            <div className="flex items-center w-full bg-blue-50 rounded-full px-4 py-1.5 border border-transparent focus-within:border-blue-600 transition-colors">
              <span className="flex items-center justify-center mr-2 p-2 rounded-full bg-blue-600 text-white">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="bg-transparent outline-none text-sm w-full placeholder-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>


            {/* Search Results Dropdown (Desktop) */}
            {filteredItems.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-slate-200 z-50 max-h-64 overflow-y-auto">
                {filteredItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchNavigation(item.to)}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                  >
                    <Search size={16} className="text-slate-400" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ===== Right ===== */}
        <div className="flex items-center gap-4 min-w-0 justify-end p-4">
          <button
            onClick={() => setOpenSearch(true)}
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-full  hover:bg-slate-100"
          >
            <Search size={18} />
          </button>

          <button
            className="
    hidden sm:flex items-center gap-2
    px-3 py-1.5
    text-sm font-medium text-slate-700
    bg-slate-200 rounded-full
    hover:bg-slate-300
    transition-colors duration-200
  "
          >
            <span className="flex items-center justify-center p-1.5 rounded-full bg-blue-600 text-white">
              <Languages size={16} />
            </span>

            <span>Eng (US)</span>
          </button>
          {/* ===== Profile Dropdown ===== */}
          <div className="relative" ref={profileRef}>
            <div
              onClick={() => setOpenProfile(p => !p)}
              className="flex items-center gap-2 cursor-pointer rounded-lg p-1 hover:bg-slate-100 select-none"
            >
              <img
                src={profileImage}
                alt="Admin"
                className="h-9 w-9 rounded-lg object-cover"
              />

              <div className="hidden md:block leading-tight">
                <p className="text-sm font-medium text-slate-800">
                  {loading ? "Loading..." : username?.slice(0, 20) || ""}
                </p>
                <p className="text-xs text-slate-500">
                  {role || "Admin"}
                </p>
              </div>

              <ChevronDown
                size={14}
                className={`hidden md:block transition-transform ${openProfile ? "rotate-180" : ""
                  }`}
              />
            </div>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden">
                <button
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-100"
                  onClick={handleProfileNavigate}
                >
                  <User size={16} className="text-slate-500" />
                  <span className="font-medium">Profile</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ===== Mobile Search Overlay ===== */}
      {openSearch && (
        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          onClick={closeMobileSearch}
        >
          <div
            className="bg-white w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Search Header */}
            <div className="flex items-center gap-3 p-4 border-b border-slate-200">
              <Search size={18} className="text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search here..."
                className="flex-1 outline-none text-sm"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
              />
              <button
                onClick={closeMobileSearch}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100"
              >
                <X size={18} className="text-slate-600" />
              </button>
            </div>

            {/* Mobile Search Results */}
            <div className="flex-1 overflow-y-auto bg-slate-50">
              {mobileFilteredItems.length > 0 ? (
                <div className="p-4 space-y-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-2 mb-3">
                    Search Results ({mobileFilteredItems.length})
                  </p>
                  {mobileFilteredItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleMobileSearchNavigation(item.to)}
                      className="flex items-center gap-4 w-full px-4 py-3.5 text-sm text-slate-700 bg-white hover:bg-blue-50 hover:border-blue-200 border border-slate-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
                    >
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:scale-110 transition-transform duration-200">
                        <Search size={18} />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {item.label}
                        </span>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Navigate to {item.label}
                        </p>
                      </div>
                      <ChevronDown
                        size={16}
                        className="text-slate-400 -rotate-90 group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </button>
                  ))}
                </div>
              ) : mobileSearchQuery.trim() ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
                    <div className="relative h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200">
                      <Search size={36} className="text-slate-400" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2">
                    No results found
                  </h3>
                  <p className="text-sm text-slate-500 max-w-xs">
                    We couldn't find any pages matching{" "}
                    <span className="font-medium text-slate-700">
                      "{mobileSearchQuery}"
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 mt-3">
                    Try using different keywords or check your spelling
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                    <div className="relative h-20 w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                      <Search size={36} className="text-blue-500" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2">
                    Search Navigation
                  </h3>
                  <p className="text-sm text-slate-500 max-w-xs mb-6">
                    Type to search across Dashboard, Products, Orders, and more...
                  </p>

                  {/* Popular Searches */}
                  <div className="w-full max-w-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                      Quick Access
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['Dashboard', 'Products', 'Orders', 'Customers'].map((label) => {
                        const navItem = allNavItems.find(item => item.label === label);
                        return navItem ? (
                          <button
                            key={label}
                            onClick={() => handleMobileSearchNavigation(navItem.to)}
                            className="px-4 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors duration-200 border border-blue-200"
                          >
                            {label}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
