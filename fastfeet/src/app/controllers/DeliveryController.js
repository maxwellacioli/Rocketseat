import * as Yup from 'yup';
import Courier from '../models/Courier';
import Order from '../models/Order';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    const schema = Yup.object().shape({
      done: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const { delivered } = req.body;
    const { courierId } = req.params;

    if (!delivered) {
      const orders = await Order.find({
        where: {
          courier_id: courierId,
          end_date: null,
          canceled_at: null,
        },
      });

      return res.json(orders);
    }

    return res.json();
  }

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

    if (req.file) {
      const { originalname: name, filename: path } = req.file;

      const file = await File.create({ name, path });

      order.signature_id = file.id;
    }

    order.end_date = new Date();

    await order.save();

    return res.json(order);
  }
}

export default new DeliveryController();
