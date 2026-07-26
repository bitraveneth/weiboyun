"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PlatformCard = {
  title: string;
  badge: string;
  body: string;
  image?: string;
  imageAlt?: string;
  theme: "mint" | "amber" | "violet" | "sky" | "peach" | "rose" | "lime" | "indigo";
};

type PlatformBloomSectionProps = {
  title: string;
  lead: string;
  cards: PlatformCard[];
};

const THEMES: Record<
  PlatformCard["theme"],
  {
    card: string;
    title: string;
    badge: string;
    star: string;
    fade: string;
    placeholder: string;
  }
> = {
  mint: {
    card: "bg-gradient-to-b from-[#dff5ea] to-[#effaf4]",
    title: "text-[#0f8f6a]",
    badge: "bg-[#b8e8d4] text-[#0b6b4f]",
    star: "#12a878",
    fade: "from-[#effaf4]",
    placeholder: "from-[#c6ebe0] to-[#9fd9c6]",
  },
  amber: {
    card: "bg-gradient-to-b from-[#fff1d6] to-[#fff8ea]",
    title: "text-[#c47a12]",
    badge: "bg-[#f5d9a0] text-[#8a5608]",
    star: "#e39b1c",
    fade: "from-[#fff8ea]",
    placeholder: "from-[#f5dfb0] to-[#e8c57a]",
  },
  violet: {
    card: "bg-gradient-to-b from-[#ebe4ff] to-[#f5f1ff]",
    title: "text-[#6d4fd6]",
    badge: "bg-[#d5c8f8] text-[#4f35a8]",
    star: "#7b5ce8",
    fade: "from-[#f5f1ff]",
    placeholder: "from-[#d8ccf7] to-[#b8a6ef]",
  },
  sky: {
    card: "bg-gradient-to-b from-[#dcebff] to-[#eef5ff]",
    title: "text-[#1f6fe0]",
    badge: "bg-[#bdd8fc] text-[#1454b0]",
    star: "#2b7cff",
    fade: "from-[#eef5ff]",
    placeholder: "from-[#c2d9f8] to-[#8fb6ef]",
  },
  peach: {
    card: "bg-gradient-to-b from-[#ffe4d4] to-[#fff2ea]",
    title: "text-[#d65a2a]",
    badge: "bg-[#f7c9b0] text-[#a03d16]",
    star: "#e86a38",
    fade: "from-[#fff2ea]",
    placeholder: "from-[#f5cbb4] to-[#e9a480]",
  },
  rose: {
    card: "bg-gradient-to-b from-[#ffe0ea] to-[#fff0f5]",
    title: "text-[#d43d72]",
    badge: "bg-[#f5c0d2] text-[#a01f4f]",
    star: "#e84a7f",
    fade: "from-[#fff0f5]",
    placeholder: "from-[#f5c2d3] to-[#e99ab4]",
  },
  lime: {
    card: "bg-gradient-to-b from-[#e8f6c8] to-[#f4fae4]",
    title: "text-[#6a9a18]",
    badge: "bg-[#d0e89a] text-[#4d7010]",
    star: "#7fb820",
    fade: "from-[#f4fae4]",
    placeholder: "from-[#d6eaa8] to-[#b5d46a]",
  },
  indigo: {
    card: "bg-gradient-to-b from-[#e0e4ff] to-[#eef0ff]",
    title: "text-[#4550d4]",
    badge: "bg-[#c4caf8] text-[#2f38a8]",
    star: "#5460e8",
    fade: "from-[#eef0ff]",
    placeholder: "from-[#c8cef7] to-[#9aa4ef]",
  },
};

function StarIcon({ color }: { color: string }) {
  return (
    <svg className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2.2 14.4 9.1 21.5 9.6 16 14.3 17.8 21.3 12 17.5 6.2 21.3 8 14.3 2.5 9.6 9.6 9.1 12 2.2Z"
        fill={color}
      />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d={direction === "next" ? "M7.5 4.5 13 10l-5.5 5.5" : "M12.5 4.5 7 10l5.5 5.5"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlaceholderScreen({ theme }: { theme: PlatformCard["theme"] }) {
  const t = THEMES[theme];
  return (
    <div
      className={`relative mx-auto aspect-[4/5] w-[78%] overflow-hidden rounded-[1.1rem] bg-gradient-to-b ${t.placeholder} shadow-[0_16px_36px_rgba(20,30,50,0.12)]`}
    >
      <div className="absolute inset-x-3 top-3 rounded-xl bg-white/85 p-3 shadow-sm backdrop-blur-sm">
        <div className="h-2 w-1/3 rounded-full bg-black/10" />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="h-10 rounded-lg bg-black/[0.06]" />
          <div className="h-10 rounded-lg bg-black/[0.06]" />
        </div>
        <div className="mt-2 h-16 rounded-lg bg-black/[0.05]" />
        <div className="mt-2 space-y-1.5">
          <div className="h-2 w-full rounded-full bg-black/10" />
          <div className="h-2 w-4/5 rounded-full bg-black/10" />
          <div className="h-2 w-3/5 rounded-full bg-black/10" />
        </div>
      </div>
    </div>
  );
}

export function PlatformBloomSection({
  title,
  lead,
  cards,
}: PlatformBloomSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const AUTO_MS = 3800;

  function getCardStep() {
    const el = scrollerRef.current;
    if (!el) return 360;
    const card = el.querySelector<HTMLElement>("[data-bloom-card]");
    if (!card) return Math.min(el.clientWidth * 0.72, 360);
    const styles = window.getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "20") || 20;
    return card.offsetWidth + gap;
  }

  function scrollToIndex(index: number, behavior: ScrollBehavior = "smooth") {
    const el = scrollerRef.current;
    if (!el) return;
    const next = ((index % cards.length) + cards.length) % cards.length;
    el.scrollTo({ left: next * getCardStep(), behavior });
    setActive(next);
    setProgressKey((k) => k + 1);
  }

  function syncActiveFromScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const step = getCardStep();
    const idx = Math.round(el.scrollLeft / step);
    const next = Math.max(0, Math.min(cards.length - 1, idx));
    setActive((prev) => {
      if (prev !== next) setProgressKey((k) => k + 1);
      return next;
    });
  }

  function setPause(next: boolean) {
    pausedRef.current = next;
  }

  useEffect(() => {
    const onResize = () => {
      const el = scrollerRef.current;
      if (!el) return;
      el.scrollTo({ left: active * getCardStep(), behavior: "auto" });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      setActive((current) => {
        const next = (current + 1) % cards.length;
        const el = scrollerRef.current;
        if (el) {
          const card = el.querySelector<HTMLElement>("[data-bloom-card]");
          const styles = window.getComputedStyle(el);
          const gap =
            Number.parseFloat(styles.columnGap || styles.gap || "20") || 20;
          const step = card
            ? card.offsetWidth + gap
            : Math.min(el.clientWidth * 0.72, 360);
          el.scrollTo({ left: next * step, behavior: "smooth" });
        }
        setProgressKey((k) => k + 1);
        return next;
      });
    }, AUTO_MS);

    return () => window.clearInterval(timer);
  }, [cards.length]);

  return (
    <section className="relative overflow-hidden border-b border-line px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-white" />
        <div className="absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-[#0057ff]/[0.05] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[90rem]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-[family-name:var(--font-douyin-sans)] text-[1.7rem] font-bold leading-snug tracking-tight text-accent sm:text-[2.15rem] lg:text-[2.5rem]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
            {lead}
          </p>
        </div>

        <div
          className="group/carousel relative mt-8 sm:mt-10"
          onMouseEnter={() => {
            setHovered(true);
            setPause(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
            setPause(false);
            setProgressKey((k) => k + 1);
          }}
          onFocusCapture={() => {
            setHovered(true);
            setPause(true);
          }}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setHovered(false);
              setPause(false);
              setProgressKey((k) => k + 1);
            }
          }}
          onTouchStart={() => {
            setHovered(true);
            setPause(true);
          }}
          onTouchEnd={() => {
            window.setTimeout(() => {
              setHovered(false);
              setPause(false);
              setProgressKey((k) => k + 1);
            }, 2400);
          }}
        >
          {/* Side arrows — show on hover */}
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollToIndex(active - 1)}
            className={`absolute top-1/2 left-1 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#3d4659] shadow-[0_12px_32px_rgba(20,30,50,0.16)] ring-1 ring-[#e4ebf5] transition-all duration-300 hover:text-accent hover:ring-accent/30 sm:left-2 sm:h-14 sm:w-14 md:flex ${
              hovered
                ? "pointer-events-auto translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-2 opacity-0"
            }`}
          >
            <ArrowIcon direction="prev" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollToIndex(active + 1)}
            className={`absolute top-1/2 right-1 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#3d4659] shadow-[0_12px_32px_rgba(20,30,50,0.16)] ring-1 ring-[#e4ebf5] transition-all duration-300 hover:text-accent hover:ring-accent/30 sm:right-2 sm:h-14 sm:w-14 md:flex ${
              hovered
                ? "pointer-events-auto translate-x-0 opacity-100"
                : "pointer-events-none translate-x-2 opacity-0"
            }`}
          >
            <ArrowIcon direction="next" />
          </button>

          <div
            ref={scrollerRef}
            onScroll={syncActiveFromScroll}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
          >
            {cards.map((card, index) => {
              const theme = THEMES[card.theme];
              return (
                <article
                  key={card.title}
                  data-bloom-card
                  aria-current={index === active ? "true" : undefined}
                  className={`relative flex w-[min(82vw,20rem)] shrink-0 snap-center flex-col overflow-hidden rounded-[1.5rem] ${theme.card} p-4 shadow-[0_14px_40px_rgba(20,30,50,0.08)] transition duration-500 sm:w-[22.5rem] sm:snap-start sm:rounded-[1.75rem] sm:p-6 ${
                    index === active
                      ? "scale-[1.01] ring-2 ring-accent/15"
                      : "opacity-95"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <StarIcon color={theme.star} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`font-[family-name:var(--font-douyin-sans)] text-xl font-bold leading-tight sm:text-[1.35rem] ${theme.title}`}
                        >
                          {card.title}
                        </h3>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${theme.badge}`}
                        >
                          {card.badge}
                        </span>
                      </div>
                      <p className="mt-3 text-[13px] leading-relaxed text-[#5a6270] sm:text-[14px]">
                        {card.body}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-6 flex-1 pt-1">
                    {card.image ? (
                      <div className="relative mx-auto aspect-[4/5] w-[78%] overflow-hidden rounded-[1.1rem] shadow-[0_16px_36px_rgba(20,30,50,0.12)]">
                        <Image
                          src={card.image}
                          alt={card.imageAlt ?? card.title}
                          fill
                          className="object-cover object-top"
                          sizes="280px"
                        />
                      </div>
                    ) : (
                      <PlaceholderScreen theme={card.theme} />
                    )}
                    <div
                      className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t ${theme.fade} to-transparent`}
                      aria-hidden
                    />
                  </div>
                </article>
              );
            })}
          </div>

          {/* Centered progress */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="h-1 w-40 overflow-hidden rounded-full bg-[#e4ebf5] sm:w-52">
              <div
                key={progressKey}
                className={`h-full rounded-full bg-accent ${
                  hovered ? "" : "animate-bloom-progress"
                }`}
                style={
                  hovered
                    ? { width: `${((active + 1) / cards.length) * 100}%` }
                    : undefined
                }
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              {cards.map((card, index) => (
                <button
                  key={`dot-${card.title}`}
                  type="button"
                  aria-label={`Go to ${card.title}`}
                  aria-current={index === active}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === active
                      ? "w-6 bg-accent"
                      : "w-2 bg-[#d5deed] hover:bg-accent/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
