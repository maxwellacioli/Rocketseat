import Order from '../models/Order';

class CancelDeliveryController {
  async update(req, res) {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res
        .status(400)
        .json({ error: `Does not exist a courier with id: ${orderId}` });
    }

    order.canceled_at = new Date();

    await order.save();

    return res.json(order);
  }
}

export default new CancelDeliveryController();
