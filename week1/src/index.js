const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
});

app.get('/hi', (req, res) => {
    res.send('<h1>Hello!</h1>');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000.')
});