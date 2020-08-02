const User = require('../model/user');

module.exports = {
  async index(req, res, next) {
    // const results = await new User({ email: 'gleider.ec@gmail.com' }).fetch();
    // const results = await User
    //   .where('email', 'gleiders.ec@gmail.com')
    //   .fetch({ require: false });
    try {
      const results = await User.fetchAll();

      return res.json(results);
    } catch (error) {
      res.status(400);
      return next(error.message);
    }
  },
  async create(req, res, next) {
    try {
      const {
        name, email, password, birthdate,
      } = req.body;
      if (!name || !email || !password) {
        throw new Error('Name, email and password are needed');
      }
      const user = await User.forge().save({
        name,
        email,
        password,
        birthdate,
      });

      return res.status(201).send(user);
    } catch (error) {
      res.status(400);
      return next(error.message);
    }
  },
};
