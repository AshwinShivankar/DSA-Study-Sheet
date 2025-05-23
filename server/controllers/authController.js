const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

// Generate JWT Token
const generateToken = (userId) => {
  console.log('Generating token for userId:', userId);
  const token = jwt.sign(
    { userId },
    config.JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
  console.log('Generated token:', token);
  return token;
};

// Register new user
exports.register = async (req, res) => {
  try {
    console.log('Register attempt:', { username: req.body.username });
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      console.log('Registration failed: Missing credentials');
      return res.status(400).json({
        message: 'Please provide username and password',
        error: 'MISSING_CREDENTIALS'
      });
    }

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      console.log('Registration failed: Username exists:', username);
      return res.status(400).json({
        message: 'Username already exists',
        error: 'USERNAME_EXISTS'
      });
    }

    // Create new user
    user = new User({
      username,
      password, // Password will be hashed by the User model pre-save middleware
    });

    await user.save();
    console.log('User created successfully:', { id: user._id, username: user.username });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Server error during registration',
      error: 'REGISTRATION_ERROR'
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    console.log('Login attempt:', { username: req.body.username });
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      console.log('Login failed: Missing credentials');
      return res.status(400).json({
        message: 'Please provide username and password',
        error: 'MISSING_CREDENTIALS'
      });
    }

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Login failed: User not found:', username);
      return res.status(400).json({
        message: 'Invalid credentials',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Login failed: Invalid password for user:', username);
      return res.status(400).json({
        message: 'Invalid credentials',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // Generate token
    const token = generateToken(user._id);
    console.log('Login successful:', { id: user._id, username: user.username });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Server error during login',
      error: 'LOGIN_ERROR'
    });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    console.log('Get user profile attempt for userId:', req.user.userId);
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      console.log('Get profile failed: User not found:', req.user.userId);
      return res.status(404).json({
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    // Generate new token to extend session
    const token = generateToken(user._id);
    console.log('Profile retrieved successfully for:', user.username);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        progress: user.progress
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      message: 'Server error while fetching user data',
      error: 'USER_FETCH_ERROR'
    });
  }
};

// Verify token
exports.verifyToken = async (req, res) => {
  try {
    console.log('Token verification attempt - Headers:', req.headers);
    const authHeader = req.header('Authorization');
    console.log('Token verification - Authorization header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Token verification failed: Invalid header format:', authHeader);
      return res.status(401).json({
        message: 'No valid token provided',
        error: 'INVALID_TOKEN_FORMAT'
      });
    }

    const token = authHeader.substring(7).trim();
    console.log('Token verification - Extracted token:', token);
    
    if (!token) {
      console.log('Token verification failed: Empty token after extraction');
      return res.status(401).json({
        message: 'Empty token provided',
        error: 'EMPTY_TOKEN'
      });
    }

    console.log('Verifying token with secret:', config.JWT_SECRET.substring(0, 10) + '...');
    const decoded = jwt.verify(token, config.JWT_SECRET);
    console.log('Token verification - Decoded token:', decoded);
    
    if (!decoded.userId) {
      console.log('Token verification failed: Missing userId in token');
      return res.status(401).json({
        message: 'Invalid token structure',
        error: 'INVALID_TOKEN_STRUCTURE'
      });
    }

    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      console.log('Token verification failed: User not found:', decoded.userId);
      return res.status(401).json({
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    // Generate new token
    const newToken = generateToken(user._id);
    console.log('Token verification successful for user:', user.username);

    res.json({
      token: newToken,
      user: {
        id: user._id,
        username: user.username,
        progress: user.progress
      }
    });
  } catch (error) {
    console.error('Token verification error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token has expired',
        error: 'TOKEN_EXPIRED'
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Invalid token',
        error: 'INVALID_TOKEN',
        details: error.message
      });
    }
    res.status(500).json({
      message: 'Server error during token verification',
      error: 'TOKEN_VERIFICATION_ERROR'
    });
  }
}; 