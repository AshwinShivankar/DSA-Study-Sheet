const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTopics, updateProgress } = require('../controllers/topicController');

// Get all topics with user's progress
router.get('/', auth, getTopics);

// Update topic progress
router.post('/progress', auth, updateProgress);

module.exports = router; 