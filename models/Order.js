const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: Array,
    totalAmount: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
