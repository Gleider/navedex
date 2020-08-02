const { v4: uuid } = require('uuid');
const bookshelf = require('../../config/bookshelf');

const Project = bookshelf.model('Project', {
  tableName: 'projects',
  hasTimestamps: true,
  naver() {
    return this.belongsToMany('Naver');
  },
  initialize() {
    this.on('saving', async (model) => {
      model.set('id', uuid());
    });
  },
});

module.exports = Project;
