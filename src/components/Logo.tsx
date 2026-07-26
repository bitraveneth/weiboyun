import { Link } from "@/i18n/navigation";

type LogoProps = {
  className?: string;
  inverted?: boolean;
  showEnglish?: boolean;
};

export function Logo({
  className = "",
  inverted = false,
  showEnglish = true,
}: LogoProps) {
  const color = inverted
    ? "text-white sm:text-accent"
    : "text-accent";

  return (
    <Link
      href="/"
      className={`group inline-flex flex-col leading-none ${color} ${className}`}
      aria-label="微泊云 WeiBoYun"
    >
      <span
        className={`font-[family-name:var(--font-douyin-sans)] font-bold tracking-tight transition-opacity group-hover:opacity-90 ${
          showEnglish
            ? "text-[1.65rem] sm:text-[1.85rem]"
            : "text-[1.35rem] sm:text-[1.45rem]"
        }`}
      >
        微泊云
      </span>
      {showEnglish ? (
        <span className="mt-1 font-[family-name:var(--font-dm-sans)] text-[0.65rem] font-medium tracking-[0.28em] uppercase text-ink-muted">
          WEIBOYUN
        </span>
      ) : null}
    </Link>
  );
}
