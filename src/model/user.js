const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bookshelf = require('../../config/bookshelf');

const User = bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: true,
  hidden: ['password'],
  naver() {
    return this.hasMany('Naver');
  },
  project() {
    return this.hasMany('Project');
  },
  initialize() {
    this.on('saving', async (model) => {
      if (!model.get('id')) {
        model.set('id', uuid());
      }
      const password = await bcrypt.hash(model.get('password'), 10);
      model.set('password', password);
      return User.forge({ email: model.get('email') }).fetch({ require: false }).then((user) => {
        if (user) throw new Error('email');
      });
    });
  },
}, {
  verifyPassword(password, cryptPassword) {
    return bcrypt.compare(password, cryptPassword);
  },
  getToken(id) {
    return jwt.sign({ id }, process.env.TOKEN_SECRET);
  },
});

module.exports = User;
