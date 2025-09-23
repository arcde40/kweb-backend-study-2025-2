const express = require('express');
const app = express();
app.get('/hello', (req, res) => { res.send('Hello, World!'); });
app.get('/bye', (req, res) => { res.send('Goodbye, World!'); });
// req 왔을때 수행할 동작 정의

app.listen(3000, () => { console.log('Server listening on port 3000.')});