import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Plus,
  Minus,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ShoppingCart,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Zap,
} from "lucide-react";

import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { demoProducts } from "../../data/demoProducts";

// Image Assets strictly per requirements
import bannerBg from "../../assets/images/graphics/banner.png";
import mom1Banner from "../../assets/images/graphics/mom-1.png";
import mamaBitezImg from "../../assets/images/graphics/details/product.png";
import mom1DetailsArtwork from "../../assets/images/graphics/details/mom-1.png";
import badhamImg from "../../assets/images/graphics/details/badham.png";

// Related products images from assets/images/home/shop/
import healthySnackingImg from "../../assets/images/home/shop/healthy-snacking.png";
import lactationImg from "../../assets/images/home/shop/lactation-support.png";
import womensWellnessImg from "../../assets/images/home/shop/womens-wellness.png";
import kidsNutritionImg from "../../assets/images/home/shop/kids-nutrition.png";
import postnatalImg from "../../assets/images/home/shop/postnatal.png";

interface RelatedProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
}

const RELATED_PRODUCTS: RelatedProductItem[] = [
  {
    id: "mama-bitez",
    name: "Mama Bitez",
    category: "Nourish",
    description: "Crunchy bites enriched with calcium & iron for expecting mothers.",
    price: 75,
    rating: 4.8,
    reviewsCount: 120,
    image: mamaBitezImg,
  },
  {
    id: "mama-lacto-congee",
    name: "Mama Lacto Congee",
    category: "Lactation Support",
    description: "Nourishing traditional herbal congee for wholesome lactation care.",
    price: 255,
    rating: 4.9,
    reviewsCount: 195,
    image: lactationImg,
  },
  {
    id: "womens-wellness-pectin-melts",
    name: "Women's Wellness Pectin Melts",
    category: "Women's Wellness",
    description: "Plant-based vitamin pectin melts for vitality and natural hormone balance.",
    price: 289,
    rating: 4.8,
    reviewsCount: 105,
    image: womensWellnessImg,
  },
  {
    id: "kids-nutrition-mix",
    name: "Kids Nutrition Mix",
    category: "Kids Nutrition",
    description: "Wholesome sprouted grains and nuts powder for active growing kids.",
    price: 199,
    rating: 4.8,
    reviewsCount: 105,
    image: kidsNutritionImg,
  },
  {
    id: "red-rice-choco-crunchies",
    name: "Red Rice Choco Crunchies",
    category: "Postnatal",
    description: "Iron-rich red rice crisps enrobed in pure dark cocoa for guilt-free snacking.",
    price: 255,
    rating: 4.8,
    reviewsCount: 175,
    image: postnatalImg,
  },
];

const PACK_SIZES = [
  { size: "200g", price: 75, compareAt: 99, discount: "43% OFF" },
  { size: "400g", price: 140, compareAt: 190, discount: "45% OFF" },
  { size: "600g", price: 199, compareAt: 280, discount: "48% OFF" },
];

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { add } = useCart();
  const { has, toggle } = useWishlist();

  // Find matched product or default to Mama Bitez reference product
  const matchedDemo = demoProducts.find((p) => p.id === id);
  const matchedRelated = RELATED_PRODUCTS.find((p) => p.id === id);

  const baseProduct = {
    id: id || "mama-bitez",
    name: matchedRelated?.name || matchedDemo?.name || "Mama Bitez",
    category: matchedRelated?.category || matchedDemo?.category || "Nourish",
    description:
      matchedRelated?.description ||
      matchedDemo?.description ||
      "A delicious and nutritious snack packed with essential nutrients for you and your little one!",
    price: matchedRelated?.price || matchedDemo?.price || 75,
    compareAt: matchedDemo?.compareAt || 99,
    badge: "Bestseller",
    color: "bg-[#FEF7EF]",
    image: matchedRelated?.image || mamaBitezImg,
  };

  // State management
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"details" | "ingredients" | "benefits" | "reviews">("details");
  const [isAdded, setIsAdded] = useState(false);
  const [carouselStartIndex, setCarouselStartIndex] = useState(0);

  const currentPack = PACK_SIZES[selectedPackIndex];
  const activePrice = currentPack.price;
  const activeCompareAt = currentPack.compareAt;

  // Gallery Thumbnails (4 views per reference)
  const galleryImages = [
    mamaBitezImg,
    healthySnackingImg,
    badhamImg,
    mamaBitezImg,
  ];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...baseProduct,
      name: `${baseProduct.name} (${currentPack.size})`,
      price: activePrice,
      compareAt: activeCompareAt,
      image: galleryImages[0],
    };
    add(productToAdd, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleBuyNow = () => {
    const productToAdd = {
      ...baseProduct,
      name: `${baseProduct.name} (${currentPack.size})`,
      price: activePrice,
      compareAt: activeCompareAt,
      image: galleryImages[0],
    };
    add(productToAdd, quantity);
    navigate("/checkout");
  };

  const isLiked = has(baseProduct.id);

  // Carousel controls for "You May Also Like"
  const maxVisibleOnDesktop = 4;
  const canScrollLeft = carouselStartIndex > 0;
  const canScrollRight = carouselStartIndex + maxVisibleOnDesktop < RELATED_PRODUCTS.length;

  const handleScrollLeft = () => {
    setCarouselStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleScrollRight = () => {
    setCarouselStartIndex((prev) => Math.min(RELATED_PRODUCTS.length - maxVisibleOnDesktop, prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#112440] selection:bg-[#F15A24]/20 selection:text-[#112440] overflow-x-hidden">
      {/* ======================================================== */}
      {/* SECTION 1: TOP BANNER (Edge-to-Edge with mom-1.png)      */}
      {/* ======================================================== */}
      <section
        aria-label="Product Details Banner"
        className="relative w-full overflow-hidden bg-[#FFFDF7]"
      >
        {/* Full-width original wave background graphic */}
        <img
          src={bannerBg}
          alt="Preggos Product Details Banner"
          className="w-full h-auto block select-none pointer-events-none"
          loading="eager"
        />

        {/* Text and Doodle Content Layer */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 md:px-8">
            <div className="max-w-[58%] sm:max-w-md md:max-w-lg lg:max-w-xl pl-1 sm:pl-2 flex flex-col items-center sm:items-start text-center sm:text-left sm:translate-x-[20px] sm:-translate-y-[40px]">
              {/* Sun Doodle Decoration */}
              <div className="mb-1 select-none pointer-events-none hidden sm:block">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#FBBF24]">
                  <circle cx="12" cy="12" r="4.5" stroke="#FBBF24" strokeWidth="2" fill="none" />
                  <path
                    d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"
                    stroke="#FBBF24"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Heading: Product (Navy) Details (Teal) */}
              <h1
                data-scroll-reveal
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-black tracking-tight leading-tight font-display"
              >
                <span className="text-[#112440]">Product </span>
                <span className="text-[#0A7D78] italic">Details</span>
              </h1>

              {/* Subtitle matching Reference */}
              <p
                data-scroll-reveal
                className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-semibold text-[#112440] leading-snug"
              >
                Nourishing goodness for you &amp; your baby...
              </p>

              {/* Red Heart Doodle */}
              <div className="mt-1 flex justify-center sm:justify-start">
                <svg width="28" height="14" viewBox="0 0 48 16" fill="none" className="text-[#F15A24]">
                  <path
                    d="M24 13C24 13 18 9 18 5C18 3 19.5 1.5 21.5 1.5C23 1.5 23.5 2.5 24 3C24.5 2.5 25 1.5 26.5 1.5C28.5 1.5 30 3 30 5C30 9 24 13 24 13Z"
                    stroke="#F15A24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Artwork: mom-1.png with natural aspect ratio & fade mask */}
        <div className="absolute right-[2%] sm:right-[4%] md:right-[6%] lg:right-[7%] bottom-0 z-10 pointer-events-none select-none h-full max-w-[38%] sm:max-w-[42%] lg:max-w-[40%] flex items-end justify-end">
          <img
            src={mom1Banner}
            alt="Mother smiling with daughter"
            className="h-auto max-h-[calc(86%-4px)] sm:max-h-[calc(90%-4px)] md:max-h-[calc(93%-4px)] lg:max-h-[calc(96%-4px)] w-auto object-contain object-bottom drop-shadow-xs -translate-y-[10px] sm:-translate-y-[14px] md:-translate-y-[18px] lg:-translate-y-[20px] preggos-image-enter"
            loading="eager"
            style={{
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>
      </section>

      {/* ======================================================== */}
      {/* MAIN CONTAINER (~92% Viewport Width, max 1400px)         */}
      {/* ======================================================== */}
      <main className="mx-auto w-[92%] max-w-[1360px] pt-6 sm:pt-8 pb-20">
        {/* ====================================================== */}
        {/* BREADCRUMB NAVIGATION                                 */}
        {/* ====================================================== */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#556070]"
        >
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-[#F15A24] transition-colors"
          >
            <span role="img" aria-label="home" className="text-sm">
              🏠
            </span>
            <span>Home</span>
          </Link>
          <span className="text-[#9CA3AF]">&gt;</span>
          <Link to="/shop" className="hover:text-[#F15A24] transition-colors">
            Shop
          </Link>
          <span className="text-[#9CA3AF]">&gt;</span>
          <span className="text-[#112440] font-bold">{baseProduct.name}</span>
        </nav>

        {/* ====================================================== */}
        {/* SECTION 2: PRODUCT SHOWCASE (2 Columns)                */}
        {/* Left: Thumbnail Gallery + Main Image Card              */}
        {/* Right: Info, Price, Benefits, Selectors, CTA, Artwork   */}
        {/* ====================================================== */}
        <section aria-label="Product Details Showcase" className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* -------------------------------------------------- */}
            {/* LEFT: THUMBNAILS + MAIN VIEWER (lg:col-span-6)     */}
            {/* -------------------------------------------------- */}
            <div data-scroll-reveal className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 sm:gap-5 items-center sm:items-start">
              {/* Vertical Thumbnail Strip (Desktop) / Horizontal (Mobile) */}
              <div className="flex sm:flex-col items-center justify-center gap-2.5 sm:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Previous thumbnail"
                  className="hidden sm:flex h-7 w-7 items-center justify-center rounded-full border border-[#DCE3EC] bg-white text-[#556070] shadow-2xs hover:border-[#F15A24] hover:text-[#F15A24] active:scale-90 transition-all cursor-pointer"
                >
                  <ChevronUp size={16} />
                </button>

                {galleryImages.map((imgSrc, idx) => {
                  const isSelected = selectedImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`Select product image ${idx + 1}`}
                      className={`relative h-16 w-16 sm:h-[72px] sm:w-[72px] rounded-2xl overflow-hidden border-2 p-1 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-[#F15A24] bg-white shadow-xs scale-105"
                          : "border-[#E5E7EB] bg-[#FAFAFA] opacity-75 hover:opacity-100 hover:scale-[1.02]"
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt={`Thumbnail view ${idx + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next thumbnail"
                  className="hidden sm:flex h-7 w-7 items-center justify-center rounded-full border border-[#DCE3EC] bg-white text-[#556070] shadow-2xs hover:border-[#F15A24] hover:text-[#F15A24] active:scale-90 transition-all cursor-pointer"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Main Image Showcase Card */}
              <div className="relative flex-1 w-full aspect-square rounded-[2.5rem] bg-white border border-[#F0E6D8] p-6 sm:p-10 flex items-center justify-center shadow-xs overflow-hidden group">
                {/* Wishlist Heart Toggle Button (Top Right) */}
                <button
                  type="button"
                  onClick={() => toggle(baseProduct.id)}
                  aria-label={isLiked ? "Remove from wishlist" : "Save to wishlist"}
                  className="absolute top-4 sm:top-5 right-4 sm:right-5 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white border border-[#E5E7EB] shadow-xs transition-all duration-200 ease-out hover:scale-110 active:scale-90 hover:shadow-md cursor-pointer"
                >
                  <Heart
                    size={20}
                    strokeWidth={2}
                    fill={isLiked ? "#F15A24" : "none"}
                    color={isLiked ? "#F15A24" : "#112440"}
                    className={`transition-all duration-300 ${isLiked ? "scale-110" : "scale-100"}`}
                  />
                </button>

                {/* Main Product Image */}
                <img
                  src={galleryImages[selectedImageIndex]}
                  alt={baseProduct.name}
                  className="max-h-[92%] max-w-[92%] object-contain transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform preggos-image-enter"
                />
              </div>
            </div>

            {/* -------------------------------------------------- */}
            {/* RIGHT: DETAILS, CONTROLS, ARTWORK (lg:col-span-6)  */}
            {/* -------------------------------------------------- */}
            <div data-scroll-reveal className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Product Title & Tagline */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl sm:text-4xl md:text-[40px] font-black font-display text-[#112440] leading-tight tracking-tight">
                      {baseProduct.name}
                    </h2>
                    <p className="mt-1 text-sm sm:text-base font-bold text-[#556070]">
                      Crunchy Bites for Expecting Moms
                    </p>
                  </div>

                  {/* "Healthy Choice for Happy Mom" Badge (Desktop Floater) */}
                  <div className="hidden xl:flex flex-col items-center shrink-0">
                    <div className="rounded-3xl bg-[#E8F8EE] border border-[#C6EFD4] px-4 py-2 text-center shadow-2xs">
                      <p className="text-[11px] font-bold text-[#0D9488] leading-tight">
                        Healthy Choice
                      </p>
                      <p className="text-[10px] font-semibold text-[#0D9488]">
                        for Happy Mom
                      </p>
                      <span className="text-[#F15A24] text-xs leading-none">❤️</span>
                    </div>
                  </div>
                </div>

                {/* Rating & Review Count */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-[#FBBF24]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" strokeWidth={1} />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#112440]">
                    4.8
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#556070]">
                    (198 Reviews)
                  </span>
                </div>

                {/* Price, Original Price and Discount Tag */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#112440] font-display">
                    {formatCurrency(activePrice)}
                  </span>
                  <del className="text-base sm:text-lg font-bold text-[#9CA3AF]">
                    {formatCurrency(activeCompareAt)}
                  </del>
                  <span className="rounded-full bg-[#FFF0EB] border border-[#FCD9CE] px-3 py-1 text-xs font-black text-[#F15A24]">
                    {currentPack.discount}
                  </span>
                </div>

                {/* Short Paragraph Description */}
                <p className="mt-4 text-xs sm:text-sm md:text-base font-medium text-[#556070] leading-relaxed">
                  A delicious and nutritious snack packed with essential nutrients for you and your little one!
                </p>

                {/* 3 Key Nutritional Benefit Bullet Points */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#112440]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8F8EE] text-[#0D9488]">
                      <Leaf size={12} strokeWidth={2.6} />
                    </span>
                    <span>Rich in Calcium &amp; Iron</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#112440]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8F8EE] text-[#0D9488]">
                      <Leaf size={12} strokeWidth={2.6} />
                    </span>
                    <span>Supports Healthy Pregnancy</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#112440]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8F8EE] text-[#0D9488]">
                      <Leaf size={12} strokeWidth={2.6} />
                    </span>
                    <span>Boosts Energy &amp; Immunity</span>
                  </div>
                </div>

                {/* Pack Size Selector */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="text-xs sm:text-sm font-bold text-[#112440] min-w-[70px]">
                    Pack Size:
                  </span>
                  <div className="flex items-center gap-2">
                    {PACK_SIZES.map((pack, idx) => {
                      const isSelected = selectedPackIndex === idx;
                      return (
                        <button
                          key={pack.size}
                          type="button"
                          onClick={() => setSelectedPackIndex(idx)}
                          className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                            isSelected
                              ? "bg-[#FFF0EB] border-2 border-[#F15A24] text-[#F15A24] shadow-2xs"
                              : "bg-white border border-[#DCE3EC] text-[#112440] hover:border-[#F15A24] hover:text-[#F15A24]"
                          }`}
                        >
                          {pack.size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Stepper Selector */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-bold text-[#112440] min-w-[70px]">
                    Quantity:
                  </span>
                  <div className="flex items-center rounded-full border border-[#DCE3EC] bg-white p-1 shadow-2xs">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[#112440] hover:bg-[#F3F4F6] active:scale-90 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <Minus size={14} strokeWidth={2.5} />
                    </button>
                    <span className="w-9 text-center font-bold text-sm text-[#112440] select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[#112440] hover:bg-[#F3F4F6] active:scale-90 transition-all cursor-pointer"
                    >
                      <Plus size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* CTA Action Buttons + Mother-Daughter Floating Illustration */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 relative">
                  <div className="flex flex-1 w-full sm:w-auto flex-col sm:flex-row gap-3">
                    {/* Add to Cart Button */}
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#F15A24] px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#DE4B16] hover:shadow-md active:scale-[0.985] cursor-pointer"
                    >
                      {isAdded ? (
                        <>
                          <Check size={18} strokeWidth={2.6} />
                          <span>Added to Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={18} strokeWidth={2.2} />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    {/* Buy Now Button */}
                    <button
                      type="button"
                      onClick={handleBuyNow}
                      className="flex-1 flex items-center justify-center gap-2 rounded-full bg-white border-2 border-[#F15A24] px-6 py-3.5 text-sm sm:text-base font-bold text-[#F15A24] transition-all duration-200 hover:bg-[#FFF0EB] active:scale-[0.985] cursor-pointer"
                    >
                      <span>Buy Now</span>
                      <ArrowRight size={17} strokeWidth={2.4} />
                    </button>
                  </div>

                  {/* Mother-Daughter Artwork from graphics/details/mom-1.png */}
                  <div className="hidden md:flex xl:flex shrink-0 items-end justify-center w-28 sm:w-36 lg:w-40 pointer-events-none select-none">
                    <img
                      src={mom1DetailsArtwork}
                      alt="Mother hugging daughter with flower"
                      className="w-full h-auto object-contain drop-shadow-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* SECTION 3: TRUST BADGES STRIP (4 Columns)              */}
        {/* ====================================================== */}
        <section aria-label="Store Guarantees" className="mb-14">
          <div className="rounded-3xl border border-[#DCEEE5] bg-[#F4FBF7] p-5 sm:p-6 shadow-xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#DCEEE5]">
              {/* Badge 1 */}
              <div className="flex items-center gap-3 px-2 pt-2 sm:pt-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E2F7EB] text-[#0D9488] shrink-0">
                  <Truck size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#112440] leading-tight">
                    Free Shipping
                  </h4>
                  <p className="text-[11px] font-medium text-[#556070]">
                    Above ₹499
                  </p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex items-center gap-3 px-2 pt-3 sm:pt-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E2F7EB] text-[#0D9488] shrink-0">
                  <Leaf size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#112440] leading-tight">
                    100% Natural
                  </h4>
                  <p className="text-[11px] font-medium text-[#556070]">
                    Ingredients
                  </p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="flex items-center gap-3 px-2 pt-3 sm:pt-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E2F7EB] text-[#0D9488] shrink-0">
                  <ShieldCheck size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#112440] leading-tight">
                    Secure Payments
                  </h4>
                  <p className="text-[11px] font-medium text-[#556070]">
                    100% Protected
                  </p>
                </div>
              </div>

              {/* Badge 4 */}
              <div className="flex items-center gap-3 px-2 pt-3 sm:pt-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E2F7EB] text-[#0D9488] shrink-0">
                  <RotateCcw size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#112440] leading-tight">
                    Easy Returns
                  </h4>
                  <p className="text-[11px] font-medium text-[#556070]">
                    (7 Days)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* SECTION 4: PRODUCT INFORMATION TABS & CENTERPIECE     */}
        {/* 4 Tabs + 3-Column Content Layout                       */}
        {/* ====================================================== */}
        <section aria-label="Product Information Tabs" className="mb-16">
          {/* Tab Header Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`rounded-2xl px-6 py-3 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "details"
                  ? "bg-[#F15A24] text-white shadow-xs"
                  : "bg-white border border-[#E5E7EB] text-[#556070] hover:text-[#F15A24]"
              }`}
            >
              Product Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ingredients")}
              className={`rounded-2xl px-6 py-3 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "ingredients"
                  ? "bg-[#F15A24] text-white shadow-xs"
                  : "bg-white border border-[#E5E7EB] text-[#556070] hover:text-[#F15A24]"
              }`}
            >
              Ingredients
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("benefits")}
              className={`rounded-2xl px-6 py-3 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "benefits"
                  ? "bg-[#F15A24] text-white shadow-xs"
                  : "bg-white border border-[#E5E7EB] text-[#556070] hover:text-[#F15A24]"
              }`}
            >
              Benefits
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`rounded-2xl px-6 py-3 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "reviews"
                  ? "bg-[#F15A24] text-white shadow-xs"
                  : "bg-white border border-[#E5E7EB] text-[#556070] hover:text-[#F15A24]"
              }`}
            >
              Customer Reviews (198)
            </button>
          </div>

          {/* Tab Content Container */}
          <div className="rounded-[2.5rem] bg-white border border-[#F0E6D8] p-6 sm:p-10 shadow-xs">
            {activeTab === "details" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                {/* Column 1: Detailed Text Description & Checks (lg:col-span-4) */}
                <div className="lg:col-span-4 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black font-display text-[#112440]">
                    Product Details
                  </h3>
                  <p className="text-xs sm:text-sm text-[#556070] leading-relaxed">
                    Mama Bitez is a specially formulated snack for expecting mothers, enriched with Calcium, Iron and essential nutrients. These crunchy bites help to satisfy cravings, support bone health and keep your tummy happy and healthy.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8F8EE] text-[#0D9488] shrink-0 mt-0.5">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#112440]">
                        Rich in Calcium &amp; Iron for stronger bones
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8F8EE] text-[#0D9488] shrink-0 mt-0.5">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#112440]">
                        Supports healthy pregnancy &amp; lactation
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8F8EE] text-[#0D9488] shrink-0 mt-0.5">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#112440]">
                        Tasty, crunchy and easy to carry
                      </span>
                    </div>
                  </div>

                  {/* Red Heart Doodle */}
                  <div className="pt-2">
                    <svg width="28" height="14" viewBox="0 0 48 16" fill="none" className="text-[#F15A24]">
                      <path
                        d="M24 13C24 13 18 9 18 5C18 3 19.5 1.5 21.5 1.5C23 1.5 23.5 2.5 24 3C24.5 2.5 25 1.5 26.5 1.5C28.5 1.5 30 3 30 5C30 9 24 13 24 13Z"
                        stroke="#F15A24"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>

                {/* Column 2: Badham Centerpiece Bowl (lg:col-span-5) */}
                <div className="lg:col-span-5 flex items-center justify-center pointer-events-none select-none">
                  <img
                    src={badhamImg}
                    alt="Almonds and cranberries nutrition centerpiece bowl"
                    className="max-h-[320px] w-auto object-contain drop-shadow-sm preggos-image-enter"
                  />
                </div>

                {/* Column 3: Key Highlights Card (lg:col-span-3) */}
                <div className="lg:col-span-3 rounded-3xl bg-[#FEF9F3] border border-[#F6E8DA] p-5 sm:p-6 shadow-2xs">
                  <h4 className="text-base sm:text-lg font-black font-display text-[#112440] mb-4">
                    Key Highlights
                  </h4>
                  <div className="space-y-4">
                    {/* Highlight 1 */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0F2FE] text-[#0284C7] shrink-0 font-bold">
                        🦷
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#112440]">
                          High in Calcium
                        </p>
                      </div>
                    </div>

                    {/* Highlight 2 */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF08A] text-[#CA8A04] shrink-0">
                        <Zap size={18} fill="currentColor" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#112440]">
                          Boosts Energy
                        </p>
                      </div>
                    </div>

                    {/* Highlight 3 */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#16A34A] shrink-0">
                        <Leaf size={18} />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#112440]">
                          No Added Sugar
                        </p>
                      </div>
                    </div>

                    {/* Highlight 4 */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FCE7F3] text-[#DB2777] shrink-0">
                        <Heart size={18} fill="currentColor" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#112440]">
                          Supports Mother &amp; Baby
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl sm:text-2xl font-black font-display text-[#112440]">
                  100% Pure &amp; Wholesome Ingredients
                </h3>
                <p className="text-xs sm:text-sm text-[#556070] max-w-2xl leading-relaxed">
                  Every batch of Mama Bitez is crafted with certified non-GMO nuts, whole super-grains and dried fruit. Free from artificial preservatives, artificial flavors, and refined sugars.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  {[
                    { name: "California Almonds", desc: "Premium source of Vitamin E & healthy fats" },
                    { name: "Cranberries", desc: "Rich in antioxidants and urinary tract support" },
                    { name: "Sprouted Ragi Crisps", desc: "High calcium density for natural bone strength" },
                    { name: "Organic Jaggery", desc: "Natural source of iron and gentle sweetness" },
                    { name: "Chia Seeds", desc: "Plant-based Omega-3 fatty acids for baby's brain" },
                    { name: "Cold-Pressed Sesame", desc: "Rich in zinc and essential trace minerals" },
                  ].map((ing) => (
                    <div key={ing.name} className="rounded-2xl border border-[#F0E6D8] bg-[#FFFDF7] p-4">
                      <p className="text-sm font-bold text-[#112440]">{ing.name}</p>
                      <p className="mt-1 text-xs text-[#556070]">{ing.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "benefits" && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl sm:text-2xl font-black font-display text-[#112440]">
                  Clinically Researched Nutritional Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl border border-[#DCEEE5] bg-[#F7FDF9] p-5">
                    <h4 className="text-sm font-bold text-[#0D9488] mb-1">
                      Bone &amp; Teeth Mineralization
                    </h4>
                    <p className="text-xs text-[#556070] leading-relaxed">
                      Delivers bioavailable calcium and magnesium to protect maternal bone reserves while supporting fetal skeletal development throughout the 2nd and 3rd trimesters.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#DCEEE5] bg-[#F7FDF9] p-5">
                    <h4 className="text-sm font-bold text-[#0D9488] mb-1">
                      Sustained Low-GI Energy
                    </h4>
                    <p className="text-xs text-[#556070] leading-relaxed">
                      Combines complex carbohydrates with wholesome fats to stabilize blood sugar, curbing mid-afternoon nausea and maternal fatigue naturally.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#DCEEE5] bg-[#F7FDF9] p-5">
                    <h4 className="text-sm font-bold text-[#0D9488] mb-1">
                      Immunity &amp; Postpartum Readiness
                    </h4>
                    <p className="text-xs text-[#556070] leading-relaxed">
                      Packed with natural Vitamin C, Zinc, and Selenium to strengthen daily immune defense and enhance tissue recovery ahead of labor and nursing.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#DCEEE5] bg-[#F7FDF9] p-5">
                    <h4 className="text-sm font-bold text-[#0D9488] mb-1">
                      Gentle on Sensitive Digestion
                    </h4>
                    <p className="text-xs text-[#556070] leading-relaxed">
                      Dry-roasted nuts and sprouted grains provide gentle dietary fiber that promotes digestive regularity without causing bloating.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-5 animate-fade-in">
                <div className="flex items-center justify-between border-b border-[#F0E6D8] pb-4">
                  <div>
                    <h3 className="text-xl font-black font-display text-[#112440]">
                      Customer Feedback (198 Reviews)
                    </h3>
                    <p className="text-xs text-[#556070] mt-0.5">
                      98% of verified mothers recommend Mama Bitez to friends and family.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#FFF0EB] px-3.5 py-1.5 rounded-full text-[#F15A24] font-bold text-sm">
                    <Star size={16} fill="currentColor" />
                    <span>4.8 / 5.0</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: "Priya Sharma",
                      trimester: "Verified Buyer · 3rd Trimester",
                      comment:
                        "Mama Bitez has been my savior for 4PM hunger pangs! Deliciously crunchy, not too sweet, and I feel so good knowing it's packed with calcium and clean ingredients.",
                      rating: 5,
                    },
                    {
                      name: "Ananya Mehta",
                      trimester: "Verified Buyer · Postnatal Mom",
                      comment:
                        "Love the packaging and the taste! It gives me quick energy between breastfeeding sessions. Absolutely ordering the 600g pack next time.",
                      rating: 5,
                    },
                    {
                      name: "Deepa Ramaswamy",
                      trimester: "Verified Buyer · 2nd Trimester",
                      comment:
                        "The texture is so satisfying and it does not upset my sensitive stomach at all. Highly recommend to all expecting mothers!",
                      rating: 5,
                    },
                  ].map((rev) => (
                    <div key={rev.name} className="rounded-2xl border border-[#F0E6D8] bg-[#FFFDF7] p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-[#112440]">{rev.name}</p>
                        <div className="flex text-[#FBBF24]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" strokeWidth={1} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] font-semibold text-[#0D9488] mt-0.5">{rev.trimester}</p>
                      <p className="text-xs text-[#556070] mt-2 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ====================================================== */}
        {/* SECTION 5: "YOU MAY ALSO LIKE" CAROUSEL                */}
        {/* 5 Product Cards matching exact reference items         */}
        {/* ====================================================== */}
        <section aria-label="You May Also Like" className="mt-14">
          {/* Header with Title, Red Heart Doodle and Carousel Arrows */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#112440] italic">
                You May Also Like
              </h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#F15A24]">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="#F15A24"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            {/* Left / Right Carousel Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!canScrollLeft}
                onClick={handleScrollLeft}
                aria-label="Previous products"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCE3EC] bg-white text-[#112440] shadow-2xs hover:border-[#F15A24] hover:text-[#F15A24] active:scale-90 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                disabled={!canScrollRight}
                onClick={handleScrollRight}
                aria-label="Next products"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCE3EC] bg-white text-[#112440] shadow-2xs hover:border-[#F15A24] hover:text-[#F15A24] active:scale-90 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {RELATED_PRODUCTS.map((prod) => {
              const prodLiked = has(prod.id);

              return (
                <div
                  key={prod.id}
                  data-scroll-card
                  className="group rounded-3xl bg-white border border-[#F0E6D8] p-4 shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Box with Wishlist Heart */}
                    <div className="relative aspect-square w-full rounded-2xl bg-[#FFFDF7] border border-[#F6E8DA] p-3 flex items-center justify-center overflow-hidden mb-3">
                      <Link to={`/product/${prod.id}`} className="block h-full w-full flex items-center justify-center">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </Link>

                      {/* Wishlist Heart Button */}
                      <button
                        type="button"
                        onClick={() => toggle(prod.id)}
                        aria-label={prodLiked ? "Remove from wishlist" : "Add to wishlist"}
                        className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 border border-gray-200 shadow-2xs transition-all hover:scale-110 active:scale-90 cursor-pointer"
                      >
                        <Heart
                          size={15}
                          fill={prodLiked ? "#F15A24" : "none"}
                          color={prodLiked ? "#F15A24" : "#112440"}
                          className={`transition-all duration-200 ${prodLiked ? "scale-110" : "scale-100"}`}
                        />
                      </button>
                    </div>

                    {/* Product Name */}
                    <Link to={`/product/${prod.id}`}>
                      <h4 className="text-sm font-bold text-[#112440] line-clamp-1 hover:text-[#F15A24] transition-colors">
                        {prod.name}
                      </h4>
                    </Link>

                    {/* Rating Stars */}
                    <div className="mt-1 flex items-center gap-1">
                      <div className="flex text-[#FBBF24]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" strokeWidth={1} />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#556070] font-medium">
                        ({prod.reviewsCount})
                      </span>
                    </div>

                    {/* Price */}
                    <p className="mt-1.5 text-base font-extrabold text-[#112440]">
                      {formatCurrency(prod.price)}
                    </p>
                  </div>

                  {/* Add to Cart CTA Button */}
                  <button
                    type="button"
                    onClick={() => {
                      add(
                        {
                          id: prod.id,
                          name: prod.name,
                          category: prod.category,
                          description: prod.description,
                          price: prod.price,
                          color: "bg-[#FEF7EF]",
                          image: prod.image,
                        },
                        1
                      );
                    }}
                    className="mt-3.5 w-full flex items-center justify-center gap-1.5 rounded-full bg-[#F15A24] py-2.5 px-3 text-xs font-bold text-white shadow-2xs transition-all duration-200 hover:bg-[#DE4B16] active:scale-[0.985] cursor-pointer"
                  >
                    <span>Add to Cart</span>
                    <ArrowRight size={13} strokeWidth={2.4} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDetailsPage;
