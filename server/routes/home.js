const router = require('express').Router()
const middlewares = require('../middlewares')

const Sets = require('../database/set')
const Cards = require('../database/card')

require('dotenv').config()

// Verify token middleware
router.use(middlewares.verifyToken)

// GET /
// get all the sets from the user
router.get('/', async (req, res, next) => {
  Sets.getAllSetsByUserId(req.body.userID)
    .then((sets) => res.send(sets))
    .catch(next)
})

// GET /:id
// get the set by set id
router.get('/:id', async (req, res, next) => {
  Sets.getBySetId(req.params['id'])
    .then((set) => {
      if (req.body.userID !== set.user_id) {
        res.status(403)
        next(new Error('Invalid user'))
      }
      else res.send(set)
    })
    .catch(next)
})

// POST /
// add new set from the user
router.post('/add', async (req, res, next) => {
  const title = req.body.title
  const id = req.body.userID
  console.log(id)
  Sets.add(id, title)
    .then((set) => {
      res.send(set[0])
    })
    .catch(next)
})

// DELETE /delete/id
// delete a set with specific id
router.delete('/delete/:id', async (req, res, next) => {
  const setID = req.params['id']

  // Delete all cards with the sets
  await Cards.deleteAllCardsBySetId(setID)

  // Delete the set
  Sets.delete(setID)
    .then((id) => res.send({ id: id }))
    .catch(next)
})

module.exports = router
