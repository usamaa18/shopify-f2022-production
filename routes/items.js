var express = require('express');
var router = express.Router();
const { create } = require('../src/controllers/items/create');
const { edit } = require('../src/controllers/items/edit');

router.post('/', (req, res) => {
  if ("itemId" in req.query) {
    console.log("editing");
    edit(req, res);
  } else {
    console.log("creating");
    create(req, res);
  }
});



module.exports = router;