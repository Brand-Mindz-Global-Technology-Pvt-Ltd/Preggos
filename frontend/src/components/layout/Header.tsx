import { useState } from "react";
import { Heart, Menu, Search, ShoppingCart, UserRound, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileNavigation } from "./MobileNavigation";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";

export function Header() {
  const [menu, setMenu] = useState(false);
  const { count } = useCart();
  const { ids } = useWishlist();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
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
          <Link className="border-b-2 border-[#ef6241] pb-1 text-[#ef6241]" to="/">Home</Link>
          <Link to="/shop">Shop <ChevronDown className="inline" size={11} /></Link>
          <Link to="/shop?category=Nourish">Mother <ChevronDown className="inline" size={11} /></Link>
          <Link to="/shop?category=Celebrate">Daughter <ChevronDown className="inline" size={11} /></Link>
          <Link to="/shop">Wellness <ChevronDown className="inline" size={11} /></Link>
          <Link to="/shop">Offers</Link>
          <Link to="/about">Our Story</Link>
        </nav>

        {/* Right: Search, Wishlist, Account, Cart */}
        <div className="flex items-center gap-2 sm:gap-3 text-[#12294a]">
          <div className="hidden items-center rounded-full border border-[#e3e3e3] px-3 py-1.5 md:flex">
            <input
              aria-label="Search products"
              placeholder="Search for healthy products..."
              className="w-28 md:w-32 lg:w-36 bg-transparent text-[10px] outline-none"
            />
            <Search size={14} />
          </div>
          <Link aria-label="Wishlist" className="relative p-1" to="/wishlist">
            <Heart size={18} className="sm:size-[19px]" />
            {ids.length > 0 && (
              <i className="absolute -right-1 -top-1 rounded-full bg-[#ef6241] px-1 text-[9px] not-italic text-white">
                {ids.length}
              </i>
            )}
          </Link>
          <Link aria-label="Account" className="hidden sm:block p-1" to="/account">
            <UserRound size={19} />
          </Link>
          <Link aria-label="Cart" className="relative p-1" to="/cart">
            <ShoppingCart size={18} className="sm:size-[19px]" />
            {count > 0 && (
              <i className="absolute -right-1 -top-1 rounded-full bg-[#ef6241] px-1 text-[9px] not-italic text-white">
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
