
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";
import { useAuth } from "../context/Authcontext";
import { ProfileProvider } from "../context/ProfileContext";
import Breadcrumbs from "./Breadcrumbs";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#EEF1FF]">
      <aside className="hidden md:flex w-64 shrink-0">
        <Sidebar onLogout={handleLogout} />
      </aside>

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          bg-white shadow-xl
          transform transition-transform duration-300
          md:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
        />
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col p-2 min-w-0  overflow-y-scroll ">
        <ProfileProvider>
          <Topbar onMenu={() => setSidebarOpen(true)} />
          <main className="flex-1 px-2 md:px-2 py-4">
            <Breadcrumbs/>
            <div>
              <Outlet />
            </div>
          </main>
        </ProfileProvider>

      </div>
    </div>
  );
}
