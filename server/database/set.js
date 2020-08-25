const knex = require('./connection');

const Sets = {
  getAllSetsByUserId: async (id) => {
    return await knex('card_sets').where('user_id', id);
  }
};

module.exports = Sets;
