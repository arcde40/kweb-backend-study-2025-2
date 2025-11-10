const Router = require('express') ;

const router = Router() ;

router.get('/', (req, res) => {
    const {result, error} = req.query; 
    res.render(`math`, {result : result, error : error}) ;
}) ;



router.post('/', (req, res, next) =>{
    const {num1, num2, operand} = req.body ; 
    try{
        const parse_numA = parseInt(num1) ; 
        const parse_numB = parseInt(num2) ;
        if(isNaN(parse_numA) || isNaN(parse_numB)){
            const errorMessage = encodeURIComponent('숫자를 입력해주세요.') ;
            return res.redirect(`?error=${errorMessage}`) ;
        }
        let result ;
        if(operand === "sum") {
            result = parse_numA + parse_numB ;
        }
        else if(operand === "sub") {
            result = parse_numA - parse_numB ;
        }
        else {
            const errorMessage = encodeURIComponent('유효하지 않은 연산입니다.') ;
            return res.redirect(`?error=${errorMessage}`) ;
        }
        return res.redirect(`?result=${result}`) ;
    }
    catch(err){
        return next(err) ; 
    }
});

module.exports = router ; 