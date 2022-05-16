const express = require('express');
const router = express.Router();
const { createItem } = require('../src/controllers/items/create');
const { editItem } = require('../src/controllers/items/edit');
const { deleteItem } = require('../src/controllers/items/delete');
const { listItems } = require('../src/controllers/items/list');

router.post('/', (req, res) => {
  console.log("creating");
  createItem(req, res);
});

router.post('/:itemId', (req, res) => {
  console.log("editing");
  editItem(req, res);
});


router.delete('/:itemId', (req, res) => {
    console.log("deleting");
    deleteItem(req, res);
});

router.get('/', (req, res) => {
  console.log("listing");
  listItems(req, res);
});




module.exports = router;