"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "./Logo";

const NAV_ITEMS = [
  { href: "/", key: "home" as const },
  { href: "/upgrade", key: "upgrade" as const },
  { href: "/products", key: "products" as const },
  { href: "/technology", key: "technology" as const },
  { href: "/ads", key: "ads" as const },
  { href: "/open", key: "open" as const },
  { href: "/data-viz", key: "dataViz" as const },
  { href: "/about", key: "about" as const },
];

export function Header() {
  const t = useTranslations("nav");
  const tLocale = useTranslations("locale");
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const otherLocale = locale === "zh" ? "en" : "zh";
  const solid = !isHome || scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`z-50 transition-all duration-300 ${
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0"
      } ${
        solid
          ? "border-b border-line/70 bg-white/85 shadow-[0_8px_30px_-18px_rgba(25,25,25,0.3)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        <div
          className={`flex items-center justify-between gap-2 rounded-2xl border px-2.5 py-1.5 transition-all duration-300 sm:gap-4 sm:rounded-full sm:px-4 sm:py-2.5 ${
            solid
              ? "border-black/5 bg-white"
              : "border-white/20 bg-white/15 shadow-[0_12px_40px_-18px_rgba(25,25,25,0.4)] backdrop-blur-xl sm:border-black/5 sm:bg-white/60"
          }`}
        >
          <Logo
            showEnglish={false}
            inverted={!solid && isHome}
            className="pl-1"
          />

          <nav className="hidden items-center gap-0.5 xl:flex">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-[0.84rem] font-medium transition-colors ${
                    active
                      ? "bg-accent text-white shadow-[0_6px_16px_rgba(0,87,255,0.28)]"
                      : "text-ink-muted hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href={pathname}
              locale={otherLocale}
              className={`rounded-full px-2.5 py-1.5 font-[family-name:var(--font-dm-sans)] text-xs font-semibold uppercase tracking-wide transition ${
                !solid && isHome
                  ? "text-white/85 hover:text-white sm:text-ink-muted sm:hover:text-accent"
                  : "text-ink-muted hover:text-accent"
              }`}
            >
              {otherLocale === "zh" ? tLocale("zh") : tLocale("en")}
            </Link>

            <Link
              href="/about"
              className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-trust-hover md:inline-flex"
            >
              {t("partnerCta")}
            </Link>

            <button
              type="button"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full xl:hidden ${
                !solid && isHome
                  ? "bg-white text-[#191919]"
                  : "bg-[#191919] text-white"
              }`}
              aria-expanded={open}
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open ? (
          <div className="mt-2 overflow-hidden rounded-2xl border border-black/5 bg-white p-3 shadow-lg xl:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`rounded-xl px-3 py-2.5 text-base transition-colors ${
                      active
                        ? "bg-accent text-white shadow-[0_6px_16px_rgba(0,87,255,0.25)]"
                        : "text-[#191919] hover:bg-accent/10 hover:text-accent"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
              <Link
                href="/about"
                className="mt-2 inline-flex w-fit rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                {t("partnerCta")}
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
