// server/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require('../config/config');

// Protect routes middleware
const auth = async (req, res, next) => {
  try {
    console.log('Auth middleware - Headers:', req.headers);
    
    // Get token from header
    const authHeader = req.header('Authorization');
    console.log('Auth middleware - Authorization header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Auth middleware - Invalid header format:', authHeader);
      return res.status(401).json({ 
        message: 'Access denied. No valid token provided.',
        error: 'INVALID_TOKEN_FORMAT'
      });
    }

    // Extract token without 'Bearer ' prefix
    const token = authHeader.substring(7).trim();
    console.log('Auth middleware - Extracted token:', token);

    if (!token) {
      console.log('Auth middleware - Empty token after extraction');
      return res.status(401).json({ 
        message: 'Access denied. Empty token provided.',
        error: 'EMPTY_TOKEN'
      });
    }

    try {
      // Verify token
      console.log('Auth middleware - Verifying token with secret:', config.JWT_SECRET.substring(0, 10) + '...');
      const decoded = jwt.verify(token, config.JWT_SECRET);
      console.log('Auth middleware - Decoded token:', decoded);
      
      if (!decoded.userId) {
        console.log('Auth middleware - Missing userId in token');
        return res.status(401).json({ 
          message: 'Invalid token structure.',
          error: 'INVALID_TOKEN_STRUCTURE'
        });
      }

      // Check if user still exists
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        console.log('Auth middleware - User not found:', decoded.userId);
        return res.status(401).json({ 
          message: 'User no longer exists.',
          error: 'USER_NOT_FOUND'
        });
      }

      // Add user info to request
      req.user = {
        userId: decoded.userId,
        username: user.username
      };
      req.userDetails = user;
      
      console.log('Auth middleware - Authentication successful for user:', user.username);
      next();
    } catch (err) {
      console.error('Auth middleware - Token verification error:', {
        name: err.name,
        message: err.message,
        token: token,
        secret: config.JWT_SECRET.substring(0, 10) + '...'
      });

      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: 'Token has expired.',
          error: 'TOKEN_EXPIRED'
        });
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          message: 'Invalid token.',
          error: 'INVALID_TOKEN',
          details: err.message
        });
      }
      throw err; // Let the outer catch handle other errors
    }
  } catch (error) {
    console.error('Auth middleware - Unexpected error:', error);
    res.status(500).json({ 
      message: 'Internal server error during authentication.',
      error: 'AUTH_SERVER_ERROR'
    });
  }
};

module.exports = auth;
