import { Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product.types";
import { formatCurrency } from "../../utils/formatCurrency";
import { homeAssets } from "../../data/homeAssets";

export function ProductCard({
  product,
  liked,
  onAdd,
  onLike,
}: {
  product: Product;
  liked: boolean;
  onAdd: () => void;
  onLike: () => void;
}) {
  return (
    <article
      data-scroll-card
      className="group relative motion-product-card transition-all duration-300 ease-out"
    >
      <div className={`relative overflow-hidden rounded-[2rem] ${product.color}`}>
        <Link to={`/product/${product.id}`} className="block overflow-hidden">
          <img
            src={product.image || homeAssets.hero.src}
            alt={product.name}
            onError={(event) => {
              if (event.currentTarget.src !== homeAssets.hero.src) {
                event.currentTarget.src = homeAssets.hero.src;
              }
            }}
            className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
            loading="lazy"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider shadow-xs transition-transform duration-200 group-hover:translate-x-0.5">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={onLike}
          aria-label={`Save ${product.name}`}
          className="absolute right-4 top-4 rounded-full bg-white p-2.5 shadow-xs transition-all duration-200 ease-out hover:scale-110 active:scale-90 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
        >
          <Heart
            size={17}
            fill={liked ? "#f47a45" : "none"}
            color={liked ? "#f47a45" : "#16324f"}
            className={`transition-all duration-300 ${liked ? "scale-110" : "scale-100"}`}
          />
        </button>
      </div>

      <div className="flex items-start justify-between gap-3 pt-4">
        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="font-display text-xl font-black transition-colors duration-150 group-hover:text-orange">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-navy/55">{product.description}</p>
          <p className="mt-3 font-bold">
            {formatCurrency(product.price)}{" "}
            {product.compareAt && (
              <del className="ml-1 text-sm font-normal text-navy/35">
                {formatCurrency(product.compareAt)}
              </del>
            )}
          </p>
        </Link>

        <button
          type="button"
          onClick={onAdd}
          aria-label={`Add ${product.name} to cart`}
          className="mt-1 rounded-full bg-orange p-3 text-white shadow-xs transition-all duration-200 ease-out hover:scale-110 active:scale-95 hover:bg-[#d84b18] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 shrink-0"
        >
          <Plus size={18} />
        </button>
      </div>
    </article>
  );
}
