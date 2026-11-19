import { useLayoutEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function StoreLayout() {
  const layoutRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { pathname, search } = location;

  useLayoutEffect(() => {
    const layout = layoutRef.current;
    if (!layout) return;

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const allRevealItems = layout.querySelectorAll<HTMLElement>(
      "[data-scroll-reveal], [data-scroll-card]",
    );

    // If reduced motion or no IntersectionObserver support, immediately reveal everything
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      allRevealItems.forEach((item) => {
        item.dataset.scrollState = "done";
      });
      return;
    }

    // Find all main sections across all page structures (main, section, container div, footer)
    const sections = Array.from(
      layout.querySelectorAll<HTMLElement>(
        "main > section, section, main > div, [data-scroll-section], footer",
      ),
    );

    // Initialize unrevealed items as pending
    allRevealItems.forEach((item) => {
      if (item.dataset.scrollState !== "revealed" && item.dataset.scrollState !== "done") {
        item.dataset.scrollState = "pending";
      }
    });

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    // Progressive section reveal handler
    const revealSection = (section: HTMLElement) => {
      // 1. Reveal Section Headings & Subtitles / Content
      const reveals = Array.from(
        section.querySelectorAll<HTMLElement>("[data-scroll-reveal]"),
      );
      reveals.forEach((el, index) => {
        if (el.dataset.scrollState === "revealed" || el.dataset.scrollState === "done") return;
        const isHeading = el.tagName === "H1" || el.tagName === "H2";
        const delay = isHeading ? 0 : Math.min(index * (isMobile ? 50 : 70), 300);
        el.style.setProperty("--scroll-reveal-delay", `${delay}ms`);

        // Double requestAnimationFrame ensures the browser paints "pending" before starting transition
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.dataset.scrollState = "revealed";
          });
        });

        const handleDone = (e: TransitionEvent) => {
          if (e.propertyName === "opacity" || e.propertyName === "transform") {
            el.dataset.scrollState = "done";
            el.removeEventListener("transitionend", handleDone);
          }
        };
        el.addEventListener("transitionend", handleDone);

        // Safety fallback to guarantee element is never permanently hidden
        setTimeout(() => {
          if (el.dataset.scrollState === "revealed") {
            el.dataset.scrollState = "done";
            el.removeEventListener("transitionend", handleDone);
          }
        }, delay + 600);
      });

      // 2. Reveal Staggered Cards (Category cards, Product cards, Bundles, Testimonials, Benefits)
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
          const mobileStagger = card.dataset.mobileStagger
            ? parseInt(card.dataset.mobileStagger, 10)
            : null;
          const desktopStagger = card.dataset.desktopStagger
            ? parseInt(card.dataset.desktopStagger, 10)
            : null;

          // Standardized stagger: 60ms on mobile, 80ms on desktop (capped at 400ms max)
          const stagger = isMobile
            ? (mobileStagger !== null ? mobileStagger : 60)
            : (desktopStagger !== null ? desktopStagger : 80);
          const baseDelay = isMobile ? 30 : 50;
          const delay = Math.min(baseDelay + index * stagger, 400);

          card.style.setProperty("--scroll-reveal-delay", `${delay}ms`);

          // Double requestAnimationFrame ensures browser paints "pending" before transition starts
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.dataset.scrollState = "revealed";
            });
          });

          const handleDone = (e: TransitionEvent) => {
            if (e.propertyName === "opacity" || e.propertyName === "transform") {
              card.dataset.scrollState = "done";
              card.removeEventListener("transitionend", handleDone);
            }
          };
          card.addEventListener("transitionend", handleDone);

          // Safety fallback to guarantee card is never permanently hidden
          setTimeout(() => {
            if (card.dataset.scrollState === "revealed") {
              card.dataset.scrollState = "done";
              card.removeEventListener("transitionend", handleDone);
            }
          }, delay + 600);
        });
      });
    };

    // Single IntersectionObserver triggers each section once when it enters the viewport
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
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Reveal any standalone items outside sections immediately
    Array.from(allRevealItems)
      .filter((item) => !item.closest("main > section, section, main > div, [data-scroll-section], footer"))
      .forEach((el) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.dataset.scrollState = "revealed";
          });
        });
      });

    // Safe dynamic element detection (e.g. Shop category filtering, async catalog loads)
    // Reuses the same reveal logic without duplicate observers or memory leaks
    const mutationObserver = new MutationObserver((mutations) => {
      let hasAddedNodes = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          hasAddedNodes = true;
          break;
        }
      }
      if (!hasAddedNodes) return;

      const newItems = layout.querySelectorAll<HTMLElement>(
        "[data-scroll-reveal]:not([data-scroll-state]), [data-scroll-card]:not([data-scroll-state])",
      );
      if (newItems.length === 0) return;

      newItems.forEach((item) => {
        item.dataset.scrollState = "pending";
      });

      newItems.forEach((item) => {
        const parentSection = item.closest<HTMLElement>(
          "main > section, section, main > div, [data-scroll-section], footer",
        );
        if (parentSection) {
          const rect = parentSection.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            revealSection(parentSection);
          } else {
            observer.observe(parentSection);
          }
        } else {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.dataset.scrollState = "revealed";
            });
          });
        }
      });
    });

    mutationObserver.observe(layout, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname, search]);

  const isAuthPage = pathname === "/login";

  return (
    <div ref={layoutRef} className="min-h-screen bg-cream text-navy overflow-x-clip">
      {/* Sticky top wrapper: keeps AnnouncementBar + Navbar pinned together with zero overlap */}
      {!isAuthPage && (
        <div className="sticky top-0 z-[70] w-full">
          <AnnouncementBar />
          <Header />
        </div>
      )}

      {/* Subtle 300ms route transition wrapper that does not affect layout, sticky headers, or scroll */}
      <div key={pathname} className="route-content-enter w-full">
        <Outlet />
      </div>

      {!isAuthPage && <Footer />}

      {!isAuthPage && (
        <a
          href="https://wa.me/919999999999"
          aria-label="Chat with Preggos on WhatsApp"
          className="fixed bottom-5 right-5 z-50 rounded-full bg-[#25d366] p-3 text-white shadow-lg transition hover:-translate-y-1"
        >
          <MessageCircle size={24} />
        </a>
      )}
    </div>
  );
}
