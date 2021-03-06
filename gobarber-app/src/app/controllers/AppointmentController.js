import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class AppointmentController {
  async index(req, res) {
    /*
      Faz a desestruturação de query para pegar a pagina atual da paginação,
      e caso não exista pagina em query, o valor default é 1
     */
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'date', 'past', 'cancelable'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    /*
      Verifica se os campos presentes no body da requisição estão de acordo
      com as regras do schema
    */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' });
    }

    const { provider_id, date } = req.body;

    if (req.userId === provider_id) {
      return res
        .status(401)
        .json({ error: 'You cannot create an appointement to yourself.' });
    }

    /*
      Check if provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can create appointments with providers' });
    }

    /*
      O método parserIso(date) converte uma data no formato:
      2020-02-10T12:00:00-03:00 para uma objeto date do javascript.
      Foi feito isso, porque o método startOfHour espera como parâmetro
      um objeto date do javascript, e retorna apenas o início da hora, ignorando
      o demais atributos da hora, neste caso retornaria apenas 12:00:00.
     */
    const startHour = startOfHour(parseISO(date));

    /*
      Verifica se a data passada na requisição é anterior a data atual, esta
      verificação serve para garantir que não devemos agendar atendimentos para
      uma data ou hora já decorridas.
    */
    if (isBefore(startHour, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    /*
      Verifica a disponilidade da hora pretendida para o agendamento
      Serão verificados neste caso, se o provider requisitado, já tem um
      agendamento marcado para a hora pretentida, e se o canceled_at é null,
      porque se o canceled for diferente de null, significa que o cancelamento
      foi realizado, e agora o horário está disponível
     */
    const availableDate = await Appointment.findOne({
      where: { provider_id, canceled_at: null, date: startHour },
    });

    if (availableDate) {
      return res
        .status(401)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    /*
      Notificar provider
     */
    const user = await User.findByPk(req.userId);
    const formattedDate = format(startHour, "dd 'de' MMMM', às' hh:mm'h'", {
      locale: ptBR,
    });

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const { id } = req.params;

    /*
      Foi incluído os dados do provider e do usuário através da propriedade
      include do sequelize
     */
    const appointment = await Appointment.findByPk(id, {
      include: [
        { model: User, as: 'provider', attributes: ['name', 'email'] },
        { model: User, as: 'user', attributes: ['name', 'email'] },
      ],
    });
    /*
      Para pegar o provider poderia também fazer uma outra query para buscar
      o provider a partir do provider_id de appointment

      const provider = await User.findByPk(appointment.provider_id);
    */

    if (req.userId !== appointment.user_id) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment",
      });
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res
        .status(401)
        .json({ error: 'You can only cancel two hours in advance.' });
    }

    appointment.canceled_at = new Date();
    await appointment.save(appointment);

    Queue.add(CancellationMail.key, { appointment });

    return res.json();
  }
}

/*
  exporta o AppointmentController
 */
export default new AppointmentController();
