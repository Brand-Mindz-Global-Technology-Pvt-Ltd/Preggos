

export const CategoryBulkUploadTemplate = [
  ["name", "slug", "parentSlug", "status", "metaTitle"],

  // CATEGORIES (Root Level - No Parent)
  ["Electronics", "electronics", "", "active", "Shop Electronics Online"],
  ["Fashion", "fashion", "", "active", "Latest Fashion Trends"],
  ["Home & Kitchen", "home-kitchen", "", "active", "Home & Kitchen Essentials"],
  ["Sports", "sports", "", "active", "Sports & Fitness Equipment"],

  // SUB-CATEGORIES (Children Level)
  ["Mobile Phones", "mobile-phones", "electronics", "active", "Buy Latest Mobile Phones"],
  ["Laptops", "laptops", "electronics", "active", "Best Laptops & Notebooks"],
  ["Cameras", "cameras", "electronics", "active", "Digital Cameras & Accessories"],
  
  ["Men's Clothing", "mens-clothing", "fashion", "active", "Men's Fashion Collection"],
  ["Women's Clothing", "womens-clothing", "fashion", "active", "Women's Fashion Collection"],
  ["Footwear", "footwear", "fashion", "active", "Shoes & Footwear"],
  
  ["Furniture", "furniture", "home-kitchen", "active", "Home Furniture"],
  ["Kitchen Appliances", "kitchen-appliances", "home-kitchen", "active", "Kitchen Appliances & Tools"],
  
  ["Fitness Equipment", "fitness-equipment", "sports", "active", "Gym & Fitness Equipment"],
  ["Outdoor Sports", "outdoor-sports", "sports", "active", "Outdoor Sports Gear"],
];