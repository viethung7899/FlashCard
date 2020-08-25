const router = require('express').Router();

const Sets = require('../database/set');
const Cards = require('../database/card');

// GET /
// get all the sets from the user
router.get('/', async (req, res) => {
    const sets = await Sets.getAllSetsByUserId(1);
    res.send(sets);
});

// POST /
// add new set from the user
router.post('/', async (req, res) => {
    const title = req.body.title;
    Sets.add(1, title)
        .then(
        onFulfillment => res.send('OK'),
        onRejection => res.send('Rejected'))
        .catch(err => res.send(err));

});

// DELETE /?deleteID
// delete a set with specific id
router.delete('/', async (req, res) => {
    const setID = req.query.id;
    console.log()
    // Delete all cards with the sets
    await Cards.deleteAllCardsBySetId(setID);

    // Delete the set
    await Sets.delete(setID)
        .then(
        onFulfillment => res.send('OK'),
        onRejection => res.send('Rejected'))
        .catch(err => res.send(err));
});

module.exports = router;
