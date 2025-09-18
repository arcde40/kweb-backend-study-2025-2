const express = require('express');

const app = express();

app.get('/hello', (req, res) => { 
    let i = 2 * 2;
    res.send(i); 
});

app.get('/hi', (req, res) => { res.send('<h1>안녕2<h1>'); });

app.listen(3000, () => {console.log('Server listening on port 3000!')});
