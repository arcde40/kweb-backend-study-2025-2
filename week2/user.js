const Router = require('express') ;

const router = Router() ;

router.get('/', (req, res) => {
    res.send(`please input user id`) ;
}) ;

router.get('/:id', (req, res, next) => {
    if(req.params.id === '1'){
        res.send(`your id : ${req.params.id}`) ;
        next() ; 
    } 
    else{
        res.send('You are not welcome'); 
        next() ; 
    } 
}) ;

module.exports = router ; 