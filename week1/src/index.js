const express = require('express')
const app = express();
const PORT = 3000;

app.get('/hello', (req, res) => {
    res.send('Hello world!');
});

app.get('/bye', (req, res) => {
    res.send('Goodbye world!');
});

app.listen(PORT, () => {
    console.log('Server is running');
});