import CTAButtons from "./CTAButtons";
import CTABenefitsList from "./CTABenefitsList";
import CTAHeader from "./CTAHeader";

const CTAFooterSection = () => {
  return (
    <section
      className="px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="space-y-8 text-center">
          <CTAHeader />
          <CTABenefitsList />
          <CTAButtons />
          <p id="cta-description" className="text-sm opacity-50">
            Start your free account now • No commitment required
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTAFooterSection;
