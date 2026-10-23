import { ArrowRight, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { homeAssets } from "../../../data/homeAssets";

export function ShopByNeed() {
  return (
    <section className="relative overflow-hidden bg-[#e8f4ff] px-4 py-8 md:py-12">
      {/* Top wave transition */}
      <div className="absolute top-0 left-0 right-0 h-12 overflow-hidden md:h-16" aria-hidden="true">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 70 C180 45 360 85 540 65 C720 45 900 80 1080 60 C1200 48 1320 65 1440 55 L1440 0 L0 0 Z"
            fill="#fff8ee"
          />
        </svg>
      </div>

      {/* Decorative accents */}
      <svg
        className="absolute left-10 top-16 h-8 w-8 opacity-20"
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
      >
        <Star size={24} fill="#f8b817" />
      </svg>
      <svg
        className="absolute right-16 top-20 h-6 w-6 opacity-20"
        viewBox="0 0 25 25"
        fill="none"
        aria-hidden="true"
      >
        <Heart size={20} fill="#ef6241" />
      </svg>
      <svg
        className="absolute left-1/4 bottom-20 h-8 w-8 opacity-15"
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
      >
        <path d="M5 15 Q15 5 25 15" stroke="#14877f" strokeWidth="2" fill="none" />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl text-center pt-8">
        <h2 className="font-display text-3xl font-black text-[#102650] md:text-4xl">
          Shop By Need
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#172a4b] md:text-base">
          Find the right nutrition for every life stage.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6">
          {homeAssets.categories.map((category) => (
            <Link
              key={category.title}
              to={`/shop?category=${category.title}`}
              className="group relative"
            >
              {/* Organic-shaped background */}
              <div
                className={`${category.color} relative aspect-square flex items-center justify-center overflow-hidden rounded-[36%_64%_50%_50%] sm:rounded-[40%_60%_50%_40%] shadow-xs sm:shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md`}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-contain p-2 pb-3.5 sm:p-2 sm:pb-4"
                  loading="lazy"
                />
              </div>

              {/* White pill-shaped label */}
              <div className="absolute bottom-1 sm:bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[7.5px] xs:text-[8px] sm:text-[10px] font-bold shadow-md flex items-center gap-0.5 sm:gap-1.5 max-w-[96%] justify-center whitespace-nowrap">
                <span className="truncate">{category.title}</span>
                <ArrowRight className="shrink-0 rounded-full bg-[#ef6241] p-0.5 text-white" size={10} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden md:h-16" aria-hidden="true">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 30 C180 55 360 15 540 35 C720 55 900 20 1080 40 C1200 52 1320 35 1440 45 L1440 100 L0 100 Z"
            fill="#fffdfb"
          />
        </svg>
      </div>
    </section>
  );
}
