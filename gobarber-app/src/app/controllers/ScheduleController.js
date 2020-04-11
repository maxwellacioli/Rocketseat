// import * as Yup from 'yup';
import { startOfDay, parseISO, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    /*
      Busca no banco se o usuário logado é um provider
     */
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider.' });
    }
    /*
      O Diego passa a data no query, vai na url, porém acho mais interessante
      este dado ser passado no corpo da requisição, e validar se este elemento
      está presente ou não utilizando a lib Yup, seguinto o código comentado
      abaixo.
     */
    // const { date } = req.body;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Schedule date is required.' });
    }

    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        /*
          Aqui na query ele vai adicionar o operador between para buscar os
          agendamentos que estão entre um dia especifico, das 00:00:00 até
          23:59:59 do mesmo dia.
         */
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      /*
        Ordena o resultado da busca pela data
       */
      order: ['date'],
    });

    return res.json(appointments);
  }
}

/*
  exporta o ScheduleController
 */
export default new ScheduleController();
