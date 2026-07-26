"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type QrItem = {
  key: "business" | "service";
  image: string;
};

const QR_ITEMS: QrItem[] = [
  { key: "business", image: "/wechat-qr-business.svg" },
  { key: "service", image: "/wechat-qr-service.svg" },
];

function WeChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9.5 4C5.9 4 3 6.5 3 9.6c0 1.8 1 3.4 2.6 4.5l-.6 2.2 2.4-1.3c.7.2 1.4.3 2.1.3.2 0 .4 0 .6 0-.2-.5-.3-1.1-.3-1.7 0-3.4 3.2-6.1 7.1-6.1.2 0 .5 0 .7.1C16.8 5.4 13.5 4 9.5 4Zm-2.3 3.2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Zm4.4 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Z" />
      <path d="M20.9 12.5c0-2.6-2.6-4.7-5.8-4.7s-5.8 2.1-5.8 4.7 2.6 4.7 5.8 4.7c.5 0 1.1-.1 1.6-.2l1.9 1-.5-1.7c1.4-.9 2.8-2.2 2.8-3.8Zm-7.7-.8c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7Zm3.8 0c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7Z" />
    </svg>
  );
}

export function WeChatFloat() {
  const t = useTranslations("wechat");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="pointer-events-none fixed right-3 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] flex flex-col items-end gap-2.5 sm:right-6 sm:bottom-8 sm:gap-3">
      <div
        className={`pointer-events-auto origin-bottom-right transition-all duration-300 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="w-[min(calc(100vw-1.5rem),22rem)] overflow-hidden rounded-[1.25rem] border border-accent/15 bg-white shadow-[0_24px_70px_rgba(0,87,255,0.22)] sm:rounded-[1.35rem]">
          <div className="flex items-start justify-between gap-3 border-b border-[#eef2f8] bg-gradient-to-r from-[#f3f7ff] to-white px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-[0_8px_20px_rgba(0,87,255,0.3)]">
                <WeChatIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-[family-name:var(--font-douyin-sans)] text-[15px] font-bold text-[#191919]">
                  {t("title")}
                </p>
                <p className="text-[12px] text-ink-muted">{t("subtitle")}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label={t("close")}
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f6fb] text-[#667085] transition hover:bg-accent/10 hover:text-accent"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M3 3l6 6M9 3 3 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4">
            {QR_ITEMS.map((item) => (
              <div
                key={item.key}
                className="rounded-2xl bg-[#f5f8fc] p-3 text-center ring-1 ring-[#e4ebf5]"
              >
                <div className="mx-auto aspect-square w-full overflow-hidden rounded-xl bg-white p-2 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={t(`${item.key}Alt`)}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="mt-2.5 font-[family-name:var(--font-dm-sans)] text-[12px] font-bold tracking-wide text-accent">
                  {t(item.key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-label={t("open")}
        onClick={() => setOpen((v) => !v)}
        className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_16px_40px_rgba(0,40,120,0.35)] ring-2 ring-white/90 transition duration-300 hover:scale-105 sm:h-16 sm:w-16 ${
          open
            ? "bg-[#0046d6] ring-4 ring-white/40"
            : "bg-gradient-to-br from-[#0057ff] to-[#00a8ff]"
        }`}
      >
        {open ? (
          <svg className="h-5 w-5" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M3 3l6 6M9 3 3 9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <WeChatIcon className="h-6 w-6 sm:h-8 sm:w-8" />
        )}
      </button>
    </div>
  );
}
