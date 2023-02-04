import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMail',
  async handle({ data }) {
    const { user } = data;
    await Mail.sendMail({
      from: 'Felipe',
      to: `${user.name} <${user.email}>`,
      subject: 'Signup',
      html: `Hello ${user.name}, welcome to the system`,
    });
  },
};
