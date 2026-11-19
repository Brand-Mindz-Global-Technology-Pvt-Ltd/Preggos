import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Eye,
  ShieldCheck,
  HeartHandshake,
  Heart,
  Star,
} from "lucide-react";

import bannerBg from "../../assets/images/graphics/banner.png";
import mom3 from "../../assets/images/graphics/mom-3.png";
import story1 from "../../assets/images/graphics/story-1.png";
import story2 from "../../assets/images/graphics/story-2.png";
import greenLeaf from "../../assets/images/home/leaf-png/green-leaf.png";
import goldLeaf from "../../assets/images/home/leaf-png/gold-leaf.png";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#112440] selection:bg-[#F15A24]/20 selection:text-[#112440] overflow-x-hidden">
      {/* ======================================================== */}
      {/* SECTION 1: HERO BANNER (Edge-to-Edge matching Reference) */}
      {/* ======================================================== */}
      <section
        aria-label="Our Story Banner"
        className="relative w-full overflow-hidden bg-[#FFFDF7]"
      >
        {/* Full-width original background graphic with natural aspect ratio */}
        <img
          src={bannerBg}
          alt="Preggos Our Story Banner"
          className="w-full h-auto block select-none pointer-events-none"
          loading="eager"
        />

        {/* Text Content Layer */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 md:px-8">
            <div className="max-w-[58%] sm:max-w-md md:max-w-lg lg:max-w-xl pl-1 sm:pl-2 flex flex-col items-center sm:items-start text-center sm:text-left sm:translate-x-[20px] sm:-translate-y-[40px]">
              {/* Heading: Our (Navy) Story (Teal) */}
              <h1 data-scroll-reveal className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-black tracking-tight leading-tight font-display">
                <span className="text-[#112440]">Our </span>
                <span className="text-[#0A7D78]">Story</span>
              </h1>

              {/* Subtitle */}
              <p data-scroll-reveal className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-semibold text-[#112440] leading-relaxed">
                A journey of love, nutrition and care for every stage of motherhood.
              </p>

              {/* Heart Flourish Doodle matching Reference */}
              <div data-scroll-reveal className="mt-2 sm:mt-2.5 flex justify-center sm:justify-start">
                <svg
                  width="86"
                  height="22"
                  viewBox="0 0 86 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#F15A24]"
                >
                  <path
                    d="M4 11C15 11 20 14 29 11"
                    stroke="#F15A24"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M43 18.5C43 18.5 34 13.5 34 8C34 5 36.5 2.5 39.5 2.5C41.5 2.5 43 3.7 43 4.5C43 3.7 44.5 2.5 46.5 2.5C49.5 2.5 52 5 52 8C52 13.5 43 18.5 43 18.5Z"
                    stroke="#F15A24"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M57 11C66 14 71 11 82 11"
                    stroke="#F15A24"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Artwork: mom-3.png with natural aspect ratio & fade mask */}
        <div className="absolute right-[3%] sm:right-[5%] md:right-[7%] lg:right-[8%] bottom-0 z-10 pointer-events-none select-none h-full flex items-end justify-end">
          <img
            src={mom3}
            alt="Pregnant mother smiling"
            className="h-auto max-h-[calc(86%-4px)] sm:max-h-[calc(90%-4px)] md:max-h-[calc(93%-4px)] lg:max-h-[calc(95%-4px)] w-auto object-contain object-bottom drop-shadow-xs -translate-y-[12px] sm:-translate-y-[15px] md:-translate-y-[18px] lg:-translate-y-[20px] preggos-image-enter"
            loading="eager"
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>
      </section>

      {/* ======================================================== */}
      {/* MAIN CONTENT CONTAINER (~90-92% Viewport Width)          */}
      {/* ======================================================== */}
      <main className="mx-auto w-[92%] max-w-[1400px] pt-8 sm:pt-14 pb-20">
        {/* ====================================================== */}
        {/* SECTION 2: WHO WE ARE (story-1.png on left + text)      */}
        {/* ====================================================== */}
        <section
          aria-label="Who We Are"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
        >
          {/* Left: story-1.png in rounded frame with doodle decorations */}
          <div data-scroll-reveal className="lg:col-span-5 relative">
            {/* Top-left heart doodle */}
            <div className="absolute -top-4 -left-3 z-10 select-none pointer-events-none">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#F15A24]">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="#F15A24"
                  strokeWidth="1.8"
                  fill="none"
                />
              </svg>
            </div>

            {/* Top-right heart doodle */}
            <div className="absolute -top-3 -right-3 z-10 select-none pointer-events-none">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#FBBF24]">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="#FBBF24"
                  strokeWidth="1.8"
                  fill="none"
                />
              </svg>
            </div>

            {/* Rounded Image Card Container */}
            <div className="rounded-[2.5rem] bg-[#FFF9F3] border border-[#F4E6D8] p-2 sm:p-2.5 shadow-xs overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={story1}
                alt="Mother kissing baby"
                className="w-full h-auto rounded-[2rem] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Right: Text Information */}
          <div className="lg:col-span-7 space-y-4">
            <h2 data-scroll-reveal className="text-3xl sm:text-4xl md:text-5xl font-black text-[#112440] font-display italic tracking-tight">
              Who We Are
            </h2>
            <p data-scroll-reveal className="text-base sm:text-lg md:text-xl font-medium text-[#112440] leading-relaxed">
              At Preggos, we believe every mother deserves the best — nutritious natural products, gentle care and unwavering support throughout her motherhood journey.
            </p>
          </div>
        </section>

        {/* ====================================================== */}
        {/* SECTION 3: OUR MISSION & VISION                        */}
        {/* ====================================================== */}
        <section aria-label="Our Mission and Vision" className="mt-16 sm:mt-24">
          {/* Section Divider Header */}
          <div data-scroll-reveal className="flex items-center justify-center gap-4 mb-8 sm:mb-12">
            <div className="h-[1.5px] w-12 sm:w-24 bg-[#D4C4B5]" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#112440] tracking-tight text-center font-display">
              Our Mission &amp; Vision
            </h3>
            <div className="h-[1.5px] w-12 sm:w-24 bg-[#D4C4B5]" />
          </div>

          {/* Two Side-by-Side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Card 1: Our Mission */}
            <div data-scroll-card className="rounded-3xl bg-[#F0F7FF] border border-[#DCEBFA] p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              {/* Bullseye Icon */}
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#F15A24] shadow-2xs transition-transform duration-200 hover:scale-110">
                <Target size={30} strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xl sm:text-2xl font-bold text-[#112440]">
                  Our Mission
                </h4>
                <p className="mt-2 text-sm sm:text-base font-medium text-[#556070] leading-relaxed">
                  To provide trusted, nutritious and thoughtfully curated products for every stage of motherhood.
                </p>
              </div>
            </div>

            {/* Card 2: Our Vision */}
            <div data-scroll-card className="rounded-3xl bg-[#F0FDF8] border border-[#D2F4E9] p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              {/* Eye Icon */}
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-[#0D9488] shadow-2xs transition-transform duration-200 hover:scale-110">
                <Eye size={30} strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xl sm:text-2xl font-bold text-[#112440]">
                  Our Vision
                </h4>
                <p className="mt-2 text-sm sm:text-base font-medium text-[#556070] leading-relaxed">
                  To be the most loved maternity wellness brand, empowering moms for a healthier tomorrow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* SECTION 4: OUR VALUES                                  */}
        {/* ====================================================== */}
        <section aria-label="Our Values" className="mt-16 sm:mt-24">
          {/* Section Divider Header */}
          <div data-scroll-reveal className="flex items-center justify-center gap-4 mb-10 sm:mb-14">
            <div className="h-[1.5px] w-12 sm:w-24 bg-[#D4C4B5]" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#112440] tracking-tight text-center font-display">
              Our Values
            </h3>
            <div className="h-[1.5px] w-12 sm:w-24 bg-[#D4C4B5]" />
          </div>

          {/* 4 Values Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {/* Value 1: Care */}
            <div data-scroll-card className="flex flex-col items-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#F3E8FF] text-[#9333EA] shadow-xs transition-transform duration-200 hover:scale-110">
                <ShieldCheck size={28} sm-size={32} strokeWidth={2.2} />
              </div>
              <h4 className="mt-3.5 text-base sm:text-lg font-bold text-[#112440]">
                Care
              </h4>
              <p className="mt-0.5 text-xs sm:text-sm font-medium text-[#556070]">
                Quality you can trust
              </p>
            </div>

            {/* Value 2: Trust */}
            <div data-scroll-card className="flex flex-col items-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#FFEDD5] text-[#EA580C] shadow-xs transition-transform duration-200 hover:scale-110">
                <HeartHandshake size={28} sm-size={32} strokeWidth={2.2} />
              </div>
              <h4 className="mt-3.5 text-base sm:text-lg font-bold text-[#112440]">
                Trust
              </h4>
              <p className="mt-0.5 text-xs sm:text-sm font-medium text-[#556070]">
                Always by your side
              </p>
            </div>

            {/* Value 3: Wellbeing */}
            <div data-scroll-card className="flex flex-col items-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#CCFBF1] text-[#0D9488] shadow-xs transition-transform duration-200 hover:scale-110">
                <Heart size={28} sm-size={32} strokeWidth={2.2} />
              </div>
              <h4 className="mt-3.5 text-base sm:text-lg font-bold text-[#112440]">
                Wellbeing
              </h4>
              <p className="mt-0.5 text-xs sm:text-sm font-medium text-[#556070]">
                For a healthier you
              </p>
            </div>

            {/* Value 4: Empowerment */}
            <div data-scroll-card className="flex flex-col items-center">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D97706] shadow-xs transition-transform duration-200 hover:scale-110">
                <Star size={28} sm-size={32} strokeWidth={2.2} />
              </div>
              <h4 className="mt-3.5 text-base sm:text-lg font-bold text-[#112440]">
                Empowerment
              </h4>
              <p className="mt-0.5 text-xs sm:text-sm font-medium text-[#556070]">
                Because you matter
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* SECTION 5: OUR STORY SECTION (story-2.png on right)    */}
        {/* ====================================================== */}
        <section
          aria-label="Detailed Story"
          className="mt-16 sm:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Left: Narrative text & CTA */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <h2 data-scroll-reveal className="text-3xl sm:text-4xl md:text-5xl font-black text-[#112440] font-display tracking-tight">
              Our Story
            </h2>

            <p data-scroll-reveal className="text-base sm:text-lg font-semibold text-[#112440] leading-relaxed">
              Preggos was born from a simple belief — that every mother and child deserves the best.
            </p>

            <p data-scroll-reveal className="text-sm sm:text-base font-medium text-[#556070] leading-relaxed">
              What started as a heartfelt idea has grown into a brand that supports moms with natural, safe and nourishing products at every stage — from pregnancy to postpartum and beyond.
            </p>

            <p data-scroll-reveal className="text-base sm:text-lg font-bold text-[#112440] pt-1">
              Because when moms thrive, everything grows better.
            </p>

            {/* Heart doodle */}
            <div data-scroll-reveal className="pt-1">
              <svg
                width="72"
                height="22"
                viewBox="0 0 72 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#F15A24]"
              >
                <path
                  d="M4 11C12 11 16 14 24 11"
                  stroke="#F15A24"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M36 18C36 18 28 13.5 28 8.5C28 5.5 30.5 3 33.5 3C35.5 3 36 4.2 36 4.8C36 4.2 36.5 3 38.5 3C41.5 3 44 5.5 44 8.5C44 13.5 36 18 36 18Z"
                  stroke="#F15A24"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M48 11C56 14 60 11 68 11"
                  stroke="#F15A24"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* CTA Button */}
            <div data-scroll-reveal className="pt-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-[#F15A24] px-8 py-4 text-sm sm:text-base font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#DE4B16] hover:-translate-y-0.5 hover:shadow-md active:scale-[0.985]"
              >
                <span>Join Our Journey</span>
                <ArrowRight size={18} strokeWidth={2.4} />
              </Link>
            </div>
          </div>

          {/* Right: story-2.png with decorative warm blob background */}
          <div data-scroll-reveal className="lg:col-span-6 relative">
            {/* Top-right heart doodles */}
            <div className="absolute -top-5 right-6 z-10 flex items-center gap-2 select-none pointer-events-none">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#FBBF24]">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="#FBBF24"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#F15A24]">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="#F15A24"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            {/* Left heart doodle */}
            <div className="absolute top-1/4 -left-4 z-10 select-none pointer-events-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#FBBF24]">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="#FBBF24"
                  strokeWidth="1.8"
                  fill="none"
                />
              </svg>
            </div>

            {/* Decorative Leaf Branch (PNG Asset) on Bottom Left */}
            <div className="absolute -bottom-6 -left-6 z-10 w-20 sm:w-24 pointer-events-none select-none">
              <img src={greenLeaf} alt="Decorative leaf" className="w-full h-auto drop-shadow-xs" />
            </div>

            {/* Decorative Leaf Branch (PNG Asset) on Right */}
            <div className="absolute -bottom-4 -right-4 z-10 w-16 sm:w-20 pointer-events-none select-none">
              <img src={goldLeaf} alt="Decorative gold leaf" className="w-full h-auto drop-shadow-xs" />
            </div>

            {/* Organic Rounded Warm Card Container */}
            <div className="rounded-[3rem] bg-[#FEF6EC] border border-[#F6E8DA] p-3 sm:p-5 shadow-xs overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={story2}
                alt="Mother hugging daughter"
                className="w-full h-auto rounded-[2.5rem] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default AboutPage;
