const express = require('express');
const router = express.Router();
const { createItem } = require('../src/controllers/items/create');
const { editItem } = require('../src/controllers/items/edit');
const { deleteItem } = require('../src/controllers/items/delete');
const { listItems } = require('../src/controllers/items/list');
const multer = require('multer'); 
const upload = multer({storage: multer.memoryStorage()})

router.post('/', upload.single('image'), (req, res) => {
  console.log("creating")
  createItem(req, res);
});

router.post('/:itemId', (req, res) => {
  editItem(req, res);
});


router.delete('/:itemId', (req, res) => {
    deleteItem(req, res);
});

router.get('/', (req, res) => {
  listItems(req, res);
});




module.exports = router;