import { ArrowRight, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { homeAssets } from "../../../data/homeAssets";

export function ShopByNeed() {
  return (
    <section className="relative overflow-hidden bg-[#e8f4ff] px-4 pb-8 md:pb-12">
      {/*
        Top wave transition
        ───────────────────
        SVG path anchors to y=0 at BOTH x-ends so no straight cream gap
        appears between the Hero Banner and this section.  The wave dips
        to ~32 px at its deepest; the div is 44 px tall.
        Fill colour #FFFDF7 exactly matches HeroBanner bg.
      */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden"
        style={{ height: "0px" }}
        aria-hidden="true"
      >
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 44"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0 L1440 0 L1440 16 C1200 36 960 6 720 26 C480 44 240 12 0 30 Z"
            fill="#FFFDF7"
          />
        </svg>
      </div>

      {/* Decorative accents */}
      <svg
        className="home-doodle-drift absolute left-8 top-16 h-6 w-6 opacity-25"
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
      >
        <Star size={22} fill="#f8b817" />
      </svg>
      <svg
        className="home-doodle-drift absolute right-14 top-20 h-5 w-5 opacity-25"
        viewBox="0 0 25 25"
        fill="none"
        aria-hidden="true"
      >
        <Heart size={18} fill="#ef6241" />
      </svg>
      <svg
        className="home-doodle-drift absolute left-1/4 bottom-16 h-6 w-6 opacity-20"
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
      >
        <path d="M5 15 Q15 5 25 15" stroke="#14877f" strokeWidth="2" fill="none" />
      </svg>

      {/* Content — pt clears the 44 px wave */}
      <div className="relative z-10 mx-auto max-w-7xl text-center pt-12">
        <h2 data-scroll-reveal className="font-display text-3xl font-black text-[#102650] md:text-4xl">
          Shop By Need
        </h2>
        <p data-scroll-reveal className="mt-2 text-sm leading-6 text-[#172a4b] md:text-base">
          Find the right nutrition for every life stage.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6">
          {homeAssets.categories.map((category) => {
            const clip = category.clipTopPct;
            const fit  = category.objectFit;      // "contain" | "cover"
            const pos  = category.objectPosition; // e.g. "center top" | "center 25%"

            return (
              <Link
                key={category.title}
                to={`/shop?category=${category.title}`}
                data-scroll-reveal
                className="motion-category-card group relative"
              >
                {/* Organic-shaped coloured circle */}
                <div
                  className={`${category.color} relative aspect-square overflow-hidden rounded-[36%_64%_50%_50%] sm:rounded-[40%_60%_50%_40%] shadow-xs sm:shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md`}
                >
                  {/*
                    Per-image rendering strategy (all values from pixel analysis):

                    "contain" cards (Pregnancy, Postnatal, Lactation, Healthy Snacking):
                      • Absolute-positioned img, height=(100+clip)%, top=-clip%.
                      • overflow-hidden on parent physically clips the fragment rows
                        at the top of the PNG canvas (only needed for Healthy Snacking
                        which has a real transparent gap at row 47/441 ≈ 10.7 %).
                      • clip=0 for the other three (no fragment).

                    "cover" cards (Kids Nutrition, Women's Wellness):
                      • These PNGs have the stray figure directly connected to the
                        main subject with NO transparent gap, so row-clipping always
                        also clips the main subject's crown.
                      • object-cover fills the circle; object-position focuses the
                        viewport on the main subject area, pushing the tiny top
                        fragment out of the visible crop region.
                  */}
                  {fit === "contain" ? (
                    <img
                      src={category.image}
                      alt={category.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: pos }}
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={category.image}
                      alt={category.title}
                      className="absolute left-0 w-full object-contain p-1.5 pb-3.5 sm:p-2 sm:pb-4"
                      style={{
                        top:             clip > 0 ? `-${clip}%`      : "0%",
                        height:          clip > 0 ? `${100 + clip}%` : "100%",
                        objectPosition:  pos,
                      }}
                      loading="lazy"
                    />
                  )}
                </div>

                {/* White pill-shaped label */}
                <div className="absolute bottom-1 sm:bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[7.5px] xs:text-[8px] sm:text-[10px] font-bold shadow-md flex items-center gap-0.5 sm:gap-1.5 max-w-[96%] justify-center whitespace-nowrap">
                  <span className="truncate">{category.title}</span>
                  <ArrowRight className="shrink-0 rounded-full bg-[#ef6241] p-0.5 text-white" size={10} />
                </div>
              </Link>
            );
          })}
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
