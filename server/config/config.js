require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dsa-study-sheet',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-2024',
  PORT: process.env.PORT || 5001
}; 