const express = require('express');

const app = express();

app.get('/hello', (req,res) => {
    res.send('<h1>큰 안녕</h1>');
});

app.get('/hi', (req,res) => {res.send('안녕');});

app.listen(3000, () => {console.log('Server listening on port 3000')});