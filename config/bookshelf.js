const knex = require('../src/database');
// eslint-disable-next-line import/order
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;
