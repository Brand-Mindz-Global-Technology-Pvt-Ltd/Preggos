import { Leaf, Heart, Truck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="w-full bg-[#dcefe9] py-1.5 px-3 sm:px-4 text-[10px] min-[375px]:text-[10.5px] sm:text-[11px] md:text-xs font-bold text-[#17324f]">
      {/* Desktop Announcement Bar (Static & Centered) */}
      <div className="hidden sm:flex mx-auto max-w-7xl items-center justify-center gap-x-4 md:gap-x-5 whitespace-nowrap">
        <span className="inline-flex items-center gap-1.5 shrink-0">
          <Truck size={12} className="text-[#529a62]" />
          <span>Free Shipping on Orders Above ₹499</span>
        </span>
        <span className="text-[#8bb8aa] opacity-75 shrink-0">|</span>
        <span className="inline-flex items-center gap-1.5 shrink-0">
          <Leaf size={12} className="text-[#529a62]" />
          <span>100% Natural Ingredients</span>
        </span>
        <span className="text-[#8bb8aa] opacity-75 shrink-0">|</span>
        <span className="inline-flex items-center gap-1.5 shrink-0">
          <Heart size={12} fill="#ef6241" className="text-[#ef6241]" />
          <span>Loved by 50,000+ Happy Moms</span>
        </span>
      </div>

      {/* Mobile Announcement Bar (Smooth Infinite Marquee: Right to Left) */}
      <div className="block sm:hidden w-full overflow-hidden">
        <div
          className="animate-marquee-scroll flex items-center whitespace-nowrap py-0.5 select-none"
          tabIndex={0}
          aria-label="Announcements"
        >
          {/* Primary Sequence */}
          <div className="flex items-center gap-x-3.5 pr-3.5 shrink-0">
            <span className="inline-flex items-center gap-1 shrink-0">
              <Truck size={11} className="text-[#529a62]" />
              <span>Free Shipping on Orders Above ₹499</span>
            </span>
            <span className="text-[#8bb8aa] opacity-75 shrink-0 select-none">|</span>
            <span className="inline-flex items-center gap-1 shrink-0">
              <Leaf size={11} className="text-[#529a62]" />
              <span>100% Natural Ingredients</span>
            </span>
            <span className="text-[#8bb8aa] opacity-75 shrink-0 select-none">|</span>
            <span className="inline-flex items-center gap-1 shrink-0">
              <Heart size={11} fill="#ef6241" className="text-[#ef6241]" />
              <span>Loved by 50,000+ Happy Moms</span>
            </span>
            <span className="text-[#8bb8aa] opacity-75 shrink-0 select-none">|</span>
          </div>

          {/* Duplicate Sequence for seamless infinite loop */}
          <div className="flex items-center gap-x-3.5 pr-3.5 shrink-0" aria-hidden="true">
            <span className="inline-flex items-center gap-1 shrink-0">
              <Truck size={11} className="text-[#529a62]" />
              <span>Free Shipping on Orders Above ₹499</span>
            </span>
            <span className="text-[#8bb8aa] opacity-75 shrink-0 select-none">|</span>
            <span className="inline-flex items-center gap-1 shrink-0">
              <Leaf size={11} className="text-[#529a62]" />
              <span>100% Natural Ingredients</span>
            </span>
            <span className="text-[#8bb8aa] opacity-75 shrink-0 select-none">|</span>
            <span className="inline-flex items-center gap-1 shrink-0">
              <Heart size={11} fill="#ef6241" className="text-[#ef6241]" />
              <span>Loved by 50,000+ Happy Moms</span>
            </span>
            <span className="text-[#8bb8aa] opacity-75 shrink-0 select-none">|</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AnnouncementBar;
