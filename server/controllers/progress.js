// server/controllers/progress.js
const Progress = require("../models/Progress");
const Topic = require("../models/Topic");

// @desc    Get all progress for logged in user
// @route   GET /api/progress
// @access  Private
exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id });
    res.json(progress);
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get progress for a specific topic
// @route   GET /api/progress/topic/:topicId
// @access  Private
exports.getProgressByTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    // Get problem IDs for this topic
    const problemIds = topic.problems.map((problem) => problem._id);

    // Find progress records for these problems
    const progress = await Progress.find({
      user: req.user._id,
      problem: { $in: problemIds },
    });

    res.json(progress);
  } catch (error) {
    console.error("Get topic progress error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update progress for a problem
// @route   PUT /api/progress/:problemId
// @access  Private
exports.updateProgress = async (req, res) => {
  try {
    const { isCompleted, notes } = req.body;

    // Check if progress already exists
    let progress = await Progress.findOne({
      user: req.user._id,
      problem: req.params.problemId,
    });

    if (progress) {
      // Update existing progress
      progress.isCompleted =
        isCompleted !== undefined ? isCompleted : progress.isCompleted;
      progress.notes = notes !== undefined ? notes : progress.notes;

      // Set completion date if completed
      if (isCompleted && !progress.completedAt) {
        progress.completedAt = Date.now();
      } else if (!isCompleted) {
        progress.completedAt = null;
      }

      await progress.save();
    } else {
      // Create new progress
      progress = await Progress.create({
        user: req.user._id,
        problem: req.params.problemId,
        isCompleted: isCompleted || false,
        completedAt: isCompleted ? Date.now() : null,
        notes: notes || "",
      });
    }

    res.json(progress);
  } catch (error) {
    console.error("Update progress error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
