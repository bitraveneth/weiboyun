import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { company } from "@/config/company";
import { Logo } from "./Logo";

const PLATFORM_LINKS = [
  { href: "/products", key: "products" as const },
  { href: "/technology", key: "technology" as const },
  { href: "/ads", key: "ads" as const },
  { href: "/open", key: "open" as const },
  { href: "/data-viz", key: "dataViz" as const },
] as const;

const COMPANY_LINKS = [
  { href: "/about", key: "about" as const },
  { href: "/upgrade", key: "upgrade" as const },
  { href: "/legal", key: "userAgreement" as const },
  { href: "/legal#privacy", key: "privacy" as const },
] as const;

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const locale = await getLocale();
  const address = locale === "en" ? company.addressEn : company.addressZh;

  return (
    <footer className="relative overflow-hidden">
      {/* Main footer content */}
      <div className="relative border-t border-[#e4ebf5] bg-[#f7f9fc]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#0057ff]/[0.06] blur-3xl" />
          <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-[#00b7ff]/[0.05] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-5 sm:px-6 lg:px-8 lg:pt-14">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <Logo showEnglish />
              <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-ink-muted sm:mt-5 sm:text-[14px]">
                {t("tagline")}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-[12px] font-semibold text-accent sm:mt-6">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {company.nameEnFull}
              </div>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.18em] text-[#98a2b3] uppercase">
                {t("platform")}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {PLATFORM_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-[#3d4659] transition hover:text-accent"
                    >
                      {tNav(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.18em] text-[#98a2b3] uppercase">
                {t("company")}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {COMPANY_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-[#3d4659] transition hover:text-accent"
                    >
                      {item.key === "userAgreement" || item.key === "privacy"
                        ? t(item.key)
                        : tNav(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-[11px] font-bold tracking-[0.18em] text-[#98a2b3] uppercase">
                {t("contact")}
              </h3>
              <ul className="mt-4 space-y-3 text-[14px] text-[#3d4659]">
                <li>
                  <p className="text-[12px] text-[#98a2b3]">{t("phone")}</p>
                  <a
                    href={`tel:${company.phone}`}
                    className="mt-0.5 font-semibold text-[#191919] transition hover:text-accent"
                  >
                    {company.phone}
                  </a>
                </li>
                <li>
                  <p className="text-[12px] text-[#98a2b3]">{t("email")}</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-0.5 font-semibold text-[#191919] transition hover:text-accent"
                  >
                    {company.email}
                  </a>
                </li>
                <li>
                  <p className="text-[12px] text-[#98a2b3]">{t("address")}</p>
                  <p className="mt-0.5 leading-relaxed">{address}</p>
                </li>
                <li>
                  <p className="text-[12px] text-[#98a2b3]">{t("officialAccounts")}</p>
                  <p className="mt-0.5">{company.wechatOfficial}</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-[#e4ebf5] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-[#98a2b3]">
              © {new Date().getFullYear()} {company.nameZh} · {company.nameEn}.{" "}
              {t("rights")}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[12px]">
              <Link href="/legal" className="text-[#98a2b3] transition hover:text-accent">
                {t("userAgreement")}
              </Link>
              <Link
                href="/legal#privacy"
                className="text-[#98a2b3] transition hover:text-accent"
              >
                {t("privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Giant brand wordmark */}
      <div className="relative overflow-hidden border-t border-[#e4ebf5] bg-white">
        <div className="relative flex items-center justify-center px-4 py-4 sm:py-5 lg:py-6">
          <p
            aria-label={company.nameZh}
            className="select-none font-[family-name:var(--font-douyin-sans)] font-bold leading-[0.85] tracking-[0.04em] text-transparent transition-colors duration-500 ease-out hover:text-accent"
            style={{
              fontSize: "clamp(3.25rem, 22vw, 14.5rem)",
              WebkitTextStroke: "0.018em #0057ff",
            }}
          >
            {company.nameZh}
          </p>
        </div>
      </div>
    </footer>
  );
}
