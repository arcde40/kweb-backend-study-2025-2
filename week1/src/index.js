const express = require("express");
const app = express();
const port = 3000;

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

app.get("/bye", (req, res) => {
  res.send("Goodbye, World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
