const {runQuery} = require('./database');

const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
	secret: 'asdf',
	resave: false,
	saveUninitialized: true,
}));

app.get('/me', (req, res) => {
	const {requester} = req.session
	if (!requester) return res.send("You are not logged in")
	const {id, name, status} = requester
	return res.send(`id: ${id}, name: ${name}, status: ${status}`)
});

app.get('/login', (req, res) => {
	const username = req.query.username
	const password = req.query.password

	if (password !== '1q2w3e4r') {
		res.send("못 맞췄지롱")
		return
	}

	req.session.requester = {
		id : 1,
		name: username,
		status: "지니어스임"
	}

	return res.send("Login successful")
});

app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if (err) {
			return res.send("잘못됐지롱")
		}
		return res.send("성공했지롱")
	})
});

app.listen(3000, ()=>console.log('server started!'));
