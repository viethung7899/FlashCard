const knex = require('./connection')

const Sets = {
  getAllSetsByUserId: async (id) => {
    return knex('card_sets').where('user_id', id)
  },

  getBySetId: async (id) => {
    return knex('card_sets').where('set_id', id).first()
  },

  add: async (id, title) => {
    return knex('card_sets').insert(
      {
        title: title,
        user_id: id,
      },
      ['set_id', 'title']
    )
  },

  delete: async (id) => {
    return knex('card_sets').where('set_id', id).delete()
  },
}

module.exports = Sets
