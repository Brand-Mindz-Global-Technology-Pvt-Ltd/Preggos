import { ArrowRight, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { demoProducts } from "../../../data/demoProducts";
import { homeAssets } from "../../../data/homeAssets";

const bundles = [
  {
    title: "New Mom Care Box",
    detail: "Postnatal support · Lactation wellness · Healthy snacks",
    badge: "Save 10%",
    color: "bg-[#fbe0e8]",
    image: demoProducts[0].image,
  },
  {
    title: "Mother & Daughter Box",
    detail: "Healthy favourites · Nutrition for both · Family wellness",
    badge: "Most Loved",
    color: "bg-[#dff4f1]",
    image: demoProducts[3].image,
  },
  {
    title: "Healthy Snack Box",
    detail: "Tasty & nutritious · Kids favourite · Travel friendly",
    badge: "Special Offer",
    color: "bg-[#fff0cf]",
    image: demoProducts[4].image,
  },
];

export function ProductBundles() {
  return (
    <section className="px-4 py-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Gift className="text-[#ef6241] shrink-0" size={26} />
            <div>
              <h2 className="font-display text-2xl font-black md:text-4xl text-[#102650]">
                Better Together
              </h2>
              <p className="text-xs leading-5 text-[#50617a] sm:text-sm">
                Wellness bundles for every stage &amp; every need.
              </p>
            </div>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-[#ef6241] hover:text-[#d84b18] transition inline-flex items-center gap-1"
          >
            <span>View All Bundles</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
          {bundles.map((bundle) => (
            <Link
              key={bundle.title}
              to="/shop"
              className={`${bundle.color} relative flex flex-col sm:flex-row min-h-[140px] sm:min-h-[105px] items-center text-center sm:text-left gap-1.5 sm:gap-3 overflow-hidden rounded-xl sm:rounded-2xl p-2.5 sm:p-3 transition hover:-translate-y-1 shadow-xs last:col-span-2 sm:last:col-span-1 md:last:col-span-1 last:flex-row last:text-left last:items-center last:min-h-[90px] sm:last:min-h-[105px]`}
            >
              <span className="absolute right-2 top-2 sm:right-3 sm:top-2 rounded-full bg-white/85 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-black text-[#ef6241]">
                {bundle.badge}
              </span>
              <img
                src={bundle.image}
                alt=""
                aria-hidden="true"
                className="h-16 w-16 sm:h-20 sm:w-24 object-contain shrink-0"
                loading="lazy"
                onError={(event) => {
                  if (event.currentTarget.src !== homeAssets.hero.src) {
                    event.currentTarget.src = homeAssets.hero.src;
                  }
                }}
              />
              <div className="min-w-0 w-full sm:w-auto pr-0 sm:pr-2">
                <h3 className="truncate text-[11px] sm:text-xs font-black text-[#12294a]">
                  {bundle.title}
                </h3>
                <p className="mt-0.5 sm:mt-1 line-clamp-2 text-[9px] sm:text-[10px] leading-tight sm:leading-4 text-[#50617a]">
                  {bundle.detail}
                </p>
                <span className="mt-1 sm:mt-1.5 inline-block text-[9px] sm:text-[10px] font-bold text-[#ef6241]">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductBundles;
