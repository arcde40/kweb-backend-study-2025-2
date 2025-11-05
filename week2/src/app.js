const express = require('express');
const app = express();

const userRouter = require('./route/user');

app.use((req, res, next) => {
  console.log(`Someone sent request: ${req.path}`);
  return next();
});

app.use('/user', userRouter);

app.get('/', (req, res) => { req.send('Hello, world!'); });

app.use((req, res, next) => {
  res.status(404).send("Not found");
});

app.listen(3000, () => { console.log('Server listening on port 3000!');});
