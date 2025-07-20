import CarouselHeader from "./CarouselHeader";
import CarouselContainer from "./CarouselContainer";

const ProductScreenshotsSection = () => {
  return (
    <section
      className="bg-neutral-100 px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="screenshots-heading"
    >
      <div className="mx-auto max-w-7xl">
        <CarouselHeader />
        <CarouselContainer />
      </div>
    </section>
  );
};

export default ProductScreenshotsSection;
