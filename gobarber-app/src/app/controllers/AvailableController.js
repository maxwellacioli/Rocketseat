import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;
    const { providerId } = req.params;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ];

    const available = schedule.map(s => {
      const [hour] = s.split(':');

      const availableTime = setSeconds(
        setMinutes(setHours(searchDate, hour), 0),
        0
      );
      return {
        s,
        value: format(availableTime, "yyyy-MM-dd'T'HH:mm:ssxxx"),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
