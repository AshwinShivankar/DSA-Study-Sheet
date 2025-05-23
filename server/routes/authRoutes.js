const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  verifyToken,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

// Register new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get current user
router.get("/me", auth, getMe);

// Verify token
router.post("/verify-token", verifyToken);

module.exports = router;
