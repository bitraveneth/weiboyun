import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  HomeCapabilities,
  HomeCompare,
  HomeFreeServices,
  HomeHero,
  HomeModels,
  HomePlatform,
  HomeStats,
  HomeWhoWeAre,
} from "@/components/home/HomeSections";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("defaultTitle"),
    description: t("defaultDescription"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <HomeStats />
      <HomeFreeServices />
      <HomeModels />
      <HomePlatform />
      <HomeCompare />
      <HomeCapabilities />
      <HomeWhoWeAre />
    </>
  );
}
