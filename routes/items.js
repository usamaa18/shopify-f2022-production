var express = require('express');
var router = express.Router();
const { create } = require('../src/controllers/items/create');

router.post('/', (req, res) => {
  create(req, res);
});

module.exports = router;