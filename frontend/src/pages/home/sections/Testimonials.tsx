import { useState, useRef } from "react";
import { Star } from "lucide-react";
import { WaveDivider } from "../../../components/decorations/WaveDivider";
import momDaughterImg from "../../../assets/images/home/mom-daughter.png";
import greenLeaf from "../../../assets/images/home/leaf-png/green-leaf.png";

const reviews = [
  {
    name: "Anitha",
    text: "The millet crunchies are extremely tasty. Even my little one loved them!",
    bg: "bg-[#FFF6DE]",
    border: "border-[#F4E3B2]/80",
    shape: "rounded-[24px_16px_22px_16px]",
    avatarKey: "Anitha" as const,
  },
  {
    name: "Divya",
    text: "Mam Lacto Congee has been a blessing in my postpartum journey.",
    bg: "bg-[#EAF4FE]",
    border: "border-[#D2E6FA]/80",
    shape: "rounded-[18px_24px_16px_22px]",
    avatarKey: "Divya" as const,
  },
  {
    name: "Meera",
    text: "Healthy, tasty and made with such clean ingredients. Highly recommend!",
    bg: "bg-[#EAF7EE]",
    border: "border-[#CCEEDB]/80",
    shape: "rounded-[22px_16px_24px_18px]",
    avatarKey: "Meera" as const,
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (index: number) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.86;
      if (cardWidth > 0) {
        const newIndex = Math.round(scrollLeft / cardWidth);
        if (newIndex >= 0 && newIndex < reviews.length && newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FFFDF5] pt-5 pb-8 sm:pt-6 sm:pb-11 md:pt-7 md:pb-12">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="text-center">
          <h2 data-scroll-reveal className="font-display text-2xl font-black text-[#0C2340] sm:text-3xl md:text-[32px] leading-tight">
            Real Stories. Real Happiness.
          </h2>
          <p data-scroll-reveal className="mt-1 text-xs text-[#50617A] sm:text-[13px]">
            Loved by thousands of moms and families &amp; more!
          </p>
        </div>

        {/* Testimonials Band: Left Decoration + 3 Cards + Right Decoration */}
        <div className="mt-4 flex items-center justify-center gap-2 lg:gap-3 xl:gap-4">
          {/* Left Decorative Botanical Illustration */}
          <div className="hidden shrink-0 lg:block" aria-hidden="true">
            <img
              src={greenLeaf}
              alt=""
              className="h-[145px] w-[75px] shrink-0 object-contain"
            />
          </div>

          {/* Three Testimonial Cards: Smooth Swipeable Carousel on Mobile, 3-Card Grid on Tablet/Desktop */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar sm:grid sm:grid-cols-3 sm:overflow-visible gap-3 sm:gap-3.5 lg:gap-4 max-w-5xl px-1 sm:px-0"
          >
            {reviews.map((review) => (
              <article
                key={review.name}
                data-scroll-card
                className={`motion-testimonial-card ${review.bg} ${review.border} ${review.shape} flex min-h-[138px] w-[86%] sm:w-auto shrink-0 sm:shrink snap-center flex-col justify-between border p-3.5 sm:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-0.5`}
              >
                <div>
                  {/* Orange Quotation Mark Icon */}
                  <div className="mb-1 text-[#EF6241]" aria-hidden="true">
                    <svg
                      width="14"
                      height="11"
                      viewBox="0 0 14 11"
                      fill="none"
                      className="shrink-0"
                    >
                      <path
                        d="M 0 7 C 0 3 2 0 6 0 L 6 2.5 C 3.5 2.5 2.5 4 2.5 6 L 5.5 6 L 5.5 11 L 0 11 Z M 8 7 C 8 3 10 0 14 0 L 14 2.5 C 11.5 2.5 10.5 4 10.5 6 L 13.5 6 L 13.5 11 L 8 11 Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  {/* Testimonial Quote Text */}
                  <p className="text-xs leading-relaxed text-[#102650] font-medium sm:text-[12.5px]">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Customer Details Row: Avatar + Stars + Name + Verified */}
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white/90 shadow-xs">
                    {review.avatarKey === "Anitha" && (
                      <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" aria-hidden="true">
                        <circle cx="20" cy="20" r="20" fill="#FCD8C5" />
                        <path d="M 8 26 C 8 13 13 7 20 7 C 27 7 32 13 32 26 C 32 30 30 34 30 34 L 10 34 C 10 34 8 30 8 26 Z" fill="#1C1B20" />
                        <rect x="17" y="24" width="6" height="7" fill="#F1B696" />
                        <ellipse cx="20" cy="18" rx="7.5" ry="8.5" fill="#F8C7AB" />
                        <path d="M 12.5 16 C 13.5 11 16 9 20 11 C 24 9 26.5 11 27.5 16 C 26 13 23 12 20 12.5 C 17 12 14 13 12.5 16 Z" fill="#1C1B20" />
                        <circle cx="20" cy="15.5" r="0.9" fill="#D32F2F" />
                        <circle cx="17.2" cy="18" r="0.9" fill="#1C1B20" />
                        <circle cx="22.8" cy="18" r="0.9" fill="#1C1B20" />
                        <path d="M 18 21.5 C 18.8 22.8 21.2 22.8 22 21.5" stroke="#9C4A28" strokeWidth="1" strokeLinecap="round" />
                        <path d="M 11 36 C 12 30 16 29 20 29 C 24 29 28 30 29 36 Z" fill="#E65100" />
                      </svg>
                    )}
                    {review.avatarKey === "Divya" && (
                      <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" aria-hidden="true">
                        <circle cx="20" cy="20" r="20" fill="#E9D6F7" />
                        <path d="M 9 24 C 9 12 14 7 20 7 C 26 7 31 12 31 24 C 31 31 29 35 29 35 L 11 35 C 11 35 9 31 9 24 Z" fill="#241E26" />
                        <rect x="17" y="24" width="6" height="7" fill="#E6A885" />
                        <ellipse cx="20" cy="18" rx="7.5" ry="8.5" fill="#F4BA97" />
                        <path d="M 12.5 15 C 14 10.5 17 9 20 9.5 C 23 9 26 10.5 27.5 15 C 25 12 22 11.5 20 12 C 18 11.5 15 12 12.5 15 Z" fill="#241E26" />
                        <circle cx="20" cy="15.5" r="0.8" fill="#B71C1C" />
                        <circle cx="17.2" cy="18" r="0.9" fill="#241E26" />
                        <circle cx="22.8" cy="18" r="0.9" fill="#241E26" />
                        <path d="M 18 21.5 C 18.8 22.8 21.2 22.8 22 21.5" stroke="#8D4022" strokeWidth="1" strokeLinecap="round" />
                        <path d="M 11 36 C 12 30 16 29 20 29 C 24 29 28 30 29 36 Z" fill="#7B1FA2" />
                      </svg>
                    )}
                    {review.avatarKey === "Meera" && (
                      <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" aria-hidden="true">
                        <circle cx="20" cy="20" r="20" fill="#D3EFE3" />
                        <path d="M 9 24 C 9 12 14 7 20 7 C 26 7 31 12 31 24 C 31 31 29 35 29 35 L 11 35 C 11 35 9 31 9 24 Z" fill="#1F1B18" />
                        <rect x="17" y="24" width="6" height="7" fill="#E8B08F" />
                        <ellipse cx="20" cy="18" rx="7.5" ry="8.5" fill="#F6C3A3" />
                        <path d="M 12.5 15 C 14 10 18 8.5 21 9 C 25 9.5 27 11.5 27.5 16 C 25 13 22 12 19 12.5 C 16 12 14 13 12.5 15 Z" fill="#1F1B18" />
                        <circle cx="17.2" cy="18" r="0.9" fill="#1F1B18" />
                        <circle cx="22.8" cy="18" r="0.9" fill="#1F1B18" />
                        <path d="M 18 21.5 C 18.8 22.8 21.2 22.8 22 21.5" stroke="#8D4022" strokeWidth="1" strokeLinecap="round" />
                        <path d="M 11 36 C 12 30 16 29 20 29 C 24 29 28 30 29 36 Z" fill="#00796B" />
                      </svg>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Star Rating directly above customer name */}
                    <div className="flex items-center gap-0.5 text-[#F5A623]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={11} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                    {/* Customer Name */}
                    <p className="mt-0.5 text-xs font-bold leading-tight text-[#102650]">
                      {review.name}
                    </p>
                    {/* Verified Customer Label */}
                    <p className="text-[10px] leading-tight text-[#6B7280]">
                      Verified Customer
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right Decorative Illustration: Mother and Child PNG */}
          <div className="hidden shrink-0 lg:block" aria-hidden="true">
            <img
              src={momDaughterImg}
              alt=""
              className="h-[105px] w-auto max-w-[210px] object-contain select-none pointer-events-none"
              loading="lazy"
            />
          </div>
        </div>

        {/* Carousel pagination indicators at bottom center */}
        <div
          className="mt-4 flex items-center justify-center gap-1.5"
          aria-label="Testimonial pagination"
        >
          <button
            type="button"
            onClick={() => scrollToSlide(0)}
            aria-label="Testimonial slide 1"
            className={`h-1.5 transition-all duration-300 rounded-full ${
              activeIndex === 0 ? "w-5 bg-[#EF6241]" : "w-1.5 bg-[#A0C4D7] hover:bg-[#85AEC4]"
            }`}
          />
          <button
            type="button"
            onClick={() => scrollToSlide(1)}
            aria-label="Testimonial slide 2"
            className={`h-1.5 transition-all duration-300 rounded-full ${
              activeIndex === 1 ? "w-5 bg-[#EF6241]" : "w-1.5 bg-[#A0C4D7] hover:bg-[#85AEC4]"
            }`}
          />
          <button
            type="button"
            onClick={() => scrollToSlide(2)}
            aria-label="Testimonial slide 3"
            className={`h-1.5 transition-all duration-300 rounded-full ${
              activeIndex === 2 ? "w-5 bg-[#EF6241]" : "w-1.5 bg-[#A0C4D7] hover:bg-[#85AEC4]"
            }`}
          />
        </div>
      </div>

      {/* Organic Bottom Wave Divider transitioning into Footer */}
      <WaveDivider fill="#f2f7fc" />
    </section>
  );
}

export default Testimonials;
