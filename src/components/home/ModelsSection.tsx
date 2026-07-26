"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ModelItem = {
  title: string;
  body: string;
};

type ModelsSectionProps = {
  title: string;
  body: string;
  models: ModelItem[];
};

const MODEL_IMAGES = [
  { src: "/model-gift.webp", alt: "免费送设备" },
  { src: "/model-duration.webp", alt: "停车时长采购模式" },
  { src: "/model-contract.webp", alt: "平价承包模式" },
  { src: "/model-berth.webp", alt: "泊位置换模式" },
  { src: "/model-share.webp", alt: "增收分成模式" },
  { src: "/model-cloudhost.webp", alt: "云托管服务费模式" },
  { src: "/model-recover.webp", alt: "追缴收益分成模式" },
  { src: "/model-maintain.webp", alt: "售后维保服务费模式" },
  { src: "/model-sales.webp", alt: "传统设备销售模式" },
] as const;

function DesktopModelCard({
  model,
  image,
}: {
  model: ModelItem;
  image: { src: string; alt: string };
}) {
  return (
    <article className="group flex h-full items-start gap-5 rounded-[1.25rem] border border-[#d0d7e4] bg-white p-5 shadow-[0_10px_32px_rgba(15,30,60,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_18px_44px_rgba(0,87,255,0.14)]">
      <div className="relative flex h-[6.25rem] w-[6.25rem] shrink-0 items-center justify-center overflow-hidden rounded-[1rem] bg-[#e8eef8] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-colors duration-300 group-hover:bg-[#dce6f6]">
        <div className="relative h-[88%] w-[88%] transition-transform duration-300 group-hover:scale-[1.06]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain object-center mix-blend-multiply"
            sizes="100px"
          />
        </div>
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <h3 className="font-[family-name:var(--font-douyin-sans)] text-base font-bold leading-snug tracking-tight text-[#191919]">
          {model.title}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#6b6b6b]">
          {model.body}
        </p>
      </div>
    </article>
  );
}

const AUTO_MS = 3800;

function MobileModelsCarousel({ models }: { models: ModelItem[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const activeRef = useRef(0);
  const inViewRef = useRef(false);
  const pausedRef = useRef(false);

  activeRef.current = active;
  pausedRef.current = paused;

  const scrollTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>("[data-model-card]")[index];
    if (!card) return;
    // Horizontal only — never use scrollIntoView (it jumps the page to this section)
    const left =
      card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.35 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const cards = el.querySelectorAll<HTMLElement>("[data-model-card]");
      if (!cards.length) return;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive((prev) => {
        if (prev !== best) setProgressKey((k) => k + 1);
        return best;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || models.length < 2) return;

    const timer = window.setInterval(() => {
      if (pausedRef.current || !inViewRef.current) return;
      const next = (activeRef.current + 1) % models.length;
      scrollTo(next);
    }, AUTO_MS);

    return () => window.clearInterval(timer);
  }, [models.length]);

  return (
    <div
      ref={rootRef}
      className="sm:hidden"
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => {
        window.setTimeout(() => {
          setPaused(false);
          setProgressKey((k) => k + 1);
        }, 2200);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setProgressKey((k) => k + 1);
      }}
    >
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {models.map((model, index) => {
          const image = MODEL_IMAGES[index];
          const num = String(index + 1).padStart(2, "0");
          return (
            <article
              key={model.title}
              data-model-card
              className="flex w-[min(78vw,18.5rem)] shrink-0 snap-center flex-col overflow-hidden rounded-[1.35rem] border border-[#d5deec] bg-white shadow-[0_14px_40px_rgba(20,35,60,0.1)]"
            >
              <div className="relative flex aspect-[5/4] items-center justify-center bg-gradient-to-b from-[#eef3fb] to-[#e4ebf5]">
                <span className="absolute top-3 left-3 font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.14em] text-accent/70">
                  {num}
                </span>
                <div className="relative h-[68%] w-[68%]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain object-center mix-blend-multiply"
                    sizes="200px"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
                <h3 className="font-[family-name:var(--font-douyin-sans)] text-[1.05rem] font-bold leading-snug tracking-tight text-[#191919]">
                  {model.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-[#5f6673]">
                  {model.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col items-center gap-2.5 px-4">
        <div className="h-1 w-36 overflow-hidden rounded-full bg-[#e4ebf5]">
          <div
            key={progressKey}
            className={`h-full rounded-full bg-accent ${
              paused ? "" : "animate-bloom-progress"
            }`}
            style={
              paused
                ? { width: `${((active + 1) / models.length) * 100}%` }
                : undefined
            }
          />
        </div>
        <div className="flex items-center gap-1.5">
          {models.map((model, index) => (
            <button
              key={model.title}
              type="button"
              aria-label={`查看 ${model.title}`}
              aria-current={index === active}
              onClick={() => {
                setPaused(true);
                scrollTo(index);
                window.setTimeout(() => {
                  setPaused(false);
                  setProgressKey((k) => k + 1);
                }, 2200);
              }}
              className={`h-1.5 rounded-full transition-all ${
                index === active ? "w-5 bg-accent" : "w-1.5 bg-[#c9d4e6]"
              }`}
            />
          ))}
        </div>
        <p className="font-[family-name:var(--font-dm-sans)] text-[12px] font-medium text-[#98a2b3]">
          {active + 1} / {models.length}
        </p>
      </div>
    </div>
  );
}

export function ModelsSection({ title, body, models }: ModelsSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-line px-0 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#f7f8fa] sm:bg-[#eef2f8]" />
        <div className="absolute -left-16 top-[18%] hidden h-80 w-80 rounded-full bg-[#c9d6ea]/70 blur-3xl sm:block" />
        <div className="absolute -right-12 bottom-[10%] hidden h-96 w-96 rounded-full bg-[#d2dced]/80 blur-3xl sm:block" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-0">
          <h2 className="font-[family-name:var(--font-douyin-sans)] text-[1.35rem] font-bold leading-snug tracking-tight text-accent sm:text-[1.9rem] lg:text-[2.15rem]">
            {title}
          </h2>
          <div
            className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-accent sm:mt-4"
            aria-hidden
          />
          <p className="mt-3 text-[14px] leading-relaxed text-ink-muted sm:mt-4 sm:text-base">
            <span className="line-clamp-2 sm:line-clamp-none">{body}</span>
          </p>
        </div>

        <div className="mt-7 sm:mt-10">
          <MobileModelsCarousel models={models} />

          <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {models.map((model, index) => (
              <DesktopModelCard
                key={model.title}
                model={model}
                image={MODEL_IMAGES[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
