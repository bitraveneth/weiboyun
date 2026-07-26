import Image from "next/image";

type PartnerCard = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  theme: "amber" | "violet" | "mint" | "sky";
};

type PartnersSectionProps = {
  title: string;
  subtitle: string;
  lead: string;
  cards: PartnerCard[];
};

const THEME_STYLES: Record<
  PartnerCard["theme"],
  { card: string; hover: string; well: string }
> = {
  amber: {
    card: "border-[#f0d7a8] bg-[#fff4e0]",
    hover:
      "hover:-translate-y-1.5 hover:border-[#e8c67a] hover:shadow-[0_20px_48px_rgba(210,140,40,0.2)]",
    well: "bg-[#ffe8c4]",
  },
  violet: {
    card: "border-[#d9cdf5] bg-[#f3ecff]",
    hover:
      "hover:-translate-y-1.5 hover:border-[#c7b6ef] hover:shadow-[0_20px_48px_rgba(120,90,200,0.2)]",
    well: "bg-[#e5d8ff]",
  },
  mint: {
    card: "border-[#b7e4df] bg-[#e4f7f5]",
    hover:
      "hover:-translate-y-1.5 hover:border-[#95d6cf] hover:shadow-[0_20px_48px_rgba(10,164,160,0.2)]",
    well: "bg-[#c8efe9]",
  },
  sky: {
    card: "border-[#bfd3ff] bg-[#e8f0ff]",
    hover:
      "hover:-translate-y-1.5 hover:border-[#9cbcff] hover:shadow-[0_20px_48px_rgba(0,87,255,0.2)]",
    well: "bg-[#cfe0ff]",
  },
};

function PartnerAudienceCard({ card }: { card: PartnerCard }) {
  const theme = THEME_STYLES[card.theme] ?? THEME_STYLES.sky;

  return (
    <article
      className={`group flex h-full items-center gap-3.5 rounded-[1.25rem] border p-3.5 text-left shadow-[0_10px_32px_rgba(15,30,60,0.08)] transition-all duration-300 sm:flex-col sm:items-center sm:gap-0 sm:rounded-[1.5rem] sm:p-7 sm:text-center ${theme.card} ${theme.hover}`}
    >
      <div
        className={`relative flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center overflow-hidden rounded-[1rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-transform duration-300 group-hover:scale-[1.05] sm:h-[7.25rem] sm:w-[7.25rem] sm:rounded-[1.15rem] ${theme.well}`}
      >
        <div className="relative h-[88%] w-[88%]">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            loading="lazy"
            className="object-contain object-center mix-blend-multiply"
            sizes="116px"
          />
        </div>
      </div>

      <div className="min-w-0 flex-1 sm:mt-5">
        <h3 className="font-[family-name:var(--font-douyin-sans)] text-[0.98rem] font-bold leading-snug tracking-tight text-[#191919] sm:text-lg">
          {card.title}
        </h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-[#4a4a4a] sm:mt-3 sm:text-[14px]">
          {card.body}
        </p>
      </div>
    </article>
  );
}

export function PartnersSection({
  title,
  subtitle,
  lead,
  cards,
}: PartnersSectionProps) {
  const list = Array.isArray(cards) ? cards : [];

  return (
    <section className="relative overflow-hidden border-b border-line px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[#f5f7fb]" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-douyin-sans)] text-[1.5rem] font-bold leading-snug tracking-tight text-accent sm:text-[1.9rem] lg:text-[2.15rem]">
            {title}
          </h2>
          <p className="mt-3 font-[family-name:var(--font-douyin-sans)] text-[1.15rem] font-bold leading-snug tracking-tight text-[#191919] sm:text-[1.35rem] lg:text-[1.5rem]">
            {subtitle}
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-muted sm:text-[15px]">
            {lead}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5">
          {list.map((card) => (
            <PartnerAudienceCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
