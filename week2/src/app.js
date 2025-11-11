const express = require('express');
const app = express();
const userRouter = require('./route/user');

app.use(express.urlencoded({ extended: true }));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use((req, res, next) => {
  console.log(`Someone sent request: ${req.path}`);
  return next();
});

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.render('hw', { result: null });
});

app.post('/calculate', (req, res) => {
  const { num1, num2 } = req.body;

  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) return res.render('index', { error: '숫자를 올바르게 입력하세요.', result: null });

  const sum = Number(num1) + Number(num2);
  const diff = Number(num1) - Number(num2);

  res.render('hw', {
    error: null,
    result: { sum, diff },
    num1,
    num2,
  });
});

app.use((req, res, next) => {
  res.status(404).send("Not found");
});

app.listen(3000, () => { console.log('Server listening on port 3000!');});