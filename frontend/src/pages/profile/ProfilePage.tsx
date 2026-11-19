import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Package,
  Heart,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Edit3,
  Trash2,
  Plus,
  Sparkles,
  Bell,
  Lock,
  LogOut,
  ArrowRight,
  X,
  RefreshCw,
  ShoppingBag,
  Baby,
  Camera,
  MessageCircle,
  HelpCircle,
  Clock,
  Check,
  Home,
  MoreVertical,
  ShoppingCart,
} from "lucide-react";

import bannerBg from "../../assets/images/graphics/banner.png";
import mom1 from "../../assets/images/graphics/mom-1.png";
import avatarPriya from "../../assets/images/graphics/avatar-priya.png";
import mapIcon from "../../assets/images/graphics/map.png";
import boxIcon from "../../assets/images/graphics/box.png";
import wishlistHeart from "../../assets/images/graphics/wishlist-heart.png";
import greenLeaf from "../../assets/images/home/leaf-png/green-leaf.png";
import goldLeaf from "../../assets/images/home/leaf-png/gold-leaf.png";
import leaf1 from "../../assets/images/home/auth/leaf-1.png";
import heart1 from "../../assets/images/home/auth/heart-1.png";
import pregnancyImg from "../../assets/images/home/shop/pregnancy.png";
import healthySnackingImg from "../../assets/images/home/shop/healthy-snacking.png";
import lactationImg from "../../assets/images/home/shop/lactation-support.png";

// Interface definitions for clean typed state
interface AddressItem {
  id: string;
  name: string;
  type: "Home" | "Work" | "Other";
  isDefault: boolean;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing";
  itemsCount: number;
  totalAmount: number;
  items: {
    title: string;
    image: string;
    quantity: number;
    price: number;
  }[];
}

interface WishlistItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  image: string;
  inStock: boolean;
}

export function ProfilePage() {
  const navigate = useNavigate();

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Personal Information State (Clearly identified UI placeholder data)
  const [profile, setProfile] = useState({
    fullName: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    pregnancyWeek: 20,
    dueDate: "18 Oct 2026",
    avatarUrl: "",
  });
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    dueDate: profile.dueDate,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      fullName: editForm.fullName,
      email: editForm.email,
      phone: editForm.phone,
      dueDate: editForm.dueDate,
    }));
    setIsEditProfileOpen(false);
    showToast("Profile details updated successfully (Demo).");
  };

  // 2. Addresses State
  const [addresses, setAddresses] = useState<AddressItem[]>([
    {
      id: "addr-1",
      name: "Priya Sharma",
      type: "Home",
      isDefault: true,
      addressLine: "123 Green Park, Anna Nagar",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600040",
      phone: "+91 98765 43210",
    },
    {
      id: "addr-2",
      name: "Priya Sharma (Office)",
      type: "Work",
      isDefault: false,
      addressLine: "Tower B, 5th Floor, Preggos Wellness Hub, Outer Ring Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103",
      phone: "+91 98765 43210",
    },
  ]);
  const primaryAddress = addresses.find((a) => a.isDefault) || addresses[0];
  const [activeMenuAddressId, setActiveMenuAddressId] = useState<string | null>(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    type: "Home" as "Home" | "Work" | "Other",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    isDefault: false,
  });

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.addressLine || !newAddress.pincode) {
      showToast("Please fill all required address fields.");
      return;
    }
    const created: AddressItem = {
      id: `addr-${Date.now()}`,
      name: newAddress.name,
      type: newAddress.type,
      isDefault: newAddress.isDefault || addresses.length === 0,
      addressLine: newAddress.addressLine,
      city: newAddress.city || "Bengaluru",
      state: newAddress.state || "Karnataka",
      pincode: newAddress.pincode,
      phone: newAddress.phone || profile.phone,
    };
    if (created.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(created));
    } else {
      setAddresses((prev) => [...prev, created]);
    }
    setIsAddAddressOpen(false);
    setNewAddress({
      name: "",
      type: "Home",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      isDefault: false,
    });
    showToast("New address added successfully (Demo).");
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast("Address deleted (Demo).");
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    showToast("Default address updated (Demo).");
  };

  // 3. Orders State
  const [ordersShowEmpty, setOrdersShowEmpty] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [orders] = useState<OrderItem[]>([
    {
      id: "ord-1",
      orderNumber: "PRG-2026-8841",
      date: "12 Nov 2026",
      status: "In Transit",
      itemsCount: 2,
      totalAmount: 1499,
      items: [
        {
          title: "Preggos Prenatal Protein & Nutrition Mix (400g)",
          image: pregnancyImg,
          quantity: 1,
          price: 899,
        },
        {
          title: "Roasted Pumpkin & Flax Seed Snack Bites",
          image: healthySnackingImg,
          quantity: 2,
          price: 600,
        },
      ],
    },
    {
      id: "ord-2",
      orderNumber: "PRG-2026-7290",
      date: "28 Oct 2026",
      status: "Delivered",
      itemsCount: 1,
      totalAmount: 649,
      items: [
        {
          title: "Herbal Nourishing Pregnancy Stretch Mark Butter (100ml)",
          image: lactationImg,
          quantity: 1,
          price: 649,
        },
      ],
    },
  ]);

  // 4. Pregnancy Journey State (Expandable in-page)
  const [isJourneyExpanded, setIsJourneyExpanded] = useState(false);
  const [weeklyChecklist, setWeeklyChecklist] = useState([
    { id: "c1", text: "Schedule 20-week anomaly ultrasound scan", done: true },
    { id: "c2", text: "Maintain daily hydration target (2.5L - 3L fresh water)", done: true },
    { id: "c3", text: "Gentle prenatal walking or yoga (20 mins)", done: true },
    { id: "c4", text: "Explore hospital bag essentials & birth preferences", done: false },
    { id: "c5", text: "Continue doctor-prescribed iron & calcium supplements", done: false },
  ]);

  const toggleChecklistItem = (id: string) => {
    setWeeklyChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  // 5. Wishlist State
  const [wishlistShowEmpty, setWishlistShowEmpty] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      id: "w-1",
      title: "Preggos Complete Prenatal Health Mix",
      subtitle: "Doctor formulated with real saffron, almonds & seeds",
      price: 899,
      originalPrice: 1099,
      image: pregnancyImg,
      inStock: true,
    },
    {
      id: "w-2",
      title: "Roasted Seed & Dry Fruit Snack Pouch",
      subtitle: "Rich in plant iron & omega-3 for afternoon cravings",
      price: 449,
      originalPrice: 549,
      image: healthySnackingImg,
      inStock: true,
    },
    {
      id: "w-3",
      title: "Organic Postnatal Ayurvedic Tea Blend",
      subtitle: "Traditional herbs for gentle digestion & hydration",
      price: 399,
      originalPrice: 499,
      image: lactationImg,
      inStock: true,
    },
  ]);

  const handleRemoveWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    showToast("Item removed from wishlist (Demo).");
  };

  // 6. Account Options State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    whatsapp: true,
    sms: true,
    emailTips: true,
  });

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword.length < 6) {
      showToast("Password must be at least 6 characters.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New passwords do not match.");
      return;
    }
    setIsChangePasswordOpen(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    showToast("Password changed successfully (Demo).");
  };

  const handleLogout = () => {
    showToast("Logging out...");
    setTimeout(() => {
      navigate("/login");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#112440]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-[#112440] px-5 py-3.5 text-sm font-medium text-white shadow-xl animate-fade-in">
          <CheckCircle2 size={18} className="text-[#F15A24]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 1: HERO BANNER (Full-Width Edge-to-Edge)         */}
      {/* Original banner.png rendered at natural aspect ratio      */}
      {/* ======================================================== */}
      <section aria-label="Profile Banner" className="relative w-full overflow-hidden bg-[#FFFDF7]">
        {/* Full-width original background graphic with natural aspect ratio & no cropping */}
        <img
          src={bannerBg}
          alt="Preggos Profile Banner"
          className="w-full h-auto block select-none pointer-events-none"
          loading="eager"
        />

        {/* Text Content Layer */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 md:px-8">
            {/* Text Content on Left */}
            <div className="max-w-[58%] sm:max-w-md md:max-w-lg lg:max-w-xl pl-1 sm:pl-2 flex flex-col items-center sm:items-start text-center sm:text-left sm:translate-x-[20px] sm:-translate-y-[40px]">
              <h1 data-scroll-reveal className="text-xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#112440] leading-tight">
                My Profile
              </h1>
              <p data-scroll-reveal className="mt-1 sm:mt-2 text-[11px] sm:text-xs md:text-sm lg:text-base font-medium text-[#556070] leading-relaxed">
                Manage your account, addresses and more with ease!
              </p>
            </div>
          </div>
        </div>

        {/* Overlaid Transparent Mother-and-Daughter Artwork on Right (mom-1.png) */}
        <div className="absolute right-[3%] sm:right-[5%] md:right-[7%] lg:right-[8%] bottom-0 z-10 pointer-events-none select-none h-full flex items-end justify-end">
          <img
            src={mom1}
            alt="Mother and daughter"
            className="h-auto max-h-[calc(86%-4px)] sm:max-h-[calc(90%-4px)] md:max-h-[calc(93%-4px)] lg:max-h-[calc(95%-4px)] w-auto object-contain object-bottom drop-shadow-xs -translate-y-[12px] sm:-translate-y-[15px] md:-translate-y-[18px] lg:-translate-y-[20px]"
            loading="eager"
            style={{
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: PERSONAL INFORMATION (90-92% Viewport Width)   */}
      {/* ======================================================== */}
      <section
        aria-labelledby="personal-info-heading"
        className="mx-auto w-[92%] sm:w-[92%] md:w-[91%] lg:w-[91%] max-w-[1760px] pt-8 sm:pt-10"
      >
        <div className="rounded-3xl border border-[#F0E6D8] bg-white p-6 sm:p-8 lg:p-9 shadow-[0_4px_24px_-4px_rgba(200,180,150,0.18)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
              
              {/* Left / Center Zone: Avatar + Personal Information Details */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 sm:gap-6 flex-1">
                {/* Profile Photo Avatar with Purple Camera Action Button */}
                <div className="relative shrink-0">
                  <img
                    src={avatarPriya}
                    alt={profile.fullName}
                    className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover shadow-xs border-2 border-white"
                  />
                  <button
                    type="button"
                    onClick={() => showToast("Profile photo upload is in demo mode.")}
                    aria-label="Upload profile photo"
                    className="absolute bottom-0 right-0 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#51237D] text-white shadow-xs hover:bg-[#3D1A5E] transition cursor-pointer"
                  >
                    <Camera size={14} className="text-white" />
                  </button>
                </div>

                {/* Personal Information Details Stack */}
                <div className="text-center sm:text-left">
                  <h2 id="personal-info-heading" className="text-lg sm:text-xl font-bold text-[#112440]">
                    Personal Information
                  </h2>
                  <h3 className="mt-1 text-2xl sm:text-[26px] font-extrabold text-[#112440] tracking-tight">
                    {profile.fullName}
                  </h3>

                  <div className="mt-3.5 space-y-2">
                    <div className="flex items-center justify-center sm:justify-start gap-2.5 text-[#112440]">
                      <Mail size={17} className="text-[#112440] shrink-0 stroke-[1.8]" />
                      <span className="text-sm sm:text-base font-medium">{profile.email}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2.5 text-[#112440]">
                      <Phone size={17} className="text-[#112440] shrink-0 stroke-[1.8]" />
                      <span className="text-sm sm:text-base font-medium">{profile.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Zone: Edit Profile Button & Inspirational Quote */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:justify-between lg:justify-between lg:items-end gap-6 lg:min-w-[240px] pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#F0E6D8] lg:pl-8">
                {/* Edit Profile Button */}
                <button
                  type="button"
                  onClick={() => {
                    setEditForm({
                      fullName: profile.fullName,
                      email: profile.email,
                      phone: profile.phone,
                      dueDate: profile.dueDate,
                    });
                    setIsEditProfileOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ECD2B9] bg-[#FFF5EB] px-5 py-2 text-xs sm:text-sm font-bold text-[#F15A24] hover:bg-[#F15A24] hover:text-white transition shadow-2xs cursor-pointer self-center sm:self-auto lg:self-end"
                >
                  <Edit3 size={15} />
                  <span>Edit Profile</span>
                </button>

                {/* Inspirational Tagline / Quote */}
                <div className="text-center sm:text-right lg:text-center self-center lg:self-center pt-1">
                  <p className="font-serif italic text-base sm:text-lg font-bold text-[#090D3C] tracking-wide">
                    A happy mom,
                  </p>
                  <p className="font-serif italic text-base sm:text-lg font-bold text-[#090D3C] tracking-wide inline-flex items-center gap-1.5 justify-center">
                    <span>a healthy tomorrow</span>
                    <span className="text-[#E5A826] not-italic text-sm">💛</span>
                  </p>
                  {/* Subtle decorative curved underline */}
                  <svg
                    className="mx-auto mt-0.5 w-20 text-[#E5A826]"
                    viewBox="0 0 80 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5C24 8 56 8 78 2"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

            </div>

            {/* Inline Edit Modal / Drawer */}
            {isEditProfileOpen && (
              <div className="mt-6 rounded-2xl border border-[#F15A24]/30 bg-[#FFF9F3] p-5 sm:p-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-[#F7E7D6] pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-[#112440]">
                    Edit Profile Credentials
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsEditProfileOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#112440]">Full Name*</label>
                    <input
                      type="text"
                      required
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#112440] outline-none focus:border-[#F15A24]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#112440]">Email Address*</label>
                    <input
                      type="email"
                      required
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#112440] outline-none focus:border-[#F15A24]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#112440]">Mobile Number*</label>
                    <input
                      type="tel"
                      required
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#112440] outline-none focus:border-[#F15A24]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#112440]">Estimated Due Date</label>
                    <input
                      type="text"
                      value={editForm.dueDate}
                      onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#112440] outline-none focus:border-[#F15A24]"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditProfileOpen(false)}
                      className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-gradient-to-r from-[#F95700] to-[#F15A24] px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:brightness-105 transition cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>

      {/* ======================================================== */}
      {/* SECTION 3: MY ADDRESSES (Matches Section 2 Width: 90-92% Viewport) */}
      {/* ======================================================== */}
      <section
        aria-labelledby="addresses-heading"
        className="mx-auto w-[92%] sm:w-[92%] md:w-[91%] lg:w-[91%] max-w-[1760px] pt-6 sm:pt-8"
      >
        <div className="rounded-3xl border border-[#F0E6D8] bg-white p-4 sm:p-5 lg:p-6 shadow-[0_4px_24px_-4px_rgba(200,180,150,0.18)]">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
            
            {/* Left Block (~82% width): Header Sub-Row + Single Lavender Address Card */}
            <div className="w-full lg:flex-1 flex flex-col gap-2.5 sm:gap-3">
              
              {/* Header Sub-Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <MapPin size={22} className="text-[#F15A24] fill-[#F15A24]" />
                  <h2 id="addresses-heading" className="text-lg sm:text-xl font-bold text-[#112440] tracking-tight">
                    My Addresses
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(true)}
                  className="rounded-full border border-[#D5D8DE] bg-[#F8FAFC] px-4 sm:px-5 py-1 text-xs sm:text-sm font-semibold text-[#112440] hover:bg-white transition cursor-pointer shadow-2xs"
                >
                  Add New Address +
                </button>
              </div>

              {/* Single Lavender Address Card (Home / Default) */}
              {primaryAddress && (
                <div className="relative rounded-2xl bg-[#F0EEFF] border border-[#E4DEF8] px-4 sm:px-5 py-3 sm:py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transition">
                  <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                    {/* Matching Reference House Icon (Overhanging roof, inner rafters, two windows, arched door) */}
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center shrink-0 text-[#112440]">
                      <svg
                        width="36"
                        height="40"
                        viewBox="0 0 38 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#112440]"
                      >
                        <path
                          d="M3 18.5L19 4L35 18.5"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11 15L19 7.5L27 15"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 18.5V36.5C6 37.6 6.9 38.5 8 38.5H30C31.1 38.5 32 37.6 32 36.5V18.5"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <rect
                          x="11"
                          y="22"
                          width="5.5"
                          height="5"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <rect
                          x="21.5"
                          y="22"
                          width="5.5"
                          height="5"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M15.5 38.5V32.5C15.5 30.6 17 29 19 29C21 29 22.5 30.6 22.5 32.5V38.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#112440]">
                        {primaryAddress.type || "Home"}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475569] font-medium leading-tight mt-0.5">
                        {primaryAddress.addressLine},
                      </p>
                      <p className="text-xs sm:text-sm text-[#475569] font-medium leading-tight">
                        {primaryAddress.city} - {primaryAddress.pincode}, {primaryAddress.state}, India
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-2.5 self-end sm:self-center shrink-0">
                    {primaryAddress.isDefault ? (
                      <span className="rounded-full bg-[#EAE4FE] border border-[#DDD6FE] text-[#5B21B6] px-3.5 py-0.5 text-xs font-semibold select-none">
                        Default
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetDefaultAddress(primaryAddress.id)}
                        className="rounded-full border border-gray-300 bg-white px-3 py-0.5 text-xs font-semibold text-gray-700 hover:border-[#5B21B6] hover:text-[#5B21B6] transition cursor-pointer"
                      >
                        Set Default
                      </button>
                    )}

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setActiveMenuAddressId(activeMenuAddressId === primaryAddress.id ? null : primaryAddress.id)}
                        aria-label="Address actions"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[#112440] hover:bg-black/5 transition cursor-pointer"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeMenuAddressId === primaryAddress.id && (
                        <div className="absolute right-0 top-full mt-1.5 z-30 w-36 rounded-xl border border-[#E4DEF8] bg-white py-1.5 shadow-lg animate-fade-in text-xs font-semibold text-[#112440]">
                          {!primaryAddress.isDefault && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuAddressId(null);
                                handleSetDefaultAddress(primaryAddress.id);
                              }}
                              className="w-full text-left px-3.5 py-2 hover:bg-[#F0EEFF] flex items-center gap-2 cursor-pointer text-[#5B21B6]"
                            >
                              <Check size={13} />
                              <span>Make Default</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuAddressId(null);
                              showToast("Edit address opened (Demo).");
                            }}
                            className="w-full text-left px-3.5 py-2 hover:bg-[#F0EEFF] flex items-center gap-2 cursor-pointer"
                          >
                            <Edit3 size={13} />
                            <span>Edit Address</span>
                          </button>
                          {addresses.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuAddressId(null);
                                handleDeleteAddress(primaryAddress.id);
                              }}
                              className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer"
                            >
                              <Trash2 size={13} />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Preserves access to any other saved addresses without bloating main view */}
              {addresses.length > 1 && (
                <div className="flex items-center justify-between text-xs text-[#5B21B6] font-semibold px-1">
                  <button
                    type="button"
                    onClick={() => setIsAddAddressOpen(true)}
                    className="hover:underline cursor-pointer"
                  >
                    + {addresses.length - 1} more saved address ({addresses.filter((a) => a.id !== primaryAddress?.id).map((a) => a.type).join(", ")})
                  </button>
                </div>
              )}

            </div>

            {/* Right Block (~18% width): Fully unclipped map illustration with flanking decorative green leaves */}
            <div className="relative w-44 sm:w-48 lg:w-52 h-28 sm:h-32 shrink-0 flex items-center justify-center select-none pointer-events-none">
              <img
                src={greenLeaf}
                alt=""
                className="absolute -right-2 top-0 h-24 w-auto object-contain opacity-80 pointer-events-none"
              />
              <div className="relative w-[175px] h-[125px] overflow-hidden">
                <img
                  src={mapIcon}
                  alt="Map location"
                  className="absolute -top-[3px] -left-[145px] h-[135px] w-auto max-w-none object-contain drop-shadow-xs"
                />
              </div>
            </div>

          </div>

          {/* Add Address Drawer */}
          {isAddAddressOpen && (
            <div className="mt-6 rounded-2xl border border-[#F15A24]/30 bg-[#FFF9F3] p-5 sm:p-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-[#F7E7D6] pb-3">
                <h3 className="text-base sm:text-lg font-bold text-[#112440]">
                  Add New Delivery Address
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveAddress} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#112440]">Contact Name*</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#112440] outline-none focus:border-[#F15A24]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#112440]">Phone Number*</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#112440] outline-none focus:border-[#F15A24]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#112440]">Flat, House No., Building, Street*</label>
                  <input
                    type="text"
                    required
                    placeholder="Complete street address"
                    value={newAddress.addressLine}
                    onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#112440] outline-none focus:border-[#F15A24]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#112440]">City*</label>
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#112440] outline-none focus:border-[#F15A24]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#112440]">Pincode*</label>
                  <input
                    type="text"
                    required
                    placeholder="6-digit PIN code"
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#112440] outline-none focus:border-[#F15A24]"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#112440]">
                    <input
                      type="checkbox"
                      checked={newAddress.isDefault}
                      onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                      className="rounded border-gray-300 text-[#F15A24] focus:ring-[#F15A24]"
                    />
                    <span>Set as default shipping address</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddAddressOpen(false)}
                      className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-[#F15A24] px-5 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 transition cursor-pointer"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: MY ORDERS & MY WISHLIST (Side-by-Side Row)    */}
      {/* Matches Section 2 & 3 Width: 90-92% Viewport             */}
      {/* ======================================================== */}
      <section
        aria-label="Orders and Wishlist"
        className="mx-auto w-[92%] sm:w-[92%] md:w-[91%] lg:w-[91%] max-w-[1760px] pt-6 sm:pt-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          
          {/* LEFT CARD: MY ORDERS */}
          <div className="rounded-3xl border border-[#F6E8DA] bg-[#FEF7EF] p-5 sm:p-6 lg:p-7 shadow-[0_4px_24px_-4px_rgba(200,180,150,0.18)] flex flex-col justify-between min-h-[310px] sm:min-h-[330px]">
            {/* Header: ShoppingCart + Title (left), View All Orders pill (right) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 text-[#F15A24]"
                >
                  <path
                    d="M2 3H4.5L7.2 14.5C7.3 15 7.8 15.4 8.3 15.4H18.5C19 15.4 19.5 15 19.6 14.5L21.5 6.5H5.5"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="#FCE8D5"
                    fillOpacity="0.6"
                  />
                  <circle cx="9" cy="19.5" r="1.8" fill="currentColor" />
                  <circle cx="17.5" cy="19.5" r="1.8" fill="currentColor" />
                </svg>
                <h2 id="orders-heading" className="text-lg sm:text-xl font-bold text-[#112440] tracking-tight">
                  My Orders
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsOrdersModalOpen(true)}
                className="rounded-full border border-[#D5D8DE] bg-white px-4 sm:px-5 py-1 text-xs sm:text-sm font-semibold text-[#112440] hover:bg-gray-50 transition cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
              >
                <span>View All Orders</span>
                <span className="text-sm font-bold leading-none">&rarr;</span>
              </button>
            </div>

            {/* Centered Empty State Content */}
            <div className="my-auto py-3 flex flex-col items-center justify-center text-center">
              {/* Aligned box.png Illustration */}
              <div className="relative w-[145px] h-[110px] overflow-hidden flex items-center justify-center select-none pointer-events-none">
                <img
                  src={boxIcon}
                  alt="Order package"
                  className="absolute -top-[5px] -left-[195px] h-[122px] w-auto max-w-none object-contain drop-shadow-xs"
                />
              </div>

              <p className="mt-2.5 text-sm sm:text-base font-semibold text-[#112440]">
                You haven't placed any orders yet.
              </p>

              <Link
                to="/shop"
                className="mt-3.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#F95700] to-[#F15A24] px-8 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:brightness-105 transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Shop Now</span>
                <span className="text-sm font-bold leading-none">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* RIGHT CARD: MY WISHLIST */}
          <div className="rounded-3xl border border-[#FADEE2] bg-[#FFF5F3] p-5 sm:p-6 lg:p-7 shadow-[0_4px_24px_-4px_rgba(200,180,150,0.18)] flex flex-col justify-between min-h-[310px] sm:min-h-[330px]">
            {/* Header: Heart + Title (left), View Wishlist pill (right) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Heart size={23} className="text-[#F15A24] stroke-[2.6]" fill="none" />
                <h2 id="wishlist-heading" className="text-lg sm:text-xl font-bold text-[#112440] tracking-tight">
                  My Wishlist
                </h2>
              </div>

              <Link
                to="/wishlist"
                className="rounded-full border border-[#D5D8DE] bg-white px-4 sm:px-5 py-1 text-xs sm:text-sm font-semibold text-[#112440] hover:bg-gray-50 transition cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
              >
                <span>View Wishlist</span>
                <span className="text-sm font-bold leading-none">&rarr;</span>
              </Link>
            </div>

            {/* Centered Empty State Content */}
            <div className="my-auto py-3 flex flex-col items-center justify-center text-center">
              {/* Centered wishlist-heart.png Illustration */}
              <div className="relative h-[110px] flex items-center justify-center select-none pointer-events-none">
                <img
                  src={wishlistHeart}
                  alt="Wishlist heart"
                  className="h-[105px] w-auto object-contain drop-shadow-xs"
                />
              </div>

              <p className="mt-2.5 text-sm sm:text-base font-semibold text-[#112440]">
                Your wishlist is empty.
              </p>

              <Link
                to="/shop"
                className="mt-3.5 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#F95700] to-[#F15A24] px-8 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:brightness-105 transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Products</span>
                <span className="text-sm font-bold leading-none">&rarr;</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Active Orders Modal (Preserves Full Order Tracking Functionality) */}
      {isOrdersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl border border-[#F0DFCD] bg-white p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#F7EFE4] pb-4">
              <div className="flex items-center gap-2.5">
                <ShoppingCart size={22} className="text-[#F15A24]" />
                <h3 className="text-lg font-bold text-[#112440]">All Orders ({orders.length})</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOrdersModalOpen(false)}
                className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="rounded-2xl border border-[#F0E6D8] bg-[#FFFDFC] p-4 sm:p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#F7EFE4] pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-extrabold text-[#112440] text-sm sm:text-base">
                        {ord.orderNumber}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          ord.status === "Delivered"
                            ? "bg-[#E6F7F0] text-[#0E8256]"
                            : "bg-[#FFF4E5] text-[#D96B00]"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>
                    <span className="text-xs text-[#8E95A2]">Placed on {ord.date}</span>
                  </div>

                  <div className="mt-3 space-y-2">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-10 w-10 rounded-lg object-contain bg-[#FFF5EA] p-1 border border-[#F4E3D0]"
                          />
                          <div>
                            <p className="font-bold text-[#112440] line-clamp-1">{item.title}</p>
                            <p className="text-xs text-[#7A8392]">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-[#112440]">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#F7EFE4] flex items-center justify-between text-xs font-semibold">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => showToast(`Tracking details sent for ${ord.orderNumber}`)}
                        className="rounded-full border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                      >
                        Track Shipment
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast(`Downloading invoice for ${ord.orderNumber}`)}
                        className="rounded-full border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                      >
                        Invoice
                      </button>
                    </div>
                    <span className="text-sm font-extrabold text-[#112440]">Total: ₹{ord.totalAmount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Container for Remaining Sections */}
      <main className="mx-auto w-[92%] sm:w-[92%] md:w-[91%] lg:w-[91%] max-w-[1760px] pt-6 sm:pt-8 pb-16 space-y-6 sm:space-y-8">


        {/* ======================================================== */}
        {/* SECTION 5: MY PREGNANCY JOURNEY (In-Page Expandable)    */}
        {/* Kept precisely between My Orders and My Wishlist        */}
        {/* ======================================================== */}
        <section aria-labelledby="journey-heading" className="relative">
          <div className="overflow-hidden rounded-3xl border border-[#F0DFCD] bg-gradient-to-br from-[#FFF8EE] via-[#FFFDF7] to-[#FFF4E8] p-6 sm:p-8 shadow-[0_12px_40px_-15px_rgba(241,90,36,0.18)]">
            
            {/* Top Botanical Leaves */}
            <div className="pointer-events-none absolute -right-4 -top-4 w-20 opacity-40 select-none">
              <img src={goldLeaf} alt="" className="h-auto w-full object-contain rotate-45" />
            </div>

            {/* Journey Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#F5E6D5] pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#F95700] to-[#F15A24] text-white shadow-sm">
                  <Baby size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 id="journey-heading" className="text-xl sm:text-2xl font-extrabold text-[#112440]">
                      My Pregnancy Journey
                    </h2>
                    <span className="rounded-full bg-[#F15A24]/10 px-2.5 py-0.5 text-xs font-bold text-[#F15A24]">
                      Trimester 2
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#556070] mt-0.5">
                    Week-by-week milestones, baby development updates and mommy care
                  </p>
                </div>
              </div>

              {/* Expand/Collapse Toggle Button */}
              <button
                type="button"
                onClick={() => setIsJourneyExpanded(!isJourneyExpanded)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F95700] to-[#F15A24] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:brightness-105 transition cursor-pointer self-start md:self-auto"
              >
                <span>{isJourneyExpanded ? "Hide Journey Details" : "View My Journey"}</span>
                {isJourneyExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {/* Always Visible: 40-Week Interactive Progress Bar */}
            <div className="mt-6 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold text-[#112440] mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg text-[#F15A24]">
                    Week {profile.pregnancyWeek} of 40
                  </span>
                  <span className="text-[#8E95A2] font-normal">• Halfway Milestone</span>
                </div>
                <span className="rounded-full bg-[#FFF0E6] px-3 py-1 text-xs font-bold text-[#F15A24]">
                  Estimated Due: {profile.dueDate}
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="relative h-4 w-full rounded-full bg-[#F3E7DA] overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#F95700] via-[#F15A24] to-[#FDB813] transition-all duration-700 shadow-xs"
                  style={{ width: `${(profile.pregnancyWeek / 40) * 100}%` }}
                />
              </div>

              {/* Trimester Labels */}
              <div className="mt-2.5 grid grid-cols-3 text-[11px] sm:text-xs font-semibold text-[#8E95A2]">
                <div className="text-left">
                  <span className="font-bold text-[#112440]">1st Trimester</span>
                  <p className="text-[10px] text-gray-400">Weeks 1 – 12</p>
                </div>
                <div className="text-center">
                  <span className="font-bold text-[#F15A24]">2nd Trimester (Current)</span>
                  <p className="text-[10px] text-[#F15A24]">Weeks 13 – 27</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#112440]">3rd Trimester</span>
                  <p className="text-[10px] text-gray-400">Weeks 28 – 40</p>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* EXPANDED JOURNEY CONTENT (In-Page, Below Summary)        */}
            {/* ======================================================== */}
            {isJourneyExpanded && (
              <div className="mt-8 pt-8 border-t border-[#F5E6D5] space-y-8 animate-fade-in">
                
                {/* 1. Baby Illustration & Weekly Mommy Message */}
                <div className="rounded-2xl border border-[#F4E3D0] bg-white p-5 sm:p-7 shadow-xs">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-tr from-[#FFF3E8] to-[#FFE8D5] border-2 border-[#F9DFC7] p-2 text-center select-none">
                      <span className="text-4xl sm:text-5xl">🥭</span>
                      <img src={heart1} alt="" className="absolute top-2 right-2 h-4 w-4 opacity-80" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="inline-block rounded-full bg-[#FFF0E6] px-3 py-0.5 text-xs font-bold text-[#F15A24] mb-1.5">
                        Week 20 Baby Growth Size
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#112440]">
                        Your Baby is the Size of a Sweet Mango!
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-[#7A8392]">
                        Approx. 25.6 cm from head to heel • Weighing around 300 – 320 grams
                      </p>
                      <p className="mt-2.5 text-xs sm:text-sm text-[#4E5664] leading-relaxed bg-[#FFFDFC] rounded-xl p-3 border border-[#F6ECE0]">
                        <span className="font-bold text-[#F15A24]">Mommy Note: </span>
                        You are officially at the halfway mark! Your baby's sensory hearing is sharpening, and fluttery movements (quickening) are turning into joyful tiny kicks. Keep smiling and remember to stay well hydrated!
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Baby Development Highlights */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#112440] mb-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-[#F15A24]" />
                    <span>Key Baby Developments This Week</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-[#F0E6D8] bg-white p-4">
                      <div className="h-8 w-8 rounded-xl bg-[#FFF2E6] text-[#F15A24] flex items-center justify-center font-bold text-sm mb-2">
                        1
                      </div>
                      <h4 className="text-sm font-bold text-[#112440]">Hearing Voices</h4>
                      <p className="mt-1 text-xs text-[#6C757D] leading-relaxed">
                        Baby can now clearly hear your voice, your heartbeat and gentle music.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#F0E6D8] bg-white p-4">
                      <div className="h-8 w-8 rounded-xl bg-[#FFF2E6] text-[#F15A24] flex items-center justify-center font-bold text-sm mb-2">
                        2
                      </div>
                      <h4 className="text-sm font-bold text-[#112440]">Vernix Protection</h4>
                      <p className="mt-1 text-xs text-[#6C757D] leading-relaxed">
                        A protective white layer forms to safeguard baby's delicate skin from amniotic fluid.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#F0E6D8] bg-white p-4">
                      <div className="h-8 w-8 rounded-xl bg-[#FFF2E6] text-[#F15A24] flex items-center justify-center font-bold text-sm mb-2">
                        3
                      </div>
                      <h4 className="text-sm font-bold text-[#112440]">Active Kicking</h4>
                      <p className="mt-1 text-xs text-[#6C757D] leading-relaxed">
                        Muscles are strengthening as baby stretches, twists and explores gentle gymnastics.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Weekly Interactive Checklist */}
                <div className="rounded-2xl border border-[#F0E6D8] bg-white p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#112440] mb-3 flex items-center gap-2">
                    <CheckCircle2 size={17} className="text-[#0E8256]" />
                    <span>Mama's Week 20 Wellness Checklist</span>
                  </h3>
                  <div className="space-y-2.5">
                    {weeklyChecklist.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleChecklistItem(task.id)}
                        className={`flex items-center gap-3 rounded-xl border p-3 transition cursor-pointer select-none ${
                          task.done
                            ? "border-[#D6EFE5] bg-[#F4FBF8] text-[#112440]"
                            : "border-[#F0E6D8] bg-[#FFFDFC] text-[#556070] hover:border-[#E2D2BD]"
                        }`}
                      >
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                            task.done
                              ? "border-[#0E8256] bg-[#0E8256] text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {task.done && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            task.done ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. My Memories (Bump Journal & Notes) */}
                <div className="rounded-2xl border border-[#F0E6D8] bg-white p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#112440] flex items-center gap-2">
                        <Camera size={17} className="text-[#F15A24]" />
                        <span>My Bump Memories &amp; Notes</span>
                      </h3>
                      <p className="text-xs text-[#6C757D]">
                        Document weekly bump milestones, thoughts and cravings
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => showToast("Add Memory note is in demo mode.")}
                      className="rounded-full bg-[#FFF5EE] px-4 py-1.5 text-xs font-bold text-[#F15A24] hover:bg-[#F15A24] hover:text-white transition cursor-pointer self-start sm:self-auto"
                    >
                      + Add Memory
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-dashed border-[#F15A24]/40 bg-[#FFFDF9] p-5 text-center flex flex-col items-center justify-center">
                      <Camera size={24} className="text-[#F15A24] mb-2 opacity-80" />
                      <p className="text-xs font-bold text-[#112440]">Upload Week 20 Bump Photo</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Capture your glowing baby bump</p>
                      <button
                        type="button"
                        onClick={() => showToast("Upload photo dialog in demo mode.")}
                        className="mt-3 rounded-full bg-[#F15A24] px-4 py-1 text-xs font-bold text-white hover:brightness-105 transition"
                      >
                        Choose Photo
                      </button>
                    </div>

                    <div className="rounded-xl border border-[#F2E7DC] bg-[#FFFDFC] p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-[#8E95A2] mb-1">
                          <span>Week 19 Memory</span>
                          <span>Nov 06</span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-[#112440]">
                          "Felt the sweetest flutter today while listening to classical lullabies. Best feeling in the world! 💕"
                        </p>
                      </div>
                      <span className="text-[11px] text-[#F15A24] font-bold mt-2">Saved to Bump Album</span>
                    </div>
                  </div>
                </div>

                {/* 5. Recommended Products for 2nd Trimester */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-[#112440] flex items-center gap-2">
                      <ShoppingBag size={17} className="text-[#F15A24]" />
                      <span>Recommended for 2nd Trimester</span>
                    </h3>
                    <Link
                      to="/shop"
                      className="text-xs font-bold text-[#F15A24] hover:underline flex items-center gap-1"
                    >
                      <span>View All in Store</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-[#F0E6D8] bg-white p-4 flex flex-col justify-between">
                      <div>
                        <img
                          src={pregnancyImg}
                          alt="Prenatal Protein Mix"
                          className="h-28 w-full rounded-xl object-contain bg-[#FFF8EE] p-2"
                        />
                        <h4 className="mt-3 text-xs sm:text-sm font-bold text-[#112440] line-clamp-1">
                          Preggos Prenatal Protein &amp; Nutrition Mix
                        </h4>
                        <p className="text-[11px] text-[#7A8392] line-clamp-1 mt-0.5">
                          With real saffron, almonds &amp; calcium
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[#F7EFE4] flex items-center justify-between">
                        <span className="text-sm font-bold text-[#112440]">₹899</span>
                        <button
                          type="button"
                          onClick={() => showToast("Product added to cart (Demo).")}
                          className="rounded-full bg-[#F15A24] px-3.5 py-1 text-xs font-bold text-white hover:brightness-105 transition cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#F0E6D8] bg-white p-4 flex flex-col justify-between">
                      <div>
                        <img
                          src={healthySnackingImg}
                          alt="Healthy Snacking Mix"
                          className="h-28 w-full rounded-xl object-contain bg-[#FFF8EE] p-2"
                        />
                        <h4 className="mt-3 text-xs sm:text-sm font-bold text-[#112440] line-clamp-1">
                          Roasted Seed &amp; Dry Fruit Snack Bites
                        </h4>
                        <p className="text-[11px] text-[#7A8392] line-clamp-1 mt-0.5">
                          Iron rich mid-day craving nourishment
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[#F7EFE4] flex items-center justify-between">
                        <span className="text-sm font-bold text-[#112440]">₹499</span>
                        <button
                          type="button"
                          onClick={() => showToast("Product added to cart (Demo).")}
                          className="rounded-full bg-[#F15A24] px-3.5 py-1 text-xs font-bold text-white hover:brightness-105 transition cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#F0E6D8] bg-white p-4 flex flex-col justify-between">
                      <div>
                        <img
                          src={lactationImg}
                          alt="Organic Herbal Tea"
                          className="h-28 w-full rounded-xl object-contain bg-[#FFF8EE] p-2"
                        />
                        <h4 className="mt-3 text-xs sm:text-sm font-bold text-[#112440] line-clamp-1">
                          Herbal Hydration &amp; Soothing Tea Blend
                        </h4>
                        <p className="text-[11px] text-[#7A8392] line-clamp-1 mt-0.5">
                          Caffeine-free soothing botanical infusion
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[#F7EFE4] flex items-center justify-between">
                        <span className="text-sm font-bold text-[#112440]">₹399</span>
                        <button
                          type="button"
                          onClick={() => showToast("Product added to cart (Demo).")}
                          className="rounded-full bg-[#F15A24] px-3.5 py-1 text-xs font-bold text-white hover:brightness-105 transition cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 6: ACCOUNT OPTIONS                               */}
        {/* ======================================================== */}
        <section aria-labelledby="account-options-heading">
          <div className="rounded-3xl border border-[#F0E6D8] bg-white p-6 sm:p-8 shadow-[0_8px_30px_-10px_rgba(215,185,150,0.2)]">
            <h2 id="account-options-heading" className="text-xl sm:text-2xl font-bold text-[#112440] border-b border-[#F7EFE4] pb-4">
              Account Options
            </h2>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Option 1: Contact Us */}
              <div className="rounded-2xl border border-[#F0E6D8] bg-[#FFFDFC] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#0E8256] mb-3">
                    <MessageCircle size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-[#112440]">Contact Support</h3>
                  <p className="mt-1 text-xs text-[#6C757D] leading-relaxed">
                    Have questions about wellness or orders? We are here for you.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F7EFE4] flex flex-col gap-1.5 text-xs">
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#0E8256] hover:underline flex items-center gap-1"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowRight size={12} />
                  </a>
                  <a
                    href="mailto:care@preggos.com"
                    className="text-[#6C757D] hover:text-[#112440]"
                  >
                    care@preggos.com
                  </a>
                </div>
              </div>

              {/* Option 2: Change Password */}
              <div className="rounded-2xl border border-[#F0E6D8] bg-[#FFFDFC] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF2E6] text-[#F15A24] mb-3">
                    <Lock size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-[#112440]">Security &amp; Password</h3>
                  <p className="mt-1 text-xs text-[#6C757D] leading-relaxed">
                    Update your account login password regularly to stay safe.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F7EFE4]">
                  <button
                    type="button"
                    onClick={() => setIsChangePasswordOpen(true)}
                    className="font-bold text-[#F15A24] hover:underline flex items-center gap-1 text-xs cursor-pointer"
                  >
                    <span>Change Password</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Option 3: Notifications */}
              <div className="rounded-2xl border border-[#F0E6D8] bg-[#FFFDFC] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EEFB] text-[#5A4FCF] mb-3">
                    <Bell size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-[#112440]">Notifications</h3>
                  <p className="mt-1 text-xs text-[#6C757D] leading-relaxed">
                    Manage delivery updates, pregnancy tips and special offers.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F7EFE4] space-y-1.5 text-xs">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-[#4E5664]">WhatsApp Updates</span>
                    <input
                      type="checkbox"
                      checked={notifications.whatsapp}
                      onChange={(e) => setNotifications({ ...notifications, whatsapp: e.target.checked })}
                      className="rounded border-gray-300 text-[#F15A24] focus:ring-[#F15A24]"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-[#4E5664]">Weekly Tips Email</span>
                    <input
                      type="checkbox"
                      checked={notifications.emailTips}
                      onChange={(e) => setNotifications({ ...notifications, emailTips: e.target.checked })}
                      className="rounded border-gray-300 text-[#F15A24] focus:ring-[#F15A24]"
                    />
                  </label>
                </div>
              </div>

              {/* Option 4: Logout */}
              <div className="rounded-2xl border border-[#F8DED7] bg-[#FFF8F6] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFEAE6] text-[#E03B24] mb-3">
                    <LogOut size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-[#112440]">Sign Out</h3>
                  <p className="mt-1 text-xs text-[#6C757D] leading-relaxed">
                    Log out of your Preggos account on this device securely.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F8DED7]">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#E03B24] px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-[#C92F1A] transition cursor-pointer"
                  >
                    <LogOut size={13} />
                    <span>Logout Account</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Change Password Inline Modal */}
            {isChangePasswordOpen && (
              <div className="mt-6 rounded-2xl border border-[#F15A24]/30 bg-[#FFF9F3] p-5 sm:p-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-[#F7E7D6] pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-[#112440]">
                    Change Account Password
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsChangePasswordOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleChangePassword} className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#112440]">Current Password*</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#112440] outline-none focus:border-[#F15A24]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#112440]">New Password*</label>
                    <input
                      type="password"
                      required
                      placeholder="Min 6 characters"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#112440] outline-none focus:border-[#F15A24]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#112440]">Confirm New Password*</label>
                    <input
                      type="password"
                      required
                      placeholder="Repeat new password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#112440] outline-none focus:border-[#F15A24]"
                    />
                  </div>

                  <div className="sm:col-span-3 flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsChangePasswordOpen(false)}
                      className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-gradient-to-r from-[#F95700] to-[#F15A24] px-5 py-2 text-xs font-bold text-white shadow-sm hover:brightness-105 transition cursor-pointer"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

export default ProfilePage;

