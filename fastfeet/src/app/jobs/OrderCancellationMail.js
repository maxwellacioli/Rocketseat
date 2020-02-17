import Mail from '../../lib/Mail';

export default {
  key: 'OrderCancellationMail',
  async handle({ data }) {
    const { courier, order } = data;

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: 'Cancelamento de entrega',
      template: 'cancellation',
      context: {
        courier: courier.name,
        orderId: order.id,
      },
    });
  },
};
