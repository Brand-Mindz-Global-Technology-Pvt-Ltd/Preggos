import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Headphones,
  User,
  Send,
  MessageSquare,
  Package,
  Truck,
  Sparkles,
  RefreshCw,
  Plus,
  Minus,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

import bannerBg from "../../assets/images/graphics/banner.png";
import mom4 from "../../assets/images/graphics/mom-4.png";
import greenLeaf from "../../assets/images/home/leaf-png/green-leaf.png";
import goldLeaf from "../../assets/images/home/leaf-png/gold-leaf.png";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How can I track my order?",
    answer:
      "Once your order is dispatched, you will receive a tracking link via SMS, WhatsApp, and email. You can also view real-time tracking in your Profile page under the My Orders section.",
  },
  {
    id: "faq-2",
    question: "What is your return policy?",
    answer:
      "We offer a hassle-free 7-day return and exchange policy for all sealed, unopened nutrition products. If you received a damaged or incorrect package, contact our care team within 48 hours for an instant replacement.",
  },
  {
    id: "faq-3",
    question: "Do you deliver across India?",
    answer:
      "Yes, Preggos ships to over 19,000+ pin codes across India with Free Shipping on all orders above ₹499. Typical delivery takes 3 to 5 business days.",
  },
  {
    id: "faq-4",
    question: "How can I contact customer support?",
    answer:
      "You can reach our dedicated mother-care support team via phone at +91 98765 43210 (Mon–Sat, 9AM–6PM), email at care@preggos.in, or directly on WhatsApp via the WhatsApp button on our store.",
  },
];

export function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Open FAQ accordion items
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast("Please fill in all required fields.");
      return;
    }

    showToast("Thank you! Your message has been received. Our team will contact you shortly. (Demo)");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#112440] selection:bg-[#F15A24]/20 selection:text-[#112440] overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-[#112440] px-5 py-3.5 text-sm font-medium text-white shadow-xl animate-fade-in">
          <CheckCircle2 size={18} className="text-[#F15A24]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 1: HERO BANNER (Edge-to-Edge with mom-4.png)     */}
      {/* ======================================================== */}
      <section
        aria-label="Contact Us Banner"
        className="relative w-full overflow-hidden bg-[#FFFDF7]"
      >
        {/* Full-width original background graphic with natural aspect ratio */}
        <img
          src={bannerBg}
          alt="Preggos Contact Us Banner"
          className="w-full h-auto block select-none pointer-events-none"
          loading="eager"
        />

        {/* Text Content Layer */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 md:px-8">
            <div className="max-w-[58%] sm:max-w-md md:max-w-lg lg:max-w-xl pl-1 sm:pl-2 flex flex-col items-center sm:items-start text-center sm:text-left sm:translate-x-[20px] sm:-translate-y-[40px]">
              {/* Heading: Contact (Navy) Us (Teal) */}
              <h1 data-scroll-reveal className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-black tracking-tight leading-tight font-display">
                <span className="text-[#112440]">Contact </span>
                <span className="text-[#0A7D78]">Us</span>
              </h1>

              {/* Heart Flourish Doodle */}
              <div data-scroll-reveal className="mt-1 sm:mt-1.5 flex justify-center sm:justify-start">
                <svg
                  width="48"
                  height="16"
                  viewBox="0 0 48 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#F15A24]"
                >
                  <path
                    d="M24 13C24 13 18 9 18 5C18 3 19.5 1.5 21.5 1.5C23 1.5 23.5 2.5 24 3C24.5 2.5 25 1.5 26.5 1.5C28.5 1.5 30 3 30 5C30 9 24 13 24 13Z"
                    stroke="#F15A24"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Subtitles matching Approved Reference */}
              <p data-scroll-reveal className="mt-1 sm:mt-1.5 text-xs sm:text-sm md:text-base font-bold text-[#112440] leading-snug">
                We'd love to hear from you!
              </p>
              <p data-scroll-reveal className="mt-0.5 text-[11px] sm:text-xs md:text-sm font-medium text-[#556070] leading-relaxed">
                Have a question, feedback or need help? Our team is here for you.
              </p>
            </div>
          </div>
        </div>

        {/* Right Artwork: mom-4.png with natural aspect ratio & fade mask */}
        <div className="absolute right-[3%] sm:right-[5%] md:right-[7%] lg:right-[8%] bottom-0 z-10 pointer-events-none select-none h-full max-w-[36%] sm:max-w-[42%] lg:max-w-[38%] flex items-end justify-end">
          <img
            src={mom4}
            alt="Mother smiling with daughter"
            className="h-auto max-h-[calc(86%-4px)] sm:max-h-[calc(90%-4px)] md:max-h-[calc(93%-4px)] lg:max-h-[calc(95%-4px)] w-auto object-contain object-bottom drop-shadow-xs -translate-y-[12px] sm:-translate-y-[15px] md:-translate-y-[18px] lg:-translate-y-[20px] preggos-image-enter"
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
      {/* MAIN CONTAINER (~92% Viewport Width, max 1400px)         */}
      {/* ======================================================== */}
      <main className="mx-auto w-[92%] max-w-[1400px] pt-8 sm:pt-12 pb-20">
        {/* ====================================================== */}
        {/* SECTION 2: 4 CONTACT INFORMATION CARDS                 */}
        {/* ====================================================== */}
        <section aria-label="Contact Information" className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {/* Card 1: Call Us */}
            <div data-scroll-card className="group rounded-3xl bg-[#F0F7FF] border border-[#DCEBFA] p-6 text-center shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#2563EB] text-white mx-auto mb-3.5 shadow-xs transition-transform duration-300 group-hover:scale-110">
                <Phone size={22} strokeWidth={2.4} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#112440]">
                Call Us
              </h3>
              <p className="mt-1 text-sm sm:text-base font-extrabold text-[#112440]">
                +91 98765 43210
              </p>
              <p className="mt-1 text-xs text-[#556070] font-medium">
                Mon – Sat, 9AM – 6PM
              </p>
            </div>

            {/* Card 2: Email Us */}
            <div data-scroll-card className="group rounded-3xl bg-[#FEF7EF] border border-[#F6E8DA] p-6 text-center shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#F15A24] text-white mx-auto mb-3.5 shadow-xs transition-transform duration-300 group-hover:scale-110">
                <Mail size={22} strokeWidth={2.4} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#112440]">
                Email Us
              </h3>
              <p className="mt-1 text-sm sm:text-base font-extrabold text-[#112440]">
                care@preggos.in
              </p>
              <p className="mt-1 text-xs text-[#556070] font-medium">
                We reply within 24hrs
              </p>
            </div>

            {/* Card 3: Our Address */}
            <div data-scroll-card className="group rounded-3xl bg-[#F0FDF8] border border-[#D2F4E9] p-6 text-center shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#0D9488] text-white mx-auto mb-3.5 shadow-xs transition-transform duration-300 group-hover:scale-110">
                <MapPin size={22} strokeWidth={2.4} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#112440]">
                Our Address
              </h3>
              <p className="mt-1 text-sm sm:text-base font-extrabold text-[#112440]">
                123 Wellness Street,
              </p>
              <p className="mt-0.5 text-xs text-[#556070] font-medium">
                Chennai – 600001
              </p>
            </div>

            {/* Card 4: Customer Support */}
            <div data-scroll-card className="group rounded-3xl bg-[#F5F3FF] border border-[#EBE7FE] p-6 text-center shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#7C3AED] text-white mx-auto mb-3.5 shadow-xs transition-transform duration-300 group-hover:scale-110">
                <Headphones size={22} strokeWidth={2.4} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#112440]">
                Customer Support
              </h3>
              <p className="mt-1 text-sm sm:text-base font-extrabold text-[#112440]">
                +91 98765 43210
              </p>
              <p className="mt-1 text-xs text-[#556070] font-medium">
                Mon – Sat, 9AM – 6PM
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* SECTION 3: SEND US A MESSAGE + HOW CAN WE HELP YOU?     */}
        {/* (Map completely replaced by Quick Support Section)     */}
        {/* ====================================================== */}
        <section aria-label="Contact and Support" className="mb-16 sm:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* ================================================== */}
            {/* LEFT COLUMN: SEND US A MESSAGE FORM (~50%)         */}
            {/* ================================================== */}
            <div data-scroll-reveal className="lg:col-span-6 rounded-3xl border border-[#F0E6D8] bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                {/* Header with chat icon and decorative rays */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F15A24] text-white shadow-xs">
                      <MessageSquare size={20} strokeWidth={2.4} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#112440] font-display italic">
                      Send Us a Message
                    </h2>
                  </div>

                  {/* Decorative Yellow Sunburst Rays */}
                  <div className="select-none pointer-events-none hidden sm:block">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-medium text-[#556070] mb-6">
                  Fill out the form and we'll get back to you soon!
                </p>

                {/* Form Inputs */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name *"
                        className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] pl-10 pr-4 py-3 text-sm text-[#112440] focus:bg-white focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 focus:outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                        <Mail size={16} />
                      </div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Your Email *"
                        className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] pl-10 pr-4 py-3 text-sm text-[#112440] focus:bg-white focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 focus:outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                      <Mail size={16} />
                    </div>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full appearance-none rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] pl-10 pr-10 py-3 text-sm text-[#112440] focus:bg-white focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 focus:outline-none transition-all duration-200 cursor-pointer"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry &amp; Tracking</option>
                      <option value="product">Product Nutrition &amp; Recommendations</option>
                      <option value="shipping">Shipping &amp; Delivery</option>
                      <option value="returns">Returns &amp; Refunds</option>
                      <option value="other">General Feedback / Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                      <ChevronDown size={16} />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your Message * Tell us how we can help..."
                      className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-3.5 text-sm text-[#112440] focus:bg-white focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/10 focus:outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="preggos-button-press flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#F15A24] px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#DE4B16] hover:shadow-md active:scale-[0.985]"
                  >
                    <Send size={16} strokeWidth={2.4} />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>

            {/* ================================================== */}
            {/* RIGHT COLUMN: "HOW CAN WE HELP YOU?" QUICK SUPPORT */}
            {/* (Replaces the map completely per user requirement) */}
            {/* ================================================== */}
            <div data-scroll-reveal className="lg:col-span-6 rounded-3xl border border-[#F6E8DA] bg-[#FEF7EF] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-[#112440] font-display italic">
                    How Can We Help You?
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-[#556070]">
                    Quick support solutions tailored for mothers and daughters
                  </p>
                </div>

                {/* 4 Support Cards in 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 my-5">
                  {/* Support Card 1: Order Support */}
                  <div data-scroll-card className="group rounded-2xl bg-white border border-[#F3EDE2] p-4 shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#F15A24] transition-transform duration-300 group-hover:scale-110">
                        <Package size={18} strokeWidth={2.2} />
                      </div>
                      <h4 className="text-sm font-bold text-[#112440]">
                        Order Support
                      </h4>
                    </div>
                    <p className="text-xs text-[#556070] leading-relaxed">
                      Track active orders, modify delivery details or review past purchases.
                    </p>
                  </div>

                  {/* Support Card 2: Shipping Help */}
                  <div data-scroll-card className="group rounded-2xl bg-white border border-[#F3EDE2] p-4 shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] transition-transform duration-300 group-hover:scale-110">
                        <Truck size={18} strokeWidth={2.2} />
                      </div>
                      <h4 className="text-sm font-bold text-[#112440]">
                        Shipping Help
                      </h4>
                    </div>
                    <p className="text-xs text-[#556070] leading-relaxed">
                      Fast dispatch timelines, pan-India tracking and free shipping guidelines.
                    </p>
                  </div>

                  {/* Support Card 3: Product Guidance */}
                  <div data-scroll-card className="group rounded-2xl bg-white border border-[#F3EDE2] p-4 shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-[#16A34A] transition-transform duration-300 group-hover:scale-110">
                        <Sparkles size={18} strokeWidth={2.2} />
                      </div>
                      <h4 className="text-sm font-bold text-[#112440]">
                        Product Guidance
                      </h4>
                    </div>
                    <p className="text-xs text-[#556070] leading-relaxed">
                      Personalized nutrition advice for every trimester and postnatal stage.
                    </p>
                  </div>

                  {/* Support Card 4: Returns & Refunds */}
                  <div data-scroll-card className="group rounded-2xl bg-white border border-[#F3EDE2] p-4 shadow-2xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-[#7C3AED] transition-transform duration-300 group-hover:scale-110">
                        <RefreshCw size={18} strokeWidth={2.2} />
                      </div>
                      <h4 className="text-sm font-bold text-[#112440]">
                        Returns &amp; Refunds
                      </h4>
                    </div>
                    <p className="text-xs text-[#556070] leading-relaxed">
                      Seamless 7-day hassle-free return policy with swift instant refund processing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Friendly Customer Support Banner */}
              <div className="mt-4 rounded-2xl bg-[#FFF9F2] border border-[#F6E8DA] p-4 flex items-center gap-3">
                <span className="text-2xl" role="img" aria-label="Support">
                  💬
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#112440] leading-relaxed">
                  We are here for you at every step of your motherhood journey. Average response time: under 2 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* SECTION 4: FREQUENTLY ASKED QUESTIONS (FAQ)            */}
        {/* ====================================================== */}
        <section aria-label="Frequently Asked Questions">
          {/* Section Divider Header */}
          <div data-scroll-reveal className="flex items-center justify-center gap-4 mb-8 sm:mb-12">
            <div className="h-[1.5px] w-12 sm:w-24 bg-[#D4C4B5]" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#112440] tracking-tight text-center font-display">
              Frequently Asked Questions
            </h3>
            <div className="h-[1.5px] w-12 sm:w-24 bg-[#D4C4B5]" />
          </div>

          {/* FAQ Card Container matching Approved Design */}
          <div data-scroll-reveal className="rounded-[2.5rem] bg-[#F0FDF8]/60 border border-[#D2F4E9] p-6 sm:p-10 lg:p-12 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: "We're here to help!" illustration zone */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left relative">
                {/* Red Heart Doodle */}
                <div className="mb-2">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#F15A24]">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      stroke="#F15A24"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>

                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#112440] font-display italic leading-tight">
                  We're here to help!
                </h4>

                {/* Decorative Green Leaf PNG Asset */}
                <div className="mt-4 w-20 sm:w-24 pointer-events-none select-none">
                  <img src={greenLeaf} alt="Decorative leaf" className="w-full h-auto drop-shadow-xs" />
                </div>
              </div>

              {/* Right Column: Accordion List */}
              <div className="lg:col-span-8 space-y-3.5">
                {FAQ_ITEMS.map((item) => {
                  const isOpen = openFaqId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl sm:rounded-3xl border border-[#DCEEE5] bg-white transition-all duration-200 overflow-hidden shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => handleToggleFaq(item.id)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#112440] hover:text-[#F15A24] transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span>{item.question}</span>
                        <div
                          className={`shrink-0 ml-3 flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 ${
                            isOpen ? "rotate-180 bg-[#112440] text-white" : "bg-[#F3F4F6] text-[#112440]"
                          }`}
                        >
                          {isOpen ? <Minus size={15} strokeWidth={2.4} /> : <Plus size={15} strokeWidth={2.4} />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-medium text-[#556070] leading-relaxed border-t border-[#F3F4F6] animate-accordion-down">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ContactPage;
