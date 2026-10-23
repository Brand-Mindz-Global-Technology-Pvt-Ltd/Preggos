import heroMomDaughter from "../assets/images/home/hero-mom-daughter.png";
import pregnancy from "../assets/images/home/shop/pregnancy.png";
import postnatal from "../assets/images/home/shop/postnatal.png";
import lactationSupport from "../assets/images/home/shop/lactation-support.png";
import healthySnacking from "../assets/images/home/shop/healthy-snacking.png";
import kidsNutrition from "../assets/images/home/shop/kids-nutrition.png";
import womensWellness from "../assets/images/home/shop/womens-wellness.png";

/** Homepage image registry. Replace the local demo photographs with approved brand assets. */
export const homeAssets = {
  hero: { src: heroMomDaughter, alt: "Indian mother and daughter sharing a wholesome snack in a bright kitchen" },
  story: { src: heroMomDaughter, alt: "Mother and daughter cooking together" },
  categories: [
    { title: "Pregnancy", image: pregnancy, color: "bg-[#f8c3ce]", text: "For every trimester" },
    { title: "Postnatal", image: postnatal, color: "bg-[#f7b3b8]", text: "Gentle support" },
    { title: "Lactation Support", image: lactationSupport, color: "bg-[#f7ca68]", text: "Nourish your journey" },
    { title: "Healthy Snacking", image: healthySnacking, color: "bg-[#b7dfc9]", text: "Feel-good bites" },
    { title: "Kids Nutrition", image: kidsNutrition, color: "bg-[#f5c65c]", text: "Happy growing" },
    { title: "Women's Wellness", image: womensWellness, color: "bg-[#b8d3f1]", text: "Care for you" },
  ],
} as const;
