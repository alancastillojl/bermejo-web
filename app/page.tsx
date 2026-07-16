import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/home/hero-section";
import { AnnouncementBar } from "@/components/home/announcement-bar";
import { FeaturedDropGrid } from "@/components/home/featured-drop-grid";
import { CommunityDropSection } from "@/components/home/community-drop-section";
import { LoadingScreen } from "@/components/home/loading-screen";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LoadingScreen />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AnnouncementBar />
        <FeaturedDropGrid />
        <CommunityDropSection />
      </main>
      <SiteFooter />
    </div>
  );
}
