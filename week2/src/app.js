const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static('public'));

let result = ""
let nn1 = ""
let nn2 = ""
let Op = [
  {op: "Add", sign: "+"},
  {op: "Mul", sign: "×"},
  {op: "Sub", sign: "-"},
  {op: "Div", sign: "÷"},
]

app.get("/", (req, res) => {
  res.render("calculator.pug", {result : result, num1 : nn1, num2 : nn2, op: Op})
})
app.post("/calculate", (req, res) => {
  const num1 = Number(req.body.num1)
  const num2 = Number(req.body.num2)
  const BOp = req.body.BOp

  if (isNaN(num1) || isNaN(num2)) {
    result = "숫자를 입력해주세용 휴먼.."
  }
  else {
    if (BOp == "Div" && num2 == 0) {
      result = "0으로 나누지 말아주세용 휴먼..."
    }
    else {
      if (BOp == "Add") {
        result = num1 + num2
      }
      else if (BOp == "Mul") {
        result = num1 * num2
      }
      else if (BOp == "Sub") {
        result = num1 - num2
      }
      else {
        result = num1 / num2
      }
    }
  }

  for(let i = 0; i < 4; i++){
    if (Op[i].op == BOp){
      let temp_op = Op[0].op
      let temp_sign = Op[0].sign
      Op[0].op = Op[i].op
      Op[0].sign = Op[i].sign
      Op[i].op = temp_op
      Op[i].sign = temp_sign
      break
    }
  }
  nn1 = req.body.num1
  nn2 = req.body.num2
  res.redirect("/")
})

app.listen(3000, () => { console.log('Server listening on port 3000!');});
