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
  return <header className="sticky top-0 z-40 bg-white">
    <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
      <button className="md:hidden" aria-label="Open navigation" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      <Link to="/" className="mr-auto leading-none"><span className="font-serif text-2xl font-black text-[#12294a]">Preggos</span><span className="block text-[6px] font-bold tracking-[.17em] text-[#ef6241]">Nourish. Nurture. Together.</span></Link>
      <nav className="hidden items-center gap-6 text-xs font-bold text-[#12294a] lg:flex"><Link className="border-b-2 border-[#ef6241] pb-1 text-[#ef6241]" to="/">Home</Link><Link to="/shop">Shop <ChevronDown className="inline" size={11} /></Link><Link to="/shop?category=Nourish">Mother <ChevronDown className="inline" size={11} /></Link><Link to="/shop?category=Celebrate">Daughter <ChevronDown className="inline" size={11} /></Link><Link to="/shop">Wellness <ChevronDown className="inline" size={11} /></Link><Link to="/shop">Offers</Link><Link to="/about">Our Story</Link></nav>
      <div className="flex items-center gap-3 text-[#12294a]"><div className="hidden items-center rounded-full border border-[#e3e3e3] px-3 py-2 xl:flex"><input aria-label="Search products" placeholder="Search for healthy products..." className="w-32 bg-transparent text-[10px] outline-none" /><Search size={14} /></div><Link aria-label="Wishlist" className="relative" to="/wishlist"><Heart size={19} />{ids.length > 0 && <i className="absolute -right-2 -top-2 rounded-full bg-[#ef6241] px-1 text-[9px] not-italic text-white">{ids.length}</i>}</Link><Link aria-label="Account" className="hidden sm:block" to="/account"><UserRound size={19} /></Link><Link aria-label="Cart" className="relative" to="/cart"><ShoppingCart size={19} />{count > 0 && <i className="absolute -right-2 -top-2 rounded-full bg-[#ef6241] px-1 text-[9px] not-italic text-white">{count}</i>}</Link></div>
    </div>{menu && <MobileNavigation close={() => setMenu(false)} />}
  </header>;
}
