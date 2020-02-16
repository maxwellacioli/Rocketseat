import Mail from '../../lib/Mail';

export default {
  key: 'OrderRegistrationMail',
  async handle({ data }) {
    const { courier, recipient } = data;

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: 'Nova entrega cadastrada',
      template: 'order',
      context: {
        courier: courier.name,
        recipient: recipient.name,
      },
    });
  },
};
