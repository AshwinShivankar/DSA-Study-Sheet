// server/models/Progress.js
const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
  notes: {
    type: String,
  },
});

// Compound index to ensure a user can only have one progress entry per problem
ProgressSchema.index({ user: 1, problem: 1 }, { unique: true });

module.exports = mongoose.model("Progress", ProgressSchema);
