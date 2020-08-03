const bcrypt = require('bcryptjs');

const hash = bcrypt.hashSync('abc123', 10);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => knex('users').insert([
      {
        id: '7df4d07a-3412-43a2-b36a-66dc49acf481',
        email: 'gleider.ec@gmail.com',
        password: hash,
      },
    ]));
};
