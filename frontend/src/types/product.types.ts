export interface ProductPackSize {
  size: string;
  price: number;
  compareAt?: number;
  stock?: number;
}

export interface ProductKeyHighlight {
  icon: string;
  title: string;
}

export interface ProductIngredient {
  name: string;
  desc: string;
}

export interface ProductBenefit {
  title: string;
  desc: string;
}

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  compareAt?: number;
  image: string;
  badge?: string;
  color: string;
  // Extended optional properties for dynamic product details
  subtitle?: string;
  packSizes?: ProductPackSize[];
  highlights?: string[];
  keyHighlights?: ProductKeyHighlight[];
  ingredients?: ProductIngredient[];
  benefits?: ProductBenefit[];
  usage?: string;
  relatedProductIds?: string[];
};
