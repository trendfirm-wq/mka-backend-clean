const mongoose = require('mongoose');

const LiveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      default: 'Live Broadcast',
    },

    streamId: {
      type: String,
      required: true,
      unique: true,
    },

    playbackUrl: {
      type: String,
      required: true,
    },

    isLive: {
      type: Boolean,
      default: true,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Live', LiveSchema);
