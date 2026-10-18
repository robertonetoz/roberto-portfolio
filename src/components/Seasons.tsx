"use client";

import { useEffect } from "react";

/**
 * Watches every element with [data-season] and puts the one crossing the middle of the
 * viewport on <html>, so the palette (registered CSS properties) transitions as you scroll.
 */
export default function Seasons() {
  useEffect(() => {
    const root = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            root.dataset.season = (entry.target as HTMLElement).dataset.season;
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    document.querySelectorAll<HTMLElement>("main [data-season]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
