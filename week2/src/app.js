const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./route/user');
const mathRouter = require('./route/math');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/math', mathRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'Main Page' });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
