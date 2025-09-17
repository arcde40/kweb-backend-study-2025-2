const express = require('express')

const app = express()

app.get('/hello', (req, res) => { res.send('안녕') })

app.get('/h1', (req, res) => { res.send('안녕') })

app.listen(3000, () => {console.log('Serer listening on port 3000!')})