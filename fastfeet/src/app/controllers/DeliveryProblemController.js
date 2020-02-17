import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';

class FileController {
  async store(req, res) {
    const { orderId } = req.params;
    const { description } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res
        .status(400)
        .json({ error: `Does not exist an order with id: ${orderId}` });
    }

    const problem = await DeliveryProblem.create({
      delivery_id: orderId,
      description,
    });

    return res.json(problem);
  }

  async index(req, res) {
    const problems = await DeliveryProblem.findAll({
      attributes: ['id', 'delivery_id', 'description'],
    });

    return res.json(problems);
  }

  async show(req, res) {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res
        .status(400)
        .json({ error: `Does not exist an order with id: ${orderId}` });
    }

    const problems = await DeliveryProblem.findAll({
      where: { delivery_id: orderId },
      attributes: ['id', 'delivery_id', 'description'],
    });

    return res.json(problems);
  }
}

export default new FileController();
