const knex = require('./connection');

const Cards = {
  getAllCardsBySetId: async (id) => {
    return await knex.select().from('cards').where('setid', id);
  },

  addNewCard: async (card) => {
    await knex('cards').insert(card);
  },

  deleteCard: async (id) => {
    await knex('cards').where('cardid', id).delete();
  }
}

module.exports = Cards;
