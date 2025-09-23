const express = require("express");
const authController = require("../controllers/authController");
const workerController = require("../controllers/workerController");
const orderRouter = require("./orderRoutes");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

// Auth Stuff
router
  .route("/signup")
  .post(authController.uploadProfilePhoto, authController.signup);

// POST /workers/234fad4/reviews
// GET /workers/234fad4/reviews
// GET /workers/234fad4/reviews/56fd12s

router.use("/:workerId/reviews", reviewRouter);
router.use("/:workerId/orders", orderRouter);

router
  .route("/")
  .get(workerController.getAllWorkers)
  .post(workerController.createWorker);

router
  .route("/:id")
  .get(workerController.getWorker)
  .delete(workerController.deleteWorker);

router.use(authController.protect);

router.post(
  "/update-profile-photo",
  authController.uploadProfilePhoto,
  authController.updateProfilePhoto
);

module.exports = router;
