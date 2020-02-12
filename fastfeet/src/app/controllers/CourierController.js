import * as Yup from 'yup';
import Courier from '../models/Courier';
import File from '../models/File';

class CourierController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation error.' });

    const { name, email } = req.body;

    const emailExists = await Courier.findOne({ where: { email } });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: `Already exists a courier with email: ${email}` });
    }

    const courier = await Courier.create({ name, email });

    return res.json({
      id: courier.id,
      name: courier.name,
      email: courier.email,
    });
  }

  async index(req, res) {
    const couriers = await Courier.findAll({
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    return res.json(couriers);
  }

  async delete(req, res) {
    const { id } = req.params;

    const courier = await Courier.findByPk(id);

    if (!courier) {
      return res
        .status(400)
        .json({ error: `Does not exists a courier with id: ${id}` });
    }

    await courier.destroy();

    return res.json();
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation error.' });

    const { id } = req.params;

    const courier = await Courier.findByPk(id);

    if (!courier) {
      return res
        .status(400)
        .json({ error: `Does not exists a courier with id: ${id}` });
    }

    const { name, email } = req.body;

    const emailExists = await Courier.findOne({ where: { email } });

    if (emailExists) {
      return res
        .status(400)
        .json({ error: `Already exists a courier with email: ${email}` });
    }

    courier.name = name;
    courier.email = email;

    await courier.save();

    return res.json(courier);
  }
}

export default new CourierController();
