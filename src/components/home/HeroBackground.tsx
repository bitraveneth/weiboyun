"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

const SLIDES = [
  "/hero-slide-1.webp",
  "/hero-slide-2.webp",
  "/hero-slide-3.webp",
] as const;

const INTERVAL_MS = 6000;

type HeroBoxProps = {
  badge: string;
  headlineBefore: string;
  headlineHighlight: string;
  headlineAfter: string;
  support: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  trust: string[];
};

/**
 * Mobile: full-bleed, strong bottom wash, stacked CTAs, dots only.
 * Desktop: left-shifted copy over car-open composition.
 */
export function HeroBackground({
  badge,
  headlineBefore,
  headlineHighlight,
  headlineAfter,
  support,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  trust,
}: HeroBoxProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(() => new Set<number>([0]));

  const go = useCallback((next: number) => {
    const i = (next + SLIDES.length) % SLIDES.length;
    setLoaded((prev) => {
      if (prev.has(i)) return prev;
      const nextSet = new Set(prev);
      nextSet.add(i);
      return nextSet;
    });
    setIndex(i);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(index + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, index, go]);

  return (
    <div
      className="group relative min-h-[min(92svh,40rem)] w-full overflow-hidden rounded-none shadow-none ring-0 sm:min-h-0 sm:aspect-[16/9] sm:rounded-[1.75rem] sm:shadow-[0_20px_70px_-28px_rgba(25,25,25,0.32)] sm:ring-1 sm:ring-black/[0.06] lg:aspect-auto lg:h-[calc(100svh-6.5rem)] lg:min-h-[480px] lg:max-h-[700px] lg:rounded-[2rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((src, i) => {
        if (!loaded.has(i)) return null;
        const active = i === index;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
              active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!active}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 110rem"
              quality={72}
              className={`object-cover object-[48%_35%] sm:object-[54%_42%] ${
                active
                  ? paused
                    ? "scale-[1.03] transition-transform duration-700"
                    : "animate-hero-kenburns"
                  : "scale-100"
              }`}
            />
          </div>
        );
      })}

      {/* Mobile overlay — smooth top→bottom, no mid banding */}
      <div
        className="pointer-events-none absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,10,18,0.42) 0%, rgba(6,10,18,0.22) 32%, rgba(6,10,18,0.55) 58%, rgba(6,10,18,0.88) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(102deg, rgba(6,10,18,0.82) 0%, rgba(6,10,18,0.62) 30%, rgba(6,10,18,0.28) 50%, transparent 72%), linear-gradient(to top, rgba(6,10,18,0.42) 0%, transparent 34%)",
        }}
        aria-hidden
      />

      <div className="absolute inset-0 z-10 flex items-end sm:items-center">
        <div className="w-full px-5 pb-[4.25rem] pt-24 sm:ml-[6%] sm:max-w-xl sm:px-0 sm:pb-12 sm:pt-8 lg:ml-[8%] lg:max-w-[36rem] xl:ml-[9%]">
          <p className="animate-fade-up mt-0 hidden max-w-full items-center gap-2.5 font-[family-name:var(--font-dm-sans)] text-[13px] font-medium tracking-wide text-white/80 sm:inline-flex">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#5b9dff]" aria-hidden />
            <span className="line-clamp-1">{badge}</span>
          </p>

          <h1 className="animate-fade-up-delay mt-0 font-[family-name:var(--font-douyin-sans)] text-[1.95rem] font-bold leading-[1.2] tracking-tight text-white min-[380px]:text-[2.15rem] sm:mt-6 sm:text-[2.85rem] lg:text-[3.2rem]">
            {headlineBefore}
            <br />
            <span className="text-[#8ec0ff]">{headlineHighlight}</span>
            {headlineAfter}
          </h1>

          <p className="animate-fade-up-delay-2 mt-3 max-w-[27rem] text-[0.9rem] leading-[1.65] text-white/80 sm:mt-5 sm:text-[1.05rem] sm:leading-[1.75] sm:text-white/82">
            <span className="line-clamp-2 sm:line-clamp-none">{support}</span>
          </p>

          <div className="animate-fade-up-delay-2 mt-6 sm:mt-9">
            {/* Mobile: solid brand CTA */}
            <Link
              href={primaryHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[16px] font-semibold text-white shadow-[0_14px_36px_rgba(0,87,255,0.45)] transition active:scale-[0.98] sm:hidden"
            >
              {primaryLabel}
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Desktop: white pill + secondary */}
            <div className="hidden flex-wrap items-center gap-3 sm:flex">
              <Link
                href={primaryHref}
                className="group/btn inline-flex items-center gap-3 rounded-full bg-white py-3 pl-6 pr-2.5 text-[15px] font-semibold text-[#191919] shadow-[0_12px_32px_-14px_rgba(0,0,0,0.5)] transition hover:bg-[#f5f7fb]"
              >
                {primaryLabel}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0057ff] text-sm text-white transition group-hover/btn:bg-[#0046d6]">
                  →
                </span>
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex rounded-full border border-white/30 bg-white/[0.06] px-5 py-3 text-[15px] font-semibold text-white/95 backdrop-blur-sm transition hover:border-white/55 hover:bg-white/12"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>

          <ul className="animate-fade-up-delay-2 mt-9 hidden flex-wrap gap-x-6 gap-y-2 sm:mt-9 sm:flex">
            {trust.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 text-[14px] font-medium text-white/88"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0057ff]/90 text-[9px] font-bold text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={() => go(index - 1)}
        className="absolute left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/90 opacity-0 backdrop-blur-md transition hover:bg-black/45 md:flex md:group-hover:opacity-100"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M15 6L9 12L15 18"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => go(index + 1)}
        className="absolute right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/90 opacity-0 backdrop-blur-md transition hover:bg-black/45 hover:opacity-100 md:flex md:group-hover:opacity-100"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="absolute inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-20 flex justify-center gap-1.5 sm:bottom-6">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
