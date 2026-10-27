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
    { title: "Pregnancy",         image: pregnancy,        color: "bg-[#d8b4e2]", text: "For every trimester",  objectFit: "contain" as const, objectPosition: "center top",  clipTopPct: 0,  arrowColor: "#9b6b9e" as const },
    { title: "Postnatal",         image: postnatal,        color: "bg-[#f7b3b8]", text: "Gentle support",       objectFit: "contain" as const, objectPosition: "center top",  clipTopPct: 0,  arrowColor: "#ef6241" as const },
    { title: "Lactation Support", image: lactationSupport, color: "bg-[#f7ca68]", text: "Nourish your journey", objectFit: "contain" as const, objectPosition: "center top",  clipTopPct: 0,  arrowColor: "#f7ca68" as const },
    { title: "Healthy Snacking",  image: healthySnacking,  color: "bg-[#b7dfc9]", text: "Feel-good bites",      objectFit: "cover" as const,   objectPosition: "center 25%", clipTopPct: 8,  arrowColor: "#6b9e7d" as const },
    { title: "Kids Nutrition",    image: kidsNutrition,    color: "bg-[#f5c65c]", text: "Happy growing",        objectFit: "cover" as const,   objectPosition: "center 30%", clipTopPct: 5,  arrowColor: "#f5c65c" as const },
    { title: "Women's Wellness",  image: womensWellness,   color: "bg-[#b8d3f1]", text: "Care for you",        objectFit: "cover" as const,   objectPosition: "center 25%", clipTopPct: 8,  arrowColor: "#7ba8d8" as const },
  ],
} as const;
