const knex = require('./connection');

const Cards = {
  getAllCardsBySetId: async (id) => {
    return knex.select().from('cards').where('set_id', id);
  },

  add: async (title, description, setID) => {
    const card = {
      title: title,
      description: description,
      set_id: setID
    };
    return knex('cards').insert(card);
  },

  delete: async (id) => {
    return knex('cards').where('card_id', id).delete();
  },

  deleteAllCardsBySetId: async (id) => {
    return knex.select().from('cards').where('set_id', id).delete();
  }
}

module.exports = Cards;
