import { getTranslations } from "next-intl/server";
import { PartnerCtaBand } from "@/components/PageShell";
import { CompareSection } from "./CompareSection";
import { FreeServicesSection } from "./FreeServicesSection";
import { HeroBackground } from "./HeroBackground";
import { ModelsSection } from "./ModelsSection";
import { PartnersSection } from "./PartnersSection";
import { PlatformBloomSection } from "./PlatformBloomSection";
import { StatsSection } from "./StatsSection";
import { WhoWeAreSection } from "./WhoWeAreSection";

export async function HomeHero() {
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");
  const trust = t.raw("heroTrust") as string[];

  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="relative mx-auto w-full max-w-[110rem] px-0 pb-0 pt-0 sm:px-6 sm:pb-3 sm:pt-[5.25rem] lg:px-8 lg:pb-4 lg:pt-24">
        <HeroBackground
          badge={t("heroBadge")}
          headlineBefore={t("heroHeadlineBefore")}
          headlineHighlight={t("heroHeadlineHighlight")}
          headlineAfter={t("heroHeadlineAfter")}
          support={t("heroSupport")}
          primaryHref="/about"
          primaryLabel={tNav("partnerCta")}
          secondaryHref="/products"
          secondaryLabel={tNav("learnMore")}
          trust={trust}
        />
      </div>
    </section>
  );
}

export async function HomeStats() {
  const t = await getTranslations("home");
  const keys = ["years", "rd", "menus", "features"] as const;
  const stats = t.raw("stats") as Record<
    (typeof keys)[number],
    { value: number; suffix: string; label: string; bar: number }
  >;
  const items = keys.map((key) => stats[key]);

  return (
    <StatsSection
      year={t("statsYear")}
      title={t("statsTitle")}
      items={items}
    />
  );
}

export async function HomeFreeServices() {
  const t = await getTranslations("home");
  const data = t.raw("freeServices") as {
    titleBefore: string;
    cards: {
      badge: string;
      image: string;
      imageAlt: string;
      points: string[];
    }[];
  };

  return (
    <FreeServicesSection titleBefore={data.titleBefore} cards={data.cards} />
  );
}

export async function HomeModels() {
  const t = await getTranslations("home");
  const models = t.raw("models") as { title: string; body: string }[];

  return (
    <ModelsSection
      title={t("modelsTitle")}
      body={t("modelsBody")}
      models={models}
    />
  );
}

export async function HomePlatform() {
  const t = await getTranslations("home");
  const cards = t.raw("partnerAudiences") as {
    title: string;
    body: string;
    image: string;
    imageAlt: string;
    theme: "amber" | "violet" | "mint" | "sky";
  }[];

  return (
    <PartnersSection
      title={t("partnersTitle")}
      subtitle={t("partnersSubtitle")}
      lead={t("partnersLead")}
      cards={cards}
    />
  );
}

export async function HomeCompare() {
  const t = await getTranslations("home");
  const rows = t.raw("compareRows") as {
    label: string;
    ours: string;
    theirs: string;
  }[];

  return (
    <CompareSection
      titleBefore={t("compareTitleBefore")}
      titleAfter={t("compareTitleAfter")}
      lead={t("compareLead")}
      eyebrow={t("compareEyebrow")}
      oursLabel={t("compareOursLabel")}
      theirsLabel={t("compareTheirsLabel")}
      badge={t("compareBadge")}
      rows={rows}
    />
  );
}

export async function HomeCapabilities() {
  const t = await getTranslations("home");
  const cards = t.raw("platformBloomCards") as {
    title: string;
    badge: string;
    body: string;
    image?: string;
    imageAlt?: string;
    theme:
      | "mint"
      | "amber"
      | "violet"
      | "sky"
      | "peach"
      | "rose"
      | "lime"
      | "indigo";
  }[];

  return (
    <PlatformBloomSection
      title={t("platformBloomTitle")}
      lead={t("platformBloomLead")}
      cards={cards}
    />
  );
}

export async function HomeWhoWeAre() {
  const t = await getTranslations("home");
  const milestones = t.raw("whoMilestones") as {
    year: string;
    title: string;
    points: string[];
  }[];

  return (
    <WhoWeAreSection
      title={t("whoTitle")}
      lead={t("whoLead")}
      eyebrow={t("whoEyebrow")}
      milestoneLabel={t("whoMilestoneLabel")}
      milestones={milestones}
    />
  );
}

export async function HomeCta() {
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  return (
    <PartnerCtaBand
      title={t("ctaTitle")}
      body={t("ctaBody")}
      cta={tNav("partnerCta")}
    />
  );
}
