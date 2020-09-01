const router = require('express').Router()
const middlewares = require('../middlewares')

const Cards = require('../database/card')

router.use(middlewares.verifyToken)

// GET sets/
// get all the cards from the set
router.get('/:id', (req, res, next) => {
  const setId = req.params.id
  Cards.getAllCardsBySetId(setId)
    .then((cards) => res.send(cards))
    .catch((err) => res.status(401).send(err))
})

router.get('/get/:id', (req, res) => {
  const cardId = req.params.id
  Cards.getByCardId(cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(401).send(err))
})

// POST sets/
// add new cards to the set
router.post('/add/:id', (req, res) => {
  const { title, description } = req.body
  const id = req.params.id
  Cards.add(title, description, id)
    .then((cardID) => res.send({ card_id: cardID }))
    .catch((err) => res.status(401).send(err))
})

// DELETE sets/?id=
// delete a cards with specific id
router.delete('/delete/:id', async (req, res) => {
  const cardID = req.params['id']
  // Delete the set
  await Cards.delete(cardID)
    .then((result) => res.send({ id: result }))
    .catch((err) => res.status(401).send(err))
})

module.exports = router
