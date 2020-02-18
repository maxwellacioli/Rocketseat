import { getHours } from 'date-fns';
import Courier from '../models/Courier';
import Order from '../models/Order';
import Withdrawls from '../../lib/Withdrawls';

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

    const startDate = new Date();

    if (Withdrawls.withdrawls === 5) {
      return res
        .status(403)
        .json({ error: 'Only five withdrawals can be made per day' });
    }

    const hour = getHours(startDate);

    if (hour < 8 || hour >= 18) {
      return res.status(403).json({
        error: 'Orders just can be withdrawed between 08:00 and 18:00',
      });
    }

    order.start_date = startDate;

    await order.save();

    Withdrawls.withdrawls += 1;
    Withdrawls.checkDate(startDate);

    return res.json(order);
  }
}

export default new WithdrawlController();
