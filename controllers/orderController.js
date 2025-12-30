const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const order = await Order.create({
    user: req.user,
    items: req.body.items,
    totalAmount: req.body.totalAmount,
  });

  res.json(order);
};
