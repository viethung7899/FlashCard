const router = require('express').Router();

const Cards = require('../database/card');

router.get('/:id', async (req, res) => {
  const cards = await Cards.getAllCardsBySetId(+req.params.id);
  res.json(cards);
});

router.post('/', async (req, res) => {
  Cards.addNewCard(req.body);
});

router.delete('/:id', async(res, req) => {
  Cards.deleteCard(res.params.id);
})

module.exports = router;
