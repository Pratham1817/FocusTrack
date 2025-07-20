const CarouselPhoto = ({ path, alt }) => (
  <div className="flex flex-col items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-neutral-100 to-blue-200 shadow-lg">
    {/* Decorative elements */}
    <div className="relative h-6 w-full">
      <span className="absolute left-4 top-1.5 h-3 w-3 rounded-full bg-red-400"></span>
      <span className="absolute left-9 top-1.5 h-3 w-3 rounded-full bg-yellow-400"></span>
      <span className="absolute left-14 top-1.5 h-3 w-3 rounded-full bg-green-400"></span>
    </div>

    <div>
      <img
        src={path}
        alt={alt}
        className="object-covser h-[calc(100%-1.5rem)]"
      />
    </div>
  </div>
);

export default CarouselPhoto;
