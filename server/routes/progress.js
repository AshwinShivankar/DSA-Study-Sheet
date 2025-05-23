// server/routes/progress.js
const express = require("express");
const router = express.Router();
const {
  getUserProgress,
  updateProgress,
  getProgressByTopic,
} = require("../controllers/progress");
const { protect } = require("../middleware/auth");

// Routes
router.use(protect); // All progress routes are protected

router.route("/").get(getUserProgress);

router.route("/topic/:topicId").get(getProgressByTopic);

router.route("/:problemId").put(updateProgress);

module.exports = router;
