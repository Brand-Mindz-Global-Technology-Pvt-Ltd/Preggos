import { Leaf, Heart, Truck } from "lucide-react";

export function AnnouncementBar() {
  return <div className="bg-[#dcefe9] px-4 py-2 text-[10px] font-bold text-[#17324f] md:text-xs">
    <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-5 gap-y-1">
      <span className="flex items-center gap-1"><Truck size={12} className="text-[#529a62]" /> Free Shipping on Orders Above ₹499</span>
      <span className="hidden text-[#8bb8aa] md:inline">|</span>
      <span className="flex items-center gap-1"><Leaf size={12} className="text-[#529a62]" /> 100% Natural Ingredients</span>
      <span className="hidden text-[#8bb8aa] md:inline">|</span>
      <span className="flex items-center gap-1"><Heart size={12} fill="#ef6241" className="text-[#ef6241]" /> Loved by 50,000+ Happy Moms</span>
    </div>
  </div>;
}
