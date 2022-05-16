const express = require('express');
const router = express.Router();
const { createWarehouse } = require('../src/controllers/warehouses/create');

router.post('/', (req, res) => {
  console.log("creating");
  createWarehouse(req, res);
});

module.exports = router;