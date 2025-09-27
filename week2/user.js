const {Router} = require('express');

const router = Router();

router.get('/user', (req, res) => {
    res.send(`Plane input user id`);
});

router.get('/user/:id', (req, res) => {
    if(req.params.id == '1') res.send("You are welcomed!");
    else res.send("You are not welcomed!");
});

module.exports = router;