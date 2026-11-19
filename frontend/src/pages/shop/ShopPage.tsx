import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { demoProducts } from "../../data/demoProducts";
import { ProductCard } from "../../components/ui/ProductCard";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const offersParam = searchParams.get("offers");

  const [category, setCategory] = useState(() => {
    if (categoryParam) {
      const match = ["All", "Nourish", "Nest", "Celebrate"].find(
        (c) => c.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) return match;
    }
    return "All";
  });

  const [sort, setSort] = useState("Featured");
  const { add } = useCart();
  const { has, toggle } = useWishlist();

  useEffect(() => {
    if (categoryParam) {
      const match = ["All", "Nourish", "Nest", "Celebrate"].find(
        (c) => c.toLowerCase() === categoryParam.toLowerCase()
      );
      if (match) {
        setCategory(match);
      }
    } else if (!offersParam) {
      setCategory("All");
    }
  }, [categoryParam, offersParam]);

  const handleCategoryChange = (c: string) => {
    setCategory(c);
    if (c === "All") {
      searchParams.delete("category");
      searchParams.delete("offers");
      setSearchParams(searchParams);
    } else {
      searchParams.delete("offers");
      searchParams.set("category", c);
      setSearchParams(searchParams);
    }
  };

  const products = useMemo(() => {
    let list = demoProducts;
    if (offersParam === "true") {
      list = list.filter((p) => p.badge || p.compareAt);
    } else if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }
    return sort === "Price: low to high"
      ? [...list].sort((a, b) => a.price - b.price)
      : sort === "Price: high to low"
      ? [...list].sort((a, b) => b.price - a.price)
      : list;
  }, [category, sort, offersParam]);

  return (
    <main className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p data-scroll-reveal className="text-xs font-bold uppercase tracking-[.18em] text-orange">
          {offersParam === "true" ? "Special Offers" : "The collection"}
        </p>
        <h1 data-scroll-reveal className="mt-2 max-w-2xl font-display text-6xl font-black leading-none tracking-[-.06em]">
          {offersParam === "true"
            ? "Exclusive bundles & wellness savings"
            : "Good things for growing families"}
        </h1>
        <div data-scroll-reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-navy/10 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Nourish", "Nest", "Celebrate"].map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryChange(c)}
                className={`rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 ease-out cursor-pointer active:scale-95 ${
                  category === c && offersParam !== "true"
                    ? "bg-navy text-white shadow-xs scale-[1.02]"
                    : "border border-navy/15 text-[#12294a] hover:border-orange hover:text-orange hover:-translate-y-0.5 hover:shadow-2xs"
                }`}
              >
                {c === "Nourish" ? "Mother (Nourish)" : c === "Celebrate" ? "Kids (Celebrate)" : c === "Nest" ? "Wellness (Nest)" : c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-navy/50 transition-opacity duration-300">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-navy/15 bg-transparent px-4 py-2.5 text-sm font-bold text-[#12294a] cursor-pointer transition-all duration-200 hover:border-orange focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/15"
            >
              <option>Featured</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div data-scroll-reveal className="mt-12 rounded-[2.5rem] bg-white p-12 text-center border border-navy/10 shadow-xs">
            <p className="text-lg font-bold text-navy">No products found in this category.</p>
            <p className="mt-2 text-sm text-navy/60">Try selecting another category or clear your filters.</p>
            <button
              onClick={() => handleCategoryChange("All")}
              className="mt-6 inline-block rounded-full bg-orange px-6 py-3 font-bold text-white shadow-xs transition-all duration-200 hover:bg-[#d84b18] hover:shadow-md active:scale-95 cursor-pointer"
            >
              View all products
            </button>
          </div>
        ) : (
          <div
            key={`${category}-${sort}-${offersParam}`}
            className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={() => add(p)}
                liked={has(p.id)}
                onLike={() => toggle(p.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ShopPage;
