const { Router } = require('express');

const router = Router();

router.get('/', (req,res) => {
    const a =req.query.a;
    const b =req.query.b;
    res.send(`${a}, ${b}`);   //user?a=1&b=2
})

router.get('/:id', (req,res,next)=> {
    if(req.params.id !== '1') res.send("you are not welcoemd!");
    else next();
});

router.get('/:id', (req,res) => {
    res.send(`Hello, user ${req.params.id}`);
});

module.exports = router;