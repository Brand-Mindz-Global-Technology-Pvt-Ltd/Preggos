import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeAssets } from "../../../data/homeAssets";

// Pixel-accurate vector silhouettes recreated from Figma reference
const categoryCards = [
  {
    title: "Pregnancy",
    image: homeAssets.categories[0].image,
    color: "#b79df1",
    arrowColor: "#6f42c1",
    // Organic blob with prominent right lobe and smooth lower contour
    blobPath:
      "M 100 36 C 120 36 136 42 152 54 C 170 68 186 82 188 102 C 190 122 178 140 166 150 C 152 161 134 166 116 167 C 98 168 78 167 62 163 C 44 158 26 148 18 133 C 10 118 14 100 18 86 C 22 70 32 54 46 44 C 62 34 82 36 100 36 Z",
    accents: (
      <>
        <path
          d="M 23 105 C 22 122 28 138 42 150"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 152 58 C 168 70 180 86 181 102"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
    imageWrapperStyle: "h-full w-full flex items-end justify-center pb-1 sm:pb-2",
    imgStyle: {
      height: "92%",
      width: "auto",
      maxHeight: "92%",
      objectFit: "contain" as const,
      objectPosition: "center bottom",
    },
  },
  {
    title: "Postnatal",
    image: homeAssets.categories[1].image,
    color: "#fdada8",
    arrowColor: "#f0556a",
    // Postnatal blob: asymmetric arch peaked to the right, double-bump on the left
    blobPath:
      "M 98 34 C 114 32 134 30 150 40 C 166 50 178 66 182 86 C 186 106 188 128 178 144 C 168 158 148 166 128 167 C 108 168 88 167 68 164 C 48 160 30 151 22 136 C 14 122 18 106 19 92 C 20 78 18 64 28 52 C 40 38 68 36 98 34 Z",
    accents: (
      <>
        <path
          d="M 24 74 C 20 90 22 108 26 126"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 134 33 C 152 38 168 52 174 70"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
    imageWrapperStyle: "h-full w-full flex items-end justify-center pb-1 sm:pb-2",
    imgStyle: {
      height: "94%",
      width: "auto",
      maxHeight: "94%",
      objectFit: "contain" as const,
      objectPosition: "center bottom",
    },
  },
  {
    title: "Lactation Support",
    image: homeAssets.categories[2].image,
    color: "#fec461",
    arrowColor: "#f37021",
    // Lactation Support: broad high left shoulder, scalloped wave lobes along right
    blobPath:
      "M 92 34 C 112 34 130 38 146 48 C 162 58 174 72 176 88 C 178 100 168 110 174 122 C 180 134 180 144 170 154 C 158 164 138 167 118 168 C 98 169 76 167 58 162 C 40 156 24 146 18 132 C 12 118 14 100 16 84 C 18 68 24 52 38 42 C 54 32 72 34 92 34 Z",
    accents: (
      <>
        <path
          d="M 40 46 C 30 60 26 78 28 98"
          stroke="#ea8d10"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 148 50 C 162 60 170 72 172 88"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
    imageWrapperStyle: "h-full w-full flex items-end justify-center pb-1 sm:pb-2",
    imgStyle: {
      height: "94%",
      width: "auto",
      maxHeight: "94%",
      objectFit: "contain" as const,
      objectPosition: "center bottom",
    },
  },
  {
    title: "Healthy Snacking",
    image: homeAssets.categories[3].image,
    color: "#b4d4bb",
    arrowColor: "#389e3a",
    // Healthy Snacking: gentle upper dip with twin rounded crests
    blobPath:
      "M 100 44 C 114 38 132 34 150 38 C 168 44 180 58 184 76 C 188 96 182 116 172 132 C 162 148 146 160 128 165 C 110 169 90 169 72 165 C 54 160 38 149 28 134 C 18 116 18 94 22 74 C 26 56 40 40 58 36 C 74 34 88 40 100 44 Z",
    accents: (
      <>
        <path
          d="M 46 30 C 42 24 48 18 54 22 C 58 26 54 34 46 30 Z"
          fill="#389e3a"
          opacity="0.75"
        />
        <path
          d="M 144 38 C 160 44 174 58 176 76"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
    imageWrapperStyle: "h-full w-full flex items-center justify-center pt-2 pb-2",
    imgStyle: {
      height: "82%",
      width: "auto",
      maxHeight: "82%",
      objectFit: "contain" as const,
      clipPath: "inset(11% 0% 0% 0%)",
      transform: "translateY(3%)",
    },
  },
  {
    title: "Kids Nutrition",
    image: homeAssets.categories[4].image,
    color: "#ffcf86",
    arrowColor: "#f7b928",
    // Kids Nutrition: broad chest shape with left shoulder, waist, and lower flare
    blobPath:
      "M 98 34 C 116 34 134 36 150 44 C 166 54 176 68 178 86 C 180 102 172 116 174 130 C 176 144 168 156 154 163 C 138 170 118 168 98 168 C 78 168 58 170 42 163 C 28 155 18 142 18 126 C 18 110 24 96 22 80 C 20 64 26 48 42 38 C 58 30 78 34 98 34 Z",
    accents: (
      <>
        <g stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" opacity="0.95">
          <line x1="148" y1="20" x2="154" y2="10" />
          <line x1="164" y1="26" x2="176" y2="18" />
          <line x1="174" y1="36" x2="188" y2="32" />
          <path d="M 180 44 L 188 42 L 184 50" fill="none" strokeWidth="2" />
        </g>
        <path
          d="M 24 82 C 26 98 22 114 20 128"
          stroke="#ea8d10"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
      </>
    ),
    imageWrapperStyle: "h-full w-full flex items-end justify-center pb-1 sm:pb-2",
    imgStyle: {
      height: "90%",
      width: "auto",
      maxHeight: "90%",
      objectFit: "contain" as const,
      clipPath: "inset(9% 0% 0% 0%)",
      transform: "translateY(2%)",
    },
  },
  {
    title: "Women's Wellness",
    image: homeAssets.categories[5].image,
    color: "#b8d3f1",
    arrowColor: "#1e70c8",
    // Women's Wellness: asymmetric curve rising to top right lobe, indented waist
    blobPath:
      "M 96 36 C 114 34 134 32 152 42 C 170 52 180 70 178 92 C 176 108 166 118 170 132 C 174 146 166 158 152 164 C 136 170 118 168 98 168 C 78 168 58 170 42 163 C 28 156 20 144 18 128 C 16 112 20 96 22 80 C 24 64 34 48 52 38 C 66 32 80 36 96 36 Z",
    accents: (
      <>
        <g stroke="#1e70c8" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9">
          <path d="M 156 22 C 162 15 170 12 178 10" />
          <path d="M 168 30 C 176 24 184 22 192 22" />
          <path d="M 176 42 C 184 38 192 38 198 42" />
        </g>
        <path
          d="M 174 68 C 166 88 168 110 174 128"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
    imageWrapperStyle: "h-full w-full flex items-end justify-center pb-1 sm:pb-2",
    imgStyle: {
      height: "92%",
      width: "auto",
      maxHeight: "92%",
      objectFit: "contain" as const,
      clipPath: "inset(10% 0% 0% 0%)",
      transform: "translateY(2%)",
    },
  },
];

export function ShopByNeed() {
  return (
    <section className="relative overflow-hidden bg-[#e8f3fd] px-3 pt-6 pb-14 sm:px-6 sm:pt-8 sm:pb-16 md:px-8 md:pt-10 md:pb-20">
      {/* Top wave transition */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-6 sm:h-8 md:h-10 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 0 0 L 1440 0 L 1440 18 C 1200 32 960 8 720 24 C 480 38 240 14 0 28 Z"
            fill="#e8f3fd"
          />
        </svg>
      </div>

      {/* Decorative doodle: Fluttering Purple Butterfly on top-left */}
      <div className="pointer-events-none absolute left-6 top-10 sm:left-12 sm:top-14 md:left-20 md:top-16 opacity-75">
        <svg width="26" height="26" viewBox="0 0 30 30" fill="none">
          <path
            d="M 14 15 C 10 9, 3 8, 4 15 C 5 21, 12 18, 14 16 Z"
            stroke="#9b6b9e"
            strokeWidth="2"
            fill="#e2c8ed"
            opacity="0.8"
          />
          <path
            d="M 16 15 C 20 9, 27 8, 26 15 C 25 21, 18 18, 16 16 Z"
            stroke="#9b6b9e"
            strokeWidth="2"
            fill="#e2c8ed"
            opacity="0.8"
          />
          <path d="M 14 17 C 14 13, 16 13, 16 17" stroke="#7c4a80" strokeWidth="2" strokeLinecap="round" />
          <path d="M 13 12 C 11 9, 9 9, 8 10" stroke="#7c4a80" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 17 12 C 19 9, 21 9, 22 10" stroke="#7c4a80" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Decorative doodle: Golden Sparkle Star between Card 1 and 2 */}
      <div className="pointer-events-none absolute left-[27%] top-12 sm:top-14 md:top-16 opacity-80">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M 12 2 Q 12 12, 2 12 Q 12 12, 12 22 Q 12 12, 22 12 Q 12 12, 12 2 Z"
            stroke="#f5b82e"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="#fef08a"
            fillOpacity="0.6"
          />
        </svg>
      </div>

      {/* Decorative doodle: Flying Red/Pink Heart with looped trail on right */}
      <div className="pointer-events-none absolute right-[28%] top-10 sm:top-12 md:top-14 opacity-85">
        <svg width="70" height="35" viewBox="0 0 80 40" fill="none">
          <path
            d="M 5 28 C 15 28, 22 10, 32 10 C 40 10, 42 26, 32 30 C 24 32, 26 18, 45 16 C 55 14, 62 16, 68 18"
            stroke="#f472b6"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />
          <path
            d="M 68 18 C 68 15, 65 13, 62 15 C 60 17, 60 20, 68 26 C 76 20, 76 17, 74 15 C 71 13, 68 15, 68 18 Z"
            fill="#f43f5e"
            stroke="#e11d48"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Section Content */}
      <div className="relative z-10 mx-auto max-w-[1360px] text-center">
        {/* Heading: Hand-drawn script font (Caveat) */}
        <h2
          data-scroll-reveal
          className="text-4xl sm:text-5xl md:text-[54px] font-bold text-[#102650] leading-tight tracking-normal"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          Shop By Need
        </h2>
        {/* Subtitle: Plus Jakarta Sans */}
        <p
          data-scroll-reveal
          className="mt-1 text-sm sm:text-base font-medium text-[#172a4b]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Find the right nutrition for every life stage.
        </p>

        {/* 6 Cards Row: On desktop (lg+), exact 6-column layout matching reference */}
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-6 lg:gap-4 xl:gap-5">
          {categoryCards.map((category) => {
            return (
              <Link
                key={category.title}
                to={`/shop?category=${encodeURIComponent(category.title)}`}
                data-scroll-card
                className="group relative flex flex-col items-center justify-start transition-transform duration-300 hover:-translate-y-1.5 focus:outline-none"
              >
                {/* Vector silhouette card container */}
                <div className="relative aspect-square w-full max-w-[195px] drop-shadow-sm transition-all duration-300 group-hover:drop-shadow-md">
                  {/* SVG Shape Background & Accents */}
                  <svg
                    viewBox="0 0 200 200"
                    className="absolute inset-0 h-full w-full overflow-visible"
                    aria-hidden="true"
                  >
                    <path
                      d={category.blobPath}
                      fill={category.color}
                      className="transition-colors duration-300"
                    />
                    {category.accents}
                  </svg>

                  {/* Cutout Photograph placed naturally over the blob */}
                  <div className={`absolute inset-0 z-10 overflow-hidden ${category.imageWrapperStyle}`}>
                    <img
                      src={category.image}
                      alt={category.title}
                      style={category.imgStyle}
                      loading="lazy"
                      className="pointer-events-none select-none transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* White pill-shaped label centered at the bottom of the card */}
                <div className="relative z-20 -mt-3.5 flex items-center justify-center gap-1 sm:gap-1.5 rounded-full bg-white px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-[0_4px_14px_rgba(16,38,80,0.12)] border border-slate-100/80 transition-all duration-200 group-hover:shadow-[0_6px_18px_rgba(16,38,80,0.18)] group-hover:border-slate-200 whitespace-nowrap">
                  <span
                    className="text-[10.5px] xs:text-[11px] sm:text-xs font-bold text-[#102650] tracking-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {category.title}
                  </span>
                  <span
                    className="flex h-[18px] w-[18px] sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full text-white shadow-xs transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ backgroundColor: category.arrowColor }}
                  >
                    <ArrowRight size={11} strokeWidth={2.8} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom wave transition */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 sm:h-12 md:h-14 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 0 20 C 240 38 480 15 720 28 C 960 42 1200 18 1440 30 L 1440 60 L 0 60 Z"
            fill="#FFFDF7"
          />
        </svg>
      </div>
    </section>
  );
}
