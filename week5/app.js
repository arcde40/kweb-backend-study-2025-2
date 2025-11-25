const {runQuery} = require('./database');

const express = require('express');
const session = require('express-session');
const sanitizeHTML = require('sanitize-html');

const app = express();

app.use(session({
	secret: 'asdf',
	resave: false,
	saveUninitialized: true,
}));

app.get('/me', (req, res) => {
	const {requester} = req.session;
	if (!requester) return res.send('You are not logged in!');
	const {id, name, status} = requester;
	return res.send(`id: ${id}, name: ${name}, status: ${status}`);

});

app.get('/login', (req, res) => {
	const username = req.query.username;
	const password = req.query.password;

	if (password !== '1q2w3e4r') {
		res.send('Wrong password!');
		return;
	}

	req.session.requester = {
		id: 1,
		name: username,
		status: 'sleepy'
	};

	return res.send('Login successful!');
});

app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if (err) return res.send('Something went wrong...');
		return res.send('Success!');
	})
});

// --------------------------------------------------------------- 과제

app.get('/student', async (req, res) => {
	const query = req.query.id;
	const result = await runQuery('select * from students where student_id = ?', [query]);

	return res.send(JSON.stringify(result));
})

app.get('/grade', async (req, res) => {
	const name = req.query.name;
    const result = await runQuery(
        'select grade from students inner join enrollments on students.student_id = enrollments.student_id where students.student_name = ?',[name]
	);
    res.send(sanitizeHTML(JSON.stringify(result)));
});


app.get('/course', async (req, res) => {
	const coursename = req.query.coursename;
    const result = await runQuery(
        'select student_name from courses inner join enrollments on courses.course_id = enrollments.course_id inner join students on students.student_id = enrollments.student_id where course_name = ?',[coursename] 
	);
    res.send(sanitizeHTML(JSON.stringify(result)));
});

app.listen(8080, ()=>console.log('server started!'));
