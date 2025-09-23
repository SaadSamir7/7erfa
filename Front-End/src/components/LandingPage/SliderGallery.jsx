import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    url: "/categories/1.jpg",
    title: "Mechanical",
    description: "Expert mechanical repair and maintenance services",
  },
  {
    url: "/categories/2.jpg",
    title: "Electrical",
    description: "Professional electrical installation and repair",
  },
  {
    url: "/categories/3.jpg",
    title: "Carpentry",
    description: "Custom woodwork and furniture craftsmanship",
  },
  {
    url: "/categories/4.jpg",
    title: "Painting",
    description: "Interior and exterior painting services",
  },
  {
    url: "/categories/5.jpg",
    title: "Plumber",
    description: "Plumbing installation and emergency repairs",
  },
  {
    url: "/categories/6.jpg",
    title: "Construction Worker",
    description: "General construction and building services",
  },
];

const SliderGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Navigate to the next slide
  const nextSlide = () => {
    setCurrentIndex((nextIndex) =>
      nextIndex === images.length - 1 ? 0 : nextIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex) =>
        currentIndex === images.length - 1 ? 0 : currentIndex + 1
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="relative mx-auto my-20 w-full max-w-[1400px] overflow-hidden px-4 lg:my-32"
      id="categories"
    >
      {/* Enhanced Title Section */}
      <div className="text-center mb-8">
        <h2 className="mb-4 bg-gradient-to-r from-main-500 to-main-600 bg-clip-text text-center font-brand text-3xl uppercase tracking-wide text-main-500 md:text-5xl lg:mb-16">
          Categories
        </h2>
        <div className="mx-auto h-1 w-32 bg-gradient-to-r from-main-600 to-main-500 rounded-full mb-4"></div>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Explore our diverse range of professional services
        </p>
      </div>

      {/* Enhanced Slider Container */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white">
        <Slider images={images} currentIndex={currentIndex} />

        {/* Enhanced Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 flex w-full items-center justify-between px-6">
          <button
            onClick={prevSlide}
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:shadow-xl"
          >
            <ChevronLeft
              size={24}
              className="transition-transform group-hover:-translate-x-0.5"
            />
          </button>
          <button
            onClick={nextSlide}
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:shadow-xl"
          >
            <ChevronRight
              size={24}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>

        {/* Enhanced Dots Navigation */}
        <Dots
          images={images}
          currentIndex={currentIndex}
          goToSlide={goToSlide}
        />
      </div>
    </div>
  );
};

export default SliderGallery;

function Slider({ images, currentIndex }) {
  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={image.url}
              alt={`${image.title} services`}
              className="h-full w-full object-cover"
            />
            {/* Enhanced Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-main-600/30 to-transparent"></div>

            {/* Enhanced Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
              <div className="max-w-2xl">
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-main-300 md:text-base">
                  Professional Service
                </p>
                <h3 className="mb-4 text-3xl font-bold tracking-wide text-white md:text-4xl lg:text-5xl">
                  {image.title}
                </h3>
                <p className="text-base text-white/90 md:text-lg leading-relaxed">
                  {image.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Dots({ images, currentIndex, goToSlide }) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
      {images.map((_, index) => (
        <button
          key={index}
          className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
            index === currentIndex
              ? "bg-white border-white scale-125"
              : "bg-white/30 border-white/50 hover:bg-white/50 hover:scale-110"
          }`}
          onClick={() => goToSlide(index)}
        />
      ))}
    </div>
  );
}
