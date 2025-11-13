const express = require('express')

const app = express()
const port = 3000

app.get(`/user/:id`, (req, res) => {
    res.send(`Hello user ${req.params.id}`)
})

app.listen(3000, () => console.log(`Server running on port ${port}...`))