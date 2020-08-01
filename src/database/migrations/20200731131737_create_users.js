exports.up = function (knex) {
  return knex.schema.createTable('users', (t) => {
    t.uuid('id').primary().notNullable();
    t.string('email').unique().notNullable();
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
