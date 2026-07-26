import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContentGrid, PageHero, PartnerCtaBand } from "@/components/PageShell";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "technology" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("title")} · ${meta("siteName")}`,
    description: t("lead"),
  };
}

export default async function TechnologyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("technology");
  const tNav = await getTranslations("nav");
  const points = t.raw("points") as { title: string; body: string }[];

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} lead={t("lead")} />
      <ContentGrid items={points} />
      <PartnerCtaBand
        title={t("title")}
        body={t("lead")}
        cta={tNav("partnerCta")}
      />
    </>
  );
}
