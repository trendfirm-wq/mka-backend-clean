const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  // 🔥 NEW FIELD — stores Cloudinary avatar URL
  avatar: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
