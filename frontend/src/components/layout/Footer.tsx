import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#f2f7fc] px-4 py-8 text-[#142b4d] sm:px-6 md:px-8 md:py-9 overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-6 text-xs grid-cols-2 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
        {/* Brand Intro Column */}
        <div data-scroll-card className="col-span-2 sm:col-span-1">
          <div className="font-serif text-2xl font-black">
            Preggos<span className="text-[#f45a1b]">.</span>
          </div>
          <p className="mt-2 max-w-[280px] leading-5 text-[#6c7482]">
            Wholesome nutrition for mothers and daughters. Made with love, science and traditional wisdom.
          </p>
        </div>

        {/* Shop Column */}
        <div data-scroll-card>
          <h3 className="font-black text-sm">Shop</h3>
          <div className="mt-2 grid gap-1.5 text-[#6c7482]">
            <Link to="/shop" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">All Products</Link>
            <Link to="/shop?category=Nourish" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">For Mom</Link>
            <Link to="/shop?category=Celebrate" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">For Daughter</Link>
            <Link to="/shop" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">Best Sellers</Link>
            <Link to="/shop" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">Bundles</Link>
          </div>
        </div>

        {/* About Column */}
        <div data-scroll-card>
          <h3 className="font-black text-sm">About</h3>
          <div className="mt-2 grid gap-1.5 text-[#6c7482]">
            <Link to="/about" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">Our Story</Link>
            <Link to="/about" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">Ingredients</Link>
            <Link to="/about" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">Why Preggos</Link>
            <Link to="/about" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">Blog</Link>
          </div>
        </div>

        {/* Help Column */}
        <div data-scroll-card>
          <h3 className="font-black text-sm">Help</h3>
          <div className="mt-2 grid gap-1.5 text-[#6c7482]">
            <Link to="/contact" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">Contact Us</Link>
            <Link to="/shipping" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">Shipping &amp; Delivery</Link>
            <Link to="/shipping" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">Returns &amp; Refunds</Link>
            <Link to="/contact" className="transition-all duration-150 ease-out hover:text-[#f45a1b] hover:translate-x-1 inline-block">FAQ</Link>
          </div>
        </div>

        {/* Follow Us & Badges Column */}
        <div data-scroll-card className="col-span-2 sm:col-span-1">
          <h3 className="font-black text-sm">Follow Us</h3>
          <div className="mt-2 flex gap-3 text-[#142b4d]">
            <a href="#" aria-label="Facebook" className="p-1 rounded-full bg-white/70 transition-all duration-200 ease-out hover:text-[#ef6241] hover:scale-115 active:scale-95 shadow-2xs hover:shadow-xs">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="p-1 rounded-full bg-white/70 transition-all duration-200 ease-out hover:text-[#ef6241] hover:scale-115 active:scale-95 shadow-2xs hover:shadow-xs">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="YouTube" className="p-1 rounded-full bg-white/70 transition-all duration-200 ease-out hover:text-[#ef6241] hover:scale-115 active:scale-95 shadow-2xs hover:shadow-xs">
              <Youtube size={16} />
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-lg bg-white px-2.5 py-1.5 font-bold text-[#188b81] shadow-2xs transition-transform duration-200 ease-out hover:-translate-y-0.5">
              100% Natural
            </span>
            <span className="rounded-lg bg-white px-2.5 py-1.5 font-bold text-[#ef6241] shadow-2xs transition-transform duration-200 ease-out hover:-translate-y-0.5">
              Made in India
            </span>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-[#6c7482]">
            Secure Payments · UPI · Visa · Mastercard · RuPay
          </p>
        </div>
      </div>

      <div className="mx-auto mt-7 flex max-w-7xl flex-col gap-2 border-t border-slate-200/60 pt-4 text-[10px] text-[#6c7482] sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Preggos. All Rights Reserved.</span>
        <span>
          <Link to="/shipping" className="transition-colors hover:text-[#ef6241]">Privacy Policy</Link> · <Link to="/shipping" className="transition-colors hover:text-[#ef6241]">Terms &amp; Conditions</Link>
        </span>
      </div>
    </footer>
  );
}
export default Footer;
