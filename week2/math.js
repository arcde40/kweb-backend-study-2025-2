const Router = require('express') ;

const router = Router() ;


router.get('/', (req, res) => {
    res.send(`please input 1 operand and 2 numbers`) ;
}) ;

router.get('/sum', (req, res, next) =>{
    try{
        const {a, b} = req.query ;
        const numA = parseInt(a) ; 
        const numB = parseInt(b) ;
        if(isNaN(numA) || isNaN(numB)){
            const err = new Error('invalid input') ;
            err.status = 400 ;
            return next(err) ; 
        }
        const sum = numA + numB ;
        res.send(`sum of ${numA} and ${numB} is ${sum}`) ;
    }
    catch(err){
        return next(err) ; 
    }
});

router.get('/sub', (req, res)=>{
    try{
        const {a, b} = req.query ;
        const numA = parseInt(a) ; 
        const numB = parseInt(b) ;
        if(isNaN(numA) || isNaN(numB)){
            const err = new Error('invalid input') ;
            err.status = 400 ;
            return next(err) ; 
        }
        const sub = numA - numB ;
        res.send(`sub of ${numA} and ${numB} is ${sub}`) ;
    }
    catch(err){
        return next(err) ; 
    }
});

module.exports = router ; 