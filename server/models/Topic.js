const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  subTopics: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true
    },
    resources: {
      youtubeLinks: [{
        title: String,
        url: String
      }],
      leetcodeLinks: [{
        title: String,
        url: String
      }],
      articles: [{
        title: String,
        url: String
      }]
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define indexes with unique names and options
topicSchema.index({ order: 1 }, { name: 'topic_order_index' });
topicSchema.index({ title: 1 }, { 
  name: 'topic_title_unique_index',
  unique: true,
  background: true
});

module.exports = mongoose.model('Topic', topicSchema);
