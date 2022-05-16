var express = require('express');
var router = express.Router();
const { create } = require('../src/controllers/items/create');
const { edit } = require('../src/controllers/items/edit');
const { deleteItem } = require('../src/controllers/items/delete');

router.post('/', (req, res) => {
  console.log("creating");
  create(req, res);
});

router.post('/:itemId', (req, res) => {
  console.log("editing");
  edit(req, res);
});



router.delete('/:itemId', (req, res) => {
    console.log("deleting");
    deleteItem(req, res);
});



module.exports = router;