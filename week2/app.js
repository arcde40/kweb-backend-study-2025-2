const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send("Hello, world!")
})

const userRouter = require('./user')

app.use((req, res, next) => {
    console.log(`Someone sent a request: ${req.url}`)
    next();
})

app.use('/user', userRouter)

const mathRouter = require('./math')

app.use('/math', mathRouter)


app.listen(3000, () => {console.log("Server listening on port 3000")});