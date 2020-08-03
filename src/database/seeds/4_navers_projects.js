exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('navers_projects').del()
    .then(() => knex('navers_projects').insert([
      {
        naver_id: '6e0694d5-bfea-4ff8-a278-e02ecb968b73',
        project_id: 'b965c0d5-6cbf-4f65-ad87-c7a57ac61cbb',
      }, {
        naver_id: '6e0694d5-bfea-4ff8-a278-e02ecb968b73',
        project_id: '118d04a1-b3ee-425c-b41f-62ed1ee028a0',
      }, {
        naver_id: '64b8a5b2-d22f-467f-a3a0-7ff6963be819',
        project_id: 'fa071c30-8594-44b0-a1e5-3c619d185770',
      }, {
        naver_id: '64b8a5b2-d22f-467f-a3a0-7ff6963be819',
        project_id: '70f6a76e-a237-4f48-a33b-323c0a6e8578',
      }, {
        naver_id: 'dbe22701-7436-4a18-a6b7-85b886a3a994',
        project_id: 'e6d97667-263e-4fd4-b9d8-0329ffd7012d',
      }, {
        naver_id: 'dbe22701-7436-4a18-a6b7-85b886a3a994',
        project_id: '306ce1b4-7391-473c-80aa-9cf919427335',
      },
    ]));
};
