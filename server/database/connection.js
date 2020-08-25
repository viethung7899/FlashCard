require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'flashcard'
  }
});

module.exports = knex;
