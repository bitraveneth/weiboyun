import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageShell";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("title")} · ${meta("siteName")}`,
    description: t("lead"),
  };
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} lead={t("lead")} />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <article>
          <h2 className="text-2xl font-semibold text-ink">
            {t("agreementTitle")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            {t("agreementBody")}
          </p>
        </article>
        <article id="privacy" className="mt-12 scroll-mt-28">
          <h2 className="text-2xl font-semibold text-ink">
            {t("privacyTitle")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            {t("privacyBody")}
          </p>
        </article>
      </section>
    </>
  );
}
