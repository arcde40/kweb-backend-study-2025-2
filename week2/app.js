const express = require('express')

const app = express()
const port = 3000

const userRouter = require('./user')

app.use((req, res, next) => {
    console.log(`Someone sent this request: ${req.url}`)
    next()
})

app.use('/math',userRouter)

app.listen(3000, () => console.log(`Server running on port ${port}...`))