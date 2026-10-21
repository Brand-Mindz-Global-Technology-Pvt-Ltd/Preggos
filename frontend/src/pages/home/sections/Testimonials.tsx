import { Star } from "lucide-react";
import { WaveDivider } from "../../../components/decorations/WaveDivider";
import { homeAssets } from "../../../data/homeAssets";

const reviews = [
  ["Anitha", "The millet crunchies are extremely tasty. Even my little one loved them!", "bg-[#fff0c8]"],
  ["Divya", "Mama Lacto Congee has been a blessing in my postpartum journey.", "bg-[#ddebfa]"],
  ["Meera", "Healthy, tasty and made with such clean ingredients. Highly recommend!", "bg-[#daf1e5]"],
] as const;

export function Testimonials() {
  return <section className="relative overflow-hidden bg-[#fff8ee] px-4 py-8"><div className="relative z-10 mx-auto max-w-7xl"><div className="text-center"><h2 className="font-display text-3xl font-black md:text-4xl text-[#102650]">Real Stories. Real Happiness.</h2><p className="text-sm leading-6 text-[#50617a]">Loved by thousands of moms and families & more!</p></div><div className="mt-4 grid gap-3 md:grid-cols-3">{reviews.map(([name, text, color]) => <article key={name} className={`${color} min-h-[112px] rounded-[28%_12%_22%_14%] p-4 shadow-sm`}><div className="flex text-[#f4a51c]">{[1, 2, 3, 4, 5].map(star => <Star key={star} size={12} fill="currentColor" />)}</div><p className="mt-2 text-xs italic leading-5 text-[#172a4b]">“{text}”</p><div className="mt-3 flex items-center gap-2"><div className="h-7 w-7 rounded-full bg-[#d89b83]" aria-hidden="true" /><p className="text-[10px] font-black text-[#172a4b]">{name}<span className="ml-2 font-normal text-[#50617a]">Verified Customer</span></p></div></article>)}</div><div className="mt-4 flex justify-center gap-1" aria-label="Testimonial pagination"><span className="h-1.5 w-4 rounded-full bg-[#ef6241]" /><span className="h-1.5 w-1.5 rounded-full bg-[#c6d0da]" /><span className="h-1.5 w-1.5 rounded-full bg-[#c6d0da]" /></div></div><WaveDivider fill="#edf3ff" flip /></section>;
}
