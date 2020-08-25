const knex = require('./connection');

const Users = {
  getByUserName: async (username) => {
    return knex('users').where('username', username).first();
  }
};

module.exports = Users;
