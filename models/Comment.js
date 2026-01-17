const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
   shortId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Short",
  required: true,
  index: true,
},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',        // ✅ FIXED
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
