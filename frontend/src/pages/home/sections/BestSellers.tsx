import { ArrowRight, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { demoProducts } from "../../../data/demoProducts";
import { useCart } from "../../../contexts/CartContext";
import { useWishlist } from "../../../contexts/WishlistContext";
import { formatCurrency } from "../../../utils/formatCurrency";
import { homeAssets } from "../../../data/homeAssets";

const BADGES = [
  { label: "BESTSELLER", bg: "bg-[#F15A24]" },
  { label: "MOM'S FAVOURITE", bg: "bg-[#137333]" },
  { label: "NEW", bg: "bg-[#0B63CE]" },
  { label: "KIDS LOVE IT", bg: "bg-[#D93671]" },
];

const RATINGS = [
  { score: "4.9", count: "245" },
  { score: "4.8", count: "198" },
  { score: "4.9", count: "213" },
  { score: "4.8", count: "167" },
];

export function BestSellers() {
  const { add } = useCart();
  const { has, toggle } = useWishlist();

  return (
    <section className="relative overflow-hidden bg-[#FFFDFB] px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      {/* Background Decorative Sprigs matching reference */}
      <div className="pointer-events-none absolute -left-6 top-0 hidden h-32 w-32 md:block" aria-hidden="true">
        <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
          <path
            d="M -20 20 C 30 15 80 45 100 80 C 110 95 115 110 115 130"
            stroke="#FBAF3C"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.35"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute bottom-4 -left-2 z-0 hidden sm:block" aria-hidden="true">
        <img
          src={homeAssets.leaves.pink}
          alt=""
          className="home-doodle-drift h-20 w-20 object-contain"
        />
      </div>

      <div className="pointer-events-none absolute -right-2 bottom-6 z-0 hidden sm:block" aria-hidden="true">
        <img
          src={homeAssets.leaves.gold}
          alt=""
          className="home-doodle-drift h-24 w-24 object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header: Centered Title + Subtitle with Top-Right "View All Products →" */}
        <div className="relative mb-8 sm:mb-10">
          <div className="text-center">
            <h2 data-scroll-reveal className="font-display text-3xl font-black tracking-tight text-[#0C2340] sm:text-4xl">
              Bestsellers You’ll Love{" "}
              <svg
                className="-mt-1 ml-1 inline-block rotate-6 text-[#F15A24]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h2>
            <p data-scroll-reveal className="mt-1.5 text-xs font-medium text-[#50617A] sm:text-sm">
              Customer favorites for happy, healthy homes
            </p>
          </div>

          <div data-scroll-reveal className="mt-3 text-center sm:absolute sm:right-0 sm:bottom-1 sm:mt-0 sm:text-right">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-1 text-xs font-bold text-[#F15A24] transition hover:text-[#D84B18] sm:text-sm"
            >
              <span>View All Products</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid: 2 per row on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {demoProducts.slice(0, 4).map((p, i) => {
            const badge = BADGES[i % BADGES.length];
            const rating = RATINGS[i % RATINGS.length];

            return (
              <article
                key={p.id}
                data-scroll-card
                className="motion-product-card group relative flex flex-col justify-between rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-5 shadow-[0_4px_24px_rgba(16,38,80,0.06)] border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(16,38,80,0.12)]"
              >
                <div>
                  {/* Top-left Badge and Top-right Wishlist Heart */}
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`inline-block rounded px-1.5 py-0.5 text-[8px] sm:text-[9.5px] font-bold uppercase tracking-wider text-white shadow-xs truncate max-w-[80%] ${badge.bg}`}
                    >
                      {badge.label}
                    </span>
                    <button
                      type="button"
                      aria-label={`Save ${p.name}`}
                      onClick={() => toggle(p.id)}
                      className="rounded-full p-0.5 sm:p-1 text-[#102650] transition hover:scale-110"
                    >
                      <Heart
                        size={15}
                        strokeWidth={2}
                        fill={has(p.id) ? "#F15A24" : "none"}
                        className={`sm:h-[17px] sm:w-[17px] ${has(p.id) ? "text-[#F15A24]" : "text-[#102650] hover:text-[#F15A24]"}`}
                      />
                    </button>
                  </div>

                  {/* Centered Product Image */}
                  <Link
                    to={`/product/${p.id}`}
                    className="my-2 sm:my-3 flex h-28 sm:h-44 w-full items-center justify-center overflow-hidden"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      width="500"
                      height="400"
                      className="h-full w-full object-contain object-center drop-shadow-sm"
                      loading="lazy"
                      onError={(event) => {
                        if (event.currentTarget.src !== homeAssets.hero.src) {
                          event.currentTarget.src = homeAssets.hero.src;
                        }
                      }}
                    />
                  </Link>

                  {/* Product Name */}
                  <Link to={`/product/${p.id}`} className="block">
                    <h3 className="line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] text-xs font-bold text-[#0C2340] sm:text-base transition hover:text-[#F15A24]">
                      {p.name}
                    </h3>
                  </Link>

                  {/* Short Description */}
                  <p className="mt-0.5 sm:mt-1 line-clamp-2 min-h-[26px] sm:min-h-[32px] text-[10px] sm:text-xs leading-snug sm:leading-relaxed text-[#50617A]">
                    {p.description}
                  </p>

                  {/* Rating: Stars, Numeric Rating & Reviews */}
                  <div className="mt-1.5 sm:mt-2.5 flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#0C2340]">
                    <div className="flex items-center text-[#F59E0B]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={11} fill="currentColor" stroke="none" className="sm:h-[13px] sm:w-[13px]" />
                      ))}
                    </div>
                    <span className="truncate">
                      {rating.score}{" "}
                      <span className="font-semibold text-[#50617A]">({rating.count})</span>
                    </span>
                  </div>

                  {/* Product Price */}
                  <div className="mt-1 sm:mt-2 text-sm font-black text-[#0C2340] sm:text-xl">
                    {formatCurrency(p.price)}
                  </div>
                </div>

                {/* Full-width Orange Add to Cart Button */}
                <button
                  type="button"
                  onClick={() => add(p)}
                  className="mt-2.5 sm:mt-4 flex w-full items-center justify-center gap-1 rounded-lg sm:rounded-xl bg-[#F15A24] py-1.5 sm:py-2.5 text-[11px] sm:text-sm font-bold text-white shadow-sm transition hover:bg-[#D84B18] hover:shadow-md active:scale-[0.98]"
                >
                  <span>Add to Cart</span>
                  <ArrowRight size={13} className="stroke-[2.5] sm:h-3.5 sm:w-3.5" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default BestSellers;
