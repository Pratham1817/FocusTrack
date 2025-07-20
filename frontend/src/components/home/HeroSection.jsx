import HeroText from "./HeroText";

const HeroSection = () => {
  return (
    <section
      className="bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between md:flex-row md:gap-8">
          <HeroText />
          <div className="hidden w-full md:block md:h-full md:w-1/2 lg:w-3/4">
            <img
              src="/task-calendar.png"
              alt="TaskFlow Calendar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
