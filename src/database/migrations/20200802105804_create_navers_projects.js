exports.up = function (knex) {
  return knex.schema.createTable('navers_projects', (t) => {
    t.uuid('naver_id')
      .references('navers.id')
      .notNullable()
      .onDelete('CASCADE');
    t.uuid('project_id')
      .references('projects.id')
      .notNullable()
      .onDelete('CASCADE');
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('navers_projects');
};
