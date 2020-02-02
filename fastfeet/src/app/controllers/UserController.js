import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async show(req, res) {
    const users = await User.findAll();

    const usersInfo = [];

    users.map(user => {
      const { id, name, email, provider } = user;

      usersInfo.push({
        id,
        name,
        email,
        provider,
      });

      return undefined;
    });

    return res.json(usersInfo);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const { email } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
