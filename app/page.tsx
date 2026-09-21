import dynamic from "next/dynamic";
import HeroSlider from "@/components/HeroSlider";
import GsapReveal from "@/components/animation/GsapReveal";
import { getVehicles, getShowrooms, getPosts, getBanners, getUsedCars } from "@/lib/directus";

const ShowroomCategorySlider = dynamic(() => import("@/components/ShowroomCategorySlider"));
const VehicleTabsShowcase = dynamic(() => import("@/components/VehicleTabsShowcase"));
const PromoBannerCards = dynamic(() => import("@/components/PromoBannerCards"));
const ShowroomVideoBanner = dynamic(() => import("@/components/ShowroomVideoBanner"));
const UtilitiesSection = dynamic(() => import("@/components/UtilitiesSection"));
const AwardsSection = dynamic(() => import("@/components/AwardsSection"));
const NewsSection = dynamic(() => import("@/components/NewsSection"));

export default async function HomePage() {
  const [vehicles, showrooms, posts, heroBanners, promoBanners, serviceBanners, usedCars] = await Promise.all([
    getVehicles(),
    getShowrooms(),
    getPosts(),
    getBanners("hero"),
    getBanners("promo"),
    getBanners("service"),
    getUsedCars(),
  ]);

  return (
    <div className="w-full">
      {/* LCP: eager hero only — remaining sections code-split */}
      <HeroSlider banners={heroBanners} />

      <GsapReveal animation="fade-up" duration={0.9}>
        <ShowroomCategorySlider showrooms={showrooms} />
      </GsapReveal>

      <GsapReveal animation="fade-up" duration={0.9}>
        <VehicleTabsShowcase vehicles={vehicles} usedCars={usedCars} />
      </GsapReveal>

      <GsapReveal animation="scale-up" duration={0.9}>
        <PromoBannerCards promoBanner={promoBanners[0]} serviceBanner={serviceBanners[0]} />
      </GsapReveal>

      <GsapReveal animation="fade-in" duration={1}>
        <ShowroomVideoBanner />
      </GsapReveal>

      <GsapReveal animation="fade-up" duration={0.9}>
        <UtilitiesSection />
      </GsapReveal>

      <GsapReveal animation="fade-up" duration={0.9}>
        <AwardsSection />
      </GsapReveal>

      <GsapReveal animation="fade-up" duration={0.9}>
        <NewsSection posts={posts} />
      </GsapReveal>
    </div>
  );
}
