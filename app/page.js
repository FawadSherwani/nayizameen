import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import PopularLocations from "@/components/PopularLocations";
import FeaturedProperties from "@/components/FeaturedProperties";
import { QuickLinksStrip, TrustedBy, CtaBanner } from "@/components/ExtraSections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedProjects />
        <FeaturedProperties />
        <QuickLinksStrip />
        <TrustedBy />
        <CtaBanner />
        <PopularLocations />
      </main>
      <Footer />
    </>
  );
}
