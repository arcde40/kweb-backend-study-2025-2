const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a}, ${b}`);
    //res.send(`Please input user id`);
})

router.get('/:id', (req, res, next) => {
    if(req.params.id !== '1') res.send("You are not welcomed!");
   else next(); 
});

router.get('/:id', (req, res) => {
  res.send(`Hello, user ${req.params.id}`);  
});

/*
router.get('/user', (req, res) => {
    if(req.query.id === undefined) res.send('No query!');
    res.send(`You requested ${req.query.id}!`);
});
*/

module.exports = router;