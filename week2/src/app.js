const express = require('express');
const path = require('path');
const app = express();
const mathRouter = require('./math.js');

const userRouter = require('./route/user');

app.use((req, res, next) => {
  console.log(`Someone sent request: ${req.path}`);
  return next();
});
app.set('views', __dirname);
app.set('view engine', 'pug');

app.use('/user', userRouter);
app.use('/math', mathRouter);

//app.get('/', (req, res) => { req.send('Hello, world!'); });
app.get('/math', (req, res) => {
  res.render('math');  
});
app.get('/', (req, res) => {
  res.redirect('/math');
});
app.use((req, res) => {
  console.log(`Unhandled request: ${req.path}`);
  res.status(404).send("Not found");
});



// app.use((req, res, next) => {
//   res.status(404).send("Not found");
// });

app.listen(3000, () => { console.log('Server listening on port 3000!');});
