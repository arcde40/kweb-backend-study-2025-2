const { Router} = require('express') ;

const router = Router() ;

router.get('/user', (req, res) => {
    res.send(`please input user id`) ;
    const a = req.query.a ;
    const b = req.query.b ;
    res.send(`{}`)


}) ;

router.get('/user/:id', (req, res) => {
    if(req.params.id !== '1') res.send('You are not welcome'); 
    else next() ;
}) ;

router.get('/user/:id', (req, res) => {
    res.send(`Hello, user ${req.params.id}`) ;
}) ;

module.exports = router ; 