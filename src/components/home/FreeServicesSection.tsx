import Image from "next/image";

type ServicePanel = {
  badge: string;
  image: string;
  imageAlt: string;
  points: string[];
};

type FreeServicesSectionProps = {
  titleBefore: string;
  cards: ServicePanel[];
};

function ServiceCard({ panel }: { panel: ServicePanel }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#d0d7e4] bg-white shadow-[0_12px_40px_rgba(15,30,60,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/25 hover:shadow-[0_22px_48px_rgba(0,87,255,0.16)] sm:flex-row">
      {/* Soft glass sheen on solid white for clarity */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-white via-transparent to-[#0057ff]/[0.03] transition-opacity duration-300 group-hover:to-[#0057ff]/[0.07]"
        aria-hidden
      />

      {/* Solid white icon well — larger assets */}
      <div className="relative flex shrink-0 items-center justify-center bg-[#f3f6fb] p-3 transition-colors duration-300 group-hover:bg-[#e8eef8] sm:w-[48%] sm:min-h-[240px] sm:p-5 lg:w-[50%]">
        <div className="relative flex aspect-square w-full max-w-[170px] items-center justify-center rounded-[1.1rem] border border-[#e2e8f0] bg-white shadow-[0_4px_16px_rgba(15,30,60,0.06)] transition-shadow duration-300 group-hover:shadow-[0_10px_24px_rgba(0,87,255,0.12)] sm:max-w-[240px] sm:rounded-[1.25rem] lg:max-w-[260px]">
          <div className="relative h-[88%] w-[88%] transition-transform duration-300 group-hover:scale-[1.05]">
            <Image
              src={panel.image}
              alt={panel.imageAlt}
              fill
              unoptimized={panel.image.endsWith(".svg")}
              className="object-contain object-center"
              sizes="300px"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col justify-center border-t border-[#e5eaf2] px-5 pb-6 pt-4 sm:border-l sm:border-t-0 sm:px-7 sm:py-8 lg:px-8">
        <h3 className="font-[family-name:var(--font-douyin-sans)] text-lg font-bold tracking-tight text-[#191919] sm:text-xl">
          {panel.badge}
        </h3>
        <div
          className="mt-2.5 h-0.5 w-8 rounded-full bg-accent transition-all duration-300 group-hover:w-12"
          aria-hidden
        />

        <ul className="mt-5 space-y-3">
          {panel.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#2f2f2f] sm:text-[15px]"
            >
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function FreeServicesSection({
  titleBefore,
  cards,
}: FreeServicesSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-line px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Cool stage behind cards — darker than white so cards pop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#e9eef6]" />
        <div className="absolute -left-16 top-8 h-80 w-80 rounded-full bg-[#c9d6ea]/80 blur-3xl" />
        <div className="absolute -right-12 bottom-6 h-96 w-96 rounded-full bg-[#d2dced]/90 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-[family-name:var(--font-douyin-sans)] text-[1.35rem] font-bold leading-snug tracking-tight text-accent sm:text-[1.9rem] lg:text-[2.15rem]">
            {titleBefore}
          </h2>
          <div
            className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-accent sm:mt-4"
            aria-hidden
          />
        </div>

        <div className="mt-7 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:gap-7">
          {cards.map((card) => (
            <ServiceCard key={card.badge} panel={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
