"use client";

import { useEffect } from "react";

// Marks [data-reveal] elements with data-shown the first time they scroll
// into view. The CSS in globals.css does the animating, and only when the
// reader hasn't asked for reduced motion.
export function RevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
