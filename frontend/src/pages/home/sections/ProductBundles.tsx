import { ArrowRight, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { demoProducts } from "../../../data/demoProducts"; import { homeAssets } from "../../../data/homeAssets";

const bundles = [
  { title: "New Mom Care Box", detail: "Postnatal support · Lactation wellness · Healthy snacks", badge: "Save 10%", color: "bg-[#fbe0e8]", image: demoProducts[0].image },
  { title: "Mother & Daughter Box", detail: "Healthy favourites · Nutrition for both · Family wellness", badge: "Most Loved", color: "bg-[#dff4f1]", image: demoProducts[3].image },
  { title: "Healthy Snack Box", detail: "Tasty & nutritious · Kids favourite · Travel friendly", badge: "Special Offer", color: "bg-[#fff0cf]", image: demoProducts[4].image },
];

export function ProductBundles() {
  return <section className="px-4 py-6 md:py-8"><div className="mx-auto max-w-7xl"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Gift className="text-[#ef6241]" size={28} /><div><h2 className="font-display text-3xl font-black md:text-4xl text-[#102650]">Better Together</h2><p className="text-sm leading-6 text-[#50617a]">Wellness bundles for every stage & every need.</p></div></div><Link to="/shop" className="text-xs font-bold text-[#ef6241]">View All Bundles <ArrowRight className="inline" size={13} /></Link></div><div className="mt-4 grid gap-3 md:grid-cols-3">{bundles.map(bundle => <Link key={bundle.title} to="/shop" className={`${bundle.color} relative flex min-h-[110px] items-center gap-3 overflow-hidden rounded-2xl p-3 transition hover:-translate-y-1`}><span className="absolute right-3 top-2 rounded-full bg-white/80 px-2 py-1 text-[9px] font-black text-[#ef6241]">{bundle.badge}</span><img src={bundle.image} alt="" aria-hidden="true" className="h-20 w-24 object-contain" loading="lazy" onError={event => { if (event.currentTarget.src !== homeAssets.hero.src) event.currentTarget.src = homeAssets.hero.src; }} /><div className="pr-2"><h3 className="text-xs font-black text-[#12294a]">{bundle.title}</h3><p className="mt-2 text-[10px] leading-4 text-[#50617a]">{bundle.detail}</p><span className="mt-2 inline-block text-[10px] font-bold text-[#ef6241]">Shop Now →</span></div></Link>)}</div></div></section>;
}
