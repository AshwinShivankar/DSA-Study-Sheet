const Topic = require("../models/Topic");
const User = require("../models/User");

// Get all topics with user's progress
const getTopics = async (req, res) => {
  try {
    // Check MongoDB connection
    if (!Topic.db.readyState) {
      console.error("MongoDB not connected when fetching topics");
      return res
        .status(503)
        .json({ message: "Database connection unavailable" });
    }

    const topics = await Topic.find().sort({ order: 1 });

    if (!topics || topics.length === 0) {
      // If no topics exist, create default topics
      const defaultTopics = [
        {
          title: "Data Structures",
          description: "Fundamental data structures in computer science",
          order: 1,
          subTopics: [
            {
              title: "Arrays",
              description: "Basic array operations and algorithms",
              difficulty: "Easy",
              resources: {
                youtubeLinks: [
                  { title: "Array Basics", url: "https://youtube.com/..." },
                ],
                leetcodeLinks: [
                  {
                    title: "Two Sum",
                    url: "https://leetcode.com/problems/two-sum",
                  },
                ],
                articles: [
                  {
                    title: "Array Introduction",
                    url: "https://example.com/arrays",
                  },
                ],
              },
            },
          ],
        },
      ];

      await Topic.insertMany(defaultTopics);
      console.log("Created default topics");
      topics = await Topic.find().sort({ order: 1 });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Map topics to include user's progress
    const topicsWithProgress = topics.map((topic) => {
      const topicObj = topic.toObject();
      topicObj.subTopics = topic.subTopics.map((subTopic) => {
        const progress = user.progress.find(
          (p) =>
            p.topicId.equals(topic._id) && p.subTopicId.equals(subTopic._id)
        );
        return {
          ...subTopic.toObject(),
          isCompleted: progress ? progress.completed : false,
        };
      });
      return topicObj;
    });

    res.json(topicsWithProgress);
  } catch (error) {
    console.error("Get topics error:", error);
    res.status(500).json({
      message: "Failed to fetch topics",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update topic progress
const updateProgress = async (req, res) => {
  try {
    const { topicId, subTopicId, completed } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!topicId || !subTopicId) {
      return res
        .status(400)
        .json({ message: "Topic ID and SubTopic ID are required" });
    }

    // Check if topic exists
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Check if subtopic exists
    const subTopic = topic.subTopics.id(subTopicId);
    if (!subTopic) {
      return res.status(404).json({ message: "SubTopic not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const progressIndex = user.progress.findIndex(
      (p) => p.topicId.equals(topicId) && p.subTopicId.equals(subTopicId)
    );

    if (progressIndex > -1) {
      user.progress[progressIndex].completed = completed;
    } else {
      user.progress.push({
        topicId,
        subTopicId,
        completed,
      });
    }

    await user.save();
    res.json({ message: "Progress updated successfully" });
  } catch (error) {
    console.error("Update progress error:", error);
    res.status(500).json({
      message: "Failed to update progress",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Create indexes for better performance
const createIndexes = async () => {
  try {
    // Drop existing indexes first
    await Topic.collection.dropIndexes();
    console.log("Dropped existing indexes");

    // Create new indexes with specific names and options
    await Topic.collection.createIndex(
      { order: 1 },
      { name: "topic_order_index", background: true }
    );
    await Topic.collection.createIndex(
      { title: 1 },
      { name: "topic_title_unique_index", unique: true, background: true }
    );
    console.log("Topic indexes created successfully");
  } catch (error) {
    // If error is about index already existing, we can ignore it
    if (error.code === 86) {
      console.log("Indexes already exist, skipping creation");
      return;
    }
    console.error("Error creating topic indexes:", error);
    // Don't throw the error, just log it
    // This allows the server to start even if index creation fails
  }
};

module.exports = {
  getTopics,
  updateProgress,
  createIndexes,
};
