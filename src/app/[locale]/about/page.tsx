import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { WhoWeAreSection } from "@/components/home/WhoWeAreSection";
import { PageHero, PartnerCtaBand } from "@/components/PageShell";
import { company } from "@/config/company";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  return {
    title: `${t("title")} · ${meta("siteName")}`,
    description: t("lead"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tHome = await getTranslations("home");
  const tNav = await getTranslations("nav");
  const tFooter = await getTranslations("footer");
  const currentLocale = await getLocale();
  const milestones = tHome.raw("whoMilestones") as {
    year: string;
    title: string;
    points: string[];
  }[];
  const address =
    currentLocale === "en" ? company.addressEn : company.addressZh;

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} lead={t("lead")} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-douyin-sans)] text-3xl font-bold text-ink">
          {t("missionTitle")}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-muted">
          {t("missionBody")}
        </p>
      </section>

      <WhoWeAreSection
        title={tHome("whoTitle")}
        lead={tHome("whoLead")}
        eyebrow={tHome("whoEyebrow")}
        milestoneLabel={tHome("whoMilestoneLabel")}
        milestones={milestones}
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-xl border-t border-line pt-8">
          <h3 className="text-lg font-semibold text-ink">{t("ctaTitle")}</h3>
          <p className="mt-2 text-ink-muted">{t("ctaBody")}</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>
              {tFooter("phone")}：{company.phone}
            </li>
            <li>
              {tFooter("email")}：{company.email}
            </li>
            <li>
              {tFooter("address")}：{address}
            </li>
          </ul>
        </div>
      </section>

      <PartnerCtaBand
        title={t("ctaTitle")}
        body={t("ctaBody")}
        cta={tNav("partnerCta")}
      />
    </>
  );
}
