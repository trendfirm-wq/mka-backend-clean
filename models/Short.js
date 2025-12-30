const mongoose = require('mongoose');

const shortSchema = new mongoose.Schema(
  {
    videoKey: {
      type: String,
      required: true, // e.g. short1.mp4
    },
    caption: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Short', shortSchema);
