import heroMomDaughter from "../assets/images/home/hero-mom-daughter.png";

/** Homepage image registry. Replace the local demo photographs with approved brand assets. */
export const homeAssets = {
  hero: { src: heroMomDaughter, alt: "Indian mother and daughter sharing a wholesome snack in a bright kitchen" },
  story: { src: heroMomDaughter, alt: "Mother and daughter cooking together" },
  categories: [
    ["Pregnancy", "🤰", "bg-[#f8c3ce]", "For every trimester"], ["Postnatal", "👩‍🍼", "bg-[#f7b3b8]", "Gentle support"],
    ["Lactation Support", "🫶", "bg-[#f7ca68]", "Nourish your journey"], ["Healthy Snacking", "🥣", "bg-[#b7dfc9]", "Feel-good bites"],
    ["Kids Nutrition", "💪", "bg-[#f5c65c]", "Happy growing"], ["Women's Wellness", "🌿", "bg-[#b8d3f1]", "Care for you"],
  ],
} as const;
