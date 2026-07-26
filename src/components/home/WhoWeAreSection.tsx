"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Milestone = {
  year: string;
  title: string;
  points: string[];
};

type WhoWeAreSectionProps = {
  title: string;
  lead: string;
  eyebrow: string;
  milestoneLabel: string;
  milestones: Milestone[];
};

export function WhoWeAreSection({
  title,
  lead,
  eyebrow,
  milestoneLabel,
  milestones,
}: WhoWeAreSectionProps) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || milestones.length < 2) return;

    const timer = window.setInterval(() => {
      if (hovered) return;
      setActive((i) => (i + 1) % milestones.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [hovered, milestones.length]);

  const current = milestones[active];
  const carLeft =
    milestones.length <= 1 ? 50 : (active / (milestones.length - 1)) * 100;

  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f4f7fc] to-white" />
        <div className="absolute left-1/2 top-20 h-[30rem] w-[48rem] -translate-x-1/2 rounded-full bg-[#0057ff]/[0.07] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-[family-name:var(--font-dm-sans)] text-[11px] font-semibold tracking-[0.22em] text-accent uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-douyin-sans)] text-[1.8rem] font-bold leading-snug tracking-tight text-[#191919] sm:text-[2.25rem] lg:text-[2.6rem]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
            {lead}
          </p>
        </div>

        <div
          className="relative mx-auto mt-8 max-w-5xl sm:mt-10"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="overflow-hidden rounded-[2rem] border border-[#dce6f4] bg-white shadow-[0_24px_80px_rgba(20,40,80,0.08)]">
            <div className="relative px-3 pb-5 pt-[4.25rem] sm:px-10 sm:pb-8 sm:pt-24">
              <div className="relative mx-auto h-2 max-w-4xl rounded-full bg-[#e8eef7] shadow-[inset_0_1px_2px_rgba(20,40,80,0.06)] sm:h-2.5">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0057ff]/80 via-[#3d8bff] to-[#00b7ff] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ width: `${carLeft}%` }}
                />
              </div>

              {/* Big 3D clay car — faces right (L→R) */}
              <div
                className="pointer-events-none absolute top-4 z-20 -translate-x-1/2 transition-[left] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-6"
                style={{
                  left: `clamp(2.75rem, ${carLeft}%, calc(100% - 2.75rem))`,
                }}
              >
                <div className="absolute inset-x-4 bottom-1 h-4 rounded-full bg-accent/20 blur-xl sm:inset-x-6 sm:bottom-2 sm:h-5" />
                <div className="relative h-[4.25rem] w-[6.75rem] sm:h-[7.25rem] sm:w-[11.5rem]">
                  <Image
                    src="/who-car-3d.webp"
                    alt=""
                    fill
                    className="object-contain object-bottom drop-shadow-[0_16px_32px_rgba(0,87,255,0.3)]"
                    sizes="(max-width: 640px) 108px, 184px"
                  />
                </div>
              </div>

              <div className="relative mx-auto mt-5 flex max-w-4xl gap-1 overflow-x-auto px-0.5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-8 sm:justify-between sm:gap-0 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
                {milestones.map((item, index) => {
                  const selected = index === active;
                  return (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => setActive(index)}
                      className="group flex min-w-[3.75rem] flex-1 flex-col items-center gap-2 sm:min-w-0 sm:gap-3"
                    >
                      <span
                        className={`rounded-full transition-all duration-500 ${
                          selected
                            ? "h-3.5 w-3.5 bg-accent shadow-[0_0_0_6px_rgba(0,87,255,0.16)] sm:h-4 sm:w-4 sm:shadow-[0_0_0_8px_rgba(0,87,255,0.16)]"
                            : "h-2.5 w-2.5 bg-white ring-[3px] ring-[#c7d4ea] group-hover:ring-accent/50 sm:h-3 sm:w-3"
                        }`}
                      />
                      <span
                        className={`rounded-full px-2.5 py-1 font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-wide transition sm:px-3 sm:py-1.5 sm:text-sm ${
                          selected
                            ? "bg-accent text-white shadow-[0_10px_24px_rgba(0,87,255,0.28)]"
                            : "bg-[#f3f6fb] text-[#7a8499] group-hover:text-accent"
                        }`}
                      >
                        {item.year}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                aria-label="Previous"
                onClick={() =>
                  setActive((i) => (i - 1 + milestones.length) % milestones.length)
                }
                className={`absolute top-[6rem] left-2 z-30 hidden h-10 w-10 items-center justify-center rounded-full bg-white text-[#3d4659] shadow-[0_12px_28px_rgba(20,30,50,0.14)] ring-1 ring-[#e4ebf5] transition-all duration-300 hover:text-accent sm:left-5 sm:top-[7.5rem] sm:flex sm:h-11 sm:w-11 ${
                  hovered
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <Arrow direction="prev" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => setActive((i) => (i + 1) % milestones.length)}
                className={`absolute top-[6rem] right-2 z-30 hidden h-10 w-10 items-center justify-center rounded-full bg-white text-[#3d4659] shadow-[0_12px_28px_rgba(20,30,50,0.14)] ring-1 ring-[#e4ebf5] transition-all duration-300 hover:text-accent sm:right-5 sm:top-[7.5rem] sm:flex sm:h-11 sm:w-11 ${
                  hovered
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <Arrow direction="next" />
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-3xl sm:mt-8">
          {current && (
            <article
              key={current.year}
              className="animate-[who-card-in_0.45s_ease-out] overflow-hidden rounded-[1.35rem] border border-[#d7e4f5] bg-white shadow-[0_30px_80px_rgba(0,87,255,0.12)] sm:rounded-[1.75rem]"
            >
              <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-[#0057ff] to-[#00a8ff] px-4 py-3.5 sm:gap-4 sm:px-8 sm:py-4">
                <div>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[10px] font-bold tracking-[0.18em] text-white/75 uppercase sm:text-[11px]">
                    {milestoneLabel}
                  </p>
                  <p className="mt-0.5 font-[family-name:var(--font-dm-sans)] text-xl font-bold text-white sm:text-3xl">
                    {current.year}
                  </p>
                </div>
                <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white backdrop-blur-sm sm:px-3 sm:text-[11px]">
                  {active + 1} / {milestones.length}
                </span>
              </div>

              <div className="relative px-4 py-5 sm:px-8 sm:py-8">
                <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-accent/[0.07] blur-2xl" />
                <h3 className="font-[family-name:var(--font-douyin-sans)] text-[1.1rem] font-bold leading-snug text-[#191919] sm:text-2xl">
                  {current.title}
                </h3>
                <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                  {current.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 rounded-xl bg-[#f3f7ff] px-3.5 py-3 text-[13px] leading-relaxed text-[#3d4659] sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3.5 sm:text-[15px]"
                    >
                      <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path
                            d="M2.5 6.2 4.8 8.5 9.5 3.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

function Arrow({ direction }: { direction: "prev" | "next" }) {
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
