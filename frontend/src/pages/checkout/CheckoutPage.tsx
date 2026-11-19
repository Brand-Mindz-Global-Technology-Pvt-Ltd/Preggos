import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Pencil,
  Trash2,
  PlusCircle,
  Lock,
  ArrowRight,
  Leaf,
  ShieldCheck,
  Heart,
  Star,
  Check,
  CheckCircle2,
  X,
  Package,
} from "lucide-react";

import { useCart } from "../../contexts/CartContext";

import bannerBg from "../../assets/images/graphics/banner.png";
import mom2 from "../../assets/images/graphics/mom-2.png";
import pregnancyImg from "../../assets/images/home/shop/pregnancy.png";
import lactationImg from "../../assets/images/home/shop/lactation-support.png";

export interface AddressItem {
  id: string;
  name: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  phone?: string;
  type?: "Home" | "Work" | "Other";
  isDefault: boolean;
}

const DEFAULT_SAVED_ADDRESSES: AddressItem[] = [
  {
    id: "addr-1",
    name: "Priya Sharma",
    addressLine: "123 Green Park, Anna Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600040",
    phone: "+91 98765 43210",
    type: "Home",
    isDefault: true,
  },
  {
    id: "addr-2",
    name: "Priya Sharma",
    addressLine: "45 Lake View Apartments, Taramani",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600113",
    phone: "+91 98765 43210",
    type: "Work",
    isDefault: false,
  },
];

const readSavedAddresses = (): AddressItem[] => {
  try {
    const raw = localStorage.getItem("preggos-addresses");
    if (!raw) return DEFAULT_SAVED_ADDRESSES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return DEFAULT_SAVED_ADDRESSES;
  } catch {
    return DEFAULT_SAVED_ADDRESSES;
  }
};

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items } = useCart();

  // Address state
  const [addresses, setAddresses] = useState<AddressItem[]>(readSavedAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
    const defaultAddr = addresses.find((a) => a.isDefault);
    return defaultAddr ? defaultAddr.id : addresses[0]?.id || "";
  });

  // Modal / Form state for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    type: "Home" as "Home" | "Work" | "Other",
    isDefault: false,
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Sync addresses to localStorage
  useEffect(() => {
    localStorage.setItem("preggos-addresses", JSON.stringify(addresses));
  }, [addresses]);

  // If selected address is removed, fallback to the first available
  useEffect(() => {
    if (!addresses.some((a) => a.id === selectedAddressId) && addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  // Order summary calculations dynamically sourced from useCart()
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );
  const freeShippingThreshold = 499;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = subtotal === 0 || isFreeShipping ? 0 : 50;
  const totalAmount = subtotal + shippingFee;

  // Open modal for adding a new address
  const handleOpenAdd = () => {
    setEditingAddressId(null);
    setFormData({
      name: "Priya Sharma",
      addressLine: "",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "",
      phone: "+91 98765 43210",
      type: "Home",
      isDefault: addresses.length === 0,
    });
    setIsModalOpen(true);
  };

  // Open modal for editing an existing address
  const handleOpenEdit = (addr: AddressItem) => {
    setEditingAddressId(addr.id);
    setFormData({
      name: addr.name,
      addressLine: addr.addressLine,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      phone: addr.phone || "+91 98765 43210",
      type: addr.type || "Home",
      isDefault: addr.isDefault,
    });
    setIsModalOpen(true);
  };

  // Delete an address
  const handleDeleteAddress = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (addresses.length <= 1) {
      showToast("At least one saved address is required.");
      return;
    }
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast("Address removed successfully");
  };

  // Save address (Add or Edit)
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.addressLine.trim() || !formData.pincode.trim()) {
      showToast("Please fill in all required fields.");
      return;
    }

    if (editingAddressId) {
      // Edit mode
      setAddresses((prev) =>
        prev.map((addr) => {
          if (addr.id === editingAddressId) {
            return {
              ...addr,
              name: formData.name.trim(),
              addressLine: formData.addressLine.trim(),
              city: formData.city.trim() || "Chennai",
              state: formData.state.trim() || "Tamil Nadu",
              pincode: formData.pincode.trim(),
              phone: formData.phone.trim(),
              type: formData.type,
              isDefault: formData.isDefault,
            };
          }
          return formData.isDefault ? { ...addr, isDefault: false } : addr;
        })
      );
      showToast("Address updated successfully");
    } else {
      // Add mode
      const newId = `addr-${Date.now()}`;
      const newAddr: AddressItem = {
        id: newId,
        name: formData.name.trim(),
        addressLine: formData.addressLine.trim(),
        city: formData.city.trim() || "Chennai",
        state: formData.state.trim() || "Tamil Nadu",
        pincode: formData.pincode.trim(),
        phone: formData.phone.trim(),
        type: formData.type,
        isDefault: formData.isDefault || addresses.length === 0,
      };

      if (newAddr.isDefault) {
        setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
      } else {
        setAddresses((prev) => [...prev, newAddr]);
      }
      setSelectedAddressId(newId);
      showToast("New address added successfully");
    }

    setIsModalOpen(false);
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
        aria-label="Checkout Banner"
        className="relative w-full overflow-hidden bg-[#FFFDF7]"
      >
        {/* Full-width original background graphic with natural aspect ratio */}
        <img
          src={bannerBg}
          alt="Preggos Checkout Banner"
          className="w-full h-auto block select-none pointer-events-none"
          loading="eager"
        />

        {/* Text Content Layer */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 md:px-8">
            <div className="max-w-[58%] sm:max-w-md md:max-w-lg lg:max-w-xl pl-1 sm:pl-2 flex flex-col items-center sm:items-start text-center sm:text-left sm:translate-x-[80px] sm:-translate-y-[40px]">
              {/* Teal Heading */}
              <h1 data-scroll-reveal className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-black tracking-tight text-[#0A7D78] leading-tight font-display">
                Checkout
              </h1>

              {/* Subtitle */}
              <p data-scroll-reveal className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-semibold text-[#112440] leading-relaxed">
                Let's get your order to you!
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

        {/* Right Artwork: mom-2.png (Mother with boy & daughter) */}
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
      {/* SECTION 2: CHECKOUT PROGRESS STEPPER (Cart → Address → Payment) */}
      {/* ======================================================== */}
      <section aria-label="Checkout Progress" className="w-full pt-8 pb-4">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <div className="relative flex items-center justify-between">
            {/* Step 1: Cart (Completed) */}
            <Link
              to="/cart"
              className="group flex flex-col items-center focus:outline-none"
              aria-label="Go back to Cart"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#112440] bg-white text-[#112440] shadow-xs transition group-hover:scale-105">
                <ShoppingCart size={20} strokeWidth={2.4} />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-bold text-[#112440]">
                Cart
              </span>
            </Link>

            {/* Connecting line 1 */}
            <div className="h-[2px] flex-1 bg-[#D1D5DB] mx-3 sm:mx-4 -mt-5" />

            {/* Step 2: Address (Active Step) */}
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F15A24] text-white shadow-md ring-4 ring-[#F15A24]/20 animate-pulse-subtle">
                <MapPin size={22} strokeWidth={2.4} />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-extrabold text-[#112440]">
                Address
              </span>
            </div>

            {/* Connecting line 2 */}
            <div className="h-[2px] flex-1 bg-[#E5E7EB] mx-3 sm:mx-4 -mt-5" />

            {/* Step 3: Payment (Upcoming) */}
            <div className="flex flex-col items-center opacity-60">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D1D5DB] bg-white text-[#9CA3AF] shadow-2xs">
                <CreditCard size={20} strokeWidth={2} />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-medium text-[#6B7280]">
                Payment
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: MAIN CHECKOUT CONTENT (Delivery Address + Summary) */}
      {/* ======================================================== */}
      <main className="mx-auto w-[92%] max-w-[1760px] pt-6 sm:pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ==================================================== */}
          {/* LEFT COLUMN: DELIVERY ADDRESS (~65-68% desktop)     */}
          {/* ==================================================== */}
          <div className="lg:col-span-8 space-y-5">
            {/* Header: Delivery Address */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F15A24] text-white shadow-xs">
                <Package size={22} strokeWidth={2.4} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#112440] leading-snug">
                  Delivery Address
                </h2>
                <p className="text-xs sm:text-sm font-medium text-[#556070]">
                  Select a saved address or add a new address
                </p>
              </div>
            </div>

            {/* Saved Address Cards List */}
            <div className="space-y-4">
              {addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;

                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`group relative cursor-pointer rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-200 ${
                      isSelected
                        ? "border-2 border-[#E8CDB5] bg-[#FFF8F0] shadow-[0_4px_20px_-4px_rgba(241,90,36,0.12)]"
                        : "border border-[#E5E7EB] bg-white shadow-xs hover:border-[#D1D5DB]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: Radio + Recipient + Address text */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Custom Radio Button */}
                        <div className="mt-1 shrink-0">
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full transition-all ${
                              isSelected
                                ? "border-2 border-[#F15A24]"
                                : "border-2 border-[#D1D5DB] group-hover:border-[#9CA3AF]"
                            }`}
                          >
                            {isSelected && (
                              <div className="h-2.5 w-2.5 rounded-full bg-[#F15A24]" />
                            )}
                          </div>
                        </div>

                        {/* Address Details */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold text-[#112440]">
                              {addr.name}
                            </h3>
                          </div>

                          <p className="mt-1 text-xs sm:text-sm font-medium text-[#556070] leading-relaxed">
                            {addr.addressLine},
                          </p>
                          <p className="text-xs sm:text-sm font-medium text-[#556070] leading-relaxed">
                            {addr.city} - {addr.pincode}, {addr.state}, India
                          </p>

                          {/* Default Pill Badge */}
                          {addr.isDefault && (
                            <span className="mt-2.5 inline-block rounded-full bg-[#EDE9FE] px-3 py-0.5 text-xs font-semibold text-[#7C3AED]">
                              Default
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Vertical line + Edit and Remove actions */}
                      <div className="flex items-center gap-5 sm:gap-6 pt-3 sm:pt-0 sm:pl-6 border-t sm:border-t-0 sm:border-l border-[#E5E7EB] sm:border-[#EADBCF] shrink-0 justify-end">
                        {/* Edit Action */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEdit(addr);
                          }}
                          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#112440] hover:text-[#F15A24] transition-colors"
                          aria-label={`Edit address for ${addr.name}`}
                        >
                          <Pencil size={15} strokeWidth={2.2} />
                          <span>Edit</span>
                        </button>

                        {/* Remove Action */}
                        <button
                          type="button"
                          onClick={(e) => handleDeleteAddress(addr.id, e)}
                          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#112440] hover:text-[#DC2626] transition-colors"
                          aria-label={`Remove address for ${addr.name}`}
                        >
                          <Trash2 size={15} strokeWidth={2.2} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add New Address Button (Outlined Rounded Full Width) */}
            <button
              type="button"
              onClick={handleOpenAdd}
              className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-2xl sm:rounded-3xl border-2 border-[#1E3A8A] bg-white py-3.5 sm:py-4 text-center text-sm sm:text-base font-bold text-[#112440] shadow-xs transition hover:bg-[#F8FAFC] active:scale-[0.99]"
            >
              <PlusCircle size={20} className="text-[#1E3A8A]" strokeWidth={2.2} />
              <span>Add New Address</span>
            </button>
          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: ORDER SUMMARY CARD (~32-35% desktop)  */}
          {/* Soft Warm Cream/Peach Container                     */}
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

              {/* Proceed to Payment Button */}
              <button
                type="button"
                onClick={() => {
                  navigate("/payment");
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#F15A24] px-6 py-4 text-center text-sm sm:text-base font-bold text-white shadow-sm transition hover:bg-[#DE4B16] active:scale-[0.99]"
              >
                <Lock size={16} strokeWidth={2.4} />
                <span>Proceed to Payment</span>
                <ArrowRight size={17} strokeWidth={2.4} />
              </button>

              {/* OR Divider */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#EBDCCF]" />
                </div>
                <span className="relative bg-[#FEF7EF] px-3 text-xs font-semibold uppercase tracking-wider text-[#8892A0]">
                  OR
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

        {/* ======================================================== */}
        {/* SECTION 4: BENEFITS STRIP (Matching Figma 3 Pillars)     */}
        {/* ======================================================== */}
        <section
          aria-label="Preggos Brand Pillars"
          className="mt-12 sm:mt-16 rounded-2xl border border-[#F6E8DA] bg-[#FEF7EF] px-6 py-5 sm:px-10 sm:py-6 shadow-2xs"
        >
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EADCCF]">
            {/* Pillar 1: 100% Natural Ingredients */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center pt-2 sm:pt-0 sm:px-4">
              <Leaf size={26} className="text-[#16A34A] shrink-0" strokeWidth={1.8} />
              <span className="text-sm sm:text-base font-bold text-[#112440]">
                100% Natural Ingredients
              </span>
            </div>

            {/* Pillar 2: Secure Payments */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center pt-4 sm:pt-0 sm:px-4">
              <ShieldCheck size={26} className="text-[#0D9488] shrink-0" strokeWidth={1.8} />
              <span className="text-sm sm:text-base font-bold text-[#112440]">
                Secure Payments
              </span>
            </div>

            {/* Pillar 3: Made in India */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center pt-4 sm:pt-0 sm:px-4">
              <Heart size={26} className="text-[#F97316] shrink-0" strokeWidth={1.8} />
              <span className="text-sm sm:text-base font-bold text-[#112440]">
                Made in India
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ======================================================== */}
      {/* ADDRESS MODAL (Add / Edit Address)                       */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#F0E6D8] animate-scale-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#F3EDE2]">
              <h3 className="text-xl font-bold text-[#112440]">
                {editingAddressId ? "Edit Delivery Address" : "Add New Delivery Address"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1 text-[#6B7280] hover:bg-[#F3EDE2] hover:text-[#112440] transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveAddress} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#556070] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full rounded-xl border border-[#D1D5DB] px-4 py-2.5 text-sm text-[#112440] focus:border-[#F15A24] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#556070] mb-1.5">
                  Flat / House / Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.addressLine}
                  onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                  placeholder="e.g. 123 Green Park, Anna Nagar"
                  className="w-full rounded-xl border border-[#D1D5DB] px-4 py-2.5 text-sm text-[#112440] focus:border-[#F15A24] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#556070] mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Chennai"
                    className="w-full rounded-xl border border-[#D1D5DB] px-4 py-2.5 text-sm text-[#112440] focus:border-[#F15A24] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#556070] mb-1.5">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Tamil Nadu"
                    className="w-full rounded-xl border border-[#D1D5DB] px-4 py-2.5 text-sm text-[#112440] focus:border-[#F15A24] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#556070] mb-1.5">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="600040"
                    className="w-full rounded-xl border border-[#D1D5DB] px-4 py-2.5 text-sm text-[#112440] focus:border-[#F15A24] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#556070] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-[#D1D5DB] px-4 py-2.5 text-sm text-[#112440] focus:border-[#F15A24] focus:outline-none"
                  />
                </div>
              </div>

              {/* Set as Default Address */}
              <div className="pt-2 flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="default-checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="h-4 w-4 rounded accent-[#F15A24]"
                />
                <label
                  htmlFor="default-checkbox"
                  className="text-xs sm:text-sm font-medium text-[#112440] cursor-pointer"
                >
                  Make this my default delivery address
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#556070] hover:bg-[#F3EDE2] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#F15A24] px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#DE4B16] transition"
                >
                  {editingAddressId ? "Save Changes" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
