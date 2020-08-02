exports.up = function (knex) {
  return knex.schema.createTable('navers', (t) => {
    t.uuid('id').primary().notNullable();
    t.uuid('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');
    t.string('name');
    t.date('birthdate');
    t.date('admission_date');
    t.string('job_role');
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('navers');
};
