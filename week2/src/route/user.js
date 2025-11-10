const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(400).send('Please input id');
});

router.get('/:id', (req, res) => {
  res.status(200).send(`Hi, ${req.params.id}`);
});

module.exports = router;
