import { Link } from "@/i18n/navigation";

type PageHeroProps = {
  title: string;
  subtitle: string;
  lead: string;
};

export function PageHero({ title, subtitle, lead }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-transparent">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="animate-fade-up font-[family-name:var(--font-dm-sans)] text-sm font-medium tracking-wide text-accent">
          {subtitle}
        </p>
        <h1 className="animate-fade-up-delay mt-3 max-w-3xl font-[family-name:var(--font-douyin-sans)] text-4xl font-bold tracking-tight text-accent sm:text-5xl">
          {title}
        </h1>
        <p className="animate-fade-up-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {lead}
        </p>
      </div>
    </section>
  );
}

type ContentBlockProps = {
  title: string;
  body: string;
};

export function ContentGrid({ items }: { items: ContentBlockProps[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="border-t border-line pt-5 transition hover:border-accent"
          >
            <h2 className="text-xl font-semibold text-[#191919]">{item.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PartnerCtaBand({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <section className="border-y border-line bg-[#191919]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-douyin-sans)] text-2xl font-bold text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/70">{body}</p>
        </div>
        <Link
          href="/about"
          className="inline-flex shrink-0 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-trust-hover"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
