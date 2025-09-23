import { Star } from "lucide-react";
import { motion } from "framer-motion";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const TestimonialCard = ({ testimonial }) => {
  // Destructure the testimonial object
  const { customer = {}, review, rating } = testimonial;

  // Generate the number of full stars and empty stars with unique keys
  const fullStars = Array(rating)
    .fill(null)
    .map((_, index) => (
      <Star key={`full-${index}`} className="fill-yellow-500 text-yellow-500" />
    ));
  const emptyStars = Array(5 - rating)
    .fill(null)
    .map((_, index) => (
      <Star key={`empty-${index}`} className="fill-gray-300 text-gray-300" />
    ));

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-main-300/50 dark:from-gray-700/50 dark:to-gray-800/30 dark:border-gray-600/50 dark:hover:border-main-500/50"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center justify-center gap-3 lg:flex-row lg:gap-4">
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={
                  customer.image && customer.image !== "default.png"
                    ? `${VITE_API_URL}/uploads/${customer.image}`
                    : "/default.png"
                }
                alt="Profile"
                className="h-14 w-14 rounded-full object-cover object-center ring-2 ring-main-200 ring-offset-2 transition-all duration-300 group-hover:ring-main-300 lg:h-16 lg:w-16 dark:ring-main-700 dark:ring-offset-gray-800"
              />
              <div className="absolute -bottom-1 -right-1 rounded-full bg-gradient-to-r from-main-500 to-main-600 p-1">
                <Star size={12} className="text-white fill-current" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 lg:items-start">
              <h3 className="text-lg font-bold capitalize text-gray-800 dark:text-gray-50">
                {customer?.name}
              </h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-main-500"></span>
                <span>{customer?.city}</span>
              </p>
            </div>
          </div>
          {/* Star Ratings */}
          <div className="flex items-center space-x-1">
            {[...fullStars, ...emptyStars]}
            <span className="ml-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
              {rating}/5
            </span>
          </div>
        </div>

        {/* Testimonial Text */}
        <div className="relative">
          <div className="absolute left-0 top-0 text-4xl font-serif text-main-300/30 dark:text-main-600/30">
            &ldquo;
          </div>
          <p className="pl-6 text-gray-700 dark:text-gray-200 font-medium leading-relaxed italic">
            {review}
          </p>
          <div className="absolute bottom-0 right-0 text-4xl font-serif text-main-300/30 dark:text-main-600/30 rotate-180">
            &rdquo;
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
