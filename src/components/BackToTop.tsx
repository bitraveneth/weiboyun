"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function BackToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={t("backToTop")}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`pointer-events-auto fixed right-3 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.4rem)] z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-[#d7e0ee] bg-white text-accent shadow-[0_12px_32px_rgba(20,40,80,0.16)] transition-all duration-300 hover:border-accent/30 hover:bg-accent hover:text-white sm:right-6 sm:bottom-[calc(2rem+5.25rem)] sm:h-12 sm:w-12 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg
        className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        <path
          d="M10 15.5V5.5M10 5.5 5.5 10M10 5.5 14.5 10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
