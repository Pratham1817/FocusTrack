import CTAFooterSection from "../components/home/CTAFooterSection";
import HeroSection from "../components/home/HeroSection";
import HomeNavbar from "../components/home/HomeNavbar";
import KeyFeaturesSection from "../components/home/KeyFeaturesSection";
import ProductScreenshotsSection from "../components/home/ProductScreenshotsSection";
import HomeFooter from "../components/home/HomeFooter";

const HomePage = () => {
  return (
    <main className="h-dvh w-dvw overflow-x-hidden">
      <HomeNavbar />
      <HeroSection />
      <KeyFeaturesSection />
      <ProductScreenshotsSection />
      <CTAFooterSection />
      <HomeFooter />
    </main>
  );
};

export default HomePage;
