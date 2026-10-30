import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroMomDaughter from "../../../assets/images/home/hero-mom-daughter.png";
import greenLeaf from "../../../assets/images/home/leaf-png/green-leaf.png";
import goldLeaf from "../../../assets/images/home/leaf-png/gold-leaf.png";

export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFDF7] text-[#0C2340]">
      {/* Hero container matching Figma proportions */}
      <div className="relative mx-auto min-h-[220px] xs:min-h-[260px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[480px] w-full max-w-[1440px]">
        {/* ======================================================== */}
        {/* GROUP: Decorations                                       */}
        {/* ======================================================== */}
        {/* 1. Large partial yellow sun in top-left corner - reduced size to match Figma */}
        <div className="pointer-events-none absolute -left-10 -top-10 z-0 h-24 w-24 sm:-left-8 sm:-top-8 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 select-none">
          <svg viewBox="0 0 160 160" fill="none" className="h-full w-full">
            <circle cx="10" cy="10" r="120" fill="#FBAF3C" opacity="0.95" />
            <circle cx="10" cy="10" r="132" stroke="#F5A623" strokeWidth="2.5" fill="none" opacity="0.9" />
          </svg>
        </div>

        {/* 2. Left Teal Botanical Leaf decoration (green-leaf.png) - increased size and positioned at upper teal shape */}
        <div className="pointer-events-none absolute -left-1 sm:left-0 bottom-[calc(40%_-_70px)] xs:bottom-[calc(38%_-_70px)] sm:bottom-[calc(45%_-_70px)] md:bottom-[calc(42%_-_70px)] lg:bottom-[calc(40%_-_70px)] z-10 w-20 xs:w-[90px] sm:w-[140px] md:w-[170px] lg:w-[220px] -translate-x-[45px] select-none">
  <img
    src={greenLeaf}
    alt=""
    aria-hidden="true"
    className="hero-leaf-drift h-auto w-full object-contain"
    loading="eager"
  />
</div>

        {/* 2b. Small outlined heart decoration near left green leaf */}
        <div className="pointer-events-none absolute left-[14px] xs:left-[20px] sm:left-[30px] md:left-[38px] lg:left-[42px] bottom-28 xs:bottom-32 sm:bottom-44 md:bottom-52 lg:bottom-56 z-10 select-none transform -rotate-[8deg]">
  <svg viewBox="0 0 24 24" fill="none" className="h-[12px] w-[12px] xs:h-[14px] xs:w-[14px] sm:h-[16px] sm:w-[16px] md:h-[18px] md:w-[18px] lg:h-[20px] lg:w-[20px]">
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

        {/* 3. Teal organic shape in lower-left corner - adjusted for green leaf visibility */}
        <div className="pointer-events-none absolute -bottom-2 -left-2 z-10 h-[80px] w-16 xs:w-20 sm:h-[150px] sm:w-36 md:h-[180px] md:w-44 lg:h-[200px] lg:w-52 select-none">
          <svg viewBox="0 0 140 160" fill="none" className="h-full w-full">
            <path
              d="M 0 30 C 60 25 100 65 95 125 C 90 150 50 160 0 160 Z"
              fill="#0E8276"
              opacity="0.98"
            />
            <path
              d="M 0 55 C 50 50 80 85 75 135 C 70 155 40 160 0 160 Z"
              fill="#0A6B61"
              opacity="0.6"
            />
          </svg>
        </div>

      {/* 4. Orange/Gold Botanical Leaf */}
 <div className="pointer-events-none absolute left-[40px] sm:left-[40px] bottom-[calc(40%_-_110px)] xs:bottom-[calc(38%_-_110px)] sm:bottom-[calc(45%_-_110px)] md:bottom-[calc(42%_-_110px)] lg:bottom-[calc(40%_-_110px)] z-10 w-5 xs:w-[26px] sm:w-[47.5px] md:w-[59px] lg:w-[80px] translate-x-[140px] xs:translate-x-[160px] sm:translate-x-[460px] select-none">
  <img
    src={goldLeaf}
    alt=""
    aria-hidden="true"
    className="hero-leaf-drift h-auto w-full max-w-none object-contain"
    style={{ width: "200px", maxWidth: "none", height: "auto" }}
    loading="eager"
  />
</div>

        {/* ======================================================== */}
        {/* MAIN BANNER LAYOUT: Left Text & Right Photo              */}
        {/* ======================================================== */}
        <div className="relative z-10 grid min-h-[195px] xs:min-h-[225px] sm:min-h-[280px] md:min-h-[360px] grid-cols-[52%_48%] xs:grid-cols-[51%_49%] sm:grid-cols-[48%_52%] lg:grid-cols-[42.5%_57.5%]">
          {/* LEFT SIDE: Hero Text, Trust Badges, CTA, Social Proof */}
          <div data-hero-enter="text" className="translate-x-0 sm:translate-x-[50px] lg:-translate-x-[10px] flex flex-col justify-center px-2 py-2 xs:px-3 xs:py-2.5 sm:px-8 md:py-7 lg:pl-14 lg:pr-0 lg:w-[116%] lg:max-w-[660px] lg:z-10">
            {/* Heading Container with Doodles */}
            <div data-scroll-reveal className="relative w-full max-w-full min-h-[50px] sm:min-h-[60px] md:min-h-[70px] -translate-y-[15px] sm:-translate-y-[25px] md:-translate-y-[30px]">
              {/* Heading Text */}
              <h1 className="font-display tracking-tight text-[#0C2340] text-center">
                {/* Line 1: Gentle bent/curved appearance of "Happy Mom," */}
                <span className="relative flex justify-center items-center text-[15px] min-[375px]:text-[17px] min-[390px]:text-[19px] min-[430px]:text-[21px] sm:text-4xl md:text-[46px] lg:text-[53px] font-bold leading-none select-none">
                  <span className="inline-block transform -rotate-[3deg] translate-y-[2px] sm:translate-y-[3px]">Happy</span>
                  <span className="inline-block mx-1 sm:mx-1.5 md:mx-2"></span>
                  <span className="relative inline-block transform rotate-[3.5deg] translate-y-[2px] sm:translate-y-[3px]">
                    Mom,
                    {/* Sun Doodle near Mom, */}
                    <span className="pointer-events-none absolute -top-3 -right-5 sm:-top-5 sm:-right-8 md:-top-6 md:-right-10">
                      <svg width="22" height="22" viewBox="0 0 40 40" fill="none" className="h-3.5 w-3.5 min-[375px]:h-4 min-[375px]:w-4 sm:h-9 sm:w-9 md:h-10 md:w-10">
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
                <span className="relative mt-0.5 sm:mt-2 md:mt-3 flex justify-center items-center">
                  {/* Teal Doodle Heart left of "Healthy Daughter" */}
                  <span className="pointer-events-none mr-1 sm:mr-1.5 md:mr-2 shrink-0 transform -rotate-[8deg] -translate-y-1">
                    <svg viewBox="0 0 24 24" fill="none" className="h-2 w-2 min-[375px]:h-2.5 min-[375px]:w-2.5 sm:h-4 sm:w-4 md:h-5 md:w-5">
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
                  <span className="relative inline-flex items-center text-[15px] min-[375px]:text-[17px] min-[390px]:text-[19px] min-[430px]:text-[21px] sm:text-4xl md:text-[46px] lg:text-[53px] font-bold leading-none text-[#0E8276] select-none">
                    <span className="inline-block transform -rotate-[3.2deg] origin-bottom-left translate-y-[1px] sm:translate-y-[2px]">
                      Healthy
                    </span>
                    <span className="inline-block mx-0.5 sm:mx-1"></span>
                    <span className="relative inline-block transform rotate-[2.5deg] translate-y-[1px] sm:translate-y-[2px]">
                      Daughter

                      {/* Small gold doodle heart under "Daughter" */}
                      <span className="pointer-events-none absolute -bottom-1.5 sm:-bottom-2.5 right-0.5 sm:right-1 transform rotate-[10deg]">
                        <svg viewBox="0 0 24 24" fill="none" className="h-1.5 w-1.5 min-[375px]:h-2 min-[375px]:w-2 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4">
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

            {/* Content Group: Description, Trust Badges, CTA, Social Proof */}
            <div className="-translate-y-[30px] sm:translate-y-0">
              {/* Supporting Text */}
              <p data-scroll-reveal className="mt-2.5 xs:mt-3 sm:mt-2 md:mt-2.5 max-w-[170px] min-[375px]:max-w-[195px] min-[430px]:max-w-[220px] sm:max-w-[460px] lg:max-w-[520px] translate-x-[2px] sm:translate-x-0 lg:translate-x-[50px] lg:-translate-y-[4px] text-[10px] min-[375px]:text-[11px] min-[390px]:text-[12px] min-[430px]:text-[13px] sm:text-[14px] md:text-[16px] lg:text-[17.5px] leading-tight sm:leading-relaxed text-[#1E344F]">
                Wholesome nutrition for every beautiful stage of her life — from your bump to her dreams!
              </p>

              {/* GROUP: Trust Badges */}
              <div data-scroll-reveal className="relative left-0 min-[375px]:left-[4px] sm:left-[35px] lg:left-[40px] mt-2 xs:mt-2.5 sm:mt-2.5 md:mt-3 flex flex-nowrap sm:flex-wrap items-center gap-x-0.5 min-[375px]:gap-x-1 sm:gap-x-2.5 gap-y-0.5 sm:gap-y-1 text-[5.5px] min-[375px]:text-[6px] min-[390px]:text-[6.5px] min-[430px]:text-[7px] sm:text-xs text-[#0C2340]">
              {/* Healthy Ingredients */}
              <div className="flex items-center gap-0.5 sm:gap-1.5 shrink-0">
                <svg viewBox="0 0 16 16" fill="none" className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3.5 sm:w-3.5 shrink-0">
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
              <div className="flex items-center gap-0.5 sm:gap-1.5 shrink-0">
                <svg viewBox="0 0 16 16" fill="none" className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3.5 sm:w-3.5 shrink-0">
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
              <div className="relative left-0 sm:left-[20px] lg:left-0 flex items-center gap-0.5 sm:gap-1.5 shrink-0">
                <svg viewBox="0 0 16 16" fill="none" className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3.5 sm:w-3.5 shrink-0">
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
            <div data-scroll-reveal className="mt-1.5 xs:mt-2 sm:mt-3 md:mt-3.5 flex flex-nowrap items-center gap-1 min-[375px]:gap-1.5 sm:gap-3 lg:translate-x-[50px] lg:-translate-y-[4px]">
              {/* Orange CTA: Shop for Mom */}
              <Link
                to="/shop?category=Nourish"
                className="inline-flex items-center gap-0.5 min-[375px]:gap-1 rounded-full bg-[#F15A24] px-1 py-0.5 min-[375px]:px-2 min-[375px]:py-0.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-[8px] min-[375px]:text-[9px] min-[390px]:text-[9.5px] min-[430px]:text-[10px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-white shadow-sm transition-all hover:bg-[#D84B18] hover:shadow-md hover:-translate-y-0.5 shrink-0 whitespace-nowrap"
              >
                <span>Shop for Mom</span>
                <ArrowRight className="h-2 w-2 min-[375px]:h-2.5 min-[375px]:w-2.5 sm:size-[15px]" />
              </Link>

              {/* Yellow CTA: Shop for Daughter */}
              <Link
                to="/shop?category=Celebrate"
               className="inline-flex items-center gap-0.5 min-[375px]:gap-1 rounded-full bg-[#FDB813] px-[0.5px] py-0.5 min-[375px]:px-[3.5px] min-[375px]:py-0.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-[8px] min-[375px]:text-[9px] min-[390px]:text-[9.5px] min-[430px]:text-[10px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-[#0C2340] shadow-sm transition-all hover:bg-[#E9A709] hover:shadow-md hover:-translate-y-0.5 shrink-0 whitespace-nowrap"
              >
                <span>Shop for Daughter</span>
                <ArrowRight className="h-2 w-2 min-[375px]:h-2.5 min-[375px]:w-2.5 sm:size-[15px]" />
              </Link>
            </div>

            {/* Social Proof */}
            <div data-scroll-reveal className="relative left-0 min-[375px]:left-[8px] sm:left-[60px] mt-1.5 xs:mt-2 sm:mt-2.5 md:mt-3 flex items-center gap-1.5 sm:gap-2.5 text-[6.5px] min-[375px]:text-[7px] min-[390px]:text-[7.5px] min-[430px]:text-[8px] sm:text-xs text-[#0C2340]">
              <div className="flex -space-x-1 sm:-space-x-1.5">
                <span className="flex h-2.5 w-2.5 min-[375px]:h-3 min-[375px]:w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#F8C3CE] text-[4.5px] min-[375px]:text-[5px] sm:text-[8px] md:text-[9px] shadow-xs">
                  👩🏽
                </span>
                <span className="flex h-2.5 w-2.5 min-[375px]:h-3 min-[375px]:w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#F7B3B8] text-[4.5px] min-[375px]:text-[5px] sm:text-[8px] md:text-[9px] shadow-xs">
                  👩🏻
                </span>
                <span className="flex h-2.5 w-2.5 min-[375px]:h-3 min-[375px]:w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#B8D3F1] text-[4.5px] min-[375px]:text-[5px] sm:text-[8px] md:text-[9px] shadow-xs">
                  👩🏾
                </span>
                <span className="flex h-2.5 w-2.5 min-[375px]:h-3 min-[375px]:w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#DFF4EB] text-[4.5px] min-[375px]:text-[5px] sm:text-[8px] md:text-[9px] shadow-xs">
                  👩🏼
                </span>

              </div>
              <span className="truncate">Trusted by 50,000+ Happy Moms</span>
            </div>
            </div>
          </div>

          {/* RIGHT SIDE: Hero Image with Organic Inward Curve & Pinned Note */}
          <div data-scroll-reveal data-hero-enter="image" className="relative h-full min-h-[220px] xs:min-h-[260px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[480px] w-full">
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
            <div className="absolute right-4 top-4 z-20 hidden rotate-3 drop-shadow-md sm:block md:right-8 md:top-5 lg:right-10 lg:top-6">
              <div className="relative rounded bg-[#FEFCEB] p-3 text-center border border-[#E6E0B8] shadow-md">
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
      </div>

      {/* ======================================================== */}
      {/* GROUP: Bottom Wave                                       */}
      {/* ======================================================== */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-10 w-full sm:h-14 md:h-16">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Soft Pale Blue Wave Fill - smooth gentle curve across full width */}
          <path
            d="M 0 0 L 1440 0 L 1440 20 C 1200 30 960 10 720 25 C 480 40 240 15 0 35 L 0 80 Z"
            fill="#E8F3FD"
          />
          {/* Thin Blue Outline */}
          <path
            d="M 0 35 C 240 15 480 40 720 25 C 960 10 1200 30 1440 20"
            stroke="#7EB2E0"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
}
export default HeroBanner;
