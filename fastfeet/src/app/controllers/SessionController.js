import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not exists.' });
    }

    const validPassword = await user.checkPassword(password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Password incorrect.' });
    }

    const { id } = user;

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
