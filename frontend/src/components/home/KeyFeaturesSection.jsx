import FeatureHeader from "./FeatureHeader";
import FeaturesGrid from "./FeaturesGrid";

const KeyFeaturesSection = () => {
  return (
    <section
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl">
        <FeatureHeader />
        <FeaturesGrid />
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
