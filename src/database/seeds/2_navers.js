exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('navers').del()
    .then(() => knex('navers').insert([
      {
        id: '6e0694d5-bfea-4ff8-a278-e02ecb968b73',
        user_id: '7df4d07a-3412-43a2-b36a-66dc49acf481',
        name: 'Christopher Nolan',
        birthdate: '1986-01-01',
        admission_date: '2017-01-01',
        job_role: 'backend',
      }, {
        id: '64b8a5b2-d22f-467f-a3a0-7ff6963be819',
        user_id: '7df4d07a-3412-43a2-b36a-66dc49acf481',
        name: 'Martin Scorsese',
        birthdate: '1986-01-01',
        admission_date: '2018-01-01',
        job_role: 'backend',
      }, {
        id: 'dbe22701-7436-4a18-a6b7-85b886a3a994',
        user_id: '7df4d07a-3412-43a2-b36a-66dc49acf481',
        name: 'Quentin Tarantino',
        birthdate: '1986-01-01',
        admission_date: '2019-01-01',
        job_role: 'frontend',
      },
    ]));
};
