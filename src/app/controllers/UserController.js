import Queue from '../../lib/Queue';

export default class UserController {
  static async store(req, res) {
    const { name, email } = req.body;

    await Queue.add('RegistrationMail', { user: { name, email } });
    return res.json({ success: true });
  }
}
