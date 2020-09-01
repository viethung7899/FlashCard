const router = require('express').Router()
const middlewares = require('../middlewares')

const Set = require('../database/set')
const Cards = require('../database/card')

router.use(middlewares.verifyToken)

// GET sets/
// get all the cards from the set
router.get('/:id', (req, res, next) => {
  // Prevent user get access to another user data
  const setId = req.params.id
  Set.getBySetId(setId).then(set => {
    if (!set || set.user_id !== req.body.userID) {
      res.status(403)
      next(new Error('Forbidden'))
    } else {
      Cards.getAllCardsBySetId(setId)
          .then((cards) => res.send(cards))
          .catch(next)
    }
  }).catch(next)
})

router.get('/get/:id', (req, res, next) => {
  const cardId = req.params.id
  Cards.getByCardId(cardId)
    .then((card) => res.send(card))
    .catch(next)
})

// POST sets/
// add new cards to the set
router.post('/add/:id', (req, res, next) => {
  const { title, description } = req.body
  const id = req.params.id
  Cards.add(title, description, id)
    .then((cardID) => res.send({ card_id: cardID }))
    .catch(next)
})

// DELETE sets/?id=
// delete a cards with specific id
router.delete('/delete/:id', async (req, res, next) => {
  const cardID = req.params['id']
  // Delete the set
  await Cards.delete(cardID)
    .then((result) => res.send({ id: result }))
    .catch(next)
})

module.exports = router
