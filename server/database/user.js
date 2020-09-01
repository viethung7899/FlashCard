const knex = require('./connection')

const Users = {
  getByUserName: async (username) => {
    return knex('users').where('user_name', username).first()
  },
  getByUserId: async (id) => {
    return knex('users').where('user_id', id).first()
  },

  addNewUser: async (user) => {
    return knex('users').insert(user).returning('user_id')
  },
}

module.exports = Users
