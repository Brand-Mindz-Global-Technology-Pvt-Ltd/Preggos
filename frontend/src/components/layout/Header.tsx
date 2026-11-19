import { useState } from "react";
import { Heart, Menu, Search, ShoppingCart, UserRound, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { MobileNavigation } from "./MobileNavigation";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";

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

const NAV_ITEMS: NavItem[] = [
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

export function Header() {
  const [menu, setMenu] = useState(false);
  const { count } = useCart();
  const { ids } = useWishlist();
  const location = useLocation();

  return (
    <header className="w-full bg-white shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-6 md:px-8 md:py-3">
        {/* Left: Hamburger Button (Mobile) + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="p-1 -ml-1 text-[#12294a] transition hover:text-[#ef6241] lg:hidden focus:outline-none"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link to="/" className="leading-none select-none">
            <span className="font-serif text-xl sm:text-2xl font-black text-[#12294a]">Preggos</span>
            <span className="block text-[6px] sm:text-[6.5px] font-bold tracking-[.17em] text-[#ef6241]">
              Nourish. Nurture. Together.
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-xs font-semibold text-[#12294a] lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(location.pathname, location.search);

            return (
              <div key={item.label} className="relative group py-1 flex items-center">
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 border-b-2 pb-0.5 transition-all duration-200 ease-out ${
                    active
                      ? "border-[#ef6241] text-[#ef6241]"
                      : "border-transparent text-[#12294a] hover:text-[#ef6241]"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <ChevronDown
                      size={11}
                      className="transition-transform duration-200 ease-out group-hover:rotate-180"
                    />
                  )}
                </Link>

                {item.children && (
                  <div className="invisible absolute top-full left-0 z-50 pt-2 opacity-0 translate-y-1.5 transition-all duration-200 ease-out group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="min-w-[190px] rounded-xl border border-slate-100 bg-white p-2 shadow-lg ring-1 ring-black/5">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="block rounded-lg px-3 py-2 text-xs font-medium text-[#12294a] transition-all duration-150 ease-out hover:bg-[#fff6f2] hover:text-[#ef6241] hover:translate-x-1"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Search, Wishlist, Account, Cart */}
        <div className="flex items-center gap-2 sm:gap-3 text-[#12294a]">
          <div className="hidden items-center rounded-full border border-[#e3e3e3] px-3 py-1.5 md:flex transition-all duration-200 focus-within:border-[#ef6241]/60 focus-within:ring-2 focus-within:ring-[#ef6241]/10">
            <input
              aria-label="Search products"
              placeholder="Search for healthy products..."
              className="w-28 md:w-32 lg:w-36 bg-transparent text-[10px] outline-none"
            />
            <Search size={14} className="transition-colors duration-200" />
          </div>
          <Link aria-label="Wishlist" className="relative p-1 group transition-transform duration-150 active:scale-95" to="/wishlist">
            <Heart size={18} className="sm:size-[19px] transition-transform duration-200 ease-out group-hover:scale-110" />
            {ids.length > 0 && (
              <i className="absolute -right-1 -top-1 rounded-full bg-[#ef6241] px-1 text-[9px] not-italic text-white transition-transform duration-200">
                {ids.length}
              </i>
            )}
          </Link>
          <Link aria-label="Account" className="hidden sm:block p-1 group transition-transform duration-150 active:scale-95" to="/profile">
            <UserRound size={19} className="transition-transform duration-200 ease-out group-hover:scale-110" />
          </Link>
          <Link aria-label="Cart" className="relative p-1 group transition-transform duration-150 active:scale-95" to="/cart">
            <ShoppingCart size={18} className="sm:size-[19px] transition-transform duration-200 ease-out group-hover:scale-110" />
            {count > 0 && (
              <i className="absolute -right-1 -top-1 rounded-full bg-[#ef6241] px-1 text-[9px] not-italic text-white transition-transform duration-200">
                {count}
              </i>
            )}
          </Link>
        </div>
      </div>
      {menu && <MobileNavigation close={() => setMenu(false)} />}
    </header>
  );
}
