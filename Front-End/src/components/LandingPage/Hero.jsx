import RotatingText from "./RotatingText";

function Hero() {
  return (
    <div
      className="relative flex h-screen items-center justify-center bg-[url('/hero.jpg')] bg-cover bg-center"
      id="hero"
    >
      {/* Clean overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-main-950/80"></div>

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 h-72 w-72 rounded-full bg-main-500/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-main-400/15 blur-2xl"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center text-white">
        {/* Main headline */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl font-light text-gray-100 md:text-4xl lg:text-5xl">
            Connect with
          </h2>

          {/* Rotating text with clean design */}
          <div className="relative">
            <RotatingText
              texts={[
                "Expert Plumbers",
                "Skilled Carpenters",
                "Certified Electricians",
                "Professional Painters",
                "Trusted Handymen",
              ]}
              mainClassName="text-4xl md:text-5xl lg:text-6xl font-bold text-main-400 min-h-[4rem] flex items-center justify-center"
              splitLevelClassName="overflow-hidden"
              elementLevelClassName="inline-block transform-gpu"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              staggerDuration={0.03}
              staggerFrom="center"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
          </div>

          <p className="text-2xl font-light text-gray-200 md:text-3xl">
            in your area
          </p>
        </div>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">
          Professional services delivered with excellence. Find verified
          workers, book appointments instantly, and get quality work done right.
        </p>

        {/* Clean CTA buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group relative overflow-hidden rounded-full bg-main-500 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:bg-main-600 hover:shadow-2xl hover:shadow-main-500/30 focus:outline-none focus:ring-4 focus:ring-main-400/50">
            <a
              href="#about"
              className="flex items-center gap-2 text-inherit no-underline"
            >
              <span>Find Services</span>
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
