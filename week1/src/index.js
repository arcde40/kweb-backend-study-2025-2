const express = require("express");

const app = express();

app.get('/hello', (req, res) => { res.send("Hello, World!"); });
app.get('/bye', (req, res) => { res.send("Goodbye, World!"); });
