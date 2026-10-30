import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeAssets } from "../../../data/homeAssets";

export function BrandStoryBanner() {
  return (
    <section className="relative px-3 py-4 sm:px-6 md:py-8 lg:px-8">
      {/* 1440px max width container with rounded-[20px] - rounded-[32px] banner card */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[20px] xs:rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-gradient-to-r from-[#FFF5E6] via-[#FFF9F0] to-[#FFFBF2] shadow-[0_4px_24px_rgba(16,38,80,0.06)] border border-[#F5E8D3]/80">
        {/* ======================================================== */}
        {/* 1. DECORATIVE CORNER & EDGE SHAPES                        */}
        {/* ======================================================== */}
        {/* Top-Left: Warm golden sun/blob with hand-drawn white doodle */}
        <div
          className="pointer-events-none absolute -left-2 -top-2 z-10 h-20 w-20 xs:h-24 xs:w-24 sm:-left-3 sm:-top-3 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-46 lg:w-46"
          aria-hidden="true"
        >
          <svg viewBox="0 0 180 180" fill="none" className="h-full w-full">
            {/* Organic Golden Sun Shape */}
            <path
              d="M 0 0 L 150 0 C 154 50 140 95 105 130 C 70 160 25 168 0 164 Z"
              fill="#F5A623"
            />
          </svg>
        </div>

        {/* Bottom-Left: Mint/Teal organic corner blob & approved green leaf PNG */}
        <div
          className="pointer-events-none absolute -bottom-2 -left-2 z-10 h-20 w-20 xs:h-24 xs:w-24 sm:-bottom-3 sm:-left-3 sm:h-36 sm:w-36 md:h-40 md:w-40"
        >
          <svg viewBox="0 0 140 140" fill="none" className="h-full w-full">
            {/* Mint/Teal organic corner blob */}
            <path
              d="M 0 45 C 35 38 75 68 85 105 C 90 122 86 132 82 140 L 0 140 Z"
              fill="#BCE4DD"
            />
          </svg>
          <img
            src={homeAssets.leaves.green}
            alt=""
            className="home-doodle-drift absolute bottom-[2px] left-[45px] h-[60px] w-[60px] xs:h-[70px] xs:w-[70px] sm:h-[110px] sm:w-[110px] md:h-[130px] md:w-[130px] object-contain"
          />
        </div>

        {/* Bottom-Center: Approved Pink Leaf PNG (near dividing curve) */}
        <div
          className="pointer-events-none absolute -bottom-[25px] left-[12px] sm:left-[18px] left-[42%] xs:left-[43%] sm:left-[43%] md:left-[43%] lg:left-[43.5%] z-20 h-12 w-6 xs:h-14 xs:w-7 sm:h-20 sm:w-10 md:h-22 md:w-11"
          aria-hidden="true"
        >
          <img
            src={homeAssets.leaves.pink}
            alt=""
            className="home-doodle-drift h-full w-full object-contain"
          />
        </div>

        {/* Bottom-Right Teal Corner Wave */}
        <div
          className="pointer-events-none absolute -bottom-1 -right-1 z-20 h-14 w-14 xs:h-16 xs:w-16 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36"
          aria-hidden="true"
        >
          <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
            <path
              d="M 120 35 C 92 40 55 75 42 120 L 120 120 Z"
              fill="#0E8276"
            />
          </svg>
        </div>

        {/* Extra Decorative Small Hearts on Cream Background (Safely positioned across desktop & mobile) */}
        {/* Heart 1: Soft Gold above heading */}
        <svg
          className="pointer-events-none absolute top-1.5 left-[24%] xs:top-2 xs:left-[26%] sm:top-3.5 sm:left-[27%] z-10 text-[#F5A623] h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-3 sm:w-3 -rotate-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z" />
        </svg>

        {/* Heart 2: Warm Coral near top curve */}
        <svg
          className="pointer-events-none absolute top-2 left-[40%] xs:top-2.5 xs:left-[41%] sm:top-4.5 sm:left-[41.5%] z-10 text-[#E85D3F] h-2 w-2 sm:h-2.5 sm:w-2.5 rotate-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z" />
        </svg>

        {/* Heart 3: Soft Gold middle right (visible where space permits, clear of text) */}
        <svg
          className="pointer-events-none absolute top-[28%] left-[42%] sm:top-[46%] sm:left-[39.5%] z-10 text-[#F5A623] h-2 w-2 sm:h-2.5 sm:w-2.5 -rotate-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z" />
        </svg>

        {/* Heart 4: Warm Coral near bottom CTA / curve space */}
        <svg
          className="pointer-events-none absolute bottom-1.5 left-[26%] xs:bottom-2 xs:left-[28%] sm:bottom-4.5 sm:left-[34.5%] z-10 text-[#E85D3F] h-2 w-2 sm:h-2.5 sm:w-2.5 rotate-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z" />
        </svg>

        {/* ======================================================== */}
        {/* 2. MAIN LAYOUT: Left Content & Right Photo               */}
        {/* ======================================================== */}
        <div className="relative z-10 grid grid-cols-[48%_52%] sm:grid-cols-[46%_54%] lg:grid-cols-[45%_55%] min-h-[160px] xs:min-h-[175px] sm:min-h-[220px] md:min-h-[245px] lg:h-[255px]">
          {/* Left Column: Heading, Supporting Text, CTA */}
          <div className="flex flex-col justify-center px-2.5 py-2.5 xs:px-3 xs:py-3 sm:px-8 sm:py-5 md:pl-16 md:pr-4 lg:pl-22 lg:pr-4 translate-x-[12px] min-[375px]:translate-x-[18px] min-[430px]:translate-x-[24px] sm:translate-x-[55px]">
            {/* Heading Container with Stepped Layout & Doodles */}
            <div className="relative">
              <h2 data-scroll-reveal className="font-display">
                {/* Line 1: Healthy Habits */}
                <span className="block text-[14px] min-[375px]:text-[16px] min-[390px]:text-[18px] min-[430px]:text-[20px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-bold text-[#A03E26] leading-none tracking-tight">
                  Healthy Habits
                </span>

                {/* Line 2: Start Together (stepped right, no apostrophe mark) */}
                <span className="relative inline-flex items-center text-[15px] min-[375px]:text-[17px] min-[390px]:text-[19px] min-[430px]:text-[21px] sm:text-[38px] md:text-[42px] lg:text-[46px] font-bold text-[#0E7870] leading-none tracking-tight ml-2.5 min-[375px]:ml-3.5 min-[390px]:ml-4 sm:ml-10 md:ml-14 mt-0.5 sm:mt-1">
                  <span>Start Together</span>

                  {/* Golden Heart Doodle to the right of Together */}
                  <svg
                    className="ml-2 sm:ml-3 h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#F5A623] inline-block shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z" />
                  </svg>
                </span>
              </h2>

              {/* Small Coral Heart Doodle floating below-right of Together */}
              <svg
                className="pointer-events-none absolute -bottom-2 right-12 xs:right-16 sm:-bottom-2.5 sm:right-20 md:right-24 text-[#E85D3F] h-2 w-2 sm:h-3 sm:w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z" />
              </svg>
            </div>

            {/* Supporting Text - Exactly 2 clean editable lines */}
            <p
              data-scroll-reveal
              className="mt-1 xs:mt-1.5 sm:mt-2.5 max-w-[300px] min-[375px]:max-w-[320px] text-[8.5px] min-[375px]:text-[9.5px] min-[390px]:text-[10px] min-[430px]:text-[10.5px] sm:text-[15px] md:text-[15.5px] lg:text-[16px] font-medium leading-[1.3] min-[375px]:leading-[1.35] text-[#1C324E]"
            >
              Because the choices you make today,
              <br />
              shape her tomorrow.
            </p>

            {/* CTA Button */}
            <div data-scroll-reveal className="mt-2 xs:mt-2.5 sm:mt-3.5">
              <Link
                to="/about"
                className="inline-flex items-center gap-1 sm:gap-2 rounded-full bg-[#0E7870] px-3 py-1 min-[375px]:px-3.5 min-[375px]:py-1 sm:px-5 sm:py-2 text-[8.5px] min-[375px]:text-[9.5px] min-[390px]:text-[10px] min-[430px]:text-[10.5px] sm:text-[15px] md:text-[15.5px] font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#0A5A53] hover:shadow-md active:scale-[0.98] whitespace-nowrap"
              >
                <span>Explore Our Story</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Lifestyle Photo with Organic Inward S-Curve & Dashed Speech Bubbles */}
          <div className="relative h-full w-full overflow-hidden">
            {/* SVG Organic S-Curve Clip Path: Preserves potted plant & gives gentle natural curve */}
            <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
              <defs>
                <clipPath id="storyOrganicClip" clipPathUnits="objectBoundingBox">
                  <path d="M 0.04 0 C 0.05 0.15, 0.08 0.28, 0.07 0.42 C 0.06 0.60, 0.01 0.76, 0.02 0.88 C 0.02 0.94, 0.03 0.98, 0.04 1 L 1 1 L 1 0 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* Clipped Image Container */}
            <div data-scroll-reveal className="relative h-full w-full overflow-hidden story-organic-clip">
              <img
                src={homeAssets.story.src}
                alt={homeAssets.story.alt}
                className="h-full w-full object-cover object-[65%_30%] sm:object-[68%_33%]"
                loading="lazy"
              />
            </div>

            {/* Speech Bubble 1: "For your changing needs" (Cyan/Teal, Left, Dashed border & tail, shifted 55px right) */}
            <div data-scroll-reveal className="pointer-events-none absolute left-[2%] xs:left-[3%] sm:left-[4%] top-[8%] sm:top-[10%] z-30 scale-[0.55] xs:scale-[0.62] sm:scale-[0.85] md:scale-100 origin-top-left translate-x-[55px]">
              <div className="relative w-[116px] h-[78px]">
                {/* SVG Bubble with Seamless Dashed Border & Triangular Tail pointing down-right */}
                <svg viewBox="0 0 116 78" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_2px_8px_rgba(14,120,112,0.12)]">
                  <path
                    d="M 30 6 L 86 6 C 100 6, 110 17, 110 32 C 110 47, 100 58, 86 58 L 78 58 L 82 74 L 66 58 L 30 58 C 16 58, 6 47, 6 32 C 6 17, 16 6, 30 6 Z"
                    fill="#FFFFFF"
                    stroke="#00B4D8"
                    strokeWidth="1.8"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Content inside Bubble - fully editable React/HTML */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pb-5 pt-0.5">
                  {/* Top Heart */}
                  <svg width="10" height="9" viewBox="0 0 24 24" fill="none" stroke="#0E7870" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
                    <path d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z" />
                  </svg>
                  {/* Text */}
                  <p className="font-display text-[9.5px] min-[375px]:text-[10.5px] min-[390px]:text-[11px] min-[430px]:text-[11.5px] sm:text-[14px] font-bold leading-[1.05] sm:leading-[1.08] text-[#0E7870] text-center whitespace-nowrap">
                    For your<br />changing needs
                  </p>
                  {/* Bottom Heart */}
                  <svg width="10" height="9" viewBox="0 0 24 24" fill="none" stroke="#0E7870" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                    <path d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Speech Bubble 2: "For her growing years" (Magenta/Pink, Right, Dashed border & tail, shifted 55px right) */}
            <div data-scroll-reveal className="pointer-events-none absolute right-[8%] xs:right-[9%] sm:right-[11%] top-[8%] sm:top-[10%] z-30 scale-[0.55] xs:scale-[0.62] sm:scale-[0.85] md:scale-100 origin-top-right translate-x-[55px]">
              <div className="relative w-[116px] h-[78px]">
                {/* SVG Bubble with Seamless Dashed Border & Triangular Tail pointing down-left */}
                <svg viewBox="0 0 116 78" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_2px_8px_rgba(233,30,99,0.12)]">
                  <path
                    d="M 22 6 L 94 6 C 104 6, 110 14, 110 24 L 110 40 C 110 50, 104 58, 94 58 L 48 58 L 34 74 L 38 58 L 22 58 C 12 58, 6 50, 6 40 L 6 24 C 6 14, 12 6, 22 6 Z"
                    fill="#FFFFFF"
                    stroke="#E91E63"
                    strokeWidth="1.8"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Content inside Bubble - fully editable React/HTML */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pb-5 pt-0.5">
                  {/* Top Heart */}
                  <svg width="10" height="9" viewBox="0 0 24 24" fill="none" stroke="#C2185B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
                    <path d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z" />
                  </svg>
                  {/* Text */}
                  <p className="font-display text-[9.5px] min-[375px]:text-[10.5px] min-[390px]:text-[11px] min-[430px]:text-[11.5px] sm:text-[14px] font-bold leading-[1.05] sm:leading-[1.08] text-[#C2185B] text-center whitespace-nowrap">
                    For her<br />growing years
                  </p>
                  {/* Bottom Heart */}
                  <svg width="10" height="9" viewBox="0 0 24 24" fill="none" stroke="#C2185B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                    <path d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandStoryBanner;
