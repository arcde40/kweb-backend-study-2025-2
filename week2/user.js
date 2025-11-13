const Router = require('express')

const router = Router()

const userRouter = require('./user')



router.get('/', (req, res) => {
    const a = req.query.a
    const b = req.query.b
    res.send(`${a}, ${b}`)
})

router.get('/sum', (req, res, next) => {
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
    res.send(`${a+b}`)
})

router.get('/sub', (req, res) => {
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
    res.send(`${a-b}`)
})



module.exports = router