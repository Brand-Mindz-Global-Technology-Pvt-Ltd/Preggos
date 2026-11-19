import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  LayoutGrid,
  Package,
  Boxes,
  Settings2,
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Customers", to: "/admin/customer", icon: Users },
  {
    label: "Category",
    icon: LayoutGrid,
    to: "/admin/category",
  },

  {
    label: "Products",
    to: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    to: "/admin/orders",
  },
  { label: "Inventory", to: "/admin/inventory", icon: Boxes },

  {
    label: "CMS",
    icon: LayoutGrid,
    children: [
      { label: "Home Slider", to: "/admin/cms/home-slider" },
      { label: "Banners", to: "/admin/cms/banners" },
    ],

  },

  { label: "Profile", to: "/admin/profile", icon: Users },
  { label: "Settings", to: "/admin/settings", icon: Settings2 },
];
