var express = require('express');
var router = express.Router();
const { create } = require('../src/controllers/items/create');
const { edit } = require('../src/controllers/items/edit');
const { deleteItem } = require('../src/controllers/items/delete');

router.post('/', (req, res) => {
  if ("itemId" in req.query) {
    console.log("editing");
    edit(req, res);
  } else {
    console.log("creating");
    create(req, res);
  }
});

router.delete('/:itemId', (req, res) => {
    console.log("deleting");
    deleteItem(req, res);
});



module.exports = router;