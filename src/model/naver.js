const { v4: uuid } = require('uuid');
const bookshelf = require('../../config/bookshelf');

const Naver = bookshelf.model('Naver', {
  tableName: 'navers',
  hasTimestamps: true,
  user() {
    return this.belongsTo('User');
  },
  project() {
    return this.belongsToMany('Project');
  },
  initialize() {
    this.on('saving', async (model) => {
      model.set('id', uuid());
    });
  },
});

module.exports = Naver;
