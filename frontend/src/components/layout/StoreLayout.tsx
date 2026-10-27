import { useLayoutEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function StoreLayout() {
  const layoutRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const layout = layoutRef.current;
    if (
      !layout ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Find all main sections on the page
    const sections = layout.querySelectorAll<HTMLElement>("main > section, main > div, footer");

    // Initialize all reveal items as pending
    const allRevealItems = layout.querySelectorAll<HTMLElement>(
      "[data-scroll-reveal], [data-scroll-card]",
    );

    allRevealItems.forEach((item) => {
      if (item.dataset.scrollState !== "revealed" && item.dataset.scrollState !== "done") {
        item.dataset.scrollState = "pending";
      }
    });

    // Progressive section reveal handler
    const revealSection = (section: HTMLElement) => {
      // 1. Reveal Section Headings & Progressive Subtitles/Content
      const reveals = Array.from(
        section.querySelectorAll<HTMLElement>("[data-scroll-reveal]"),
      );
      reveals.forEach((el, index) => {
        if (el.dataset.scrollState === "revealed" || el.dataset.scrollState === "done") return;
        const isHeading = el.tagName === "H1" || el.tagName === "H2";
        const delay = isHeading ? 0 : Math.min(index * 140, 420);
        el.style.setProperty("--scroll-reveal-delay", `${delay}ms`);
        el.dataset.scrollState = "revealed";

        const handleDone = (e: TransitionEvent) => {
          if (e.propertyName === "opacity" || e.propertyName === "transform") {
            el.dataset.scrollState = "done";
            el.removeEventListener("transitionend", handleDone);
          }
        };
        el.addEventListener("transitionend", handleDone);
      });

      // 2. Reveal Staggered Repeated Cards (Category cards, Product cards, Bundles, Testimonials, Benefits)
      const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-scroll-card]"));
      const cardGroups = new Map<HTMLElement, HTMLElement[]>();
      cards.forEach((card) => {
        const parent = card.parentElement || section;
        const group = cardGroups.get(parent) ?? [];
        group.push(card);
        cardGroups.set(parent, group);
      });

      cardGroups.forEach((group) => {
        group.forEach((card, index) => {
          if (card.dataset.scrollState === "revealed" || card.dataset.scrollState === "done") return;
          // The first card appears first; each following card appears with a 1-second delay
          const delay = 200 + index * 1000;
          card.style.setProperty("--scroll-reveal-delay", `${delay}ms`);
          card.dataset.scrollState = "revealed";

          const handleDone = (e: TransitionEvent) => {
            if (e.propertyName === "opacity" || e.propertyName === "transform") {
              card.dataset.scrollState = "done";
              card.removeEventListener("transitionend", handleDone);
            }
          };
          card.addEventListener("transitionend", handleDone);
        });
      });
    };

    // IntersectionObserver triggers each section once when it enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement;
            revealSection(section);
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Reveal any standalone items outside sections immediately
    Array.from(allRevealItems)
      .filter((item) => !item.closest("main > section, main > div, footer"))
      .forEach((el) => {
        el.dataset.scrollState = "revealed";
      });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div ref={layoutRef} className="min-h-screen bg-cream text-navy overflow-x-hidden">
      <AnnouncementBar />
      <Header />
      <Outlet />
      <Footer />
      <a
        href="https://wa.me/919999999999"
        aria-label="Chat with Preggos on WhatsApp"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-[#25d366] p-3 text-white shadow-lg transition hover:-translate-y-1"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
