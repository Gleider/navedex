// Update with your config settings.

const envConfig = require('./config/envConfig');
require('dotenv').config(envConfig);

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.PG_DATABASE_DEV,
      user: process.env.PG_USER_DEV,
      password: process.env.PG_PASSWORD_DEV,
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`,
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
