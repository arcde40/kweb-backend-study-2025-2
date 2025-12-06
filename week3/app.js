const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static('public'));

let tasks = [ //원래는 db에서 가져옴
    {name: "밥먹기", completed: false}
];

app.get('/todo', (req, res) => {
    res.render('todo.pug', {tasks, error: req.query.error});
});

app.post('/add-task', (req, res) => {
    const name = req.body.taskName;
    if (name && name.trim() !== '') {
        tasks.push({name, completed: false});
        res.redirect('/todo');
    } else {
        res.redirect('/todo?error=할 일이 비었습니다!');
    }
});

app.post('/complete-task', (req, res) => {
    const idx = Number(req.body.taskIndex);
    if (idx>=tasks.length || idx<0) {
        res.redirect('/todo?error=없는 일 번호입니다!');
    } else {
        if (tasks[idx].completed) {
            res.redirect('/todo?error=이미 완료된 일입니다!');
        } else {
            tasks[idx].completed = true;
            res.redirect('/todo');
        }
    }
});

app.listen(3000, () => console.log("server listening on port 3000!"));