const User = require('../model/user');

module.exports = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ Error: 'Email and password are required.' });
      }
      const user = await User
        .where('email', email)
        .fetch({ require: false });
      const isValid = await User.verifyPassword(password, user.get('password'));
      if (!isValid) {
        res.status(401).json({ Error: 'Email or password invalid' });
      }
      const token = User.getToken(user.get('id'));
      return res.status(200).json({ token });
    } catch (error) {
      return next(error.message);
    }
  },

  async signup(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json('Email and password are required.');
      }
      await User.forge().save({ email, password });
      return res.status(201).json('Successfully registered user');
    } catch (error) {
      if (error.message === 'email') {
        return res.status(400).json({ Error: 'Email already exists' });
      }
      return next(error.message);
    }
  },
};
