import type { Product } from "../types/product.types";
/** Clearly labelled demo catalogue; replace with productService once the API is configured. */
export const demoProducts: Product[] = [
  { id: "ritual-kit", name: "The Pregnancy Ritual Kit", category: "Nourish", description: "A daily dose of calm, comfort and care.", price: 1899, compareAt: 2399, badge: "Bestseller", color: "bg-peach", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85" },
  { id: "belly-butter", name: "Belly Love Butter", category: "Nourish", description: "Rich, nourishing moisture for growing skin.", price: 799, badge: "New", color: "bg-sun", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85" },
  { id: "rest-nest", name: "Rest & Nest Pillow", category: "Nest", description: "Soft support for slow, sleepy nights.", price: 1499, color: "bg-lilac", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85" },
  { id: "little-box", name: "Little One Welcome Box", category: "Celebrate", description: "A thoughtful welcome for your newest love.", price: 2199, badge: "Gift favourite", color: "bg-mint", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85" },
  { id: "hydration", name: "Nurture Hydration Drops", category: "Nourish", description: "Coconut, lime and electrolytes for busy days.", price: 549, color: "bg-mint", image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=900&q=85" },
  { id: "milestone-cards", name: "Bump to Baby Cards", category: "Celebrate", description: "Little prompts for the big, beautiful moments.", price: 699, color: "bg-peach", image: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?auto=format&fit=crop&w=900&q=85" },
];
