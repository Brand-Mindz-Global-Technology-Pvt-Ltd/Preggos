import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#f2f7fc] px-4 py-8 text-[#142b4d] sm:px-6 md:px-8 md:py-9 overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-6 text-xs grid-cols-2 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
        {/* Brand Intro Column */}
        <div className="col-span-2 sm:col-span-1">
          <div className="font-serif text-2xl font-black">
            Preggos<span className="text-[#f45a1b]">.</span>
          </div>
          <p className="mt-2 max-w-[280px] leading-5 text-[#6c7482]">
            Wholesome nutrition for mothers and daughters. Made with love, science and traditional wisdom.
          </p>
        </div>

        {/* Shop Column */}
        <div>
          <h3 className="font-black text-sm">Shop</h3>
          <div className="mt-2 grid gap-1.5 text-[#6c7482]">
            <Link to="/shop">All Products</Link>
            <Link to="/shop?category=Nourish">For Mom</Link>
            <Link to="/shop?category=Celebrate">For Daughter</Link>
            <Link to="/shop">Best Sellers</Link>
            <Link to="/shop">Bundles</Link>
          </div>
        </div>

        {/* About Column */}
        <div>
          <h3 className="font-black text-sm">About</h3>
          <div className="mt-2 grid gap-1.5 text-[#6c7482]">
            <Link to="/about">Our Story</Link>
            <Link to="/about">Ingredients</Link>
            <Link to="/about">Why Preggos</Link>
            <Link to="/about">Blog</Link>
          </div>
        </div>

        {/* Help Column */}
        <div>
          <h3 className="font-black text-sm">Help</h3>
          <div className="mt-2 grid gap-1.5 text-[#6c7482]">
            <Link to="/contact">Contact Us</Link>
            <Link to="/shipping">Shipping &amp; Delivery</Link>
            <Link to="/shipping">Returns &amp; Refunds</Link>
            <Link to="/contact">FAQ</Link>
          </div>
        </div>

        {/* Follow Us & Badges Column */}
        <div className="col-span-2 sm:col-span-1">
          <h3 className="font-black text-sm">Follow Us</h3>
          <div className="mt-2 flex gap-3 text-[#142b4d]">
            <a href="#" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube size={16} />
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-lg bg-white px-2.5 py-1.5 font-bold text-[#188b81] shadow-2xs">
              100% Natural
            </span>
            <span className="rounded-lg bg-white px-2.5 py-1.5 font-bold text-[#ef6241] shadow-2xs">
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
          <Link to="/shipping">Privacy Policy</Link> · <Link to="/shipping">Terms &amp; Conditions</Link>
        </span>
      </div>
    </footer>
  );
}
export default Footer;
