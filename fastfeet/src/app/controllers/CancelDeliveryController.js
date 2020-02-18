import Order from '../models/Order';
import Courier from '../models/Courier';
import Queue from '../../lib/Queue';
import OrderCancellationMail from '../jobs/OrderCancellationMail';

class CancelDeliveryController {
  async update(req, res) {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId, {
      include: [{ model: Courier, as: 'courier', attributes: ['id'] }],
    });

    if (!order) {
      return res
        .status(400)
        .json({ error: `Does not exist a courier with id: ${orderId}` });
    }

    const courier = await Courier.findByPk(order.courier.id);

    order.canceled_at = new Date();

    await order.save();

    await Queue.add(OrderCancellationMail.key, { courier, order });

    return res.json(order);
  }
}

export default new CancelDeliveryController();
