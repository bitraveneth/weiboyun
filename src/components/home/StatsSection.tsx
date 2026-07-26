"use client";

import { useEffect, useRef, useState } from "react";

export type StatItem = {
  value: number;
  suffix: string;
  label: string;
  bar: number;
};

type StatsSectionProps = {
  year: string;
  title: string;
  items: StatItem[];
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useSectionReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);
  const [finalize, setFinalize] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      setStarted(true);
      setFinalize(true);
      return;
    }

    const snapPast = () => {
      if (startedRef.current) return;
      const rect = el.getBoundingClientRect();
      // User already scrolled past this section
      if (rect.bottom < 80) {
        startedRef.current = true;
        setStarted(true);
        setFinalize(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startedRef.current = true;
          setStarted(true);
          return;
        }

        // Left the viewport after starting — snap to final numbers
        if (startedRef.current) {
          setFinalize(true);
        } else {
          snapPast();
        }
      },
      {
        threshold: [0, 0.12, 0.25],
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(el);
    window.addEventListener("scroll", snapPast, { passive: true });
    snapPast();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", snapPast);
    };
  }, []);

  return { ref, started, finalize };
}

function useCountUp(
  target: number,
  active: boolean,
  finalize: boolean,
  duration = 1600
) {
  const [value, setValue] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (finalize) {
      doneRef.current = true;
      setValue(target);
      return;
    }

    if (!active || doneRef.current) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(easeOutCubic(t) * target));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        doneRef.current = true;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, finalize, target, duration]);

  return value;
}

function StatBlock({
  item,
  active,
  finalize,
  delay,
}: {
  item: StatItem;
  active: boolean;
  finalize: boolean;
  delay: number;
}) {
  const [started, setStarted] = useState(false);
  const count = useCountUp(item.value, started, finalize);

  useEffect(() => {
    if (finalize) {
      setStarted(true);
      return;
    }
    if (!active) return;
    const id = window.setTimeout(() => setStarted(true), delay);
    return () => window.clearTimeout(id);
  }, [active, finalize, delay]);

  const barReady = started || finalize;

  return (
    <div className="relative flex flex-col items-start px-1 py-2 sm:items-center sm:px-4 sm:text-center lg:px-6">
      <p className="font-[family-name:var(--font-dm-sans)] text-[2.15rem] font-semibold leading-none tracking-tight text-[#191919] sm:text-5xl lg:text-[3.5rem]">
        <span className="tabular-nums text-accent">{count}</span>
        <span className="text-[0.55em] font-semibold text-accent">
          {item.suffix}
        </span>
      </p>
      <p className="mt-2 text-[12px] font-medium text-ink-muted sm:mt-3 sm:text-[15px]">
        {item.label}
      </p>

      <div className="mt-3 h-1 w-full max-w-[7.5rem] overflow-hidden rounded-full bg-black/[0.08] sm:mx-auto sm:mt-5 sm:max-w-[9rem]">
        <div
          className={`h-full rounded-full bg-accent ${
            finalize
              ? "transition-none"
              : "transition-[width] duration-[1600ms] ease-out"
          }`}
          style={{
            width: barReady ? `${item.bar}%` : "0%",
            transitionDelay: finalize ? "0ms" : `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function StatsSection({ year, title, items }: StatsSectionProps) {
  const { ref, started, finalize } = useSectionReveal();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-line bg-transparent"
    >
      <div className="relative mx-auto max-w-[96rem] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <h2 className="mx-auto max-w-3xl text-center font-[family-name:var(--font-douyin-sans)] text-[1.15rem] font-bold leading-[1.45] tracking-tight text-accent sm:text-[1.75rem] lg:text-[2rem]">
          <span className="text-accent">{year}</span>
          {title}
        </h2>
        <div
          className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-accent/80 sm:mt-4 sm:w-12"
          aria-hidden
        />

        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-10 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-4 lg:gap-0">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`relative ${
                i > 0
                  ? "lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:h-16 lg:before:-translate-y-1/2 lg:before:bg-[#191919]/10 lg:before:w-px"
                  : ""
              }`}
            >
              <StatBlock
                item={item}
                active={started}
                finalize={finalize}
                delay={i * 120}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
