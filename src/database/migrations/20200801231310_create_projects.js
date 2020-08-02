exports.up = function (knex) {
  return knex.schema.createTable('projects', (t) => {
    t.uuid('id').primary().notNullable();
    t.string('name').notNullable();
    t.uuid('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('projects');
};
