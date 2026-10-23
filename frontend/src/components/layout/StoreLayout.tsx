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

    const targets = layout.querySelectorAll<HTMLElement>(
      "main > section, main > div, footer, [data-scroll-reveal]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.dataset.scrollState = "revealed";
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
    );

    targets.forEach((target) => {
      target.dataset.scrollReveal = "";
    });

    targets.forEach((target) => {
      if (target.dataset.scrollState === "revealed") return;

      target.dataset.scrollState = "pending";
      const siblings = Array.from(target.parentElement?.children ?? []).filter(
        (sibling) => sibling instanceof HTMLElement && sibling.hasAttribute("data-scroll-reveal"),
      );
      const siblingIndex = siblings.indexOf(target);
      target.style.setProperty("--scroll-reveal-delay", `${Math.min(siblingIndex, 5) * 60}ms`);
      observer.observe(target);
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
