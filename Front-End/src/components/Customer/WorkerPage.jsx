import { useLocation, useParams } from "react-router-dom";
import { decrypt } from "../../utils/cryptoUtils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TestimonialCard from "../../ui/TestimonialCard";
import Modal from "../../ui/Modal";
import FullPageLoader from "../../ui/FullPageLoader";
import Error from "../../ui/Error";
import {
  CalendarArrowUp,
  Star,
  MapPin,
  Mail,
  Phone,
  DollarSign,
  Clock,
  Award,
  User,
} from "lucide-react";
import { useWorkers } from "../Worker/useWorkers";
import { useUser } from "../auth/useUser";
import { useReviews } from "../Worker/useReviews";
import { useCreateOrder } from "./useCreateOrder";
import { useCreateReview } from "./useCreateReview";
import { useUpdateReview } from "./useUpdateReview";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const WorkerPage = () => {
  const { workerId } = useParams();
  const { user } = useUser();
  const { workers, isPending: isLoadingWorkers } = useWorkers();
  const decryptedWorkerId = decrypt(decodeURIComponent(workerId));
  const { reviews, isPending: isLoadingReviews } =
    useReviews(decryptedWorkerId);
  const { createOrder, isCreating: isCreatingOrder } = useCreateOrder();
  const { createNewReview, isCreating: isCreatingReview } = useCreateReview();
  const { updateReview, isUpdating: isUpdatingReview } = useUpdateReview();

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [orderTitle, setOrderTitle] = useState("");
  const [orderDetails, setOrderDetails] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const location = useLocation();

  const myReview = reviews.find((review) => review.customer._id === user._id);

  useEffect(() => {
    if (myReview) {
      setRating(myReview.rating);
      setReviewText(myReview.review);
    }
  }, [myReview]);

  useEffect(() => {
    if (location.state?.openReview) {
      setIsReviewModalOpen(true);
      window.history.replaceState({ ...location.state, openReview: false }, "");
    }
  }, [location.state]);

  // Show loading state while workers or reviews are being fetched
  if (isLoadingWorkers || isLoadingReviews) {
    return <FullPageLoader />;
  }

  // Check if workers data exists and has the expected structure
  if (!workers || !workers.data || !workers.data.data) {
    return <Error message="No workers data available" />;
  }

  const worker = workers.data.data.find(
    (worker) => worker._id === decryptedWorkerId
  );

  if (!worker) {
    return <Error message="Worker not found 🚫" />;
  }

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      service: orderTitle,
      details: orderDetails,
    };

    createOrder(
      { orderData, workerId: decryptedWorkerId },
      {
        onSuccess: () => {
          setOrderTitle("");
          setOrderDetails("");
          setIsOrderModalOpen(false);
        },
      }
    );
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewData = { review: reviewText, rating };

    if (myReview) {
      updateReview(
        {
          workerId: decryptedWorkerId,
          reviewData,
          reviewId: myReview._id,
        },
        {
          onSuccess: () => {
            setIsReviewModalOpen(false);
          },
        }
      );
    } else {
      createNewReview(
        { workerId: decryptedWorkerId, reviewData },
        {
          onSuccess: () => {
            setIsReviewModalOpen(false);
          },
        }
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20 p-4 lg:p-8"
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-2xl bg-white/70 backdrop-blur-sm p-8 shadow-lg border border-white/20 dark:bg-gray-800/70 dark:border-gray-700/50"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  className="h-24 w-24 lg:h-32 lg:w-32 rounded-full border-4 border-white shadow-xl object-cover dark:border-gray-700"
                  src={
                    worker.image && worker.image !== "default.png"
                      ? `${VITE_API_URL}/uploads/${worker.image}?t=${worker?.imageUpdatedAt || Date.now()}`
                      : "/default.png"
                  }
                  alt={worker.name}
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-main-500 to-main-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {worker.ratingsAverage} ⭐
                </div>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-50 mb-2">
                  Hi I&apos;m {worker.name} 👋
                </h1>
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-main-50 to-main-100 text-main-700 font-medium border border-main-200 dark:from-main-900/30 dark:to-main-800/30 dark:text-main-400 dark:border-main-700">
                    <Award size={16} />
                    {worker.skill}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 text-green-700 font-medium border border-green-200 dark:from-green-900/30 dark:to-green-800/30 dark:text-green-400 dark:border-green-700">
                    <Clock size={16} />
                    {worker.yearsOfExperience} Years
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin size={16} />
                  <span>{worker.city}</span>
                  <span className="mx-2">•</span>
                  <DollarSign size={16} />
                  <span>${worker.hourlyRate}/hour</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-white font-semibold shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setIsOrderModalOpen(true)}
                disabled={isCreatingOrder}
              >
                <CalendarArrowUp size={20} />
                {isCreatingOrder ? "Creating..." : "Make Order"}
              </button>
              <button
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 text-white font-semibold shadow-lg transition-all duration-200 hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setIsReviewModalOpen(true)}
                disabled={isCreatingReview || isUpdatingReview}
              >
                <Star size={20} />
                {isCreatingReview || isUpdatingReview
                  ? "Processing..."
                  : myReview
                    ? "Edit Review"
                    : "Write Review"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Worker Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl bg-white/70 backdrop-blur-sm p-6 shadow-lg border border-white/20 dark:bg-gray-800/70 dark:border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-gradient-to-r from-main-500 to-main-600 p-2">
                <User size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-50">
                Personal Information
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <MapPin size={18} className="text-main-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    City
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {worker.city}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <Mail size={18} className="text-main-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {worker.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <Phone size={18} className="text-main-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {worker.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Professional Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-2xl bg-white/70 backdrop-blur-sm p-6 shadow-lg border border-white/20 dark:bg-gray-800/70 dark:border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-2">
                <Award size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-50">
                Professional Details
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <Clock size={18} className="text-green-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Experience
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {worker.yearsOfExperience} Years
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <DollarSign size={18} className="text-green-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hourly Rate
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    ${worker.hourlyRate}/hour
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <Star size={18} className="text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Rating
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {worker.ratingsAverage} ⭐
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-2xl bg-white/70 backdrop-blur-sm p-6 shadow-lg border border-white/20 dark:bg-gray-800/70 dark:border-gray-700/50"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-50 mb-4">
            About {worker.name}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {worker.bio}
          </p>
        </motion.div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <TestimonialList reviews={reviews} />
          </motion.div>
        )}
      </div>

      {/* Order Modal */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        title="Create Order"
        size="md"
      >
        <form onSubmit={handleOrderSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="orderTitle"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Problem Title
            </label>
            <input
              type="text"
              id="orderTitle"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
              placeholder="Enter the title of the problem"
              value={orderTitle}
              onChange={(e) => setOrderTitle(e.target.value)}
              required
              disabled={isCreatingOrder}
            />
          </div>

          <div>
            <label
              htmlFor="orderDetails"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Details
            </label>
            <textarea
              id="orderDetails"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors resize-none"
              placeholder="Provide more details about the problem"
              value={orderDetails}
              onChange={(e) => setOrderDetails(e.target.value)}
              required
              disabled={isCreatingOrder}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isCreatingOrder}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreatingOrder ? "Creating Order..." : "Create Order"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOrderTitle("");
                setOrderDetails("");
                setIsOrderModalOpen(false);
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              disabled={isCreatingOrder}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title={myReview ? "Edit Review" : "Write a Review"}
        size="md"
      >
        <form onSubmit={handleReviewSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="reviewText"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Your Review
            </label>
            <textarea
              id="reviewText"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors resize-none"
              placeholder="Share your experience working with this professional"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              disabled={isCreatingReview || isUpdatingReview}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  disabled={isCreatingReview || isUpdatingReview}
                  className={`p-1 rounded-full transition-all duration-200 hover:scale-110 ${
                    isCreatingReview || isUpdatingReview
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      rating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200 hover:fill-yellow-200 hover:text-yellow-200"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Click on a star to rate (1-5 stars)
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isCreatingReview || isUpdatingReview || rating === 0}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreatingReview || isUpdatingReview
                ? myReview
                  ? "Updating..."
                  : "Submitting..."
                : myReview
                  ? "Update Review"
                  : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              disabled={isCreatingReview || isUpdatingReview}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

const TestimonialList = ({ reviews }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-white/70 backdrop-blur-sm p-8 shadow-lg border border-white/20 dark:bg-gray-800/70 dark:border-gray-700/50"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 p-2">
            <Star size={20} className="text-white fill-current" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
            Latest Reviews
          </h2>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {reviews.slice(0, 4).map((testimonial, index) => (
          <motion.div
            key={testimonial._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <TestimonialCard testimonial={testimonial} />
          </motion.div>
        ))}
      </div>
      {reviews.length > 4 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing 4 of {reviews.length} reviews
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default WorkerPage;
