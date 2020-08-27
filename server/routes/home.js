const router = require('express').Router();

const Sets = require('../database/set');
const Cards = require('../database/card');

// GET /
// get all the sets from the user
router.get('/', async (req, res) => {
   Sets.getAllSetsByUserId(1)
       .then(sets => res.send(sets))
       .catch(err => res.status(401).send(err));
});

router.get('/:id', async(req, res) => {
    Sets.getBySetId(req.params['id'])
        .then(set => res.send(set))
        .catch(err => res.status(401).send(err));
});

// POST /
// add new set from the user
router.post('/add', async (req, res) => {
    const title = req.body.title;

    Sets.add(1, title)
        .then(set => {res.send(set[0])})
        .catch(err => res.status(401).send(err));

});

// DELETE /?deleteID=
// delete a set with specific id
router.delete('/delete/:id', async (req, res) => {
    const setID = req.params['id'];
    console.log()
    // Delete all cards with the sets
    await Cards.deleteAllCardsBySetId(setID);

    // Delete the set
    Sets.delete(setID)
        .then(id => res.send({id: id}))
        .catch(err => res.status(401).send(err));
});

module.exports = router;
