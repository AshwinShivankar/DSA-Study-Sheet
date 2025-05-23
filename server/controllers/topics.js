// server/controllers/topics.js
const Topic = require("../models/Topic");

// @desc    Get all topics
// @route   GET /api/topics
// @access  Public
exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().select("title description");
    res.json(topics);
  } catch (error) {
    console.error("Get topics error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get single topic
// @route   GET /api/topics/:id
// @access  Public
exports.getTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    res.json(topic);
  } catch (error) {
    console.error("Get topic error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Create new topic
// @route   POST /api/topics
// @access  Private
exports.createTopic = async (req, res) => {
  try {
    const { title, description } = req.body;

    const topic = await Topic.create({
      title,
      description,
    });

    res.status(201).json(topic);
  } catch (error) {
    console.error("Create topic error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update topic
// @route   PUT /api/topics/:id
// @access  Private
exports.updateTopic = async (req, res) => {
  try {
    const { title, description } = req.body;

    let topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    topic = await Topic.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    res.json(topic);
  } catch (error) {
    console.error("Update topic error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Delete topic
// @route   DELETE /api/topics/:id
// @access  Private
exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    await topic.remove();

    res.json({ success: true });
  } catch (error) {
    console.error("Delete topic error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get all problems for a topic
// @route   GET /api/topics/:topicId/problems
// @access  Public
exports.getProblems = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    res.json(topic.problems);
  } catch (error) {
    console.error("Get problems error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get single problem
// @route   GET /api/topics/:topicId/problems/:problemId
// @access  Public
exports.getProblem = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    const problem = topic.problems.id(req.params.problemId);

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    res.json(problem);
  } catch (error) {
    console.error("Get problem error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Add problem to topic
// @route   POST /api/topics/:topicId/problems
// @access  Private
exports.createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      youtubeLink,
      leetcodeLink,
      codeforcesLink,
      articleLink,
    } = req.body;

    const topic = await Topic.findById(req.params.topicId);

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    topic.problems.push({
      title,
      description,
      difficulty,
      youtubeLink,
      leetcodeLink,
      codeforcesLink,
      articleLink,
    });

    await topic.save();

    res.status(201).json(topic.problems[topic.problems.length - 1]);
  } catch (error) {
    console.error("Create problem error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Update problem
// @route   PUT /api/topics/:topicId/problems/:problemId
// @access  Private
exports.updateProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      youtubeLink,
      leetcodeLink,
      codeforcesLink,
      articleLink,
    } = req.body;

    const topic = await Topic.findById(req.params.topicId);

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    const problem = topic.problems.id(req.params.problemId);

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    problem.title = title || problem.title;
    problem.description = description || problem.description;
    problem.difficulty = difficulty || problem.difficulty;
    problem.youtubeLink = youtubeLink || problem.youtubeLink;
    problem.leetcodeLink = leetcodeLink || problem.leetcodeLink;
    problem.codeforcesLink = codeforcesLink || problem.codeforcesLink;
    problem.articleLink = articleLink || problem.articleLink;

    await topic.save();

    res.json(problem);
  } catch (error) {
    console.error("Update problem error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Delete problem
// @route   DELETE /api/topics/:topicId/problems/:problemId
// @access  Private
exports.deleteProblem = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    const problemIndex = topic.problems.findIndex(
      (p) => p._id.toString() === req.params.problemId
    );

    if (problemIndex === -1) {
      return res.status(404).json({ error: "Problem not found" });
    }

    topic.problems.splice(problemIndex, 1);

    await topic.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Delete problem error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
