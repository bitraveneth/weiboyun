import Image from "next/image";

type CompareRow = {
  label: string;
  ours: string;
  theirs: string;
};

type CompareSectionProps = {
  titleBefore: string;
  titleAfter: string;
  lead: string;
  eyebrow: string;
  oursLabel: string;
  theirsLabel: string;
  badge: string;
  rows: CompareRow[];
};

const COMPARE_IMAGES = [
  { src: "/compare-product.webp", alt: "产品能力" },
  { src: "/compare-cost.webp", alt: "建设成本" },
  { src: "/compare-network.webp", alt: "组网成本" },
  { src: "/compare-security.webp", alt: "数据安全" },
  { src: "/compare-ops.webp", alt: "运营能力" },
  { src: "/compare-ads.webp", alt: "广告能力" },
  { src: "/compare-business.webp", alt: "商业模式" },
  { src: "/compare-architecture.webp", alt: "技术架构" },
  { src: "/compare-stability.webp", alt: "稳定性" },
] as const;

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6.2 4.8 8.5 9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DangerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 1.6 10.6 10H1.4L6 1.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M6 4.6v2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="6" cy="8.5" r="0.7" fill="currentColor" />
    </svg>
  );
}

function MobileCompareCard({
  row,
  image,
  oursLabel,
  theirsLabel,
  badge,
}: {
  row: CompareRow;
  image: { src: string; alt: string };
  oursLabel: string;
  theirsLabel: string;
  badge: string;
}) {
  return (
    <article className="overflow-hidden rounded-[1.35rem] border border-[#d7e4f5] bg-white shadow-[0_16px_44px_rgba(20,40,80,0.08)]">
      <div className="flex items-center gap-3 border-b border-[#eef2f8] px-4 py-3.5">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e8eef8]">
          <div className="relative h-[84%] w-[84%]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain object-center mix-blend-multiply"
              sizes="44px"
            />
          </div>
        </div>
        <h3 className="min-w-0 flex-1 font-[family-name:var(--font-douyin-sans)] text-[1.05rem] font-bold leading-snug text-[#191919]">
          {row.label}
        </h3>
        <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-accent">
          VS
        </span>
      </div>

      <div className="space-y-2.5 p-3.5">
        <div className="rounded-[1.05rem] bg-gradient-to-br from-[#f3f8ff] to-white p-3.5 ring-1 ring-accent/20">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[12px] font-bold text-accent">{oursLabel}</p>
            <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">
              {badge}
            </span>
          </div>
          <div className="mt-2.5 flex items-start gap-2.5">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
            <p className="text-[14px] font-semibold leading-snug text-[#141414]">
              {row.ours}
            </p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#d8f0e0]">
            <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[#16a34a] to-[#4ade80]" />
          </div>
        </div>

        <div className="rounded-[1.05rem] bg-[#fcf8f5] p-3.5 ring-1 ring-[#edd9c8]">
          <p className="truncate text-[12px] font-bold text-[#8a7360]">{theirsLabel}</p>
          <div className="mt-2.5 flex items-start gap-2.5">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ea580c] text-white">
              <DangerIcon className="h-3.5 w-3.5" />
            </span>
            <p className="text-[14px] font-medium leading-snug text-[#5a4a3c]">
              {row.theirs}
            </p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#f0e0d4]">
            <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-[#ea580c] to-[#fb923c]" />
          </div>
        </div>
      </div>
    </article>
  );
}

function DesktopCompareRow({
  row,
  image,
  oursLabel,
  theirsLabel,
  badge,
}: {
  row: CompareRow;
  image: { src: string; alt: string };
  oursLabel: string;
  theirsLabel: string;
  badge: string;
}) {
  return (
    <div className="grid items-stretch gap-5 lg:grid-cols-[11.5rem_1fr_auto_1fr] xl:grid-cols-[13rem_1fr_auto_1fr]">
      <div className="flex flex-col items-center justify-center gap-3 rounded-[1.35rem] border border-[#d7e0ee] bg-white px-5 py-4 text-center shadow-[0_10px_28px_rgba(20,30,50,0.05)]">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e8eef8] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <div className="relative h-[84%] w-[84%]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain object-center mix-blend-multiply"
              sizes="64px"
            />
          </div>
        </div>
        <h3 className="font-[family-name:var(--font-douyin-sans)] text-lg font-bold leading-snug text-[#191919]">
          {row.label}
        </h3>
      </div>

      <article className="relative flex flex-col overflow-hidden rounded-[1.35rem] bg-white shadow-[0_16px_44px_rgba(0,87,255,0.14)] ring-2 ring-accent/20">
        <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-[#0057ff] to-[#00a8ff] px-5 py-3.5">
          <h4 className="truncate font-[family-name:var(--font-douyin-sans)] text-base font-bold text-white">
            {oursLabel}
          </h4>
          <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-accent">
            {badge}
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-3 bg-gradient-to-b from-[#f4fbf6] to-white px-6 py-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-[0_4px_12px_rgba(22,163,74,0.3)]">
            <CheckIcon className="h-4 w-4" />
          </span>
          <p className="text-base font-semibold leading-relaxed text-[#141414]">
            {row.ours}
          </p>
          <div className="mt-auto h-1.5 overflow-hidden rounded-full bg-[#d8f0e0]">
            <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[#16a34a] to-[#4ade80]" />
          </div>
        </div>
      </article>

      <div className="flex items-center justify-center px-1">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0057ff] to-[#00b7ff] font-[family-name:var(--font-dm-sans)] text-base font-bold tracking-wider text-white shadow-[0_12px_32px_rgba(0,87,255,0.35)] ring-4 ring-[#f3f6fb]">
          VS
        </span>
      </div>

      <article className="flex flex-col overflow-hidden rounded-[1.35rem] border border-[#edd9c8] bg-white shadow-[0_14px_36px_rgba(20,30,50,0.08)]">
        <div className="bg-[#f0e4d8] px-5 py-3.5">
          <h4 className="truncate font-[family-name:var(--font-douyin-sans)] text-base font-bold text-[#5a4a3c]">
            {theirsLabel}
          </h4>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-3 bg-gradient-to-b from-[#fcf8f5] to-white px-6 py-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ea580c] text-white shadow-[0_4px_12px_rgba(234,88,12,0.28)]">
            <DangerIcon className="h-4 w-4" />
          </span>
          <p className="text-base font-medium leading-relaxed text-[#4a4038]">
            {row.theirs}
          </p>
          <div className="mt-auto h-1.5 overflow-hidden rounded-full bg-[#f0e0d4]">
            <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-[#ea580c] to-[#fb923c]" />
          </div>
        </div>
      </article>
    </div>
  );
}

export function CompareSection({
  titleBefore,
  titleAfter,
  lead,
  eyebrow,
  oursLabel,
  theirsLabel,
  badge,
  rows,
}: CompareSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-line px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#f7f8fa] sm:bg-[#f3f6fb]" />
        <div className="absolute -left-28 top-10 hidden h-[26rem] w-[26rem] rounded-full bg-[#0057ff]/[0.1] blur-3xl sm:block" />
        <div className="absolute -right-24 top-32 hidden h-[24rem] w-[24rem] rounded-full bg-[#00c2ff]/[0.08] blur-3xl sm:block" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-[family-name:var(--font-dm-sans)] text-[11px] font-semibold tracking-[0.22em] text-accent uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-douyin-sans)] text-[1.4rem] font-bold leading-snug tracking-tight text-accent sm:text-[2rem] lg:text-[2.35rem]">
            <span className="flex flex-col items-center gap-1.5 sm:hidden">
              <span>{titleBefore}</span>
              <span className="rounded-full bg-gradient-to-r from-[#0057ff] to-[#00b7ff] px-2.5 py-0.5 font-[family-name:var(--font-dm-sans)] text-[0.72em] font-bold tracking-wider text-white">
                VS
              </span>
              <span className="text-[#191919]/55">{titleAfter}</span>
            </span>
            <span className="hidden sm:inline">
              {titleBefore}
              <span className="relative mx-3 inline-flex translate-y-[-2px] items-center">
                <span className="absolute inset-0 rounded-full bg-accent/20 blur-md" />
                <span className="relative rounded-full bg-gradient-to-r from-[#0057ff] to-[#00b7ff] px-3 py-1 font-[family-name:var(--font-dm-sans)] text-[0.85em] font-bold tracking-wider text-white shadow-[0_10px_30px_rgba(0,87,255,0.35)]">
                  VS
                </span>
              </span>
              <span className="text-[#191919]/55">{titleAfter}</span>
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-muted sm:mt-4 sm:text-[15px]">
            <span className="line-clamp-2 sm:line-clamp-none">{lead}</span>
          </p>
        </div>

        {/* Mobile scorecards */}
        <div className="mt-7 space-y-3.5 sm:hidden">
          {rows.map((row, i) => (
            <MobileCompareCard
              key={row.label}
              row={row}
              image={COMPARE_IMAGES[i % COMPARE_IMAGES.length]}
              oursLabel={oursLabel}
              theirsLabel={theirsLabel}
              badge={badge}
            />
          ))}
        </div>

        {/* Desktop rows */}
        <div className="mt-10 hidden space-y-5 sm:block">
          {rows.map((row, i) => (
            <DesktopCompareRow
              key={row.label}
              row={row}
              image={COMPARE_IMAGES[i % COMPARE_IMAGES.length]}
              oursLabel={oursLabel}
              theirsLabel={theirsLabel}
              badge={badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
