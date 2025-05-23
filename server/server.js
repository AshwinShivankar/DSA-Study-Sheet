// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const topicRoutes = require("./routes/topicRoutes");
const { createIndexes } = require("./controllers/topicController");

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dsa-study-sheet";
process.env.JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret";

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "DSA Study Sheet API is running",
    mongodbStatus:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    message: "Something broke!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1);
  }
};

startServer();
