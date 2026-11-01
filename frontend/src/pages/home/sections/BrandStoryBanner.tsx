import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import storyBanner from "../../../assets/images/home/story-banner.png";
import storyMobile from "../../../assets/images/home/story-mobile.png";

export function BrandStoryBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFDF7] text-[#0C2340] sm:-mt-6 sm:-mb-4 md:-mt-8 md:-mb-5 lg:-mt-10 lg:-mb-6">
      {/* ======================================================== */}
      {/* Desktop Banner (sm and above: >= 640px)                  */}
      {/* ======================================================== */}
      <div
        className="hidden sm:block relative mx-auto w-full max-w-[1440px] aspect-[2170/725]"
        style={{ aspectRatio: "2170 / 725" }}
      >
        {/* Full-width background image with object-contain at native aspect ratio */}
        <img
          src={storyBanner}
          alt="Healthy Habits Start Together"
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-contain object-center"
        />

        {/* Content strictly overlaying the cream area */}
        <div
          data-hero-enter="text"
          className="-translate-y-[5px] translate-x-[25px] min-[375px]:translate-x-[35px] min-[430px]:translate-x-[45px] sm:translate-x-[70px] md:translate-x-[95px] lg:translate-x-[120px]
                     absolute inset-y-0 left-[8%] sm:left-[8.5%] md:left-[9%] lg:left-[9.5%]
                     w-[38%] sm:w-[36%] md:w-[34%] lg:w-[32%]
                     flex flex-col justify-center"
        >
          {/* ---- Heading ---- */}
          <div>
            <h2 className="font-display">
              <span className="-translate-x-[10px] block text-[13px] min-[375px]:text-[15px] min-[430px]:text-[17px] sm:text-[28px] md:text-[34px] lg:text-[40px] xl:text-[44px] font-bold text-[#A03E26] leading-none tracking-tight">
                Healthy Habits
              </span>
              <span className="translate-x-[10px] block text-[14px] min-[375px]:text-[16px] min-[430px]:text-[18px] sm:text-[30px] md:text-[36px] lg:text-[42px] xl:text-[46px] font-bold text-[#0E7870] leading-none tracking-tight mt-0.5 sm:mt-1">
                Start Together
              </span>
            </h2>
          </div>

          {/* ---- Supporting text ---- */}
          <p
            className="mt-1 sm:mt-1.5 md:mt-2.5 lg:mt-3
                       text-[8px] min-[375px]:text-[9px] min-[430px]:text-[10px] sm:text-[13px] md:text-[14px] lg:text-[15.5px] xl:text-[16px]
                       leading-[1.25] sm:leading-[1.3] md:leading-snug text-[#1C324E] font-medium"
          >
            Because the choices you make today,
            <br />
            shape her tomorrow.
          </p>

          {/* ---- CTA Button ---- */}
          <div className="-translate-y-[2px] mt-1.5 sm:mt-2.5 md:mt-3.5 lg:mt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-0.5 sm:gap-1.5 rounded-full bg-[#0E7870]
                         px-2 py-0.5 min-[375px]:px-2.5 min-[375px]:py-0.5 sm:px-4 sm:py-1.5 md:px-5 md:py-2
                         text-[7px] min-[375px]:text-[8px] min-[430px]:text-[9px] sm:text-[12px] md:text-[13.5px] lg:text-[14.5px] xl:text-[15px]
                         font-semibold text-white shadow-xs
                         transition-all hover:bg-[#0A5A53] hover:shadow-sm hover:-translate-y-0.5
                         shrink-0 whitespace-nowrap"
            >
              <span>Explore Our Story</span>
              <ArrowRight className="h-2 w-2 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* Mobile Banner (narrow screens: < 640px)                  */}
      {/* ======================================================== */}
      <div
        className="block sm:hidden relative mx-auto w-full max-w-[540px] aspect-[1215/1295]"
        style={{ aspectRatio: "1215 / 1295" }}
      >
        {/* Full-width mobile background image with object-contain (slightly zoomed out for balanced composition) */}
        <img
          src={storyMobile}
          alt="Healthy Habits Start Together"
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-contain object-center scale-[0.93] origin-center"
        />

        {/* Mobile content strictly positioned in the upper cream area */}
        <div
          data-hero-enter="text"
          className="translate-x-[60px] translate-y-[20px] absolute top-[12%] min-[375px]:top-[13%] min-[430px]:top-[14%]
                     left-[11%] min-[375px]:left-[12%] min-[430px]:left-[13%]
                     w-[74%] min-[375px]:w-[72%] min-[430px]:w-[70%]
                     flex flex-col justify-start"
        >
          {/* ---- Heading ---- */}
          <div>
            <h2 className="font-display">
              <span className="-translate-x-[4px] block text-[24px] min-[375px]:text-[27px] min-[430px]:text-[30px] font-bold text-[#A03E26] leading-none tracking-tight">
                Healthy Habits
              </span>
              <span className="translate-x-[6px] block text-[25px] min-[375px]:text-[28px] min-[430px]:text-[31px] font-bold text-[#0E7870] leading-none tracking-tight mt-1">
                Start Together
              </span>
            </h2>
          </div>

          {/* ---- Supporting text ---- */}
          <p
            className="-translate-x-[40px] mt-2 min-[375px]:mt-2.5 min-[430px]:mt-3
                       w-[110%] min-[375px]:w-[115%] max-w-none
                       text-[15.5px] min-[375px]:text-[16.5px] min-[430px]:text-[17.5px]
                       leading-[1.3] text-[#1C324E] font-medium"
          >
            Because the choices you make
            <br />
            today, shape her tomorrow.
          </p>

          {/* ---- CTA Button ---- */}
          <div className="mt-2.5 min-[375px]:mt-3 min-[430px]:mt-3.5">
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0E7870]
                         px-3.5 py-1.5 min-[375px]:px-4 min-[375px]:py-2
                         text-[15px] min-[375px]:text-[16px] min-[430px]:text-[17px]
                         font-semibold text-white shadow-xs
                         transition-all hover:bg-[#0A5A53] hover:shadow-sm hover:-translate-y-0.5
                         shrink-0 whitespace-nowrap"
            >
              <span>Explore Our Story</span>
              <ArrowRight className="h-3 w-3 min-[375px]:h-3.5 min-[375px]:w-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandStoryBanner;
