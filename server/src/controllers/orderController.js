let orders = [];

exports.getOrders = (req, res) => {
  const { userId } = req.params;
  const userOrders = orders.filter(o => o.buyerId === Number(userId));
  res.json(userOrders);
};

exports.createOrder = (req, res) => {
  const { items, total, buyerId } = req.body;
  const newOrder = {
    id: orders.length + 1,
    items,
    total,
    buyerId,
    date: new Date().toLocaleDateString(),
    status: 'Confirmed'
  };
  orders.push(newOrder);
  res.json({ success: true, orderId: newOrder.id, ...newOrder });
};
