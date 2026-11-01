import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroDesktop from "../../../assets/images/home/hero-desktop.png";
import heroMobile from "../../../assets/images/home/hero-mobile.png";

export function HeroBanner() {
  return (
    <section className="relative z-[60] w-full overflow-hidden bg-[#FFFDF7] text-[#0C2340]">
      {/* ======================================================== */}
      {/* Desktop Banner (sm and above: >= 640px)                  */}
      {/* ======================================================== */}
      <div
        className="hidden sm:block relative mx-auto w-full max-w-[1440px] aspect-[2135/736]"
        style={{ aspectRatio: "2135 / 736" }}
      >
        {/* Full-width background image with object-contain at native aspect ratio */}
        <img
          src={heroDesktop}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          className="h-full w-full object-contain object-center"
        />

        {/* Content strictly overlaying the cream area */}
        <div
          data-hero-enter="text"
          className="absolute inset-y-0 left-[7.5%] sm:left-[8%] md:left-[8.5%] lg:left-[9%]
                     w-[36%] sm:w-[35%] md:w-[33%] lg:w-[31%]
                     flex flex-col justify-center"
        >
          {/* ---- Heading ---- */}
          <div data-scroll-reveal className="relative top-3 sm:top-4 md:top-6 lg:top-[-45px]">
            <h1 className="font-display tracking-tight text-[#0C2340]">
              {/* Line 1 */}
              <span className="relative flex items-center translate-x-4 text-[19px] min-[375px]:text-[20px] min-[430px]:text-[22px] sm:text-[29px] md:text-[35px] lg:text-[43px] xl:text-[47px] font-bold leading-none select-none">
                <span className="inline-block transform -rotate-[3deg] translate-y-[0.5px] sm:translate-y-[1px] md:translate-y-[2px]">Happy</span>
                <span className="inline-block mx-0.5 sm:mx-1 md:mx-1.5" />
                <span className="relative inline-block transform rotate-[3.5deg] translate-y-[0.5px] sm:translate-y-[1px] md:translate-y-[2px]">
                  Mom,
                  {/* Sun doodle */}
                  <span className="pointer-events-none absolute -top-2 -right-4 sm:-top-3 sm:-right-5 md:-top-3.5 md:-right-6 lg:-top-4 lg:-right-7">
                    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" className="h-3.5 w-3.5 min-[375px]:h-4 min-[375px]:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8">
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

              {/* Line 2 */}
              <span className="relative mt-0.5 sm:mt-0.5 md:mt-1 flex items-center -translate-x-9">
                {/* Teal heart doodle */}
                <span className="pointer-events-none mr-0.5 sm:mr-1 shrink-0 transform -rotate-[8deg] -translate-y-0.5">
                  <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5 min-[375px]:h-3 min-[375px]:w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5 xl:h-5.5 xl:w-5.5">
                    <path
                      d="M 12 18 C 7 13 4 10 6 6 C 9 3 12 6 12 8 C 12 6 15 3 18 6 C 20 10 17 13 12 18 Z"
                      stroke="#0E8276" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    />
                  </svg>
                </span>

                <span className="relative inline-flex items-center text-[22px] min-[375px]:text-[23px] min-[430px]:text-[25px] sm:text-[32px] md:text-[38px] lg:text-[46px] xl:text-[50px] font-bold leading-none text-[#0E8276] select-none">
                  <span className="inline-block transform -rotate-[3.2deg] origin-bottom-left translate-y-[0.5px] sm:translate-y-[1px]">
                    Healthy
                  </span>
                  <span className="inline-block mx-0.5 sm:mx-1" />
                  <span className="relative inline-block transform rotate-[2.5deg] translate-y-[0.5px] sm:translate-y-[1px]">
                    Daughter
                    {/* Gold heart doodle */}
                    <span className="pointer-events-none absolute -bottom-1 sm:-bottom-1.5 md:-bottom-2 right-0.5 transform rotate-[10deg]">
                      <svg viewBox="0 0 24 24" fill="none" className="h-2 w-2 min-[375px]:h-2.5 min-[375px]:w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4">
                        <path
                          d="M 12 18 C 7 13 4 10 6 6 C 9 3 12 6 12 8 C 12 6 15 3 18 6 C 20 10 17 13 12 18 Z"
                          stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                        />
                      </svg>
                    </span>
                  </span>
                </span>
              </span>
            </h1>
          </div>

          {/* ---- Supporting text ---- */}
          <p
            data-scroll-reveal
            className="relative -top-[28px] -translate-x-[19px] mt-0.5 sm:mt-1 md:mt-2 lg:mt-2.5
                       w-[125%] sm:w-[130%] md:w-[140%] lg:w-[142%] xl:w-[122%] max-w-none
                       text-[10.5px] min-[375px]:text-[11px] min-[430px]:text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[16.5px]
                       leading-[1.25] sm:leading-[1.3] md:leading-snug text-[#1E344F] font-medium"
          >
            Wholesome nutrition for every beautiful<br className="hidden sm:inline" /> stage of her life—from your bump her dreams!
          </p>

          {/* ---- Trust Badges ---- */}
          <div
            data-scroll-reveal
            className="-translate-x-[37px] -translate-y-[8px] mt-0.5 sm:mt-1 md:mt-2 lg:mt-2.5 flex items-center gap-x-1 sm:gap-x-1.5 md:gap-x-2.5 lg:gap-x-3.5
                       text-[7.5px] min-[375px]:text-[8px] min-[430px]:text-[9px] sm:text-[10.5px] md:text-[11.5px] lg:text-[12.5px] xl:text-[13px] font-semibold text-[#0C2340]"
          >
            {/* Healthy Ingredients */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <svg viewBox="0 0 16 16" fill="none" className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 lg:h-3 lg:w-3 shrink-0">
                <path
                  d="M 1 8 C 1 3 7 0 12 0 C 13 5 10 11 5 12 C 1 13 1 8 1 8 Z M 5 12 L 1 16"
                  stroke="#0E8276" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              <span>Healthy Ingredients</span>
            </div>

            {/* No Preservatives */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <svg viewBox="0 0 16 16" fill="none" className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 lg:h-3 lg:w-3 shrink-0">
                <path
                  d="M 5 1 L 11 1 M 8 1 L 8 4 L 2 13 C 1 15 2 16 4 16 L 12 16 C 14 16 15 15 14 13 L 8 4"
                  stroke="#0E8276" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                />
                <line x1="5" y1="10" x2="11" y2="10" stroke="#0E8276" strokeWidth="1.4" />
              </svg>
              <span>No Preservatives</span>
            </div>

            {/* Made with Love */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <svg viewBox="0 0 16 16" fill="none" className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 lg:h-3 lg:w-3 shrink-0">
                <path
                  d="M 8 14 C 3 9 0 6 2 2 C 5 -1 8 2 8 4 C 8 2 11 -1 14 2 C 16 6 13 9 8 14 Z"
                  stroke="#F15A24" strokeWidth="1.8" strokeLinejoin="round"
                />
              </svg>
              <span>Made with Love</span>
            </div>
          </div>
          {/* ---- CTA Buttons ---- */}
          <div
            data-scroll-reveal
            className="mt-1 sm:mt-2 md:mt-3 lg:mt-3.5 flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5"
          >
            {/* Shop for Mom */}
            <Link
              to="/shop?category=Nourish"
              className="inline-flex items-center gap-0.5 sm:gap-1 rounded-full bg-[#F15A24]
                         px-1.5 py-0.5 min-[375px]:px-2 min-[375px]:py-0.5 sm:px-3 sm:py-1 md:px-3.5 md:py-1.5 lg:px-4 lg:py-2
                         text-[8px] min-[375px]:text-[8.5px] min-[430px]:text-[9.5px] sm:text-[11.5px] md:text-[12.5px] lg:text-[13.5px] xl:text-[14px]
                         font-semibold text-white shadow-xs
                         transition-all hover:bg-[#D84B18] hover:shadow-sm hover:-translate-y-0.5
                         shrink-0 whitespace-nowrap"
            >
              <span>Shop for Mom</span>
              <ArrowRight className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 lg:h-3 lg:w-3" />
            </Link>

            {/* Shop for Daughter */}
            <Link
              to="/shop?category=Celebrate"
              className="inline-flex items-center gap-0.5 sm:gap-1 rounded-full bg-[#FDB813]
                         px-1.5 py-0.5 min-[375px]:px-2 min-[375px]:py-0.5 sm:px-3 sm:py-1 md:px-3.5 md:py-1.5 lg:px-4 lg:py-2
                         text-[8px] min-[375px]:text-[8.5px] min-[430px]:text-[9.5px] sm:text-[11.5px] md:text-[12.5px] lg:text-[13.5px] xl:text-[14px]
                         font-semibold text-[#0C2340] shadow-xs
                         transition-all hover:bg-[#E9A709] hover:shadow-sm hover:-translate-y-0.5
                         shrink-0 whitespace-nowrap"
            >
              <span>Shop for Daughter</span>
              <ArrowRight className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 lg:h-3 lg:w-3" />
            </Link>
          </div>

          {/* ---- Social Proof ---- */}
          <div
            data-scroll-reveal
            className="mt-[5px] sm:mt-[7px] md:mt-[9px] lg:mt-[13px] flex items-center gap-1 sm:gap-1.5 md:gap-2
                       text-[7.5px] min-[375px]:text-[8px] min-[430px]:text-[9px] sm:text-[10.5px] md:text-[11.5px] lg:text-[12.5px] xl:text-[13px] font-semibold text-[#0C2340]"
          >
            <div className="flex -space-x-0.5 sm:-space-x-1">
              <span className="flex h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-4.5 lg:w-4.5 xl:h-5 xl:w-5 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#F8C3CE] text-[4.5px] sm:text-[6px] md:text-[7px] lg:text-[8px] shadow-xs">👩🏽</span>
              <span className="flex h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-4.5 lg:w-4.5 xl:h-5 xl:w-5 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#F7B3B8] text-[4.5px] sm:text-[6px] md:text-[7px] lg:text-[8px] shadow-xs">👩🏻</span>
              <span className="flex h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-4.5 lg:w-4.5 xl:h-5 xl:w-5 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#B8D3F1] text-[4.5px] sm:text-[6px] md:text-[7px] lg:text-[8px] shadow-xs">👩🏾</span>
              <span className="flex h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-4.5 lg:w-4.5 xl:h-5 xl:w-5 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#DFF4EB] text-[4.5px] sm:text-[6px] md:text-[7px] lg:text-[8px] shadow-xs">👩🏼</span>
            </div>
            <span>Trusted by 50,000+ Happy Moms</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Bottom Wave                                             */}
        {/* ======================================================== */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-4 sm:h-6 md:h-8 lg:h-10">
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 0 35 C 240 15 480 40 720 25 C 960 10 1200 30 1440 20 L 1440 80 L 0 80 Z"
              fill="#E8F3FD"
            />
            <path
              d="M 0 35 C 240 15 480 40 720 25 C 960 10 1200 30 1440 20"
              stroke="#7EB2E0"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* ======================================================== */}
      {/* Mobile Banner (narrow screens: < 640px)                  */}
      {/* ======================================================== */}
      <div
        className="block sm:hidden relative mx-auto w-full max-w-[540px] aspect-[1024/1536]"
        style={{ aspectRatio: "1024 / 1536" }}
      >
        {/* Full-width mobile background image with object-contain (slightly zoomed out for balanced composition) */}
        <img
          src={heroMobile}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          className="h-full w-full object-contain object-center scale-[0.93] origin-center"
        />

        {/* Content strictly overlaying the cream area on mobile */}
        <div
          data-hero-enter="text"
          className="translate-x-[50px] translate-y-[20px] absolute top-[8.5%] min-[375px]:top-[9.5%] min-[430px]:top-[10.5%]
                     left-[7.5%] min-[375px]:left-[8.5%] min-[430px]:left-[9.5%]
                     w-[76%] min-[375px]:w-[74%] min-[430px]:w-[72%]
                     flex flex-col justify-start"
        >
          {/* ---- Heading ---- */}
          <div className="translate-x-[20px]">
            <h1 className="font-display tracking-tight text-[#0C2340]">
              {/* Line 1 */}
              <span className="relative flex items-center translate-x-2 min-[375px]:translate-x-3 text-[21px] min-[375px]:text-[24px] min-[430px]:text-[27px] font-bold leading-none select-none">
                <span className="inline-block transform -rotate-[3deg] translate-y-[0.5px]">Happy</span>
                <span className="inline-block mx-0.5 min-[375px]:mx-1" />
                <span className="relative inline-block transform rotate-[3.5deg] translate-y-[0.5px]">
                  Mom,
                  {/* Sun doodle */}
                  <span className="pointer-events-none absolute -top-2 -right-4 min-[375px]:-top-2.5 min-[375px]:-right-5">
                    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" className="h-3.5 w-3.5 min-[375px]:h-4 min-[375px]:w-4">
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

              {/* Line 2 */}
              <span className="relative mt-1 flex items-center -translate-x-1 min-[375px]:-translate-x-1.5">
                {/* Teal heart doodle */}
                <span className="pointer-events-none mr-0.5 min-[375px]:mr-1 shrink-0 transform -rotate-[8deg] -translate-y-0.5">
                  <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 min-[375px]:h-3.5 min-[375px]:w-3.5">
                    <path
                      d="M 12 18 C 7 13 4 10 6 6 C 9 3 12 6 12 8 C 12 6 15 3 18 6 C 20 10 17 13 12 18 Z"
                      stroke="#0E8276" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    />
                  </svg>
                </span>

                <span className="relative inline-flex items-center text-[24px] min-[375px]:text-[27px] min-[430px]:text-[30px] font-bold leading-none text-[#0E8276] select-none">
                  <span className="inline-block transform -rotate-[3.2deg] origin-bottom-left translate-y-[0.5px]">
                    Healthy
                  </span>
                  <span className="inline-block mx-0.5 min-[375px]:mx-1" />
                  <span className="relative inline-block transform rotate-[2.5deg] translate-y-[0.5px]">
                    Daughter
                    {/* Gold heart doodle */}
                    <span className="pointer-events-none absolute -bottom-1 right-0 transform rotate-[10deg]">
                      <svg viewBox="0 0 24 24" fill="none" className="h-2 w-2 min-[375px]:h-2.5 min-[375px]:w-2.5">
                        <path
                          d="M 12 18 C 7 13 4 10 6 6 C 9 3 12 6 12 8 C 12 6 15 3 18 6 C 20 10 17 13 12 18 Z"
                          stroke="#FDB813" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                        />
                      </svg>
                    </span>
                  </span>
                </span>
              </span>
            </h1>
          </div>

          {/* ---- Supporting text ---- */}
          <p className="mt-2 min-[375px]:mt-2.5 text-[11px] min-[375px]:text-[12px] min-[430px]:text-[13px] leading-[1.3] text-[#1E344F] font-medium">
            Wholesome nutrition for every beautiful<br />stage of her life—from your bump her dreams!
          </p>

          {/* ---- Trust Badges ---- */}
          <div className="mt-2 min-[375px]:mt-2.5 flex flex-wrap items-center gap-x-1.5 min-[375px]:gap-x-2.5 gap-y-1 text-[8px] min-[375px]:text-[9px] min-[430px]:text-[10px] font-semibold text-[#0C2340]">
            {/* Healthy Ingredients */}
            <div className="flex items-center gap-0.5 min-[375px]:gap-1 shrink-0">
              <svg viewBox="0 0 16 16" fill="none" className="h-2 w-2 min-[375px]:h-2.5 min-[375px]:w-2.5 shrink-0">
                <path
                  d="M 1 8 C 1 3 7 0 12 0 C 13 5 10 11 5 12 C 1 13 1 8 1 8 Z M 5 12 L 1 16"
                  stroke="#0E8276" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              <span>Healthy Ingredients</span>
            </div>

            {/* No Preservatives */}
            <div className="flex items-center gap-0.5 min-[375px]:gap-1 shrink-0">
              <svg viewBox="0 0 16 16" fill="none" className="h-2 w-2 min-[375px]:h-2.5 min-[375px]:w-2.5 shrink-0">
                <path
                  d="M 5 1 L 11 1 M 8 1 L 8 4 L 2 13 C 1 15 2 16 4 16 L 12 16 C 14 16 15 15 14 13 L 8 4"
                  stroke="#0E8276" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                />
                <line x1="5" y1="10" x2="11" y2="10" stroke="#0E8276" strokeWidth="1.4" />
              </svg>
              <span>No Preservatives</span>
            </div>

            {/* Made with Love */}
            <div className="flex items-center gap-0.5 min-[375px]:gap-1 shrink-0">
              <svg viewBox="0 0 16 16" fill="none" className="h-2 w-2 min-[375px]:h-2.5 min-[375px]:w-2.5 shrink-0">
                <path
                  d="M 8 14 C 3 9 0 6 2 2 C 5 -1 8 2 8 4 C 8 2 11 -1 14 2 C 16 6 13 9 8 14 Z"
                  stroke="#F15A24" strokeWidth="1.8" strokeLinejoin="round"
                />
              </svg>
              <span>Made with Love</span>
            </div>
          </div>

          {/* ---- CTA Buttons ---- */}
          <div className="mt-2.5 min-[375px]:mt-3 flex flex-wrap items-center gap-2 min-[375px]:gap-2.5">
            {/* Shop for Mom */}
            <Link
              to="/shop?category=Nourish"
              className="inline-flex items-center gap-1 rounded-full bg-[#F15A24]
                         px-2.5 py-1 min-[375px]:px-3 min-[375px]:py-1.5
                         text-[9.5px] min-[375px]:text-[10.5px] min-[430px]:text-[11.5px]
                         font-semibold text-white shadow-xs
                         transition-all hover:bg-[#D84B18] hover:shadow-sm hover:-translate-y-0.5
                         shrink-0 whitespace-nowrap"
            >
              <span>Shop for Mom</span>
              <ArrowRight className="h-2 w-2 min-[375px]:h-2.5 min-[375px]:w-2.5" />
            </Link>

            {/* Shop for Daughter */}
            <Link
              to="/shop?category=Celebrate"
              className="inline-flex items-center gap-1 rounded-full bg-[#FDB813]
                         px-2.5 py-1 min-[375px]:px-3 min-[375px]:py-1.5
                         text-[9.5px] min-[375px]:text-[10.5px] min-[430px]:text-[11.5px]
                         font-semibold text-[#0C2340] shadow-xs
                         transition-all hover:bg-[#E9A709] hover:shadow-sm hover:-translate-y-0.5
                         shrink-0 whitespace-nowrap"
            >
              <span>Shop for Daughter</span>
              <ArrowRight className="h-2 w-2 min-[375px]:h-2.5 min-[375px]:w-2.5" />
            </Link>
          </div>

          {/* ---- Social Proof ---- */}
          <div className="mt-2 min-[375px]:mt-2.5 flex items-center gap-1.5 text-[8px] min-[375px]:text-[9px] min-[430px]:text-[10px] font-semibold text-[#0C2340]">
            <div className="flex -space-x-1">
              <span className="flex h-3.5 w-3.5 min-[375px]:h-4 min-[375px]:w-4 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#F8C3CE] text-[6px] min-[375px]:text-[7px] shadow-xs">👩🏽</span>
              <span className="flex h-3.5 w-3.5 min-[375px]:h-4 min-[375px]:w-4 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#F7B3B8] text-[6px] min-[375px]:text-[7px] shadow-xs">👩🏻</span>
              <span className="flex h-3.5 w-3.5 min-[375px]:h-4 min-[375px]:w-4 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#B8D3F1] text-[6px] min-[375px]:text-[7px] shadow-xs">👩🏾</span>
              <span className="flex h-3.5 w-3.5 min-[375px]:h-4 min-[375px]:w-4 items-center justify-center rounded-full border border-[#FFFDF7] bg-[#DFF4EB] text-[6px] min-[375px]:text-[7px] shadow-xs">👩🏼</span>
            </div>
            <span>Trusted by 50,000+ Happy Moms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroBanner;
