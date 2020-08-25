const knex = require('./connection');

const Sets = {
  getAllSetsByUserId: async (id) => {
    return await knex('cardSets').where('userID', id).first();
  }
};

module.exports = Sets;
