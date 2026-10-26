import heroMomDaughter from "../assets/images/home/hero-mom-daughter.png";
import pregnancy from "../assets/images/home/shop/pregnancy.png";
import postnatal from "../assets/images/home/shop/postnatal.png";
import lactationSupport from "../assets/images/home/shop/lactation-support.png";
import healthySnacking from "../assets/images/home/shop/healthy-snacking.png";
import kidsNutrition from "../assets/images/home/shop/kids-nutrition.png";
import womensWellness from "../assets/images/home/shop/womens-wellness.png";
import pinkLeaf from "../assets/images/home/leaf-png/pink-leaf.png";
import goldLeaf from "../assets/images/home/leaf-png/gold-leaf.png";
import greenLeaf from "../assets/images/home/leaf-png/green-leaf.png";

/** Homepage image registry. Replace the local demo photographs with approved brand assets. */
export const homeAssets = {
  hero: { src: heroMomDaughter, alt: "Indian mother and daughter sharing a wholesome snack in a bright kitchen" },
  story: { src: heroMomDaughter, alt: "Mother and daughter cooking together" },
  leaves: {
    pink: pinkLeaf,
    gold: goldLeaf,
    green: greenLeaf,
  },
  categories: [
    //  objectFit / objectPosition / clipTopPct — pixel-accurate per PNG analysis
    { title: "Pregnancy",         image: pregnancy,        color: "bg-[#f8c3ce]", text: "For every trimester",  objectFit: "contain" as const, objectPosition: "center top",  clipTopPct: 0  },
    { title: "Postnatal",         image: postnatal,        color: "bg-[#f7b3b8]", text: "Gentle support",       objectFit: "contain" as const, objectPosition: "center top",  clipTopPct: 0  },
    { title: "Lactation Support", image: lactationSupport, color: "bg-[#f7ca68]", text: "Nourish your journey", objectFit: "contain" as const, objectPosition: "center top",  clipTopPct: 0  },
    // healthy-snacking: real transparent gap at row 47/441 (10.7%) → clip just past it
    { title: "Healthy Snacking",  image: healthySnacking,  color: "bg-[#b7dfc9]", text: "Feel-good bites",      objectFit: "contain" as const, objectPosition: "center top",  clipTopPct: 12 },
    // kids-nutrition: fragment and main subject are contiguous (no gap) → object-cover focused on main subject
    { title: "Kids Nutrition",    image: kidsNutrition,    color: "bg-[#f5c65c]", text: "Happy growing",        objectFit: "contain" as const, objectPosition: "center top",  clipTopPct: 9 },
    { title: "Women's Wellness",  image: womensWellness,   color: "bg-[#b8d3f1]", text: "Care for you",        objectFit: "contain" as const, objectPosition: "center top",  clipTopPct: 12 },
  ],
} as const;
