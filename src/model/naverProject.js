const bookshelf = require('../../config/bookshelf');

const NaverProject = bookshelf.model('NaverProject', {
  tableName: 'navers_projects',
  hasTimestamps: true,
});

const NaverProjects = bookshelf.Collection.extend({
  model: NaverProject,
});

module.exports = { NaverProject, NaverProjects };
