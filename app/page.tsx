import dynamic from "next/dynamic";
import HeroSlider from "@/components/HeroSlider";
import GsapReveal from "@/components/animation/GsapReveal";

const ShowroomCategorySlider = dynamic(() => import("@/components/ShowroomCategorySlider"));
const VehicleTabsShowcase = dynamic(() => import("@/components/VehicleTabsShowcase"));
const PromoBannerCards = dynamic(() => import("@/components/PromoBannerCards"));
const ShowroomVideoBanner = dynamic(() => import("@/components/ShowroomVideoBanner"));
const UtilitiesSection = dynamic(() => import("@/components/UtilitiesSection"));
const AwardsSection = dynamic(() => import("@/components/AwardsSection"));
const NewsSection = dynamic(() => import("@/components/NewsSection"));

export default function HomePage() {
  return (
    <div className="w-full">
      {/* LCP: eager hero only — remaining sections code-split */}
      <HeroSlider />

      <GsapReveal animation="fade-up" duration={0.9}>
        <ShowroomCategorySlider />
      </GsapReveal>

      <GsapReveal animation="fade-up" duration={0.9}>
        <VehicleTabsShowcase />
      </GsapReveal>

      <GsapReveal animation="scale-up" duration={0.9}>
        <PromoBannerCards />
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
        <NewsSection />
      </GsapReveal>
    </div>
  );
}
