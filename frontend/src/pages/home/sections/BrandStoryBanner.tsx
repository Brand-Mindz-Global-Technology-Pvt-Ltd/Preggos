import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeAssets } from "../../../data/homeAssets";

export function BrandStoryBanner() {
  return (
    <section className="relative px-3 py-4 sm:px-6 md:py-10 lg:px-8">
      {/* 1440px max width container with rounded-[20px] - rounded-[36px] banner card */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[20px] xs:rounded-[24px] sm:rounded-[28px] md:rounded-[36px] bg-[#FFFBF2] shadow-[0_4px_24px_rgba(16,38,80,0.06)] border border-[#F5E8D3]/80">
        {/* ======================================================== */}
        {/* 1. DECORATIVE CORNER & EDGE SHAPES                        */}
        {/* ======================================================== */}
        {/* Top-Left: Large golden yellow sun/blob with doodle */}
        <div className="pointer-events-none absolute -left-4 -top-4 z-10 h-16 w-16 xs:h-20 xs:w-20 sm:-left-6 sm:-top-6 sm:h-52 sm:w-52 md:h-60 md:w-60" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
            {/* Organic Golden Sun Shape */}
            <path
              d="M 0 0 L 170 0 C 175 60 160 110 120 145 C 80 175 30 185 0 180 Z"
              fill="#F5A623"
            />
            {/* White Doodle flower/rays inside sun */}
            <g transform="translate(90, 70)" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.9">
              <path d="M 0 -12 L 0 12 M -12 0 L 12 0" />
              <path d="M -8 -8 L 8 8 M -8 8 L 8 -8" />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            </g>
          </svg>
        </div>

        {/* Bottom-Left: Teal organic wave shape & botanical branch */}
        <div className="pointer-events-none absolute -bottom-2 -left-2 z-10 h-14 w-14 xs:h-18 xs:w-18 sm:-bottom-4 sm:-left-4 sm:h-44 sm:w-44" aria-hidden="true">
          <svg viewBox="0 0 160 160" fill="none" className="h-full w-full">
            {/* Mint/Teal organic corner blob */}
            <path
              d="M 0 60 C 40 50 85 85 95 125 C 100 145 95 155 90 160 L 0 160 Z"
              fill="#BCE4DD"
            />
            {/* Teal botanical branch climbing up */}
            <path
              d="M 25 150 C 35 110 32 75 42 35"
              stroke="#0E8276"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M 38 48 C 50 42 60 48 56 58 C 47 62 37 56 38 48 Z" fill="#0E8276" />
            <path d="M 33 75 C 22 70 14 77 18 87 C 26 89 33 83 33 75 Z" fill="#0E8276" />
            <path d="M 32 105 C 44 98 52 105 48 116 C 39 120 30 113 32 105 Z" fill="#0E8276" />
          </svg>
        </div>

        {/* Botanical sprig between text and photo */}
        <div className="pointer-events-none absolute bottom-0 left-[48%] xs:left-[49%] sm:left-[45%] md:left-[43%] lg:left-[45%] z-20 h-10 w-5 xs:h-12 xs:w-6 sm:h-20 sm:w-9" aria-hidden="true">
          <svg viewBox="0 0 40 90" fill="none" className="h-full w-full">
            <path d="M 8 90 C 14 60 12 30 18 5" stroke="#13857D" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 17 18 C 26 12 34 16 32 24 C 24 28 16 23 17 18 Z" fill="#13857D" opacity="0.9" />
            <path d="M 14 42 C 4 36 -2 43 2 51 C 9 54 14 48 14 42 Z" fill="#13857D" opacity="0.9" />
            <path d="M 13 68 C 24 61 31 66 29 74 C 21 78 13 73 13 68 Z" fill="#13857D" opacity="0.9" />
          </svg>
        </div>

        {/* Bottom-Right Teal Corner Wave */}
        <div className="pointer-events-none absolute -bottom-3 -right-3 z-20 h-12 w-12 xs:h-16 xs:w-16 sm:-bottom-6 sm:-right-6 sm:h-36 sm:w-36" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
            <path
              d="M 120 20 C 80 30 45 70 35 110 C 30 115 30 120 30 120 L 120 120 Z"
              fill="#0E8276"
            />
          </svg>
        </div>

        {/* ======================================================== */}
        {/* 2. MAIN LAYOUT: Left Content & Right Photo               */}
        {/* ======================================================== */}
        <div className="relative z-10 grid grid-cols-[52%_48%] xs:grid-cols-[50%_50%] sm:grid-cols-[48%_52%] lg:grid-cols-[46%_54%] min-h-[160px] xs:min-h-[185px] sm:min-h-[250px] md:min-h-[280px]">
          {/* Left Column: Heading, Supporting Text, CTA */}
          <div className="flex flex-col justify-center px-2.5 py-3 xs:px-4 xs:py-3.5 sm:px-10 md:py-8 lg:pl-20 lg:pr-6">
            {/* Heading Container with Doodles */}
            <div className="relative">
              <h2 className="font-display tracking-tight">
                <span className="block text-[14px] xs:text-[17px] sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#A03E26] leading-[1.08]">
                  Healthy Habits
                </span>
                <span className="relative block text-[14px] xs:text-[17px] sm:text-3xl md:text-4xl lg:text-[44px] font-black text-[#0E7870] leading-[1.08] mt-0.5">
                  Start Together
                  {/* Small gold heart doodle above/right */}
                  <svg
                    className="absolute -top-1.5 right-1 xs:right-2 sm:-top-3 sm:right-12 md:right-20 text-[#F5A623] h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-4 sm:w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* Small coral heart doodle below */}
                  <svg
                    className="absolute -bottom-1 right-0 xs:right-1 sm:-bottom-2.5 sm:right-6 md:right-12 text-[#E85D3F] h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3.5 sm:w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </h2>
            </div>

            {/* Supporting Text */}
            <p className="mt-1 xs:mt-1.5 sm:mt-3.5 max-w-[320px] text-[7px] xs:text-[8.5px] sm:text-xs md:text-sm font-semibold leading-tight xs:leading-snug sm:leading-relaxed text-[#1C324E]">
              Because the choices you make today,
              <br className="inline" /> shape her tomorrow.
            </p>

            {/* CTA Button */}
            <div className="mt-1.5 xs:mt-2.5 sm:mt-5">
              <Link
                to="/about"
                className="inline-flex items-center gap-1 sm:gap-2 rounded-full bg-[#0E7870] px-2 py-0.5 xs:px-3 xs:py-1 sm:px-6 sm:py-2.5 text-[7px] xs:text-[8.5px] sm:text-xs md:text-sm font-bold text-white shadow-xs transition-all duration-200 hover:bg-[#0A5A53] hover:shadow-md active:scale-[0.98] whitespace-nowrap"
              >
                <span>Explore Our Story</span>
                <ArrowRight className="h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-3.5 sm:w-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Lifestyle Photo with Organic Inward Curve & Speech Bubbles */}
          <div className="relative h-full min-h-[160px] xs:min-h-[185px] sm:min-h-[250px] md:min-h-full w-full">
            {/* SVG Organic Clip Path */}
            <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
              <defs>
                <clipPath id="storyOrganicClip" clipPathUnits="objectBoundingBox">
                  <path d="M 0.1 0 L 1 0 L 1 1 L 0 1 C 0 0.85 0.05 0.72 0.11 0.58 C 0.16 0.45 0.17 0.32 0.14 0.2 C 0.12 0.1 0.11 0.04 0.1 0 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* Clipped Image Container - responsive organic clip on desktop and mobile */}
            <div className="relative h-full w-full overflow-hidden story-organic-clip">
              <img
                src={homeAssets.story.src}
                alt={homeAssets.story.alt}
                className="h-full w-full object-cover object-[70%_center]"
                loading="lazy"
              />
            </div>

            {/* Speech Bubble 1: "For your changing needs" (Teal/Blue, Left) */}
            <div className="absolute left-[1%] xs:left-[2%] top-[6%] xs:top-[8%] z-30 scale-[0.48] xs:scale-[0.58] sm:scale-85 md:scale-100 origin-top-left md:left-[2%] lg:left-[4%]">
              <div className="relative flex flex-col items-center justify-center rounded-full border-2 border-[#38B2AC] bg-white/95 px-3 py-1.5 xs:px-3.5 xs:py-2 sm:px-4 sm:py-2.5 shadow-md backdrop-blur-sm">
                {/* Top Heart */}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-[#0E7870] mb-0.5">
                  <path
                    d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                </svg>
                {/* Text */}
                <p className="font-display text-[11px] font-bold leading-tight text-[#0E7870] sm:text-xs text-center whitespace-nowrap">
                  For your<br />changing needs
                </p>
                {/* Bottom Heart */}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-[#0E7870] mt-0.5">
                  <path
                    d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                </svg>
                {/* Speech Bubble Tail pointing down-right */}
                <div className="absolute -bottom-2 right-4 h-2.5 w-2.5 rotate-45 border-b-2 border-r-2 border-[#38B2AC] bg-white" />
              </div>
            </div>

            {/* Speech Bubble 2: "For her growing years" (Pink/Magenta, Right) */}
            <div className="absolute right-[1%] xs:right-[2%] top-[6%] xs:top-[8%] z-30 scale-[0.48] xs:scale-[0.58] sm:scale-85 md:scale-100 origin-top-right md:right-[6%] lg:right-[10%]">
              <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-[#F06292] bg-white/95 px-2.5 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2.5 shadow-md backdrop-blur-sm">
                {/* Top Heart */}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-[#C2185B] mb-0.5">
                  <path
                    d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                </svg>
                {/* Text */}
                <p className="font-display text-[11px] font-bold leading-tight text-[#C2185B] sm:text-xs text-center whitespace-nowrap">
                  For her<br />growing years
                </p>
                {/* Bottom Heart */}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-[#C2185B] mt-0.5">
                  <path
                    d="M 12 19 C 6.5 13.5 3.5 10 5.5 5.5 C 7.5 2 11.5 4.5 12 6.5 C 12.5 4.5 16.5 2 18.5 5.5 C 20.5 10 17.5 13.5 12 19 Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                </svg>
                {/* Speech Bubble Tail pointing down-left */}
                <div className="absolute -bottom-2 left-4 h-2.5 w-2.5 rotate-45 border-b-2 border-r-2 border-[#F06292] bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default BrandStoryBanner;
