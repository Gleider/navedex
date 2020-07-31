exports.up = function (knex) {
  return knex.schema.createTable('users', (t) => {
    t.uuid('id').primary();
    t.string('email').unique();
    t.string('name');
    t.string('password');
    t.date('birthdate');
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
