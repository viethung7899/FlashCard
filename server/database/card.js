const knex = require('./connection')

const Cards = {
  getAllCardsBySetId: async (id) => {
    return knex.select().from('cards').where('set_id', id)
  },

  getByCardId: async (id) => {
    return knex.select().from('cards').where('card_id', id).first()
  },

  add: async (title, description, setID) => {
    const card = {
      title: title,
      description: description,
      set_id: setID,
    }
    return knex('cards').insert(card, ['card_id'])
  },

  delete: async (id) => {
    return knex('cards').where('card_id', id).delete()
  },

  deleteAllCardsBySetId: async (id) => {
    return knex.select().from('cards').where('set_id', id).delete()
  },
}

module.exports = Cards
