import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { CAROUSEL_DATA } from "../../utils/constants";
import CarouselPhoto from "./CarouselPhoto";

const CarouselContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_DATA.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length,
    );
  };

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <>
      <div className="relative">
        {/* Slides */}
        <div className="rounded-2xl overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {CAROUSEL_DATA.map((screenshot, index) => (
              <div
                key={screenshot.id}
                className="flex-shrink-0 w-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${CAROUSEL_DATA.length}: ${screenshot.title}`}
              >
                <div className="grid h-[35rem] items-center gap-8 overflow-hidden border border-gray-200 bg-white px-8 py-12 md:grid-cols-2">
                  <div className="md:order-1 order-2">
                    <CarouselPhoto
                      path={screenshot.path}
                      alt={screenshot.alt}
                    />
                  </div>

                  {/* Description */}
                  <div className="md:order-2 md:w-11/12 order-1 w-full space-y-4">
                    <div className="flex items-center gap-2">
                      <screenshot.icon className="w-6 h-6 pt-1 text-blue-600" />

                      <div className="flex items-center justify-between w-full">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {screenshot.title}
                        </h3>
                        <span className="opacity-60 sm:block hidden mr-2 text-sm">
                          {index + 1} of {CAROUSEL_DATA.length}
                        </span>
                      </div>
                    </div>

                    <p className="text-lg leading-relaxed text-gray-600">
                      {screenshot.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="-left-2 top-1/2 border-zinc-200 bg-neutral-100 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 absolute z-10 px-3 py-2 transition-all duration-200 -translate-y-1/2 border rounded-full shadow-lg"
          aria-label="Previous screenshot"
        >
          <LeftOutlined className="w-4 h-4 text-gray-600" />
        </button>

        <button
          onClick={nextSlide}
          className="-right-2 top-1/2 border-zinc-200 bg-neutral-100 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 absolute z-10 px-3 py-2 transition-all duration-200 -translate-y-1/2 border rounded-full shadow-lg"
          aria-label="Next screenshot"
        >
          <RightOutlined className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {CAROUSEL_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
              currentSlide === index
                ? "w-8 bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}: ${CAROUSEL_DATA[index].title}`}
          />
        ))}
      </div>
    </>
  );
};

export default CarouselContainer;
