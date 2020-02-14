import * as Yup from 'yup';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';
import Order from '../models/Order';
import Mail from '../../lib/Mail';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipientId: Yup.number().required(),
      courierId: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const { recipientId, courierId, product } = req.body;

    const recipient = await Recipient.findOne({ where: { id: recipientId } });

    if (!recipient) {
      return res
        .status(400)
        .json({ error: `Does not exist a recipient with id: ${recipientId}` });
    }

    const courier = await Courier.findOne({ where: { id: courierId } });

    if (!courier) {
      return res
        .status(400)
        .json({ error: `Does not exist a recipient with id: ${courierId}` });
    }

    const order = await Order.create({
      recipient_id: recipientId,
      courier_id: courierId,
      product,
    });

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: 'Nova entrega cadastrada',
      template: 'order',
      context: {
        courier: courier.name,
        recipient: recipient.name,
      },
    });

    return res.json(order);
  }

  async index(req, res) {
    const orders = await Order.findAll();

    return res.json(orders);
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res
        .status(400)
        .json({ error: `Does not exist an order with id: ${id}` });
    }

    await order.destroy();

    return res.json();
  }
}

export default new OrderController();