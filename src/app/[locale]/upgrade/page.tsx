import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContentGrid, PageHero, PartnerCtaBand } from "@/components/PageShell";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "upgrade" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("title")} · ${meta("siteName")}`,
    description: t("lead"),
  };
}

export default async function UpgradePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("upgrade");
  const tNav = await getTranslations("nav");
  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} lead={t("lead")} />
      <ContentGrid items={sections} />
      <PartnerCtaBand
        title={t("title")}
        body={t("lead")}
        cta={tNav("partnerCta")}
      />
    </>
  );
}
