// server/routes/topics.js
const express = require("express");
const router = express.Router();
const {
  getTopics,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
  getProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
} = require("../controllers/topics");
const { protect } = require("../middleware/auth");

// Topic routes
router.route("/").get(getTopics).post(protect, createTopic);

router
  .route("/:id")
  .get(getTopic)
  .put(protect, updateTopic)
  .delete(protect, deleteTopic);

// Problem routes
router
  .route("/:topicId/problems")
  .get(getProblems)
  .post(protect, createProblem);

router
  .route("/:topicId/problems/:problemId")
  .get(getProblem)
  .put(protect, updateProblem)
  .delete(protect, deleteProblem);

module.exports = router;
