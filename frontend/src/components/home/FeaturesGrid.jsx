import { FEATURES } from "../../utils/constants";
import { getColorClasses } from "../../utils/helpers";
import FeatureCard from "./FeatureCard";

const FeaturesGrid = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((feature) => (
        <FeatureCard
          key={feature.title}
          feature={feature}
          IconComponent={feature.icon}
          colors={getColorClasses(feature.color)}
        />
      ))}
    </div>
  );
};

export default FeaturesGrid;
