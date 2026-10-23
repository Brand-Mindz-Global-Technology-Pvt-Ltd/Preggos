import { Link } from "react-router-dom";
import { ChevronRight, Heart, ShoppingBag, UserRound } from "lucide-react";

export function MobileNavigation({ close }: { close: () => void }) {
  return (
    <>
      {/* Tap-outside backdrop */}
      <div
        className="fixed inset-0 top-[52px] z-40 bg-black/25 backdrop-blur-[2px] md:hidden"
        onClick={close}
        aria-hidden="true"
      />

      {/* Navigation Drawer */}
      <nav className="relative z-50 border-t border-slate-100 bg-white px-5 py-4 shadow-xl md:hidden">
        <div className="grid gap-1 font-bold text-[#12294a]">
          <Link
            to="/"
            onClick={close}
            className="flex items-center justify-between py-2.5 text-sm text-[#ef6241] border-b border-slate-100/60"
          >
            <span>Home</span>
            <ChevronRight size={15} />
          </Link>
          <Link
            to="/shop"
            onClick={close}
            className="flex items-center justify-between py-2.5 text-sm hover:text-[#ef6241] border-b border-slate-100/60"
          >
            <span>Shop All</span>
            <ChevronRight size={15} />
          </Link>
          <Link
            to="/shop?category=Nourish"
            onClick={close}
            className="flex items-center justify-between py-2.5 text-sm hover:text-[#ef6241] border-b border-slate-100/60"
          >
            <span>Mother Nutrition</span>
            <ChevronRight size={15} />
          </Link>
          <Link
            to="/shop?category=Celebrate"
            onClick={close}
            className="flex items-center justify-between py-2.5 text-sm hover:text-[#ef6241] border-b border-slate-100/60"
          >
            <span>Daughter Nutrition</span>
            <ChevronRight size={15} />
          </Link>
          <Link
            to="/about"
            onClick={close}
            className="flex items-center justify-between py-2.5 text-sm hover:text-[#ef6241] border-b border-slate-100/60"
          >
            <span>Our Story</span>
            <ChevronRight size={15} />
          </Link>
          <Link
            to="/contact"
            onClick={close}
            className="flex items-center justify-between py-2.5 text-sm hover:text-[#ef6241]"
          >
            <span>Contact Us</span>
            <ChevronRight size={15} />
          </Link>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-around text-xs text-[#50617a] font-medium">
          <Link to="/wishlist" onClick={close} className="flex flex-col items-center gap-1 hover:text-[#ef6241]">
            <Heart size={18} />
            <span>Wishlist</span>
          </Link>
          <Link to="/cart" onClick={close} className="flex flex-col items-center gap-1 hover:text-[#ef6241]">
            <ShoppingBag size={18} />
            <span>Bag</span>
          </Link>
          <Link to="/account" onClick={close} className="flex flex-col items-center gap-1 hover:text-[#ef6241]">
            <UserRound size={18} />
            <span>Account</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
export default MobileNavigation;
