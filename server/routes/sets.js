const router = require('express').Router();

const Cards = require('../database/card');

// GET /
// get all the cards from the set
router.get('/:id', (req, res) => {
    const setID = req.params.id;
    Cards.getAllCardsBySetId(setID)
        .then(
            cards => res.send(cards),
            reject => res.send('Rejected'))
        .catch(err => res.send(err));
});

// POST /
// add new cards to the set
router.post('/:id', (req, res) => {
    const {title, description} = req.body;
    const id = req.params.id;
    Cards.add(title, description, id)
        .then(
            onFulfillment => res.send('OK'),
            onRejection => res.send('Rejected'))
        .catch(err => res.send(err));
});

// DELETE /?id=
// delete a cards with specific id
router.delete('/', async (req, res) => {
    const cardID = req.query.id;
    console.log()
    // Delete all cards with the sets

    // Delete the set
    await Cards.delete(cardID)
        .then(
            onFulfillment => res.send('OK'),
            onRejection => res.send('Rejected'))
        .catch(err => res.send(err));
});

module.exports = router;
