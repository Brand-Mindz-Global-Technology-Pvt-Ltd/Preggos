import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  Lock,
  Truck,
  Leaf,
  ShieldCheck,
  Heart,
  Star,
  Check,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../../contexts/CartContext";
import type { Product } from "../../types/product.types";

import bannerBg from "../../assets/images/graphics/banner.png";
import mom2 from "../../assets/images/graphics/mom-2.png";
import pregnancyImg from "../../assets/images/home/shop/pregnancy.png";
import lactationImg from "../../assets/images/home/shop/lactation-support.png";

// Reference demo products matching the Figma specification
const DEMO_REFERENCE_ITEMS: {
  product: Product;
  rating: number;
  reviews: number;
  inStock: boolean;
}[] = [
  {
    product: {
      id: "prod-mcal",
      name: "MCal++",
      category: "Mother",
      description: "Complete calcium & mineral nutrition for pregnancy",
      price: 255,
      compareAt: 299,
      image: pregnancyImg,
      color: "bg-peach",
    },
    rating: 4.9,
    reviews: 245,
    inStock: true,
  },
  {
    product: {
      id: "prod-lacto",
      name: "Mama Lacto Congee",
      category: "Mother",
      description: "Traditional Ayurvedic lactation support congee",
      price: 255,
      compareAt: 299,
      image: lactationImg,
      color: "bg-sun",
    },
    rating: 4.9,
    reviews: 213,
    inStock: true,
  },
];

export function CartPage() {
  const { items, update, remove, add } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Seed demo items if cart is completely empty on first visit
  useEffect(() => {
    const hasInitialized = sessionStorage.getItem("preggos-cart-seeded");
    if (items.length === 0 && !hasInitialized) {
      sessionStorage.setItem("preggos-cart-seeded", "true");
      DEMO_REFERENCE_ITEMS.forEach((item) => {
        add(item.product, 1);
      });
    }
  }, [items.length, add]);

  // Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 499;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = subtotal === 0 || isFreeShipping ? 0 : 50;
  const totalAmount = subtotal + shippingFee;

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      remove(productId);
      showToast("Item removed from cart");
    } else {
      update(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    remove(productId);
    showToast("Item removed from cart");
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#112440] selection:bg-[#F15A24]/20 selection:text-[#112440]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-[#112440] px-5 py-3.5 text-sm font-medium text-white shadow-xl animate-fade-in">
          <Check size={18} className="text-[#F15A24]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 1: HERO BANNER (Edge-to-Edge matching Profile)   */}
      {/* ======================================================== */}
      <section
        aria-label="Your Cart Banner"
        className="relative w-full overflow-hidden bg-[#FFFDF7]"
      >
        {/* Full-width original background graphic with natural aspect ratio */}
        <img
          src={bannerBg}
          alt="Preggos Cart Banner"
          className="w-full h-auto block select-none pointer-events-none"
          loading="eager"
        />

        {/* Text Content Layer */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 md:px-8">
            <div className="max-w-[58%] sm:max-w-md md:max-w-lg lg:max-w-xl pl-1 sm:pl-2 flex flex-col items-center sm:items-start text-center sm:text-left sm:translate-x-[60px] sm:-translate-y-[40px]">
              {/* Teal Header matching Figma */}
              <h1 data-scroll-reveal className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-black tracking-tight text-[#0A7D78] leading-tight font-display">
                Your Cart
              </h1>

              {/* Subtitle */}
              <p data-scroll-reveal className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-semibold text-[#112440] leading-relaxed">
                A step closer to a healthier, happier you!
              </p>

              {/* Heart Flourish Doodle matching Reference */}
              <div data-scroll-reveal className="mt-2 sm:mt-2.5 flex justify-center sm:justify-start">
                <svg
                  width="86"
                  height="22"
                  viewBox="0 0 86 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#F15A24]"
                >
                  <path
                    d="M4 11C15 11 20 14 29 11"
                    stroke="#F15A24"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M43 18.5C43 18.5 34 13.5 34 8C34 5 36.5 2.5 39.5 2.5C41.5 2.5 43 3.7 43 4.5C43 3.7 44.5 2.5 46.5 2.5C49.5 2.5 52 5 52 8C52 13.5 43 18.5 43 18.5Z"
                    stroke="#F15A24"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M57 11C66 14 71 11 82 11"
                    stroke="#F15A24"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Overlaid Transparent Artwork on Right (mom-2.png) */}
        <div className="absolute right-[3%] sm:right-[5%] md:right-[7%] lg:right-[8%] bottom-0 z-10 pointer-events-none select-none h-full flex items-end justify-end">
          <img
            src={mom2}
            alt="Mother and children"
            className="h-auto max-h-[calc(86%-4px)] sm:max-h-[calc(90%-4px)] md:max-h-[calc(93%-4px)] lg:max-h-[calc(95%-4px)] w-auto object-contain object-bottom drop-shadow-xs -translate-y-[12px] sm:-translate-y-[15px] md:-translate-y-[18px] lg:-translate-y-[20px]"
            loading="eager"
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: MAIN SHOPPING CART CONTENT                    */}
      {/* Container width matching Profile Cards: ~92% max 1760px   */}
      {/* ======================================================== */}
      <main className="mx-auto w-[92%] max-w-[1760px] pt-8 sm:pt-10 pb-16">
        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="rounded-3xl border border-[#F0E6D8] bg-white p-12 sm:p-16 text-center shadow-xs">
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#FEF7EF] text-[#F15A24]">
              <ShoppingBag size={48} strokeWidth={1.8} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112440]">
              Your Cart is Empty
            </h2>
            <p className="mt-2 text-sm sm:text-base font-medium text-[#556070] max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Explore our wholesome, doctor-backed nutrition blends!
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F15A24] px-8 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-[#DE4B16]"
            >
              <span>Explore Products</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ==================================================== */}
            {/* LEFT COLUMN: SHOPPING CART ITEMS LIST (~72% desktop) */}
            {/* ==================================================== */}
            <div className="lg:col-span-8 space-y-4">
              {/* Header row: Cart title & Continue shopping link */}
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2.5">
                  <ShoppingCart
                    size={24}
                    className="text-[#F15A24] stroke-[2.4]"
                  />
                  <h2 className="text-xl sm:text-2xl font-bold text-[#112440]">
                    Shopping Cart ({totalCount} {totalCount === 1 ? "Item" : "Items"})
                  </h2>
                </div>
                <Link
                  to="/shop"
                  className="group flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#112440] hover:text-[#F15A24] transition-colors"
                >
                  <span>Continue Shopping</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* White Rounded Container for Product Rows */}
              <div className="rounded-3xl border border-[#F0E6D8] bg-white p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(200,180,150,0.18)]">
                <div className="divide-y divide-[#F3EDE2]">
                  {items.map((item) => {
                    const matchedDemo = DEMO_REFERENCE_ITEMS.find(
                      (d) => d.product.id === item.product.id || d.product.name === item.product.name
                    );
                    const rating = matchedDemo?.rating ?? 4.9;
                    const reviews = matchedDemo?.reviews ?? 245;

                    return (
                      <div
                        key={item.product.id}
                        className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6"
                      >
                        {/* Product Image & Details */}
                        <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                          {/* Image Box */}
                          <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 flex items-center justify-center">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-full object-contain drop-shadow-xs"
                            />
                          </div>

                          {/* Info Column */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-[#112440] leading-snug truncate">
                              {item.product.name}
                            </h3>

                            {/* Rating Stars */}
                            <div className="mt-1.5 flex items-center gap-1.5">
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className="fill-[#FBBF24] text-[#FBBF24]"
                                  />
                                ))}
                              </div>
                              <span className="text-xs sm:text-sm font-semibold text-[#556070]">
                                {rating} ({reviews})
                              </span>
                            </div>

                            {/* Unit Price */}
                            <p className="mt-1 text-lg sm:text-xl font-bold text-[#112440]">
                              ₹{item.product.price}
                            </p>

                            {/* In Stock Badge */}
                            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#E8F8F0] px-2.5 py-0.5 text-xs font-semibold text-[#1B8754]">
                              <Check size={13} strokeWidth={2.6} />
                              <span>In Stock</span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls, Total Price & Trash */}
                        <div className="flex items-center justify-between sm:justify-end gap-5 sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F6EFE6]">
                          {/* Quantity Stepper Pill */}
                          <div className="flex items-center rounded-full border border-[#D9D9D9] bg-white px-2.5 py-1 shadow-2xs">
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateQuantity(item.product.id, item.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                              className="flex h-7 w-7 items-center justify-center rounded-full text-[#556070] transition hover:bg-[#F3F4F6] hover:text-[#112440]"
                            >
                              <Minus size={13} strokeWidth={2.4} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-[#112440]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateQuantity(item.product.id, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                              className="flex h-7 w-7 items-center justify-center rounded-full text-[#556070] transition hover:bg-[#F3F4F6] hover:text-[#112440]"
                            >
                              <Plus size={13} strokeWidth={2.4} />
                            </button>
                          </div>

                          {/* Line Item Total */}
                          <span className="text-lg sm:text-xl font-bold text-[#112440] min-w-[70px] text-right">
                            ₹{item.product.price * item.quantity}
                          </span>

                          {/* Delete Item Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.product.id)}
                            aria-label={`Remove ${item.product.name} from cart`}
                            className="p-1.5 text-[#112440] hover:text-[#F15A24] transition-colors"
                          >
                            <Trash2 size={19} strokeWidth={1.8} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ==================================================== */}
            {/* RIGHT COLUMN: ORDER SUMMARY CARD (~28% desktop)     */}
            {/* Soft Warm Cream/Peach Container                     */}
            {/* ==================================================== */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-[#F6E8DA] bg-[#FEF7EF] p-6 sm:p-7 shadow-[0_4px_24px_-4px_rgba(200,180,150,0.18)]">
                {/* Header */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#112440]">
                  Order Summary
                </h3>

                {/* Subtotal & Shipping breakdown */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm sm:text-base font-medium text-[#556070]">
                    <span>Subtotal ({totalCount} {totalCount === 1 ? "item" : "items"})</span>
                    <span className="font-bold text-[#112440]">₹{subtotal}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm sm:text-base font-medium text-[#556070]">
                    <span>Shipping Fee</span>
                    <span className="font-bold text-[#112440]">₹{shippingFee}</span>
                  </div>

                  {/* Free shipping banner */}
                  <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-[#1B8754]">
                    <Truck size={15} className="shrink-0" />
                    <span>Free Shipping on Orders Above ₹499</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 border-t border-[#EBDCCF]" />

                {/* Total Amount */}
                <div className="flex items-center justify-between text-base sm:text-lg font-bold text-[#112440]">
                  <span>Total Amount</span>
                  <span className="text-2xl sm:text-[26px] font-extrabold text-[#112440]">
                    ₹{totalAmount}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#F15A24] px-6 py-4 text-center text-sm sm:text-base font-bold text-white shadow-sm transition hover:bg-[#DE4B16] active:scale-[0.99]"
                >
                  <Lock size={16} strokeWidth={2.4} />
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={17} strokeWidth={2.4} />
                </Link>

                {/* Or Divider */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#EBDCCF]" />
                  </div>
                  <span className="relative bg-[#FEF7EF] px-3 text-xs font-medium text-[#8892A0]">
                    Or
                  </span>
                </div>

                {/* Continue Shopping Button */}
                <Link
                  to="/shop"
                  className="flex w-full items-center justify-center rounded-full border border-[#D4C4B5] bg-transparent px-6 py-3.5 text-center text-sm sm:text-base font-semibold text-[#112440] transition hover:bg-white"
                >
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION 3: BENEFITS STRIP                                */}
        {/* Soft Warm Container matching Figma Reference             */}
        {/* ======================================================== */}
        <section
          aria-label="Preggos Benefits"
          className="mt-10 sm:mt-12 rounded-2xl border border-[#F6E8DA] bg-[#FEF7EF] px-6 py-6 sm:px-10 sm:py-7 shadow-xs"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center">
            {/* Benefit 1: Free Shipping */}
            <div className="flex items-center gap-3.5">
              <Truck size={30} className="text-[#2563EB] shrink-0" strokeWidth={1.8} />
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-bold text-[#112440] leading-snug">
                  Free Shipping
                </h4>
                <p className="text-xs text-[#6B7280]">On Orders Above ₹499</p>
              </div>
            </div>

            {/* Benefit 2: 100% Natural */}
            <div className="flex items-center gap-3.5">
              <Leaf size={30} className="text-[#16A34A] shrink-0" strokeWidth={1.8} />
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-bold text-[#112440] leading-snug">
                  100% Natural
                </h4>
                <p className="text-xs text-[#6B7280]">Ingredients</p>
              </div>
            </div>

            {/* Benefit 3: Secure Payments */}
            <div className="flex items-center gap-3.5">
              <ShieldCheck size={30} className="text-[#0D9488] shrink-0" strokeWidth={1.8} />
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-bold text-[#112440] leading-snug">
                  Secure Payments
                </h4>
              </div>
            </div>

            {/* Benefit 4: Made in India */}
            <div className="flex items-center gap-3.5">
              <Heart size={30} className="text-[#F97316] shrink-0" strokeWidth={1.8} />
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-bold text-[#112440] leading-snug">
                  Made in India
                </h4>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
