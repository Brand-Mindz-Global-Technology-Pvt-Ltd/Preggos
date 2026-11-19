import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Heart, ShoppingBag, UserRound } from "lucide-react";

interface NavChild {
  name: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  isActive: (pathname: string, search: string) => boolean;
  children?: NavChild[];
}

const MOBILE_NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
    isActive: (pathname) => pathname === "/",
  },
  {
    label: "Shop",
    href: "/shop",
    isActive: (pathname, search) => {
      const params = new URLSearchParams(search);
      return pathname === "/shop" && !params.get("category") && params.get("offers") !== "true";
    },
    children: [
      { name: "All Products", href: "/shop" },
      { name: "Mother Nutrition", href: "/shop?category=Nourish" },
      { name: "Kids Nutrition", href: "/shop?category=Celebrate" },
      { name: "Wellness & Rest", href: "/shop?category=Nest" },
      { name: "Special Offers", href: "/shop?offers=true" },
    ],
  },
  {
    label: "Mother",
    href: "/shop?category=Nourish",
    isActive: (pathname, search) =>
      pathname === "/shop" && new URLSearchParams(search).get("category")?.toLowerCase() === "nourish",
    children: [
      { name: "All Mother Products", href: "/shop?category=Nourish" },
      { name: "The Pregnancy Ritual Kit", href: "/product/ritual-kit" },
      { name: "Belly Love Butter", href: "/product/belly-butter" },
      { name: "Hydration Drops", href: "/product/hydration" },
    ],
  },
  {
    label: "Kids",
    href: "/shop?category=Celebrate",
    isActive: (pathname, search) =>
      pathname === "/shop" && new URLSearchParams(search).get("category")?.toLowerCase() === "celebrate",
    children: [
      { name: "All Kids Products", href: "/shop?category=Celebrate" },
      { name: "Little One Welcome Box", href: "/product/little-box" },
      { name: "Bump to Baby Cards", href: "/product/milestone-cards" },
    ],
  },
  {
    label: "Wellness",
    href: "/shop?category=Nest",
    isActive: (pathname, search) =>
      pathname === "/shop" && new URLSearchParams(search).get("category")?.toLowerCase() === "nest",
    children: [
      { name: "All Wellness Products", href: "/shop?category=Nest" },
      { name: "Rest & Nest Pillow", href: "/product/rest-nest" },
    ],
  },
  {
    label: "Offers",
    href: "/shop?offers=true",
    isActive: (pathname, search) =>
      pathname === "/shop" && new URLSearchParams(search).get("offers") === "true",
  },
  {
    label: "Our Story",
    href: "/our-story",
    isActive: (pathname) => pathname === "/our-story" || pathname === "/about",
  },
  {
    label: "Contact Us",
    href: "/contact",
    isActive: (pathname) => pathname === "/contact",
  },
];

export function MobileNavigation({ close }: { close: () => void }) {
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Prevent background scrolling while the mobile navigation drawer is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const toggleExpand = (label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {/* Tap-outside backdrop with smooth fade */}
      <div
        className="fixed inset-0 top-[52px] z-40 bg-black/25 backdrop-blur-[2px] lg:hidden preggos-fade-in transition-opacity duration-200"
        onClick={close}
        aria-hidden="true"
      />

      {/* Navigation Drawer with smooth slide-down entrance */}
      <nav className="relative z-50 max-h-[calc(100vh-52px)] overflow-y-auto border-t border-slate-100 bg-white px-5 py-4 shadow-xl lg:hidden animate-drawer-down">
        <div className="grid gap-1 font-semibold text-[#12294a]">
          {MOBILE_NAV_ITEMS.map((item, index) => {
            const active = item.isActive(location.pathname, location.search);
            const isExpanded = expandedItem === item.label;

            return (
              <div
                key={item.label}
                style={{ animationDelay: `${index * 30}ms` }}
                className="border-b border-slate-100/60 last:border-b-0 preggos-fade-in"
              >
                <div className="flex items-center justify-between py-2.5 text-sm">
                  <Link
                    to={item.href}
                    onClick={close}
                    className={`flex-1 transition-colors duration-150 active:scale-[0.99] hover:text-[#ef6241] ${
                      active ? "font-bold text-[#ef6241]" : "text-[#12294a]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>

                  {item.children ? (
                    <button
                      type="button"
                      onClick={(e) => toggleExpand(item.label, e)}
                      aria-label={`Toggle ${item.label} submenu`}
                      className="p-1 -mr-1 text-slate-400 hover:text-[#ef6241] transition-transform active:scale-90"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ease-out ${
                          isExpanded ? "rotate-180 text-[#ef6241]" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={close}
                      className="p-1 -mr-1 text-slate-300 hover:text-[#ef6241] transition-colors active:scale-90"
                      aria-label={`Go to ${item.label}`}
                    >
                      <ChevronRight size={15} />
                    </Link>
                  )}
                </div>

                {/* Submenu accordion with smooth expand entrance */}
                {item.children && isExpanded && (
                  <div className="mb-2 rounded-lg border border-slate-100 bg-[#fbfcfd] p-1.5 pl-3 animate-accordion-down">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        onClick={close}
                        className="block py-1.5 text-xs font-medium text-[#50617a] transition-all duration-150 hover:text-[#ef6241] hover:translate-x-1"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-around text-xs text-[#50617a] font-medium">
          <Link to="/wishlist" onClick={close} className="flex flex-col items-center gap-1 transition-all duration-150 hover:text-[#ef6241] hover:-translate-y-0.5 active:scale-95">
            <Heart size={18} />
            <span>Wishlist</span>
          </Link>
          <Link to="/cart" onClick={close} className="flex flex-col items-center gap-1 transition-all duration-150 hover:text-[#ef6241] hover:-translate-y-0.5 active:scale-95">
            <ShoppingBag size={18} />
            <span>Bag</span>
          </Link>
          <Link to="/profile" onClick={close} className="flex flex-col items-center gap-1 transition-all duration-150 hover:text-[#ef6241] hover:-translate-y-0.5 active:scale-95">
            <UserRound size={18} />
            <span>Account</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
export default MobileNavigation;
