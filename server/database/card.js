const knex = require('./connection');

const Cards = {
  getAllCardsBySetId: async (id) => {
    return await knex.select().from('cards').where('set_id', id);
  },

  addNewCard: async (title, desciption, setID) => {
    const card = {
      title: title,
      description: desciption,
      set_id: setID
    };
    await knex('cards').insert(card);
  },

  deleteCard: async (id) => {
    await knex('cards').where('card_id', id).delete();
  }
}

module.exports = Cards;
