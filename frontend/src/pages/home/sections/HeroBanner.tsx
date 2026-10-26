import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroMomDaughter from "../../../assets/images/home/hero-mom-daughter.png";
import greenLeaf from "../../../assets/images/home/leaf-png/green-leaf.png";
import goldLeaf from "../../../assets/images/home/leaf-png/gold-leaf.png";

export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFDF7] text-[#0C2340]">
      {/* 1440 x 360 reference proportion container */}
      <div className="relative mx-auto min-h-[195px] xs:min-h-[225px] sm:min-h-[280px] md:min-h-[360px] w-full max-w-[1440px]">
        {/* ======================================================== */}
        {/* GROUP: Decorations                                       */}
        {/* ======================================================== */}
        {/* 1. Large partial yellow sun in top-left corner */}
        <div className="pointer-events-none absolute -left-10 -top-10 z-0 h-28 w-28 sm:-left-8 sm:-top-8 sm:h-44 sm:w-44 select-none">
          <svg viewBox="0 0 160 160" fill="none" className="h-full w-full">
            <circle cx="10" cy="10" r="120" fill="#FBAF3C" />
            <circle cx="10" cy="10" r="132" stroke="#F5A623" strokeWidth="2.5" fill="none" opacity="0.85" />
          </svg>
        </div>

        {/* 2. Left Teal Botanical Leaf decoration (green-leaf.png) */}
        <div className="pointer-events-none absolute -left-1 sm:left-0 bottom-6 xs:bottom-8 sm:bottom-12 md:bottom-14 z-10 w-8 xs:w-10 sm:w-[77px] md:w-[96px] lg:w-[131px] translate-x-[5px] lg:translate-x-0 select-none">
          <img
            src={greenLeaf}
            alt=""
            aria-hidden="true"
            className="hero-leaf-drift h-auto w-full object-contain"
            loading="eager"
          />
        </div>

        {/* 2b. Small outlined heart decoration near left green leaf */}
        <div className="pointer-events-none absolute left-3 xs:left-4 sm:left-7 md:left-9 lg:left-10 bottom-24 xs:bottom-28 sm:bottom-40 md:bottom-48 lg:bottom-52 z-10 select-none transform -rotate-[8deg]">
          <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-[18px] lg:w-[18px]">
            <path
              d="M 12 18 C 7 13 4 10 6 6 C 9 3 12 6 12 8 C 12 6 15 3 18 6 C 20 10 17 13 12 18 Z"
              stroke="#0E8276"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* 3. Teal organic shape in lower-left corner */}
        <div className="pointer-events-none absolute -bottom-2 -left-2 z-10 h-[66px] w-12 xs:w-14 sm:h-[130px] sm:w-28 select-none">
          <svg viewBox="0 0 100 120" fill="none" className="h-full w-full">
            <path
              d="M 0 15 C 50 15 78 55 72 105 C 68 120 35 120 0 120 Z"
              fill="#0E8276"
              opacity="0.95"
            />
            <path
              d="M 0 40 C 38 40 60 70 55 115 C 50 120 25 120 0 120 Z"
              fill="#0A6B61"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* 4. Orange/Gold Botanical Leaf near curved image boundary (gold-leaf.png) */}
        <div className="pointer-events-none absolute left-[42%] xs:left-[41.5%] sm:left-[41%] md:left-[41%] lg:left-[38%] bottom-2 sm:bottom-3 md:bottom-4 z-20 w-7 xs:w-9 sm:w-[67px] md:w-[96px] lg:w-[147px] lg:translate-x-[5px] select-none">
          <img
            src={goldLeaf}
            alt=""
            aria-hidden="true"
            className="hero-leaf-drift hero-leaf-drift--gold h-auto w-full object-contain"
            loading="eager"
          />
        </div>

        {/* ======================================================== */}
        {/* MAIN BANNER LAYOUT: Left Text & Right Photo              */}
        {/* ======================================================== */}
        <div className="relative z-10 grid min-h-[195px] xs:min-h-[225px] sm:min-h-[280px] md:min-h-[360px] grid-cols-[52%_48%] xs:grid-cols-[51%_49%] sm:grid-cols-[48%_52%] lg:grid-cols-[42.5%_57.5%]">
          {/* LEFT SIDE: Hero Text, Trust Badges, CTA, Social Proof */}
          <div data-hero-enter="text" className="translate-x-0 sm:translate-x-[50px] lg:-translate-x-[10px] flex flex-col justify-center px-2 py-2 xs:px-3 xs:py-2.5 sm:px-8 md:py-7 lg:pl-12 lg:pr-0 lg:w-[116%] lg:max-w-[660px] lg:z-10">
            {/* Heading Container with Doodles */}
            <div className="relative w-full max-w-full -translate-y-[15px] sm:-translate-y-[30px]">
              {/* Heading Text */}
              <h1 className="font-display tracking-tight text-[#0C2340] text-center">
                {/* Line 1: Gentle bent/curved appearance of "Happy Mom," */}
                <span className="relative flex justify-center items-center text-[15px] xs:text-[19px] sm:text-4xl md:text-[46px] lg:text-[53px] font-bold leading-none select-none">
                  <span className="inline-block transform -rotate-[3deg] translate-y-[2px] sm:translate-y-[3px]">Happy</span>
                  <span className="inline-block mx-1 sm:mx-1.5 md:mx-2"></span>
                  <span className="relative inline-block transform rotate-[3.5deg] translate-y-[2px] sm:translate-y-[3px]">
                    Mom,
                    {/* Sun Doodle near Mom, */}
                    <span className="pointer-events-none absolute -top-3 -right-5 sm:-top-5 sm:-right-8 md:-top-6 md:-right-10">
                      <svg width="22" height="22" viewBox="0 0 40 40" fill="none" className="xs:h-6 xs:w-6 sm:h-9 sm:w-9 md:h-10 md:w-10">
                        <circle cx="20" cy="20" r="8" stroke="#FDB813" strokeWidth="2.2" fill="none" />
                        <line x1="20" y1="6" x2="20" y2="2" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
                        <line x1="30" y1="10" x2="33" y2="7" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
                        <line x1="34" y1="20" x2="38" y2="20" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
                        <line x1="30" y1="30" x2="33" y2="33" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
                        <line x1="20" y1="34" x2="20" y2="38" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
                        <line x1="10" y1="30" x2="7" y2="33" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
                        <line x1="6" y1="20" x2="2" y2="20" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
                        <line x1="10" y1="10" x2="7" y2="7" stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </span>
                </span>

                {/* Line 2: "Healthy Daughter" with handwritten style, curved angle, compact positioning & doodles */}
                <span className="relative mt-0.5 sm:-mt-1 md:-mt-1.5 flex justify-center items-center">
                  {/* Teal Doodle Heart left of "Healthy Daughter" */}
                  <span className="pointer-events-none mr-1 sm:mr-1.5 md:mr-2 shrink-0 transform -rotate-[8deg] -translate-y-1">
                    <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4 md:h-5 md:w-5">
                      <path
                        d="M 12 18 C 7 13 4 10 6 6 C 9 3 12 6 12 8 C 12 6 15 3 18 6 C 20 10 17 13 12 18 Z"
                        stroke="#0E8276"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>

                  {/* Visibly curved handwritten "Healthy Daughter" */}
                  <span className="relative inline-flex items-center text-[15px] xs:text-[19px] sm:text-4xl md:text-[46px] lg:text-[53px] font-bold leading-none text-[#0E8276] select-none">
                    <span className="inline-block transform -rotate-[3.2deg] origin-bottom-left translate-y-[1px] sm:translate-y-[2px]">
                      Healthy
                    </span>
                    <span className="inline-block mx-0.5 sm:mx-1"></span>
                    <span className="relative inline-block transform rotate-[2.5deg] translate-y-[1px] sm:translate-y-[2px]">
                      Daughter

                      {/* Small gold doodle heart under "Daughter" */}
                      <span className="pointer-events-none absolute -bottom-1.5 sm:-bottom-2.5 right-0.5 sm:right-1 transform rotate-[10deg]">
                        <svg viewBox="0 0 24 24" fill="none" className="h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4">
                          <path
                            d="M 12 18 C 7 13 4 10 6 6 C 9 3 12 6 12 8 C 12 6 15 3 18 6 C 20 10 17 13 12 18 Z"
                            stroke="#FDB813"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </span>
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="mt-1 xs:mt-1.5 sm:mt-2.5 md:mt-3 max-w-[170px] xs:max-w-[195px] sm:max-w-[460px] lg:max-w-[520px] translate-x-[2px] -translate-y-[1px] sm:translate-x-0 sm:translate-y-0 lg:translate-x-[50px] lg:-translate-y-[4px] text-[10.5px] xs:text-[12px] sm:text-[14px] md:text-[16px] lg:text-[17.5px] font-semibold leading-tight xs:leading-snug sm:leading-relaxed text-[#1E344F]">
              Wholesome nutrition for every beautiful stage of her life — from your bump to her dreams!
            </p>

            {/* GROUP: Trust Badges */}
            <div className="relative left-[10px] sm:left-[35px] lg:left-[40px] mt-1.5 xs:mt-2 sm:mt-3 md:mt-3.5 flex flex-nowrap sm:flex-wrap items-center gap-x-2 gap-y-0.5 sm:gap-x-4 sm:gap-y-1 text-[6.5px] xs:text-[8px] sm:text-xs font-bold text-[#0C2340]">
              {/* Healthy Ingredients */}
              <div className="flex items-center gap-0.5 sm:gap-1.5">
                <svg viewBox="0 0 16 16" fill="none" className="h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-3.5 sm:w-3.5 shrink-0">
                  <path
                    d="M 1 8 C 1 3 7 0 12 0 C 13 5 10 11 5 12 C 1 13 1 8 1 8 Z M 5 12 L 1 16"
                    stroke="#0E8276"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Healthy Ingredients</span>
              </div>

              {/* No Preservatives */}
              <div className="flex items-center gap-0.5 sm:gap-1.5">
                <svg viewBox="0 0 16 16" fill="none" className="h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-3.5 sm:w-3.5 shrink-0">
                  <path
                    d="M 5 1 L 11 1 M 8 1 L 8 4 L 2 13 C 1 15 2 16 4 16 L 12 16 C 14 16 15 15 14 13 L 8 4"
                    stroke="#0E8276"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="5" y1="10" x2="11" y2="10" stroke="#0E8276" strokeWidth="1.4" />
                </svg>
                <span>No Preservatives</span>
              </div>

              {/* Made with Love */}
              <div className="relative left-[20px] flex items-center gap-0.5 sm:gap-1.5">
                <svg viewBox="0 0 16 16" fill="none" className="h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-3.5 sm:w-3.5 shrink-0">
                  <path
                    d="M 8 14 C 3 9 0 6 2 2 C 5 -1 8 2 8 4 C 8 2 11 -1 14 2 C 16 6 13 9 8 14 Z"
                    stroke="#F15A24"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Made with Love</span>
              </div>
            </div>

            {/* GROUP: CTA Buttons */}
            <div className="mt-1.5 xs:mt-2 sm:mt-3.5 md:mt-4 flex flex-nowrap items-center gap-1 xs:gap-1.5 sm:gap-3 lg:translate-x-[50px] lg:-translate-y-[4px]">
              {/* Orange CTA: Shop for Mom */}
              <Link
                to="/shop?category=Nourish"
                className="inline-flex items-center gap-0.5 xs:gap-1 rounded-full bg-[#F15A24] px-1.5 py-0.5 xs:px-2.5 xs:py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-[9px] xs:text-[10.5px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-bold text-white shadow-xs transition-all hover:bg-[#D84B18] hover:shadow-md shrink-0 whitespace-nowrap"
              >
                <span>Shop for Mom</span>
                <ArrowRight className="h-2 w-2 xs:h-2.5 xs:w-2.5 sm:size-[15px]" />
              </Link>

              {/* Yellow CTA: Shop for Daughter */}
              <Link
                to="/shop?category=Celebrate"
                className="inline-flex items-center gap-0.5 xs:gap-1 rounded-full bg-[#FDB813] px-1.5 py-0.5 xs:px-2.5 xs:py-1 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-[9px] xs:text-[10.5px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-bold text-[#0C2340] shadow-xs transition-all hover:bg-[#E9A709] hover:shadow-md shrink-0 whitespace-nowrap"
              >
                <span>Shop for Daughter</span>
                <ArrowRight className="h-2 w-2 xs:h-2.5 xs:w-2.5 sm:size-[15px]" />
              </Link>
            </div>

            {/* Social Proof */}
            <div className="relative left-[10px] lg:left-[20px] mt-1.5 xs:mt-2 sm:mt-3 md:mt-3.5 flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 text-[6.5px] xs:text-[8px] sm:text-xs font-bold text-[#0C2340]">
              <div className="flex -space-x-1 sm:-space-x-1.5">
                <span className="flex h-2.5 w-2.5 xs:h-3.5 xs:w-3.5 sm:h-5 sm:w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#F8C3CE] text-[4.5px] xs:text-[6px] sm:text-[8px] md:text-[9px] shadow-xs">
                  👩🏽
                </span>
                <span className="flex h-2.5 w-2.5 xs:h-3.5 xs:w-3.5 sm:h-5 sm:w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#F7B3B8] text-[4.5px] xs:text-[6px] sm:text-[8px] md:text-[9px] shadow-xs">
                  👩🏻
                </span>
                <span className="flex h-2.5 w-2.5 xs:h-3.5 xs:w-3.5 sm:h-5 sm:w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#B8D3F1] text-[4.5px] xs:text-[6px] sm:text-[8px] md:text-[9px] shadow-xs">
                  👩🏾
                </span>
                <span className="flex h-2.5 w-2.5 xs:h-3.5 xs:w-3.5 sm:h-5 sm:w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#DFF4EB] text-[4.5px] xs:text-[6px] sm:text-[8px] md:text-[9px] shadow-xs">
                  👩🏼
                </span>
              </div>
              <span className="truncate">Trusted by 50,000+ Happy Moms</span>
            </div>
          </div>

          {/* RIGHT SIDE: Hero Image with Organic Inward Curve & Pinned Note */}
          <div data-hero-enter="image" className="relative h-full min-h-[195px] xs:min-h-[225px] sm:min-h-[280px] md:min-h-[360px] w-full">
            {/* SVG Clip Path Definition for Organic Inward Curve */}
            <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
              <defs>
                <clipPath id="heroOrganicClipResponsive" clipPathUnits="objectBoundingBox">
                  {/* Organic left inward curve bowing gently into the lifestyle photo */}
                  <path d="M 0.12 0 L 1 0 L 1 1 L 0 1 C 0 0.88 0.04 0.74 0.11 0.62 C 0.18 0.5 0.19 0.38 0.17 0.25 C 0.15 0.14 0.13 0.06 0.12 0 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* Lifestyle Image masked with Organic Boundary on desktop and mobile */}
            <div
              className="relative h-full w-full overflow-hidden hero-organic-clip"
            >
              <img
                src={heroMomDaughter}
                alt="Mother and daughter sharing a wholesome snack in a bright kitchen"
                className="hero-photo-drift h-full w-full object-cover object-[72%_center]"
                fetchPriority="high"
                loading="eager"
              />

              {/* Heart doodle between Mom & Daughter */}
              <div className="pointer-events-none absolute left-[16%] top-[34%] z-20 hidden md:block">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M 12 18 C 7 13 4 10 6 6 C 9 3 12 6 12 8 C 12 6 15 3 18 6 C 20 10 17 13 12 18 Z"
                    stroke="#0C2340"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Crown doodle above Daughter */}
              <div className="pointer-events-none absolute left-[38%] top-[24%] z-20 hidden md:block">
                <svg width="26" height="16" viewBox="0 0 26 16" fill="none">
                  <path
                    d="M 1 14 L 6 2 L 13 10 L 20 2 L 25 14 Z"
                    stroke="#FDB813"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* Top-Right Pinned Sticky Note Card */}
            <div className="absolute right-4 top-4 z-20 hidden rotate-3 drop-shadow-md sm:block md:right-8 md:top-5">
              <div className="relative rounded bg-[#FEFCEB] p-3 text-center border border-[#E6E0B8] shadow-sm">
                {/* Pushpin at top center */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <ellipse cx="8" cy="8" rx="6" ry="3" fill="#0B5D54" />
                    <circle cx="8" cy="5" r="4.5" fill="#0E8276" />
                    <circle cx="7" cy="4" r="1.5" fill="#50C4B8" />
                  </svg>
                </div>
                <div className="pt-1.5 font-display text-sm font-bold leading-tight text-[#0C2340] sm:text-base">
                  <p>Nutrition</p>
                  <p>for Today,</p>
                  <p>Wellness for</p>
                  <p>Tomorrow!</p>
                  <div className="mt-1 text-red-500">❤️</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* GROUP: Bottom Wave                                       */}
        {/* ======================================================== */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-6 w-full sm:h-10 md:h-12">
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Soft Pale Blue Wave Fill */}
            <path
              d="M 0 34 C 200 20 360 48 560 36 C 760 24 960 48 1160 34 C 1260 28 1360 36 1440 38 L 1440 60 L 0 60 Z"
              fill="#E8F3FD"
            />
            {/* Thin Blue Outline */}
            <path
              d="M 0 34 C 200 20 360 48 560 36 C 760 24 960 48 1160 34 C 1260 28 1360 36 1440 38"
              stroke="#7EB2E0"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
export default HeroBanner;
