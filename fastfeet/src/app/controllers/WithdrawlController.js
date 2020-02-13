import Courier from '../models/Courier';
import Order from '../models/Order';

class WithdrawlController {
  async update(req, res) {
    const { courierId, orderId } = req.params;

    const courier = await Courier.findByPk(courierId);

    if (!courier) {
      return res
        .status(400)
        .json({ error: `Does not exist a courier with id: ${courierId}` });
    }

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res
        .status(400)
        .json({ error: `Does not exist a courier with id: ${orderId}` });
    }

    order.product = 'Caneta';
    order.start_date = new Date();

    await order.save();

    return res.json(order);
  }
}

export default new WithdrawlController();
