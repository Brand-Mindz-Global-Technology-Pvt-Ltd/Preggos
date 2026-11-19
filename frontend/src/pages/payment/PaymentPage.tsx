import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Lock,
  ArrowRight,
  Truck,
  Leaf,
  ShieldCheck,
  Heart,
  Star,
  Check,
  CheckCircle2,
  Banknote,
} from "lucide-react";

import { useCart } from "../../contexts/CartContext";

import bannerBg from "../../assets/images/graphics/banner.png";
import mom2 from "../../assets/images/graphics/mom-2.png";
import pregnancyImg from "../../assets/images/home/shop/pregnancy.png";

type PaymentMethodType = "upi" | "cod";

export function PaymentPage() {
  const { items } = useCart();
  // Default to UPI as requested
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>("upi");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Order summary calculations dynamically sourced from useCart()
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );
  const freeShippingThreshold = 499;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = subtotal === 0 || isFreeShipping ? 0 : 50;
  const totalAmount = subtotal + shippingFee;
  const wellnessPoints = totalAmount; // 1 point per Rupee

  const handlePlaceOrder = () => {
    showToast(
      `Order placed successfully with ${
        selectedMethod === "upi" ? "UPI" : "Cash on Delivery"
      }! (Frontend Demo)`
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#112440] selection:bg-[#F15A24]/20 selection:text-[#112440]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-[#112440] px-5 py-3.5 text-sm font-medium text-white shadow-xl animate-fade-in">
          <CheckCircle2 size={18} className="text-[#F15A24]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 1: HERO BANNER (Edge-to-Edge matching Reference) */}
      {/* ======================================================== */}
      <section
        aria-label="Payment Banner"
        className="relative w-full overflow-hidden bg-[#FFFDF7]"
      >
        {/* Full-width original background graphic with natural aspect ratio */}
        <img
          src={bannerBg}
          alt="Preggos Payment Banner"
          className="w-full h-auto block select-none pointer-events-none"
          loading="eager"
        />

        {/* Text Content Layer */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 md:px-8">
            <div className="max-w-[58%] sm:max-w-md md:max-w-lg lg:max-w-xl pl-1 sm:pl-2 flex flex-col items-center sm:items-start text-center sm:text-left sm:translate-x-[60px] sm:-translate-y-[40px]">
              {/* Teal Heading */}
              <h1 data-scroll-reveal className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-black tracking-tight text-[#0A7D78] leading-tight font-display">
                Payment
              </h1>

              {/* Subtitle */}
              <p data-scroll-reveal className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-semibold text-[#112440] leading-relaxed max-w-xs sm:max-w-md">
                Choose your preferred payment method
                <br className="hidden sm:inline" /> and complete your order.
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

        {/* Right Artwork: mom-2.png with natural aspect ratio & fade mask */}
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
      {/* SECTION 2: CHECKOUT PROGRESS (Cart ✓ → Address ✓ → Payment) */}
      {/* ======================================================== */}
      <section aria-label="Checkout Progress" className="w-full pt-8 pb-4">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <div className="relative flex items-center justify-between">
            {/* Step 1: Cart (Completed with green check badge) */}
            <Link
              to="/cart"
              className="group relative flex flex-col items-center focus:outline-none"
              aria-label="Go to Cart"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#112440] bg-white text-[#112440] shadow-xs transition group-hover:scale-105">
                <ShoppingCart size={20} strokeWidth={2.4} />
                {/* Completed Check Badge */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#16A34A] text-white">
                  <Check size={10} strokeWidth={3} />
                </span>
              </div>
              <span className="mt-2 text-xs sm:text-sm font-bold text-[#112440]">
                Cart
              </span>
            </Link>

            {/* Connecting line 1 (Solid indicating completed progression) */}
            <div className="h-[2px] flex-1 bg-[#112440]/30 mx-3 sm:mx-4 -mt-5" />

            {/* Step 2: Address (Completed with green check badge) */}
            <Link
              to="/checkout"
              className="group relative flex flex-col items-center focus:outline-none"
              aria-label="Go to Delivery Address"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#112440] bg-white text-[#112440] shadow-xs transition group-hover:scale-105">
                <MapPin size={20} strokeWidth={2.4} />
                {/* Completed Check Badge */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#16A34A] text-white">
                  <Check size={10} strokeWidth={3} />
                </span>
              </div>
              <span className="mt-2 text-xs sm:text-sm font-bold text-[#112440]">
                Address
              </span>
            </Link>

            {/* Connecting line 2 */}
            <div className="h-[2px] flex-1 bg-[#112440]/30 mx-3 sm:mx-4 -mt-5" />

            {/* Step 3: Payment (Active Step) */}
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F15A24] text-white shadow-md ring-4 ring-[#F15A24]/20 animate-pulse-subtle">
                <CreditCard size={22} strokeWidth={2.4} />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-extrabold text-[#112440]">
                Payment
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: MAIN PAYMENT CONTENT (UPI & COD + Summary)    */}
      {/* ======================================================== */}
      <main className="mx-auto w-[92%] max-w-[1760px] pt-6 sm:pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ==================================================== */}
          {/* LEFT COLUMN: PAYMENT METHOD SELECTION (~65% desktop) */}
          {/* ==================================================== */}
          <div className="lg:col-span-8 space-y-4">
            {/* Header: Payment Method */}
            <div className="flex items-center gap-3 pb-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F15A24] text-white shadow-xs">
                <CreditCard size={22} strokeWidth={2.4} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#112440] leading-snug">
                  Payment Method
                </h2>
                <p className="text-xs sm:text-sm font-medium text-[#556070]">
                  Select your preferred payment method
                </p>
              </div>
            </div>

            {/* Payment Method Cards List: ONLY UPI & COD */}
            <div className="space-y-4">
              {/* Option 1: UPI (Default selected) */}
              <div
                onClick={() => setSelectedMethod("upi")}
                className={`cursor-pointer rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-200 ${
                  selectedMethod === "upi"
                    ? "border-2 border-[#E8CDB5] bg-[#FFF8F0] shadow-[0_4px_20px_-4px_rgba(241,90,36,0.12)]"
                    : "border border-[#E5E7EB] bg-white shadow-xs hover:border-[#D1D5DB]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {/* Radio Button */}
                    <div className="shrink-0">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full transition-all ${
                          selectedMethod === "upi"
                            ? "border-2 border-[#F15A24]"
                            : "border-2 border-[#D1D5DB]"
                        }`}
                      >
                        {selectedMethod === "upi" && (
                          <div className="h-2.5 w-2.5 rounded-full bg-[#F15A24]" />
                        )}
                      </div>
                    </div>

                    {/* Method Icon / UPI Badge */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#16A34A] font-extrabold text-sm italic">
                      <span className="text-[#097938]">U</span>
                      <span className="text-[#F15A24]">P</span>
                      <span className="text-[#002D62]">I</span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-[#112440]">UPI</h3>
                      <p className="text-xs sm:text-sm font-medium text-[#556070]">
                        Pay with any UPI app
                      </p>
                    </div>
                  </div>

                  {/* Right: Logos (GPay, PhonePe, Paytm) */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-xs sm:text-sm font-bold">
                    <span className="text-[#4285F4] flex items-center">
                      <span className="text-[#EA4335]">G</span>&nbsp;Pay
                    </span>
                    <span className="flex items-center gap-1 text-[#5F259F]">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#5F259F] text-white text-[9px] font-bold">
                        पे
                      </span>
                      PhonePe
                    </span>
                    <span className="text-[#002E6E] font-extrabold tracking-tight">
                      paytm
                    </span>
                  </div>
                </div>
              </div>

              {/* Option 2: Cash on Delivery (COD) */}
              <div
                onClick={() => setSelectedMethod("cod")}
                className={`cursor-pointer rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-200 ${
                  selectedMethod === "cod"
                    ? "border-2 border-[#E8CDB5] bg-[#FFF8F0] shadow-[0_4px_20px_-4px_rgba(241,90,36,0.12)]"
                    : "border border-[#E5E7EB] bg-white shadow-xs hover:border-[#D1D5DB]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {/* Radio Button */}
                    <div className="shrink-0">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full transition-all ${
                          selectedMethod === "cod"
                            ? "border-2 border-[#F15A24]"
                            : "border-2 border-[#D1D5DB]"
                        }`}
                      >
                        {selectedMethod === "cod" && (
                          <div className="h-2.5 w-2.5 rounded-full bg-[#F15A24]" />
                        )}
                      </div>
                    </div>

                    {/* Method Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#10B981]">
                      <Banknote size={24} strokeWidth={2} />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-[#112440]">
                        Cash on Delivery
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-[#556070]">
                        Pay when you receive your order
                      </p>
                    </div>
                  </div>

                  {/* Right: Cash Illustration */}
                  <div className="shrink-0 flex items-center">
                    <span className="text-3xl" role="img" aria-label="Cash">
                      💵
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice Banner */}
            <div className="mt-5 rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] px-4 py-3.5 flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#1E3A8A]">
              <CheckCircle2 size={18} className="text-[#10B981] shrink-0" />
              <span>Your payment information is 100% secure and encrypted.</span>
            </div>

            {/* Place Order Primary Action Button */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#F15A24] px-6 py-4 text-center text-sm sm:text-base font-bold text-white shadow-sm transition hover:bg-[#DE4B16] active:scale-[0.99]"
            >
              <Lock size={17} strokeWidth={2.4} />
              <span>Place Order</span>
              <ArrowRight size={17} strokeWidth={2.4} />
            </button>
          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: ORDER SUMMARY + WELLNESS POINTS CARD  */}
          {/* Soft Warm Cream/Peach Container (~35% desktop)      */}
          {/* ==================================================== */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-[#F6E8DA] bg-[#FEF7EF] p-6 sm:p-7 shadow-[0_4px_24px_-4px_rgba(200,180,150,0.18)]">
              {/* Header */}
              <h3 className="text-xl sm:text-2xl font-serif italic font-bold text-[#112440]">
                Order Summary
              </h3>

              {/* Dynamic Cart Items List from useCart() */}
              <div className="mt-5 divide-y divide-[#EBDCCF]">
                {items.length === 0 ? (
                  <p className="py-4 text-xs sm:text-sm font-medium text-[#556070]">
                    Your cart is currently empty.
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="py-4 first:pt-0 last:pb-4 flex items-center justify-between gap-3.5"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl bg-[#FFF9F2] p-1.5 flex items-center justify-center border border-[#F6EFE6]">
                        <img
                          src={item.product.image || pregnancyImg}
                          alt={item.product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-bold text-[#112440] truncate">
                          {item.product.name}
                        </h4>

                        {/* Star Rating */}
                        <div className="mt-1 flex items-center gap-1">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className="fill-[#FBBF24] text-[#FBBF24]"
                              />
                            ))}
                          </div>
                          <span className="text-[11px] font-semibold text-[#556070]">
                            4.9 (245)
                          </span>
                        </div>

                        {/* Price */}
                        <p className="mt-1 text-sm sm:text-base font-bold text-[#112440]">
                          ₹{item.product.price}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="text-right shrink-0">
                        <span className="text-xs sm:text-sm font-semibold text-[#556070]">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Financial Breakdown */}
              <div className="mt-3 space-y-3 border-t border-[#EBDCCF] pt-4">
                <div className="flex items-center justify-between text-sm sm:text-base font-medium text-[#556070]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#112440]">₹{subtotal}</span>
                </div>

                <div className="flex items-center justify-between text-sm sm:text-base font-medium text-[#556070]">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-[#112440]">₹{shippingFee}</span>
                </div>

                {/* Free Shipping Badge */}
                {isFreeShipping && (
                  <div className="flex items-center gap-2 pt-0.5 text-xs font-semibold text-[#1B8754]">
                    <Truck size={14} className="shrink-0" />
                    <span>Free Shipping on Orders Above ₹499</span>
                  </div>
                )}
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

              {/* Wellness Points Reward Card */}
              <div className="mt-6 rounded-2xl bg-[#EBF7EE] border border-[#CDEBD4] p-4 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-white">
                    <Check size={16} strokeWidth={2.6} />
                  </div>
                  <div className="text-xs font-medium text-[#112440]">
                    <p className="text-[#556070]">You will earn</p>
                    <p className="text-sm font-bold text-[#112440]">
                      {wellnessPoints} Wellness Points
                    </p>
                    <p className="text-[#556070]">on this order!</p>
                  </div>
                </div>

                {/* Gift Box Icon */}
                <div className="shrink-0 text-3xl" role="img" aria-label="Gift Box">
                  🎁
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 4: BENEFITS STRIP (Matching Figma 4 Pillars)     */}
        {/* ======================================================== */}
        <section
          aria-label="Preggos Brand Pillars"
          className="mt-12 sm:mt-16 rounded-2xl border border-[#F6E8DA] bg-[#FEF7EF] px-6 py-6 sm:px-10 sm:py-7 shadow-2xs"
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
