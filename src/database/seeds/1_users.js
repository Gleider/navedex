const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');

const hash = bcrypt.hashSync('abc123', 10);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => knex('users').insert([
      {
        id: uuid(),
        email: 'gleider.ec@gmail.com',
        name: 'Gleider Mackedanz de Campos',
        password: hash,
        birthdate: '1986-07-26',
      },
    ]));
};
