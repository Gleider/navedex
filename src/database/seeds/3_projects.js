exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(() => knex('projects').insert([
      {
        id: 'b965c0d5-6cbf-4f65-ad87-c7a57ac61cbb',
        user_id: '7df4d07a-3412-43a2-b36a-66dc49acf481',
        name: 'Inception',
      }, {
        id: '118d04a1-b3ee-425c-b41f-62ed1ee028a0',
        user_id: '7df4d07a-3412-43a2-b36a-66dc49acf481',
        name: 'Dark knight',
      }, {
        id: 'fa071c30-8594-44b0-a1e5-3c619d185770',
        user_id: '7df4d07a-3412-43a2-b36a-66dc49acf481',
        name: 'Kill Bill',
      }, {
        id: '70f6a76e-a237-4f48-a33b-323c0a6e8578',
        user_id: '7df4d07a-3412-43a2-b36a-66dc49acf481',
        name: 'Pulp Fiction',
      }, {
        id: 'e6d97667-263e-4fd4-b9d8-0329ffd7012d',
        user_id: '7df4d07a-3412-43a2-b36a-66dc49acf481',
        name: 'Taxi Driver',
      }, {
        id: '306ce1b4-7391-473c-80aa-9cf919427335',
        user_id: '7df4d07a-3412-43a2-b36a-66dc49acf481',
        name: 'Goodfellas',
      },
    ]));
};
